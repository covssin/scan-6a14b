import type { Check } from '.';

export default {
  title: 'Zrzut ekranu',
  categories: ['seo'],
  summary: 'Podgląd wyrenderowanej strony tak, jak widzi ją przeglądarka',
  description: 'Renderuje badaną stronę w przeglądarce bez interfejsu graficznego (headless) i zwraca obraz.',
  use:
    'Pokazuje, jak strona wygląda dla niezalogowanego użytkownika z innej sieci — przydatne, gdy witryna ' +
    'zachowuje się inaczej dla różnych odwiedzających lub gdy wolisz nie otwierać nieznanego linku lokalnie.',
  resources: [],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-screenshot',
} satisfies Check;
