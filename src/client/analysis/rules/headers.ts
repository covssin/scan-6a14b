import type { Analyzer } from '../types';

export const LEAK_HEADERS = ['x-powered-by', 'server', 'x-aspnet-version', 'x-aspnetmvc-version'];

const headers: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  for (const key of LEAK_HEADERS) {
    const val = d[key];
    if (val) {
      out.push({
        severity: 'info',
        title: `Serwer ujawnia nagłówek ${key}`,
        detail: `Wartość: ${String(val).slice(0, 80)}`,
      });
    }
  }
  return out;
};

export default headers;
