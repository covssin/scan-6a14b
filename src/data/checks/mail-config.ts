import type { Check } from '.';

export default {
  title: 'Konfiguracja poczty',
  categories: ['email'],
  summary: 'Rekordy MX, SPF, DKIM i DMARC odpowiedzialne za obsługę i bezpieczeństwo poczty',
  description:
    'Rekordy MX wskazują serwery odbierające pocztę, SPF określa uprawnionych nadawców, a DKIM publikuje klucz ' +
    'do weryfikacji podpisów wiadomości. DMARC instruuje serwery odbiorcze, co zrobić z pocztą niespełniającą wymogów ' +
    'SPF/DKIM. Moduł sprawdza także opcjonalne standardy BIMI, MTA-STS, DANE oraz TLS-RPT.',
  use:
    'Bez polityki DMARC ustawionej na quarantine lub reject każdy może wysyłać wiadomości podszywające się pod domenę ' +
    'w polu Nadawca (From). Błędy w rekordach SPF lub MX wpływają też bezpośrednio na dostarczalność własnej poczty.',
  resources: [
    {
      title: 'Wprowadzenie do DMARC, DKIM i SPF (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/',
    },
    {
      title: 'EasyDMARC Domain Scanner',
      link: 'https://easydmarc.com/tools/domain-scanner',
    },
    { title: 'MX Toolbox', link: 'https://mxtoolbox.com/' },
    { title: 'RFC-7208 - SPF', link: 'https://datatracker.ietf.org/doc/html/rfc7208' },
    { title: 'RFC-6376 - DKIM', link: 'https://datatracker.ietf.org/doc/html/rfc6376' },
    { title: 'RFC-7489 - DMARC', link: 'https://datatracker.ietf.org/doc/html/rfc7489' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-email',
} satisfies Check;
