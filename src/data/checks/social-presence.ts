import type { Check } from '.';

export default {
  title: 'Obecność w mediach społecznościowych',
  categories: ['security'],
  summary: 'Profile społecznościowe powiązane ze stroną oraz weryfikacja linków zwrotnych',
  description:
    'Wyszukuje konta w mediach społecznościowych wskazane w meta tagach, danych strukturalnych i linkach ' +
    'rel="me", a następnie sprawdza ich istnienie oraz obecność odnośnika zwrotnego do badanej witryny.',
  use:
    'Potwierdza autentyczność powiązania między stroną a profilami społecznościowymi. Strony phishingowe ' +
    'często linkują do oficjalnych kont marki, ale nie posiadają potwierdzenia zwrotnego.',
  resources: [
    { title: 'IndieWeb: rel-me', link: 'https://indieweb.org/rel-me' },
    {
      title: 'Weryfikacja linków w Mastodon',
      link: 'https://docs.joinmastodon.org/user/profile/#verification',
    },
    { title: 'Schema.org sameAs', link: 'https://schema.org/sameAs' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-social',
} satisfies Check;
