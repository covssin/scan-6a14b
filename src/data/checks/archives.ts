import type { Check } from '.';

export default {
  title: 'Historia archiwalna',
  categories: ['seo'],
  summary: 'Zmiany witryny na przestrzeni czasu według Wayback Machine',
  description:
    'Pobiera historię migawek strony z archiwum Internet Archive Wayback Machine, ' +
    'pokazując daty oraz częstotliwość jej zapisywania.',
  use:
    'Archiwum przechowuje dawną treść witryny. Stare zapisy pozwalają dotrzeć do usuniętych podstron, ' +
    'poprzednich właścicieli, cenników czy po cichu zmienianych informacji. Częstotliwość archiwizacji ' +
    'stanowi też pośredni wskaźnik popularności strony.',
  resources: [{ title: 'Wayback Machine', link: 'https://archive.org/web/' }],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-history',
} satisfies Check;
