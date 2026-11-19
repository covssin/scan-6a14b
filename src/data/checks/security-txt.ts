import type { Check } from '.';

export default {
  title: 'Plik security.txt',
  categories: ['security'],
  summary: 'Informacje kontaktowe dla badaczy bezpieczeństwa zgodnie ze standardem RFC 9116',
  description:
    'Plik security.txt (zwykle pod adresem /.well-known/security.txt) wskazuje badaczom bezpieczeństwa ' +
    'kanał kontaktu do zgłaszania podatności, datę ważności pliku oraz opcjonalnie klucz PGP i politykę ujawniania.',
  use:
    'Brak jasnego kontaktu sprawia, że osoby wykrywające luki nie wiedzą, komu je zgłosić. ' +
    'Aktualny plik security.txt świadczy o dojrzałym podejściu organizacji do obsługi incydentów.',
  resources: [
    { title: 'securitytxt.org', link: 'https://securitytxt.org/' },
    {
      title: 'RFC-9116',
      link: 'https://datatracker.ietf.org/doc/html/rfc9116',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-securitytxt',
} satisfies Check;
