import type { Check } from '.';

export default {
  title: 'Audyt bezpieczeństwa TLS',
  categories: ['security'],
  summary: 'Ocena konfiguracji TLS według Qualys SSL Labs oraz test znanych podatności',
  description:
    'Podsumowuje konfigurację TLS serwera na podstawie analizy SSL Labs: ogólną ocenę literową, ' +
    'wsparcie Forward Secrecy oraz podatność na znane ataki takie jak Heartbleed, POODLE, ROBOT, FREAK czy DROWN.',
  use:
    'Pozwala szybko wykryć słabe szyfry lub znane luki protokołu wymagające aktualizacji konfiguracji serwera.',
  resources: [
    { title: 'SSL Test (SSL Labs)', link: 'https://www.ssllabs.com/ssltest/' },
    {
      title: 'Przewodnik oceniania SSL Labs',
      link: 'https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-tls-sec',
} satisfies Check;
