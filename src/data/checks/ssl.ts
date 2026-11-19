import type { Check } from '.';

export default {
  title: 'Certyfikat SSL',
  categories: ['server', 'security'],
  summary: 'Wystawca certyfikatu, daty ważności oraz łańcuch zaufania',
  description:
    'Certyfikat SSL/TLS potwierdza tożsamość serwera i umożliwia szyfrowane połączenia HTTPS. ' +
    'Moduł prezentuje wystawcę certyfikatu, daty ważności, objęte nazwy domenowe (SAN) oraz cały łańcuch zaufania.',
  use:
    'Pozwala kontrolować termin wygaśnięcia certyfikatu oraz sprawdzić listę alternatywnych nazw domenowych ' +
    '(SAN), która często ujawnia powiązane subdomeny.',
  resources: [
    {
      title: 'TLS - Wiki',
      link: 'https://en.wikipedia.org/wiki/Transport_Layer_Security',
    },
    {
      title: 'Czym jest SSL (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/ssl/what-is-ssl/',
    },
    { title: 'RFC-8446 - TLS', link: 'https://tools.ietf.org/html/rfc8446' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-ssl',
} satisfies Check;
