import type { Check } from '.';

export default {
  title: 'Tagi społecznościowe i meta',
  categories: ['seo'],
  summary: 'Znaczniki Open Graph oraz Twitter Card używane przy udostępnianiu linku',
  description:
    'Odczytuje znaczniki meta określające sposób prezentacji strony w wyszukiwarkach i mediach ' +
    'społecznościowych: tytuł, opis, obraz podglądu, autora, adres kanoniczny i powiązane konta.',
  use:
    'Pozwala sprawdzić, jak witryna prezentuje się po udostępnieniu linku na Facebooku, LinkedInie, X ' +
    'czy w komunikatorach, oraz czy poprawnie ustawiono adres kanoniczny.',
  resources: [
    { title: 'Open Graph Protocol', link: 'https://ogp.me/' },
    {
      title: 'Facebook Open Graph Docs',
      link: 'https://developers.facebook.com/docs/sharing/webmasters',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-social',
} satisfies Check;
