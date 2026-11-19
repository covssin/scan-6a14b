import type { Analyzer } from '../types';

export const MIN_MAX_AGE = 31536000;

export const parseHsts = (header: string) => {
  const lower = header.toLowerCase();
  return {
    maxAge: Number(/max-age\s*=\s*"?(\d+)/.exec(lower)?.[1] || 0),
    includeSubDomains: lower.includes('includesubdomains'),
    preload: lower.includes('preload'),
  };
};

const hsts: Analyzer = (d) => {
  if (!d.hstsHeader) {
    return [
      {
        severity: 'issue',
        title: 'Brak nagłówka HSTS',
        detail: 'Dodaj Strict-Transport-Security, aby wymusić połączenia HTTPS',
      },
    ];
  }
  const { maxAge, includeSubDomains, preload } = parseHsts(String(d.hstsHeader));
  const out: ReturnType<Analyzer> = [];
  if (maxAge < MIN_MAX_AGE) {
    out.push({
      severity: 'warning',
      title: 'HSTS max-age krótsze niż rok',
      detail: `Obecne max-age wynosi ${maxAge} — zwiększ do ${MIN_MAX_AGE}, aby spełnić wymogi listy preload`,
    });
  }
  if (!includeSubDomains) {
    out.push({
      severity: 'warning',
      title: 'HSTS bez dyrektywy includeSubDomains',
      detail: 'Dodaj includeSubDomains, aby objąć ochroną także subdomeny',
    });
  }
  if (!preload) {
    out.push({
      severity: 'info',
      title: 'HSTS bez dyrektywy preload',
      detail: 'Dodaj preload, aby zakwalifikować domenę na listę HSTS Preload',
    });
  }
  if (d.compatible) out.push({ severity: 'pass', title: 'Zgodność z listą HSTS Preload' });
  return out;
};

export default hsts;
