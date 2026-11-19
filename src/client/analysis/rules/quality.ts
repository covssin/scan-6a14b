import type { Analyzer, Severity } from '../types';

const LABELS: Record<string, string> = {
  performance: 'Wydajność',
  accessibility: 'Dostępność',
  'best-practices': 'Dobre praktyki',
  seo: 'SEO',
};

export const scoreSeverity = (score: number): Severity => {
  if (score >= 0.9) return 'pass';
  if (score >= 0.7) return 'info';
  if (score >= 0.5) return 'warning';
  return 'issue';
};

const quality: Analyzer = (d) => {
  const cats = d?.categories;
  if (!cats || typeof cats !== 'object') return [];
  const out: ReturnType<Analyzer> = [];
  for (const [key, label] of Object.entries(LABELS)) {
    const score = cats[key]?.score;
    if (typeof score !== 'number') continue;
    const pct = Math.round(score * 100);
    out.push({
      severity: scoreSeverity(score),
      title: `${label}: ${pct}/100`,
      detail:
        score < 0.9 ? `Lighthouse ocenił kategorię „${label}” poniżej zalecanego progu 90` : undefined,
    });
  }
  return out;
};

export default quality;
