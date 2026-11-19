import type { Check } from '.';

export default {
  title: 'Odnośniki na stronie',
  categories: ['seo'],
  summary: 'Linki wewnętrzne i zewnętrzne znalezione w znacznikach strony',
  description:
    'Zbiera wszystkie odnośniki ze znaczników kotwicy na badanej stronie i dzieli je na linki wewnętrzne ' +
    'oraz prowadzące do domen zewnętrznych.',
  use:
    'Linki wewnętrzne obrazują strukturę serwisu, a zewnętrzne pokazują, dokąd witryna kieruje odwiedzających — ' +
    'co pomaga także wykryć ewentualne wstrzyknięte linki spamowe.',
  resources: [{ title: 'W3C Link Checker', link: 'https://validator.w3.org/checklink' }],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-links',
} satisfies Check;
