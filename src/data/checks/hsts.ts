import type { Check } from '.';

export default {
  title: 'HSTS',
  categories: ['security'],
  summary: 'Czy przeglądarki mają nakaz łączenia się wyłącznie przez HTTPS',
  description:
    'HSTS to nagłówek odpowiedzi nakazujący przeglądarce nawiązywać połączenia z domeną wyłącznie przez HTTPS ' +
    'przez określony czas. Witryny spełniające wymogi mogą trafić na listę HSTS Preload wbudowaną w przeglądarki.',
  use:
    'Bez HSTS pierwsze żądanie użytkownika często odbywa się po nieszyfrowanym HTTP i może zostać przechwycone ' +
    'przed przekierowaniem. HSTS blokuje także możliwość zignorowania ostrzeżenia o błędnym certyfikacie.',
  resources: [
    'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
    'https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html',
    'https://hstspreload.org/',
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-hsts',
} satisfies Check;
