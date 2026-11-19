import type { Check } from '.';

export default {
  title: 'Trasa pakietów (Traceroute)',
  categories: ['server'],
  summary: 'Ścieżka sieciowa pokonywana przez pakiety w drodze do serwera',
  description:
    'Śledzi kolejne węzły sieciowe (routery) na trasie do serwera docelowego wraz z czasem odpowiedzi ' +
    'dla każdego etapu.',
  use:
    'Umożliwia identyfikację sieci tranzytowych, obecności warstw pośredniczących (np. CDN) oraz ' +
    'miejsc powstawania opóźnień sieciowych.',
  resources: [
    'https://www.cloudflare.com/learning/network-layer/what-is-mtr/',
    'https://en.wikipedia.org/wiki/Traceroute',
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-trace-route',
} satisfies Check;
