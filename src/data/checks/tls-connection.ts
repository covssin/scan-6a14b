import type { Check } from '.';

export default {
  title: 'Połączenie TLS',
  categories: ['server', 'security'],
  summary: 'Obsługiwane wersje protokołu TLS oraz parametry wynegocjowanego szyfrowania',
  description:
    'Nawiązuje bezpośrednie połączenie TLS z serwerem i sprawdza faktycznie wynegocjowaną wersję ' +
    'protokołu, zestaw szyfrów, obsługę ALPN oraz poprawność łańcucha certyfikatów.',
  use:
    'Pozwala zweryfikować w praktyce, czy serwer prawidłowo wyłączył przestarzałe protokoły TLS 1.0/1.1 ' +
    'i obsługuje nowoczesny standard TLS 1.3.',
  resources: [
    {
      title: 'Jak działa uzgadnianie TLS (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-tls-cipher',
} satisfies Check;
