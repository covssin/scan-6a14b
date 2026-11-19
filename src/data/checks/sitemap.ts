import type { Check } from '.';

export default {
  title: 'Mapa witryny (Sitemap)',
  categories: ['seo'],
  summary: 'Lista podstron udostępniona przez witrynę w pliku sitemap.xml',
  description:
    'Odszukuje i analizuje plik mapy witryny (sitemap), w którym właściciel serwisu wymienia adresy URL ' +
    'przeznaczone do indeksowania wraz z datami ostatniej modyfikacji.',
  use:
    'Pozwala szybko zweryfikować dostępność i poprawność mapy witryny oraz poznać pełną strukturę podstron ' +
    'bez konieczności ręcznego przeszukiwania serwisu.',
  resources: [
    {
      title: 'Dokumentacja Google Search - Mapy witryn',
      link: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview',
    },
    { title: 'Specyfikacja Sitemap XML', link: 'https://www.sitemaps.org/protocol.html' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-pages',
} satisfies Check;
