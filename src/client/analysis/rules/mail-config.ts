import type { Analyzer, Result } from '../types';
type DkimKey = { selector: string; bits: number | null };

export interface MailData {
  mxRecords?: { exchange: string }[];
  txtRecords?: string[][];
  spfLookups?: number;
  dmarcDomain?: string;
  dkim?: DkimKey[];
  mtaSts?: { mode?: string; mx: string[] };
  dane?: string[];
}

export const findRecords = (txtRecords: string[][] = [], prefix: string) =>
  txtRecords
    .map((chunks) => chunks.join(''))
    .filter((record) => record.toLowerCase().startsWith(prefix.toLowerCase()));

const parseTags = (record: string): Record<string, string | undefined> =>
  Object.fromEntries(
    record.split(';').map((part) => {
      const [tag, ...value] = part.split('=');
      return [tag.trim().toLowerCase(), value.join('=').trim()];
    }),
  );

const spfFailsUnlisted = (spf: string) => {
  const terms = spf.toLowerCase().split(' ');
  const all = terms.find((term) => ['all', '+all', '-all', '~all', '?all'].includes(term));
  if (all) return all === '-all' || all === '~all';
  return terms.some((term) => term.startsWith('redirect='));
};

export const sendsNoMail = (d: MailData) => {
  const spf = findRecords(d.txtRecords, 'v=spf1')[0] || '';
  return spf.toLowerCase().split(' ').filter(Boolean).join(' ') === 'v=spf1 -all';
};

const enforced = (policy = '') => ['quarantine', 'reject'].includes(policy.toLowerCase());

export const checkSpf = (d: MailData): Result => {
  const spf = findRecords(d.txtRecords, 'v=spf1');
  if (!spf.length) {
    return {
      severity: 'issue',
      title: 'Brak rekordu SPF',
      detail:
        'Opublikuj rekord TXT v=spf1 wskazujący uprawnione serwery pocztowe lub v=spf1 -all, jeśli domena nie wysyła poczty',
    };
  }
  if (spf.length > 1) {
    return {
      severity: 'issue',
      title: 'Znaleziono wiele rekordów SPF',
      detail: 'Serwery odbiorcze traktują to jako błąd SPF — połącz je w jeden rekord v=spf1',
    };
  }
  if ((d.spfLookups ?? 0) > 10) {
    return {
      severity: 'issue',
      title: `Rekord SPF wymaga ${d.spfLookups} zapytań DNS (limit wynosi 10)`,
      detail:
        'Odbiorcy przerywają weryfikację po 10 zapytaniach. Usuń nieużywane dyrektywy include lub zastąp je zakresami ip4/ip6',
    };
  }
  if (!spfFailsUnlisted(spf[0])) {
    return {
      severity: 'warning',
      title: 'Rekord SPF nie odrzuca nieuprawnionych nadawców',
      detail: 'Zakończ rekord dyrektywą -all lub ~all',
    };
  }
  return { severity: 'pass', title: 'Opublikowano poprawny rekord SPF' };
};

export const checkDmarc = (d: MailData): Result => {
  const dmarc = findRecords(d.txtRecords, 'v=DMARC1');
  if (!dmarc.length) {
    return {
      severity: 'issue',
      title: 'Brak rekordu DMARC',
      detail:
        'Opublikuj rekord TXT v=DMARC1 dla subdomeny _dmarc, aby chronić domenę przed podszywaniem się',
    };
  }
  if (dmarc.length > 1) {
    return {
      severity: 'issue',
      title: 'Znaleziono wiele rekordów DMARC',
      detail: 'Wiele rekordów DMARC powoduje ignorowanie polityki — pozostaw tylko jeden rekord',
    };
  }
  const tags = parseTags(dmarc[0]);
  const tag = d.dmarcDomain && tags.sp ? 'sp' : 'p';
  const policy = tags[tag]?.toLowerCase();
  const from = d.dmarcDomain ? ` (z domeny ${d.dmarcDomain})` : '';
  const percent = tags.pct ? Number(tags.pct) : 100;
  if (!enforced(policy)) {
    const next = `ustaw ${tag}=quarantine lub ${tag}=reject`;
    return {
      severity: 'warning',
      title: `Polityka DMARC działa wyłącznie w trybie monitorowania${from}`,
      detail: tags.rua
        ? `Wiadomości niespełniające DMARC są nadal dostarczane. Po weryfikacji raportów ${next}`
        : `Wiadomości niespełniające DMARC są nadal dostarczane i brak raportów. Dodaj rua=mailto:<adres>, a następnie ${next}`,
    };
  }
  if (percent < 100) {
    return {
      severity: 'warning',
      title: `Polityka DMARC obejmuje tylko ${percent}% wiadomości${from}`,
      detail: 'Zwiększ parametr pct do 100 lub go usuń, aby objąć ochroną całą pocztę',
    };
  }
  return { severity: 'pass', title: `Polityka DMARC: ${policy}${from}` };
};

export const checkSubdomainDmarc = (d: MailData): Result | null => {
  const dmarc = findRecords(d.txtRecords, 'v=DMARC1');
  if (dmarc.length !== 1 || d.dmarcDomain) return null;
  const { p, sp } = parseTags(dmarc[0]);
  if (!sp || !enforced(p) || enforced(sp)) return null;
  return {
    severity: 'warning',
    title: 'Polityka DMARC nie chroni subdomen',
    detail: `Parametr sp=${sp} przepuszcza sfałszowane wiadomości z subdomen. Ustaw sp=quarantine lub sp=reject`,
  };
};

export const checkDkim = (d: MailData): Result => {
  const keys = d.dkim ?? [];
  const names = (list: DkimKey[]) => list.map((key) => key.selector).join(', ');
  const weak = keys.filter((key) => key.bits && key.bits < 1024);
  const short = keys.filter((key) => key.bits === 1024);
  if (!keys.length && sendsNoMail(d)) {
    return { severity: 'pass', title: 'Domena nie wysyła poczty — klucz DKIM nie jest wymagany' };
  }
  if (!keys.length) {
    return {
      severity: 'info',
      title: 'Nie znaleziono klucza DKIM pod popularnymi selektorami',
      detail:
        'DKIM może używać dowolnej nazwy selektora. Jeśli nie jest skonfigurowany, opublikuj klucz DKIM w DNS',
    };
  }
  if (weak.length) {
    return {
      severity: 'issue',
      title: `Klucz DKIM krótszy niż 1024 bity (${names(weak)})`,
      detail: 'Odbiorcy odrzucają podpisy z tak krótkich kluczy — zastąp go kluczem 2048-bitowym',
    };
  }
  if (short.length) {
    return {
      severity: 'info',
      title: `1024-bitowy klucz DKIM (${names(short)})`,
      detail: 'Zalecane są klucze 2048-bitowe — rozważ wymianę klucza u dostawcy poczty',
    };
  }
  return { severity: 'pass', title: `Znaleziono klucz DKIM (${names(keys)})` };
};

export const mxHosts = (d: MailData) =>
  (d.mxRecords || []).map((record) => record.exchange.toLowerCase()).filter(Boolean);

const coversHost = (pattern: string, host: string) =>
  pattern.startsWith('*.')
    ? host.split('.').slice(1).join('.') === pattern.slice(2)
    : host === pattern;

export const checkMtaSts = (d: MailData): Result | null => {
  const hosts = mxHosts(d);
  const policy = d.mtaSts;
  if (!hosts.length) return null;
  if (!policy) {
    return {
      severity: 'info',
      title: 'Brak konfiguracji MTA-STS',
      detail: 'Bez MTA-STS poczta przychodząca może zostać zdegradowana do połączenia nieszyfrowanego',
    };
  }
  if (!policy.mode) {
    return {
      severity: 'warning',
      title: 'Polityka MTA-STS jest nieczytelna lub nieprawidłowa',
      detail: 'Wymagany jest rekord v=STSv1 oraz poprawny plik mta-sts.<domena>/.well-known/mta-sts.txt',
    };
  }
  const patterns = policy.mx.map((pattern) => pattern.toLowerCase().replace(/\.$/, ''));
  const missing = hosts.filter((host) => !patterns.some((pattern) => coversHost(pattern, host)));
  if (missing.length && policy.mode !== 'none') {
    return {
      severity: policy.mode === 'enforce' ? 'issue' : 'warning',
      title: `Polityka MTA-STS pomija serwery: ${missing.join(', ')}`,
      detail: 'Dodaj brakujące wpisy mx: do polityki MTA-STS',
    };
  }
  if (policy.mode !== 'enforce') {
    return {
      severity: 'info',
      title: `MTA-STS działa w trybie ${policy.mode}`,
      detail: 'Przełącz politykę na mode: enforce po potwierdzeniu poprawnego dostarczania w raportach TLS',
    };
  }
  return { severity: 'pass', title: 'Polityka MTA-STS jest egzekwowana' };
};

export const checkTlsRpt = (d: MailData): Result | null => {
  if (!d.mtaSts && !d.dane?.length) return null;
  if (findRecords(d.txtRecords, 'v=TLSRPTv1').length) {
    return { severity: 'pass', title: 'Skonfigurowano raportowanie TLS-RPT' };
  }
  return {
    severity: 'info',
    title: 'Brak rekordu TLS-RPT',
    detail: 'Opublikuj rekord TXT v=TLSRPTv1 dla _smtp._tls, aby otrzymywać raporty o błędach TLS',
  };
};

const checkDane = (d: MailData): Result | null => {
  const hosts = mxHosts(d);
  if (!d.dane?.length) return null;
  return {
    severity: 'pass',
    title: `Rekordy DANE TLSA obecne na ${d.dane.length} z ${hosts.length} serwerów MX`,
  };
};

const mailConfig: Analyzer = (d) =>
  [
    checkSpf(d),
    checkDmarc(d),
    checkSubdomainDmarc(d),
    checkDkim(d),
    checkMtaSts(d),
    checkTlsRpt(d),
    checkDane(d),
  ].filter((r) => r !== null);

export default mailConfig;
