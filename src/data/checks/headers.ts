import type { Check } from '.';

export default {
  title: 'Nagłówki HTTP',
  categories: ['server', 'security'],
  summary: 'Wszystkie nagłówki odpowiedzi HTTP zwracane przez serwer',
  description:
    'Nagłówki HTTP to pary klucz–wartość wysyłane przez serwer przed właściwą treścią strony. ' +
    'Określają reguły pamięci podręcznej, typ zawartości, kompresję, polityki bezpieczeństwa oraz informacje o oprogramowaniu.',
  use:
    'Nagłówki często ujawniają oprogramowanie serwera, sieć CDN, framework czy load balancer. ' +
    'Brakujące nagłówki bezpieczeństwa mówią równie dużo, co te obecne.',
  resources: [
    {
      title: 'Nagłówki HTTP - MDN',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers',
    },
    {
      title: 'RFC-7231 Sekcja 7 - Nagłówki',
      link: 'https://datatracker.ietf.org/doc/html/rfc7231#section-7',
    },
    {
      title: 'OWASP Secure Headers Project',
      link: 'https://owasp.org/www-project-secure-headers/',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-headers',
} satisfies Check;
