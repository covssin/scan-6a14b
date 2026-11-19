import type { Check } from '.';

export default {
  title: 'Reguły indeksowania (robots.txt)',
  categories: ['seo'],
  summary: 'Zasady dostępu opublikowane dla robotów wyszukiwarek oraz crawlerów AI',
  description:
    'Plik robots.txt w katalogu głównym domeny określa, które ścieżki mogą być odwiedzane przez roboty ' +
    'wyszukiwarek oraz boty indeksujące dla modeli AI. Moduł sprawdza również obecność pliku llms.txt.',
  use:
    'Wpisy Disallow w robots.txt często ujawniają istnienie niepublicznych ścieżek, takich jak panele ' +
    'administracyjne, środowiska testowe czy archiwalne katalogi.',
  resources: [
    {
      title: 'Dokumentacja Google Search - Robots.txt',
      link: 'https://developers.google.com/search/docs/advanced/robots/intro',
    },
    {
      title: 'RFC-9309 - Robots Exclusion Protocol',
      link: 'https://datatracker.ietf.org/doc/rfc9309/',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-robots',
} satisfies Check;
