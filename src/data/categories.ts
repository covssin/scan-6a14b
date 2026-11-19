export interface Category {
  label: string;
  icon: string;
  title: string;
  description: string;
  keywords: string;
  heading: [string, string, string];
  tagline: string;
  why: [string, string];
}

const all = {
  security: {
    label: 'Bezpieczeństwo',
    icon: 'shield',
    title: 'Audyt bezpieczeństwa strony',
    description:
      'Sprawdź certyfikaty TLS, nagłówki bezpieczeństwa HTTP, flagi plików cookie, ' +
      'DNSSEC, otwarte porty oraz obecność na listach zagrożeń.',
    keywords: 'bezpieczeństwo strony, audyt ssl, nagłówki http, skaner bezpieczeństwa, dnssec',
    heading: ['Audyt', 'bezpieczeństwa', 'strony'],
    tagline:
      'Certyfikaty, nagłówki, flagi plików cookie i otwarte porty — widziane oczami zewnętrznego obserwatora.',
    why: [
      'Większość parametrów bezpieczeństwa strony jest jawna. Certyfikaty, nagłówki odpowiedzi, flagi plików cookie ' +
        'oraz nasłuchujące porty są przekazywane każdemu, kto wyśle zapytanie — również osobom szukającym słabych punktów.',
      'Żaden z tych testów nie wymaga dostępu do zaplecza witryny. Jeśli te informacje są widoczne tutaj, ' +
        'są widoczne dla każdego w internecie.',
    ],
  },
  seo: {
    label: 'SEO',
    icon: 'search',
    title: 'Analiza SEO strony',
    description:
      'Sprawdź reguły indeksowania, mapę witryny (sitemap), tagi kanoniczne i społecznościowe, ' +
      'łańcuchy przekierowań, ranking globalny oraz historię archiwalną.',
    keywords: 'analiza seo, robots.txt, sitemap, tagi open graph, ranking strony, indeksowanie',
    heading: ['Analiza', 'SEO', 'strony'],
    tagline: 'Spójrz na stronę tak, jak widzi ją robot wyszukiwarki, a nie tylko przeglądarka.',
    why: [
      'Roboty wyszukiwarek widzą inną warstwę strony niż odwiedzający. Reguły w robots.txt, tagi kanoniczne, ' +
        'wpisy w mapie witryny czy znaczniki Open Graph nie renderują się na ekranie, więc błędy mogą pozostawać niezauważone przez miesiące.',
      'To właśnie warstwa techniczna, na której wrażenie „u mnie wygląda dobrze” przestaje wystarczać.',
    ],
  },
  server: {
    label: 'Serwer',
    icon: 'server',
    title: 'Analiza serwera WWW',
    description:
      'Sprawdź, gdzie hostowana jest strona, jakiego oprogramowania używa, jakie porty są otwarte ' +
      'oraz jaką trasą sieciową docierają do niej pakiety.',
    keywords: 'analiza serwera, sprawdzanie ip, otwarte porty, stos technologiczny, traceroute, hosting',
    heading: ['Analiza', 'serwera', 'WWW'],
    tagline: 'Dowiedz się, kto naprawdę hostuje witrynę i jakie usługi działają na maszynie.',
    why: [
      'Domena to tylko szyld. Za nią stoi fizyczny lub wirtualny serwer z systemem operacyjnym, ' +
        'oprogramowaniem WWW, zestawem otwartych portów oraz konkretną trasą sieciową.',
      'Większość tych informacji można ustalić z zewnątrz — często mówią one o infrastrukturze znacznie więcej niż sama treść strony.',
    ],
  },
  domain: {
    label: 'Domena',
    icon: 'globe',
    title: 'Analiza domeny i DNS',
    description:
      'Sprawdź dane rejestracji WHOIS, rekordy DNS i TXT, serwery nazw (NS), DNSSEC oraz ' +
      'subdomeny powiązane z dowolną nazwą domenową.',
    keywords: 'analiza domeny, whois, rekordy dns, serwery nazw, wyszukiwarka subdomen, dnssec',
    heading: ['Analiza', 'domeny', 'i DNS'],
    tagline:
      'Dane rejestracyjne, konfiguracja DNS oraz wszystkie subdomeny ujawnione w publicznych logach certyfikatów.',
    why: [
      'Każda domena zostawia ślad: kto i kiedy ją zarejestrował, jakie serwery nazw za nią odpowiadają, ' +
        'co publikuje w rekordach TXT i jakie subdomeny pojawiły się w logach Certificate Transparency.',
      'Daty rejestracji i współdzielone serwery DNS pozwalają odróżnić wieloletnią firmę od domeny uruchomionej wczoraj.',
    ],
  },
  email: {
    label: 'Poczta e-mail',
    icon: 'envelope',
    title: 'Konfiguracja poczty e-mail',
    description:
      'Sprawdź rekordy MX, polityki SPF, DKIM i DMARC, rekordy TXT oraz ' +
      'obecność domeny na listach blokujących DNS.',
    keywords: 'konfiguracja poczty, spf, dkim, dmarc, rekordy mx, dostarczalność e-mail',
    heading: ['Konfiguracja', 'poczty', 'e-mail'],
    tagline: 'Czy domena może bezpiecznie wysyłać wiadomości i czy nikt nie może podszyć się pod jej adres.',
    why: [
      'O dostarczalności poczty decydują rekordy opublikowane w DNS. Rekordy MX wskazują serwery odbierające pocztę, ' +
        'a SPF, DKIM i DMARC pozwalają odbiorcom zweryfikować, czy wiadomość naprawdę pochodzi od Ciebie.',
      'Błędna konfiguracja powoduje dwa problemy naraz: Twoje wiadomości trafiają do spamu, a podszycie się pod Twoją domenę staje się trywialne.',
    ],
  },
  performance: {
    label: 'Wydajność',
    icon: 'gauge',
    title: 'Wydajność strony WWW',
    description:
      'Zmierz szybkość strony za pomocą Lighthouse, sprawdź łańcuch przekierowań, czas odpowiedzi ' +
      'serwera oraz szacowany ślad węglowy.',
    keywords: 'wydajność strony, szybkość ładowania, lighthouse, przekierowania, ślad węglowy',
    heading: ['Wydajność', 'strony', 'WWW'],
    tagline: 'Ile czasu zajmuje załadowanie strony i jaki koszt zasobów generuje.',
    why: [
      'Opóźnienia się sumują. Każde przekierowanie, wolny czas pierwszego bajtu (TTFB) i każdy zbyt ciężki plik ' +
        'obciążają łącze oraz urządzenie odwiedzającego.',
      'Szacunek śladu węglowego pokazuje te same dane z innej perspektywy: ilość przesłanych bajtów pomnożoną przez liczbę odwiedzin.',
    ],
  },
  privacy: {
    label: 'Prywatność',
    icon: 'fingerprint',
    title: 'Prywatność na stronie WWW',
    description:
      'Sprawdź pliki cookie ustawiane przy wejściu, skrypty podmiotów trzecich, ' +
      'widoczność danych w WHOIS oraz reputację domeny.',
    keywords: 'prywatność strony, pliki cookie, wykrywanie trackerów, prywatność whois',
    heading: ['Prywatność', 'na stronie', 'WWW'],
    tagline: 'Co witryna zapisuje, ładuje i przekazuje dalej, zanim jeszcze wyrazisz na cokolwiek zgodę.',
    why: [
      'Zanim strona skończy się ładować, większość witryn zdąży ustawić pliki cookie, pobrać skrypty zewnętrznych dostawców ' +
        'i poinformować kilka firm o Twojej wizycie.',
      'Informacje wyciekają też na poziomie domeny — ochrona prywatności WHOIS jest albo włączona, albo dane właściciela są jawne.',
    ],
  },
} satisfies Record<string, Category>;

export type CategoryId = keyof typeof all;

export const categories: Record<CategoryId, Category> = all;

export const categoryIds = Object.keys(all) as CategoryId[];

export const toolName = (category: CategoryId): string => `Skaner: ${all[category].label}`;

export const isCategory = (value: string): value is CategoryId =>
  (categoryIds as string[]).includes(value);
