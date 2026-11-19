import type { Check } from '.';

export default {
  title: 'Ślad węglowy',
  categories: ['seo', 'performance'],
  summary: 'Szacowana emisja CO2 wynikająca z ilości danych przesyłanych przy ładowaniu strony',
  description:
    'Szacuje ślad węglowy pojedynczego załadowania strony na podstawie objętości przesyłanych danych ' +
    'oraz uśrednionego zużycia energii przez centra danych, sieci przesyłowe i urządzenia użytkowników.',
  use:
    'Jest to bezpośrednie odzwierciedlenie wagi strony, więc poprawa wydajności automatycznie obniża wynik. ' +
    'Stanowi konkretny argument przy optymalizacji nadmiarowych skryptów i multimediów.',
  resources: [
    {
      title: 'WebsiteCarbon - Kalkulator śladu węglowego',
      link: 'https://www.websitecarbon.com/',
    },
    {
      title: 'The Green Web Foundation',
      link: 'https://www.thegreenwebfoundation.org/',
    },
    { title: 'The Eco Friendly Web Alliance', link: 'https://ecofriendlyweb.org/' },
    { title: 'Reset.org', link: 'https://en.reset.org/' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-carbon',
} satisfies Check;
