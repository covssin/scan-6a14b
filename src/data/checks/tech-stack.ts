import type { Check } from '.';

export default {
  title: 'Stos technologiczny',
  categories: ['server', 'privacy'],
  summary: 'Frameworki, systemy CMS, analityka i usługi wykryte na stronie',
  description:
    'Analizuje kod strony, nagłówki, ścieżki skryptów i nazwy plików cookie przy użyciu sygnatur ' +
    'Wappalyzer w celu identyfikacji zastosowanych technologii.',
  use:
    'Znajomość używanego systemu CMS, bibliotek i zewnętrznych usług pomaga ocenić powierzchnię ataku, ' +
    'zweryfikować aktualność oprogramowania oraz zidentyfikować dostawców przetwarzających dane.',
  resources: [
    {
      title: 'Sygnatury Wappalyzer',
      link: 'https://github.com/enthec/webappanalyzer/tree/main/src/technologies',
    },
    {
      title: 'BuiltWith',
      link: 'https://builtwith.com/',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-tech',
} satisfies Check;
