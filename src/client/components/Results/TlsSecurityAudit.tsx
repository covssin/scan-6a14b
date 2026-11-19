import { Card } from 'client/components/Form/Card';
import Row, { type RowProps } from 'client/components/Form/Row';
import { toStatus, type Status } from 'client/components/misc/Icon';
import { gradeSeverity } from 'client/analysis/rules/tls-security-audit';
import { MIN_MAX_AGE } from 'client/analysis/rules/hsts';
import { formatNumber } from 'client/utils/format';
import type { TermId } from '@/data/glossary';

const yesNo = (v: any, no: Status = 'error'): RowProps => ({
  val: !!v,
  status: v ? 'pass' : no,
});

// A yes or no where yes is the risk
const risk = (v: any): RowProps => ({ val: !!v, status: v ? 'warning' : 'pass' });

const fwdSecrecy = (n: number): RowProps => {
  if (n & 4) return { val: 'Ze wszystkimi przeglądarkami', status: 'pass' };
  if (n & 2) return { val: 'Z większością nowoczesnych przeglądarek', status: 'warning' };
  if (n & 1) return { val: 'Ograniczone', status: 'warning' };
  return { val: false };
};

// SSL Labs HSTS statuses that leave the site without a working policy
const HSTS_PROBLEMS: Record<string, string> = {
  absent: 'Nie ustawiono',
  invalid: 'Nieprawidłowy',
  disabled: 'Wyłączony',
};

// The HSTS policy SSL Labs found, held to the same one year max-age as the HSTS card
const hsts = (policy?: any): RowProps | null => {
  if (policy?.status !== 'present') {
    const problem = HSTS_PROBLEMS[policy?.status];
    return problem ? { val: problem, status: 'error' } : null;
  }
  const days = Math.round((policy.maxAge || 0) / 86400);
  const sub = policy.includeSubDomains ? ' + includeSubDomains' : '';
  const val = `${formatNumber(days)} dni${sub}`;
  if (policy.maxAge >= MIN_MAX_AGE) return { val, status: 'pass' };
  return { val, status: 'warning', reason: 'Poniżej jednego roku wymaganego przez listę HSTS Preload' };
};

// renegSupport bits: 1 insecure client-init, 2 secure, 4 secure client-init, 8 required
const reneg = (n?: number): RowProps => {
  if (!n) return { val: 'Nieobsługiwana', status: 'pass' };
  if (n & 1) return { val: 'Niezabezpieczona (inicjowana przez klienta)', status: 'warning' };
  const flags = [];
  if (n & 2) flags.push('bezpieczna');
  if (n & 4) flags.push('bezpieczna inicjowana przez klienta');
  if (n & 8) flags.push('wymagana przez serwer');
  return { val: flags.join(', ') || 'nieznana', status: 'pass' };
};

const sessionResumption = (n?: number): RowProps => {
  if (n === 2) return { val: 'Obsługiwane', status: 'pass' };
  if (n === 1) return { val: 'Zwracane ID, bez wznawiania', status: 'warning' };
  return { val: 'Wyłączone', status: 'info' };
};

const compression = (n?: number): RowProps =>
  n ? { val: 'Włączona (ryzyko ataku CRIME)', status: 'warning' } : { val: 'Wyłączona', status: 'pass' };

// Each entry returns the row's value, or null to hide the row entirely, and its glossary term
const POSTURE: Array<[string, (d: any) => RowProps | null, TermId?]> = [
  ['Forward Secrecy', (d) => fwdSecrecy(d.forwardSecrecy), 'forward-secrecy'],
  ['HSTS', (d) => hsts(d.hstsPolicy), 'strict-transport-security'],
  ['Session Resumption', (d) => sessionResumption(d.sessionResumption), 'session-resumption'],
  ['OCSP Stapling', (d) => yesNo(d.ocspStapling, 'info'), 'ocsp-stapling'],
  ['Renegotiation', (d) => reneg(d.renegSupport), 'renegotiation'],
  [
    'Fallback SCSV (ochrona przed downgrade)',
    (d) => yesNo(d.fallbackScsv, 'warning'),
    'fallback-scsv',
  ],
  ['Certificate Transparency', (d) => yesNo(d.hasSct), 'certificate-transparency'],
  ['Przekierowuje do', (d) => (d.httpForwarding ? { val: d.httpForwarding } : null)],
  ['Preferowany szyfr ChaCha20', (d) => yesNo(d.chaCha20Preference, 'info'), 'chacha20'],
  ['Obsługa szyfrów AEAD', (d) => yesNo(d.supportsAead), 'aead'],
  ['Obsługa starszych szyfrów CBC', (d) => risk(d.supportsCBC), 'cbc-ciphers'],
  ['Kompresja TLS', (d) => compression(d.compressionMethods), 'tls-compression'],
  ['Ponowne użycie statycznego klucza DH', (d) => risk(d.dhYsReuse), 'key-exchange-reuse'],
  ['Słabe liczby pierwsze DH', (d) => risk(d.dhUsesKnownPrimes === 2), 'weak-dh-primes'],
  ['Ponowne użycie statycznych parametrów ECDH', (d) => risk(d.ecdhParameterReuse), 'key-exchange-reuse'],
];

// Each vulnerability test, its term, and any SSL Labs results that are neither safe nor vulnerable
const VULNS: Array<[string, string, TermId, Record<number, string>?]> = [
  ['heartbleed', 'Heartbleed', 'heartbleed'],
  ['poodle', 'POODLE (SSLv3)', 'poodle'],
  ['poodleTls', 'POODLE (TLS)', 'poodle-tls'],
  ['zombiePoodle', 'Zombie POODLE', 'zombie-poodle'],
  ['goldenDoodle', 'GOLDENDOODLE', 'goldendoodle'],
  ['sleepingPoodle', 'Sleeping POODLE', 'sleeping-poodle'],
  ['zeroLengthPaddingOracle', 'Zero-Length Padding Oracle', 'zero-length-padding-oracle'],
  ['freak', 'FREAK', 'freak'],
  ['logjam', 'LOGJAM', 'logjam'],
  ['drownVulnerable', 'DROWN', 'drown'],
  ['openSslCcs', 'OpenSSL CCS Injection', 'ccs-injection'],
  ['openSSLLuckyMinus20', 'OpenSSL Padding Oracle', 'openssl-padding-oracle'],
  ['bleichenbacher', 'ROBOT (Bleichenbacher)', 'robot', { 4: 'Niespójne wyniki' }],
  ['ticketbleed', 'Ticketbleed', 'ticketbleed', { 3: 'Wykryto pokrewną podatność' }],
];

// A test result, where SSL Labs numbers mean 1 safe, below 1 untested, and above 1 vulnerable
const vulnerability = (result: unknown, others: Record<number, string> = {}): RowProps | null => {
  if (result == null) return null;
  if (typeof result === 'boolean') return { val: !result, yes: 'Bezpieczny', no: 'Podatny' };
  if (typeof result !== 'number' || result < 1) return { val: 'Nie testowano' };
  if (others[result]) return { val: others[result], status: 'warning' };
  return { val: result === 1, yes: 'Bezpieczny', no: 'Podatny' };
};

const TlsSecurityAuditCard = (props: {
  data: any;
  title: string;
  actionButtons: any;
}): JSX.Element | null => {
  const ep = props.data?.endpoints?.[0];
  if (!ep?.details) return null;
  const d = ep.details;
  const protocols = (d.protocols || []).map((p: any) => `${p.name} ${p.version}`).join(', ');
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {ep.grade && (
        <Row
          lbl="Ocena"
          val={ep.grade}
          status={toStatus(gradeSeverity(ep.grade))}
          term="ssl-labs-grade"
        />
      )}
      {ep.gradeTrustIgnored && ep.gradeTrustIgnored !== ep.grade && (
        <Row lbl="Ocena (bez weryfikacji zaufania)" val={ep.gradeTrustIgnored} />
      )}
      {protocols && <Row lbl="Protokoły" val={protocols} />}
      {POSTURE.map(([label, getter, term]) => {
        const row = getter(d);
        return row && <Row key={label} lbl={label} term={term} {...row} />;
      })}
      {VULNS.map(([key, label, term, others]) => {
        const row = vulnerability(d[key], others);
        return row && <Row key={key} lbl={label} term={term} {...row} />;
      })}
    </Card>
  );
};

export default TlsSecurityAuditCard;
