import type { Check } from '.';

export default {
  title: 'Trackery i podmioty trzecie',
  categories: ['privacy', 'security'],
  summary: 'Narzędzia analityczne, sieci reklamowe i zewnętrzne skrypty ładowane przez stronę',
  description:
    'Analizuje zewnętrzne żądania wykonywane podczas ładowania strony i dopasowuje je do znanych baz trackerów oraz usług.',
  use:
    'Każdy zewnętrzny skrypt dowiaduje się o wizycie użytkownika i wykonuje kod w kontekście strony. ' +
    'Raport pozwala ocenić zakres śledzenia oraz zależność od zewnętrznych dostawców.',
  resources: [
    { title: 'Blacklight - Tracker Check', link: 'https://themarkup.org/series/blacklight' },
    { title: 'WhoTracks.me', link: 'https://www.ghostery.com/whotracksme' },
  ],
} satisfies Check;
