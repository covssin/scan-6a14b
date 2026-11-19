import type { Check } from '.';

export default {
  title: 'Listy blokujące DNS',
  categories: ['security', 'email'],
  summary: 'Czy resolvery chroniące przed malware, reklamami lub treściami dla dorosłych blokują witrynę',
  description:
    'Odpytuje domenę przez kilkanaście publicznych resolverów DNS filtrujących ruch: ' +
    'blokery reklam i trackerów, filtry złośliwego oprogramowania oraz kontrolę rodzicielską.',
  use:
    'Blokada na filtrującym serwerze DNS nie zawsze oznacza zagrożenie, ale sprawia, że część ' +
    'użytkowników nie może otworzyć strony. Właściciele rzadko o tym wiedzą, ponieważ z wewnątrz ' +
    'sieci blokada jest niewidoczna.',
  resources: [
    {
      title: 'DNS-based Blocklists (Wikipedia)',
      link: 'https://en.wikipedia.org/wiki/DNS_blocking',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-blocks',
} satisfies Check;
