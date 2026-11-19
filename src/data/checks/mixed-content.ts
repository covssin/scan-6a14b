import type { Check } from '.';

export default {
  title: 'Mieszana zawartość i SRI',
  categories: ['security'],
  summary: 'Nieszyfrowane zasoby na stronie oraz zewnętrzne skrypty bez kontroli integralności SRI',
  description:
    'Mieszana zawartość (Mixed Content) to zasoby pobierane po zwykłym HTTP wewnątrz strony HTTPS. ' +
    'Subresource Integrity (SRI) to skrót kryptograficzny w znaczniku skryptu lub stylu, gwarantujący, ' +
    'że przeglądarka uruchomi wyłącznie niezmodyfikowany plik.',
  use:
    'Skrypt pobrany przez HTTP może zostać podmieniony w sieci, przejmując pełną kontrolę nad stroną. ' +
    'Z kolei SRI chroni przed sytuacją, w której zewnętrzny dostawca skryptu zostanie zhakowany i zacznie serwować złośliwy kod.',
  resources: [
    {
      title: 'Mixed Content (MDN)',
      link: 'https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content',
    },
    {
      title: 'Subresource Integrity (MDN)',
      link: 'https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity',
    },
    { title: 'SRI Hash Generator', link: 'https://srihash.org/' },
  ],
} satisfies Check;
