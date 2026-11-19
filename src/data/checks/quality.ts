import type { Check } from '.';

export default {
  title: 'Metryki jakości (Lighthouse)',
  categories: ['seo', 'performance'],
  summary: 'Wyniki audytu Lighthouse dla wydajności, dostępności, SEO i dobrych praktyk',
  description:
    'Uruchamia audyt Google Lighthouse dla badanej strony i zwraca cztery główne oceny: wydajność, ' +
    'dostępność, dobre praktyki oraz SEO wraz ze szczegółowymi wskazówkami optymalizacyjnymi.',
  use:
    'Szybka ocena kondycji technicznej witryny — szczególnie audyty dostępności i SEO wskazują konkretne ' +
    'elementy możliwe do natychmiastowej poprawy.',
  resources: [
    { title: 'Dokumentacja Lighthouse', link: 'https://developer.chrome.com/docs/lighthouse/' },
    { title: 'Google PageSpeed Tools', link: 'https://developers.google.com/speed' },
    { title: 'Google Search Console', link: 'https://search.google.com/search-console' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-quality',
} satisfies Check;
