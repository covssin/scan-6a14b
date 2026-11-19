import type { Analyzer, Result } from '../types';

const CRITICAL: Record<string, string> = {
  contentSecurityPolicy: 'Content-Security-Policy',
  strictTransportPolicy: 'Strict-Transport-Security',
  xContentTypeOptions: 'X-Content-Type-Options',
  xFrameOptions: 'X-Frame-Options',
};

const RECOMMENDED: Record<string, string> = {
  referrerPolicy: 'Referrer-Policy',
  permissionsPolicy: 'Permissions-Policy',
  crossOriginOpenerPolicy: 'Cross-Origin-Opener-Policy',
  crossOriginResourcePolicy: 'Cross-Origin-Resource-Policy',
  crossOriginEmbedderPolicy: 'Cross-Origin-Embedder-Policy',
};

export const HEADERS = { ...CRITICAL, ...RECOMMENDED, xXSSProtection: 'X-XSS-Protection' };

const ANY_SOURCE = ['*', 'http:', 'https:', 'data:'];
const LEAKY_REFERRERS = ['unsafe-url', 'no-referrer-when-downgrade'];

const parseCsp = (header: string): Record<string, string[]>[] =>
  header.split(',').map((policy) =>
    Object.fromEntries(
      policy.split(';').map((directive) => {
        const [name, ...sources] = directive.trim().toLowerCase().split(/\s+/);
        return [name, sources];
      }),
    ),
  );

export const hasFrameAncestors = (d: any) =>
  !!d.contentSecurityPolicy && parseCsp(d.contentSecurityPolicy).some((p) => p['frame-ancestors']);

const checkCsp = (header: string): Result[] => {
  const policies = parseCsp(header);
  const scripts = policies.map((p) => p['script-src'] || p['default-src']);
  if (scripts.every((sources) => !sources)) {
    return [
      {
        severity: 'warning',
        title: 'Content-Security-Policy nie ogranicza skryptów',
        detail: 'Dodaj dyrektywę script-src lub default-src, aby blokować wstrzykiwane skrypty',
      },
    ];
  }
  const allows = (test: (sources: string[]) => boolean) =>
    scripts.every((sources) => !sources || test(sources));
  const out: Result[] = [];
  const nonced = (sources: string[]) => sources.some((s) => /^'(nonce|sha\d+)-/.test(s));
  if (allows((sources) => sources.includes("'unsafe-inline'") && !nonced(sources))) {
    out.push({
      severity: 'warning',
      title: 'Content-Security-Policy zezwala na skrypty inline',
      detail: "'unsafe-inline' umożliwia wykonanie wstrzykniętych skryptów. Użyj nonce lub hashy",
    });
  }
  const wildcard = (sources: string[]) => sources.some((s) => ANY_SOURCE.includes(s));
  if (allows((sources) => wildcard(sources) && !sources.includes("'strict-dynamic'"))) {
    out.push({
      severity: 'warning',
      title: 'Content-Security-Policy zezwala na skrypty z dowolnego źródła',
      detail: 'Zastąp *, http:, https: lub data: w script-src konkretnymi zaufanymi domenami',
    });
  }
  if (allows((sources) => sources.includes("'unsafe-eval'"))) {
    out.push({
      severity: 'info',
      title: 'Content-Security-Policy zezwala na eval()',
      detail: "'unsafe-eval' pozwala wykonywać ciągi tekstowe jako kod JavaScript",
    });
  }
  const unset = ['object-src', 'base-uri'].filter(
    (name) => !policies.some((p) => p[name] || (name === 'object-src' && p['default-src'])),
  );
  if (unset.length) {
    out.push({
      severity: 'info',
      title: `Content-Security-Policy nie określa ${unset.join(' ani ')}`,
      detail: "object-src 'none' blokuje wtyczki, a base-uri 'self' chroni przed podmianą tagu <base>",
    });
  }
  return out;
};

const badValue = (label: string, value: string, detail: string): Result[] => [
  { severity: 'issue', title: `${label} ma wartość „${value}”`, detail },
];

const checkValue: Record<string, (value: string) => Result[]> = {
  contentSecurityPolicy: checkCsp,
  strictTransportPolicy: (value) =>
    Number(/max-age\s*=\s*"?(\d+)/i.exec(value)?.[1]) > 0
      ? []
      : badValue(
          'Strict-Transport-Security',
          value,
          'Wartość max-age równa 0 lub jej brak wyłącza ochronę HSTS',
        ),
  xContentTypeOptions: (value) =>
    /^\s*nosniff\s*(,|$)/i.test(value)
      ? []
      : badValue(
          'X-Content-Type-Options',
          value,
          'Jedyną poprawną wartością jest nosniff — inne są ignorowane przez przeglądarki',
        ),
  xFrameOptions: (value) =>
    value.split(',').some((option) => /^\s*(deny|sameorigin)\s*$/i.test(option))
      ? []
      : badValue(
          'X-Frame-Options',
          value,
          'Działają wyłącznie wartości DENY oraz SAMEORIGIN',
        ),
  referrerPolicy: (value) =>
    LEAKY_REFERRERS.includes(value.split(',').pop()!.trim().toLowerCase())
      ? [
          {
            severity: 'warning',
            title: `Referrer-Policy „${value}” ujawnia pełne adresy URL innym witrynom`,
            detail: 'Ścieżki i parametry zapytań wyciekają do zewnętrznych serwisów',
          },
        ]
      : [],
  xXSSProtection: (value) =>
    value.trim().startsWith('0')
      ? []
      : [
          {
            severity: 'info',
            title: 'Nagłówek X-XSS-Protection jest włączony',
            detail: 'Przeglądarki wycofały ten filtr — zaleca się ustawienie jego wartości na 0',
          },
        ],
};

export const checkHeader = (d: any, key: string): Result[] => {
  const label = HEADERS[key as keyof typeof HEADERS];
  if (key === 'xFrameOptions' && hasFrameAncestors(d)) {
    return [{ severity: 'pass', title: 'Osadzanie w ramkach ograniczone przez CSP frame-ancestors' }];
  }
  if (d[key]) {
    const problems = checkValue[key]?.(String(d[key])) || [];
    const passed = CRITICAL[key] && problems.every((p) => p.severity === 'info');
    return passed ? [{ severity: 'pass', title: `Ustawiono ${label}` }, ...problems] : problems;
  }
  if (CRITICAL[key]) {
    return [
      {
        severity: 'issue',
        title: `Brak nagłówka ${label}`,
        detail: `Dodaj nagłówek odpowiedzi ${label}`,
      },
    ];
  }
  if (RECOMMENDED[key]) {
    return [
      {
        severity: 'warning',
        title: `Brak nagłówka ${label}`,
        detail: `Rozważ dodanie nagłówka odpowiedzi ${label}`,
      },
    ];
  }
  return [];
};

const httpSecurity: Analyzer = (d) => Object.keys(HEADERS).flatMap((key) => checkHeader(d, key));

export default httpSecurity;
