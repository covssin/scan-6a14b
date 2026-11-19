import type { Check } from '.';

export default {
  title: 'Pliki cookie',
  categories: ['security', 'privacy'],
  summary: 'Pliki cookie zapisywane przy wejściu na stronę oraz ich flagi bezpieczeństwa',
  description:
    'Pliki cookie to niewielkie fragmenty danych zapisywane przez przeglądarkę na żądanie serwera. ' +
    'Przechowują stan sesji, preferencje użytkownika oraz identyfikatory śledzące.',
  use:
    'To, jakie ciasteczka strona zapisuje przed jakąkolwiek interakcją, mówi wiele o jej architekturze. ' +
    'Flagi Secure, HttpOnly oraz SameSite pokazują, jak dobrze sesja jest chroniona przed kradzieżą i atakami CSRF.',
  resources: [
    {
      title: 'Dokumentacja HTTP Cookies (MDN)',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
    },
    {
      title: 'Czym są pliki cookie (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/privacy/what-are-cookies/',
    },
    {
      title: 'Testowanie atrybutów Cookie (OWASP)',
      link: 'https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes',
    },
    { title: 'RFC-6265 - Cookies', link: 'https://tools.ietf.org/html/rfc6265' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-cookies',
} satisfies Check;
