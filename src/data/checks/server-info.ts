import type { Check } from '.';

export default {
  title: 'Informacje o serwerze',
  categories: ['server'],
  summary: 'Oprogramowanie serwera, numer ASN oraz sieć, w której działa host',
  description:
    'Zbiera dostępne informacje o samej maszynie: oprogramowanie serwera WWW, dostawcę hostingu, ' +
    'numer systemu autonomicznego (ASN) oraz organizację zarządzającą pulą adresową.',
  use:
    'Numer ASN pozwala precyzyjnie ustalić operatora sieci stojącego za hostingiem witryny oraz ' +
    'zidentyfikować pozostałe zakresy adresowe tej infrastruktury.',
  resources: [
    'https://en.wikipedia.org/wiki/List_of_HTTP_header_fields',
    'https://en.wikipedia.org/wiki/Autonomous_system_(Internet)',
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-server',
} satisfies Check;
