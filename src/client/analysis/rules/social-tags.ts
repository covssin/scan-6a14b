import type { Analyzer } from '../types';

export const REQUIRED: Array<[string, string]> = [
  ['ogTitle', 'OpenGraph Title'],
  ['ogDescription', 'OpenGraph Description'],
  ['ogImage', 'OpenGraph Image'],
  ['twitterCard', 'Twitter Card'],
];

const socialTags: Analyzer = (d) => {
  const missing = REQUIRED.filter(([k]) => !d[k]).map(([, l]) => l);
  if (!missing.length) return [{ severity: 'pass', title: 'Kompletne znaczniki udostępniania (Open Graph / Twitter)' }];
  return [
    {
      severity: 'warning',
      title: `Brakujące tagi społecznościowe: ${missing.length}`,
      detail: `Dodaj ${missing.join(', ')}, aby poprawić podgląd linków w social mediach`,
    },
  ];
};

export default socialTags;
