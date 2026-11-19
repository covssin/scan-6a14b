import type { Analyzer } from '../types';

interface Sim {
  client?: { name?: string; version?: string };
  errorCode?: number;
}

const failures = (d: any): Sim[] => {
  if (!Array.isArray(d?.endpoints)) return [];
  const out: Sim[] = [];
  for (const e of d.endpoints) {
    const sims = e?.details?.sims?.results;
    if (!Array.isArray(sims)) continue;
    for (const s of sims) if (s?.errorCode && s.errorCode !== 0) out.push(s);
  }
  return out;
};

const tlsClientCompat: Analyzer = (d) => {
  const fails = failures(d);
  if (!fails.length) return [];
  const sample = fails
    .slice(0, 5)
    .map((s) => `${s.client?.name || 'klient'} ${s.client?.version || ''}`.trim())
    .join(', ');
  const more = fails.length > 5 ? ` (+${fails.length - 5} więcej)` : '';
  return [
    {
      severity: 'warning',
      title: `${fails.length} symulowanych klientów nie może nawiązać połączenia`,
      detail: `${sample}${more}. Dotyczy zwykle przestarzałych systemów i przeglądarek`,
    },
  ];
};

export default tlsClientCompat;
