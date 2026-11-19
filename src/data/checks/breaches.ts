import type { Check } from '.';

export default {
  title: 'Wycieki danych',
  categories: ['security', 'privacy'],
  summary: 'Znane wycieki danych powiązane z domeną według bazy Have I Been Pwned',
  description:
    'Wyszukuje historyczne wycieki danych powiązane z badaną domeną w bazie Have I Been Pwned. ' +
    'Pokazuje liczbę poszkodowanych kont, datę incydentu oraz rodzaj ujawnionych informacji.',
  use:
    'Jeśli serwis ujawnił w przeszłości dane użytkowników, a posiadałeś tam konto, należy założyć, ' +
    'że użyte wówczas dane i hasła krążą w sieci.',
  resources: [{ title: 'HIBP - Pwned Websites', link: 'https://haveibeenpwned.com/PwnedWebsites' }],
} satisfies Check;
