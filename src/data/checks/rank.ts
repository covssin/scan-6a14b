import type { Check } from '.';

export default {
  title: 'Ranking globalny',
  categories: ['seo'],
  summary: 'Pozycja domeny w rankingu Tranco (jeśli znajduje się w globalnym milionie)',
  description:
    'Sprawdza pozycję domeny na liście Tranco, która łączy dane z Umbrella, Majestic, Quantcast, ' +
    'Chrome UX Report oraz Cloudflare Radar w stabilny ranking miliona najpopularniejszych witryn.',
  use:
    'Pozwala oszacować skalę ruchu i rozpoznawalność domeny na tle innych serwisów.',
  resources: [
    { title: 'Lista Tranco', link: 'https://tranco-list.eu/' },
    {
      title: 'Publikacja naukowa Tranco',
      link: 'https://tranco-list.eu/assets/tranco-ndss19.pdf',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-rank',
} satisfies Check;
