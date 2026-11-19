import type { Analyzer, Result } from '../types';

export const checkHops = (chain: string[]): Result | null => {
  const hops = chain.length - 1;
  if (hops >= 4) {
    return {
      severity: 'warning',
      title: `Długi łańcuch przekierowań: ${hops} skoków`,
      detail: 'Skróć pośrednie przekierowania, aby zmniejszyć opóźnienia',
    };
  }
  return hops > 0 ? { severity: 'info', title: `Liczba przekierowań: ${hops}` } : null;
};

export const checkHttps = (chain: string[]): Result | null => {
  if (!/^http:\/\//i.test(chain[0])) return null;
  if (/^https:\/\//i.test(chain[chain.length - 1])) {
    return { severity: 'pass', title: 'Żądania HTTP są przekierowywane na HTTPS' };
  }
  return {
    severity: 'critical',
    title: 'Witryna nie wymusza przekierowania na HTTPS',
    detail: 'Skonfiguruj stałe przekierowanie 301 z http:// na https://',
  };
};

const redirects: Analyzer = (d) => {
  const chain: string[] = Array.isArray(d?.redirects)
    ? d.redirects.filter((u: unknown) => typeof u === 'string')
    : [];
  if (!chain.length) return [];
  return [checkHops(chain), checkHttps(chain)].filter((r) => r !== null);
};

export default redirects;
