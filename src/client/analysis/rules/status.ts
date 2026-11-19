import type { Analyzer, Result } from '../types';
import { formatNumber } from 'client/utils/format';

const SLOW_MS = 2000;
const VERY_SLOW_MS = 5000;

export const checkResponseTime = (ms: number): Result | null => {
  if (ms >= VERY_SLOW_MS) {
    return {
      severity: 'warning',
      title: `Wolny czas odpowiedzi serwera: ${formatNumber(ms, { digits: 0 })} ms`,
      detail: 'Sprawdź wydajność serwera, mechanizmy cache lub konfigurację CDN',
    };
  }
  if (ms >= SLOW_MS) {
    return { severity: 'info', title: `Czas odpowiedzi powyżej ${formatNumber(SLOW_MS)} ms` };
  }
  return null;
};

const status: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  const code = Number(d.responseCode);
  if (Number.isFinite(code)) {
    out.push({ severity: 'pass', title: `Strona odpowiedziała kodem HTTP ${code}` });
  }
  const slow = checkResponseTime(Number(d.responseTime));
  if (slow) out.push(slow);
  return out;
};

export default status;
