import type { CheckId } from '@/data/checks';

export interface Term {
  title: string;
  check?: CheckId;
  definition: string;
  pass?: string;
  fail?: string;
}

const certificates = {
  'certificate-authority': {
    title: 'Urząd certyfikacji (CA)',
    check: 'ssl',
    definition:
      "Organizacja (np. Let's Encrypt), której przeglądarki ufają w kwestii wystawiania certyfikatów. Przed wydaniem certyfikatu weryfikuje kontrolę nad domeną.",
  },
  'certificate-trust': {
    title: 'Zaufanie certyfikatu',
    check: 'ssl',
    definition:
      'Informacja, czy certyfikat jest ważny dla danej nazwy hosta i został wystawiony przez zaufany urząd certyfikacji.',
    pass: 'Przeglądarki ufają temu certyfikatowi, dzięki czemu użytkownicy łączą się bezpiecznie bez ostrzeżeń.',
    fail: 'Przeglądarki wyświetlają odwiedzającym pełnoekranowe ostrzeżenie bezpieczeństwa zamiast strony.',
  },
  'certificate-expiry': {
    title: 'Wygaśnięcie certyfikatu',
    check: 'ssl',
    definition:
      'Certyfikaty zachowują ważność wyłącznie do określonej daty, po której przeglądarki przestają je akceptować.',
    fail: 'Odnów certyfikat jak najszybciej, w przeciwnym razie odwiedzający zobaczą ostrzeżenie bezpieczeństwa.',
  },
  'subject-alternative-names': {
    title: 'Alternatywne nazwy podmiotu (SAN)',
    check: 'ssl',
    definition:
      'Lista nazw domenowych objętych jednym certyfikatem. Jeśli adres strony nie znajduje się na tej liście, przeglądarka wyświetli ostrzeżenie.',
  },
  'certificate-fingerprint': {
    title: 'Odcisk palca certyfikatu (Fingerprint)',
    check: 'ssl',
    definition:
      'Skrót kryptograficzny całego certyfikatu. Identyczne odciski palca oznaczają dokładnie ten sam certyfikat.',
  },
  'certificate-transparency': {
    title: 'Certificate Transparency (CT)',
    check: 'tls-security-audit',
    definition:
      'Publiczne rejestry wszystkich wydanych certyfikatów, pozwalające wykryć certyfikaty wystawione omyłkowo lub przez atakującego.',
    fail: 'Przeglądarki Chrome i Safari wymagają dowodu wpisu do logów CT, więc mogą odrzucić ten certyfikat.',
  },
  caa: {
    title: 'Rekordy CAA',
    check: 'caa-records',
    definition:
      'Rekordy DNS określające, które urzędy certyfikacji mają prawo wystawiać certyfikaty dla danej domeny.',
  },
} satisfies Record<string, Term>;

const tls = {
  https: {
    title: 'HTTPS',
    check: 'tls-connection',
    definition:
      'Bezpieczna wersja protokołu HTTP. Przesyła strony szyfrowanym połączeniem, uniemożliwiając ich podsłuchanie lub modyfikację w sieci.',
  },
  tls: {
    title: 'TLS i SSL',
    check: 'tls-connection',
    definition:
      'Protokoły szyfrujące stojące za HTTPS. SSL to starszy poprzednik wycofany lata temu, choć jego nazwa przetrwała w określeniu „certyfikat SSL”.',
  },
  handshake: {
    title: 'Uzgadnianie TLS (Handshake)',
    check: 'tls-connection',
    definition:
      'Pierwsze komunikaty bezpiecznego połączenia, podczas których przeglądarka i serwer uzgadniają parametry szyfrowania, wymieniają klucze i weryfikują certyfikat.',
  },
  'cipher-suite': {
    title: 'Zestaw szyfrów (Cipher Suite)',
    check: 'tls-connection',
    definition:
      'Kombinacja algorytmów używanych do szyfrowania i ochrony połączenia, ustalana podczas uzgadniania TLS. Starsze zestawy mają znane słabości.',
  },
  'tls-version': {
    title: 'Wersja protokołu TLS',
    check: 'tls-connection',
    definition:
      'Wersja protokołu TLS użyta w połączeniu. Nowsze wersje są szybsze i eliminują słabe algorytmy szyfrowania.',
    pass: 'TLS 1.3 to najnowsza wersja zapewniająca najszybsze i najsilniejsze szyfrowanie.',
    fail: 'To nie jest najnowsza wersja. TLS 1.3 jest szybszy, a TLS 1.0 i 1.1 zawierają znane luki bezpieczeństwa.',
  },
  'tls-1-3': {
    title: 'TLS 1.3',
    check: 'tls-connection',
    definition: 'Najnowsza wersja protokołu TLS oferująca krótsze uzgadnianie połączenia i wyłącznie silne szyfry.',
    fail: 'Brak obsługi TLS 1.3 oznacza wolniejsze i mniej bezpieczne połączenia dla odwiedzających.',
  },
  'legacy-tls': {
    title: 'TLS 1.0 i 1.1',
    check: 'tls-connection',
    definition:
      'Przestarzałe wersje protokołu TLS ze znanymi lukami, wycofane ze wszystkich głównych przeglądarek w 2020 roku.',
    pass: 'Wyłączone — połączeń nie można zdegradować do tych słabszych wersji.',
    fail: 'Nadal włączone, co naraża połączenia na ataki typu downgrade. Zaleca się ich wyłączenie.',
  },
  'ssl-labs-grade': {
    title: 'Ocena SSL Labs',
    check: 'tls-security-audit',
    definition: 'Ogólna ocena konfiguracji HTTPS serwera według Qualys SSL Labs w skali od A+ do F.',
    fail: 'Ocena poniżej A oznacza, że część konfiguracji HTTPS wymaga poprawy.',
  },
  'forward-secrecy': {
    title: 'Utajnianie z wyprzedzeniem (Forward Secrecy)',
    check: 'tls-connection',
    definition:
      'Każda sesja otrzymuje własny klucz tymczasowy, dzięki czemu późniejsza kradzież klucza prywatnego serwera nie pozwala odszyfrować wcześniejszego ruchu.',
    fail: 'W przypadku kradzieży klucza prywatnego serwera zarejestrowany wcześniej ruch mógłby zostać odszyfrowany.',
  },
  'session-resumption': {
    title: 'Wznawianie sesji TLS',
    check: 'tls-connection',
    definition:
      'Powracający użytkownicy mogą ponownie wykorzystać wcześniejszą bezpieczną sesję, pomijając część procesu uzgadniania.',
  },
  'ocsp-stapling': {
    title: 'OCSP Stapling',
    check: 'tls-connection',
    definition:
      'Serwer dołącza podpisany dowód, że jego certyfikat nie został unieważniony, dzięki czemu przeglądarka nie musi odpytywać wystawcy.',
    fail: 'Przeglądarki mogą bezpośrednio pytać wystawcę certyfikatu, co wydłuża czas połączenia i ujawnia odwiedzane witryny.',
  },
  http2: {
    title: 'HTTP/2',
    check: 'tls-connection',
    definition: 'Szybsza wersja protokołu HTTP umożliwiająca równoległe pobieranie wielu zasobów w ramach jednego połączenia.',
  },
  alpn: {
    title: 'ALPN',
    check: 'tls-connection',
    definition:
      'Pozwala przeglądarce i serwerowi uzgodnić protokół aplikacji (np. HTTP/2) już podczas uzgadniania TLS, oszczędzając dodatkową rundę komunikacji.',
  },
  renegotiation: {
    title: 'Renegocjacja TLS',
    check: 'tls-security-audit',
    definition:
      'Umożliwia zmianę parametrów szyfrowania w trakcie trwania sesji. Bezpieczna jest wyłącznie tzw. bezpieczna renegocjacja.',
    fail: 'Niezabezpieczona renegocjacja pozwala atakującemu wstrzyknąć własne dane na początku połączenia.',
  },
  'fallback-scsv': {
    title: 'Fallback SCSV',
    check: 'tls-security-audit',
    definition: 'Mechanizm uniemożliwiający atakującym wymuszenie połączenia przy użyciu starszej, słabszej wersji TLS.',
  },
  chacha20: {
    title: 'ChaCha20',
    check: 'tls-security-audit',
    definition:
      'Szyfr działający szybciej niż AES na smartfonach i urządzeniach pozbawionych sprzętowej akceleracji AES.',
  },
  aead: {
    title: 'Szyfry AEAD',
    check: 'tls-security-audit',
    definition:
      'Nowoczesne szyfry (np. AES-GCM i ChaCha20), które jednocześnie szyfrują dane i weryfikują ich integralność, eliminując całą klasę ataków.',
    fail: 'Brak szyfrów AEAD zmusza połączenia do korzystania ze starszych algorytmów o znanych słabościach.',
  },
  'cbc-ciphers': {
    title: 'Szyfry CBC',
    check: 'tls-security-audit',
    definition: 'Starszy tryb szyfrowania blokowego podatny na ataki takie jak POODLE czy Lucky 13.',
    pass: 'Wyłączone — połączenia korzystają wyłącznie z nowoczesnych szyfrów.',
    fail: 'Nadal udostępniane dla bardzo starych urządzeń, choć nowoczesne przeglądarki ich nie potrzebują.',
  },
  'tls-compression': {
    title: 'Kompresja TLS',
    check: 'tls-security-audit',
    definition:
      'Kompresowanie danych przed ich zaszyfrowaniem — mechanizm wykorzystywany w ataku CRIME do kradzieży plików cookie.',
    fail: 'Wyłącz kompresję TLS, ponieważ naraża witrynę na atak CRIME.',
  },
  'key-exchange-reuse': {
    title: 'Ponowne użycie wymiany kluczy',
    check: 'tls-security-audit',
    definition:
      'Wielokrotne używanie tych samych tymczasowych parametrów wymiany kluczy w różnych sesjach, co osłabia Forward Secrecy.',
  },
  'weak-dh-primes': {
    title: 'Słabe liczby pierwsze Diffie-Hellmana',
    check: 'tls-security-audit',
    definition:
      'Powszechnie stosowane, zbyt krótkie grupy Diffie-Hellmana, które zaawansowany atakujący może złamać.',
  },
  'client-compatibility': {
    title: 'Kompatybilność klientów TLS',
    check: 'tls-client-compat',
    definition: 'Informacja, czy dana przeglądarka lub system potrafi nawiązać bezpieczne połączenie z witryną.',
    fail: 'Ten klient nie może się połączyć. Zwykle dotyczy to bardzo starych systemów, ale warto upewnić się, że nie korzystają z nich Twoi odbiorcy.',
  },
} satisfies Record<string, Term>;

const tlsVulnerabilities = {
  'downgrade-attack': {
    title: 'Atak downgrade',
    check: 'tls-security-audit',
    definition:
      'Podstępne wymuszenie użycia starszego, słabszego protokołu lub szyfru, aby ułatwić złamanie szyfrowania.',
  },
  'padding-oracle': {
    title: 'Padding Oracle',
    check: 'tls-security-audit',
    definition:
      'Błąd polegający na tym, że serwer inaczej odpowiada na błędnie dopełnione bloki danych. Wysyłając tysiące zmodyfikowanych pakietów, atakujący może odszyfrować ruch.',
  },
  heartbleed: {
    title: 'Heartbleed',
    check: 'tls-security-audit',
    definition:
      'Krytyczny błąd w starych wersjach OpenSSL pozwalający na zdalny odczyt pamięci serwera, w tym kluczy prywatnych i haseł.',
  },
  poodle: {
    title: 'POODLE',
    check: 'tls-security-audit',
    definition:
      'Atak na protokół SSL 3.0 umożliwiający odszyfrowanie danych bajt po bajcie. Rozwiązaniem jest wyłączenie SSL 3.0.',
  },
  'poodle-tls': {
    title: 'POODLE (TLS)',
    check: 'tls-security-audit',
    definition:
      'Wariant ataku POODLE skuteczny wobec serwerów TLS, które nieprawidłowo weryfikują dopełnienie bloków.',
  },
  'zombie-poodle': {
    title: 'Zombie POODLE',
    check: 'tls-security-audit',
    definition:
      'Podatność typu padding oracle w niektórych implementacjach serwerów przywracająca ataki klasy POODLE na szyfry CBC.',
  },
  goldendoodle: {
    title: 'GOLDENDOODLE',
    check: 'tls-security-audit',
    definition:
      'Szybszy atak typu padding oracle na szyfry CBC wykryty w niektórych zaporach sieciowych i load balancerach.',
  },
  'sleeping-poodle': {
    title: 'Sleeping POODLE',
    check: 'tls-security-audit',
    definition: 'Kolejny wariant podatności padding oracle na szyfry CBC występujący w niektórych urządzeniach sieciowych.',
  },
  'zero-length-padding-oracle': {
    title: 'Zero-Length Padding Oracle',
    check: 'tls-security-audit',
    definition:
      'Luka w OpenSSL (CVE-2019-1559) pozwalająca atakującemu odszyfrować ruch chroniony szyframi CBC.',
  },
  freak: {
    title: 'FREAK',
    check: 'tls-security-audit',
    definition:
      'Wymusza użycie celowo osłabionego szyfrowania eksportowego z lat 90., które można złamać w kilka godzin.',
  },
  logjam: {
    title: 'Logjam',
    check: 'tls-security-audit',
    definition: 'Obniża poziom wymiany kluczy do słabych grup Diffie-Hellmana podatnych na złamanie.',
  },
  drown: {
    title: 'DROWN',
    check: 'tls-security-audit',
    definition:
      'Wykorzystuje inny serwer obsługujący przestarzały protokół SSL 2.0 z tym samym kluczem do odszyfrowania nowoczesnego ruchu TLS.',
  },
  'ccs-injection': {
    title: 'CCS Injection',
    check: 'tls-security-audit',
    definition:
      'Błąd w OpenSSL (CVE-2014-0224) umożliwiający atakującemu wymuszenie słabych kluczy sesji i podsłuch ruchu.',
  },
  'openssl-padding-oracle': {
    title: 'OpenSSL Padding Oracle',
    check: 'tls-security-audit',
    definition: 'Błąd w OpenSSL (CVE-2016-2107) pozwalający atakującemu odszyfrować ruch AES-CBC.',
  },
  robot: {
    title: 'ROBOT',
    check: 'tls-security-audit',
    definition:
      'Odnowiony atak na wymianę kluczy RSA pozwalający odszyfrować ruch lub podpisywać wiadomości kluczem serwera.',
  },
  ticketbleed: {
    title: 'Ticketbleed',
    check: 'tls-security-audit',
    definition: 'Luka w niektórych urządzeniach F5 powodująca wyciek fragmentów pamięci poprzez bilety sesji TLS.',
  },
} satisfies Record<string, Term>;

const hsts = {
  'strict-transport-security': {
    title: 'HSTS',
    check: 'hsts',
    definition:
      'Nakazuje przeglądarkom łączyć się ze stroną wyłącznie przez HTTPS, chroniąc przed degradacją do nieszyfrowanego HTTP.',
    pass: 'Przeglądarki, które już odwiedziły tę witrynę, zawsze będą łączyć się z nią przez HTTPS.',
    fail: 'Przeglądarki nie są w pełni zobowiązane do używania HTTPS, przez co żądanie HTTP może zostać przechwycone.',
  },
  'hsts-max-age': {
    title: 'HSTS max-age',
    check: 'hsts',
    definition:
      'Czas, przez jaki przeglądarka pamięta o konieczności używania wyłącznie HTTPS. Lista HSTS Preload wymaga minimum roku.',
    fail: 'Czas krótszy niż rok — przeglądarki szybciej zapomną regułę, a domena nie kwalifikuje się na listę Preload.',
  },
  'hsts-include-subdomains': {
    title: 'includeSubDomains',
    check: 'hsts',
    definition:
      'Rozszerza ochronę HSTS również na wszystkie subdomeny, uniemożliwiając ich wczytanie po zwykłym HTTP.',
    fail: 'Subdomeny nie są objęte ochroną HSTS i nadal mogą być wywoływane przez nieszyfrowane HTTP.',
  },
  'hsts-preload': {
    title: 'HSTS Preload',
    check: 'hsts',
    definition:
      'Zgłoszenie domeny do wbudowanej w przeglądarki listy wymuszającej HTTPS, chroniącej użytkownika już przy pierwszej wizycie.',
  },
} satisfies Record<string, Term>;

const securityHeaders = {
  xss: {
    title: 'Cross-Site Scripting (XSS)',
    check: 'http-security',
    definition:
      'Wstrzyknięcie złośliwego skryptu na cudzą stronę, gdzie może on przejąć sesję użytkownika lub działać w jego imieniu.',
  },
  clickjacking: {
    title: 'Clickjacking',
    check: 'http-security',
    definition:
      'Osadzenie strony w ukrytej ramce na innej witrynie, aby nieświadomy użytkownik klikał przyciski w docelowej aplikacji.',
  },
  'content-security-policy': {
    title: 'Content-Security-Policy (CSP)',
    check: 'http-security',
    definition:
      'Określa dozwolone źródła skryptów, stylów i innych zasobów strony, stanowiąc główną ochronę przed atakami XSS.',
    fail: 'Brak restrykcyjnej polityki CSP zwiększa ryzyko uruchomienia wstrzykniętych skryptów.',
  },
  'x-content-type-options': {
    title: 'X-Content-Type-Options',
    check: 'http-security',
    definition:
      'Blokuje zgadywanie typu MIME przez przeglądarkę, dzięki czemu przesłany plik nie zostanie wykonany jako skrypt.',
  },
  'x-frame-options': {
    title: 'X-Frame-Options',
    check: 'http-security',
    definition: 'Uniemożliwia osadzanie strony w ramkach (iframe) na obcych witrynach, chroniąc przed clickjackingiem.',
  },
  'referrer-policy': {
    title: 'Referrer-Policy',
    check: 'http-security',
    definition:
      'Kontroluje, jaka część bieżącego adresu URL jest przekazywana innym witrynom po kliknięciu linku lub pobraniu zasobu.',
    fail: 'Bez restrykcyjnej polityki pełne ścieżki i parametry zapytań mogą wyciekać do zewnętrznych serwisów.',
  },
  'permissions-policy': {
    title: 'Permissions-Policy',
    check: 'http-security',
    definition:
      'Wyłącza dostęp strony i osadzonych elementów do funkcji przeglądarki, takich jak kamera, mikrofon czy lokalizacja.',
  },
  'cross-origin-opener-policy': {
    title: 'Cross-Origin-Opener-Policy (COOP)',
    check: 'http-security',
    definition:
      'Izoluje okno strony w osobnej grupie kontekstów przeglądania, uniemożliwiając obcym witrynom dostęp do obiektu window.',
  },
  'cross-origin-resource-policy': {
    title: 'Cross-Origin-Resource-Policy (CORP)',
    check: 'http-security',
    definition:
      'Blokuje ładowanie zasobów witryny przez inne domeny, chroniąc przed wyciekami danych w stylu Spectre.',
  },
  'cross-origin-embedder-policy': {
    title: 'Cross-Origin-Embedder-Policy (COEP)',
    check: 'http-security',
    definition:
      'Zezwala na ładowanie wyłącznie zasobów wyraźnie dopuszczonych przez inne domeny, co umożliwia izolację procesu.',
  },
  'x-xss-protection': {
    title: 'X-XSS-Protection',
    check: 'http-security',
    definition:
      'Przestarzały filtr XSS wbudowany dawniej w przeglądarki. Obecnie zaleca się ustawienie jego wartości na 0.',
    pass: 'Wyłączony zgodnie z aktualnymi zaleceniami bezpieczeństwa.',
    fail: 'Stary filtr jest włączony, co w starszych przeglądarkach może tworzyć dodatkowe luki. Ustaw wartość 0.',
  },
  'server-disclosure': {
    title: 'Ujawnianie oprogramowania serwera',
    check: 'headers',
    definition:
      'Nagłówki takie jak Server czy X-Powered-By zdradzające nazwę i często dokładną wersję oprogramowania serwera.',
    fail: 'Ułatwia to atakującym dobór znanych exploitów. Usuń numer wersji lub cały nagłówek.',
  },
} satisfies Record<string, Term>;

const pageContent = {
  'mixed-content': {
    title: 'Mieszana zawartość (Mixed Content)',
    check: 'mixed-content',
    definition:
      'Zasoby pobierane przez nieszyfrowane HTTP na stronie otwartej przez HTTPS, które mogą zostać podsłuchane lub zmienione po drodze.',
    pass: 'Wszystkie zasoby na stronie są ładowane bezpiecznie przez HTTPS.',
  },
  'upgrade-insecure-requests': {
    title: 'Upgrade Insecure Requests',
    check: 'mixed-content',
    definition:
      'Dyrektywa CSP nakazująca przeglądarce automatyczną zamianę odnośników HTTP na HTTPS przed ich pobraniem.',
  },
  'third-party-scripts': {
    title: 'Skrypty podmiotów trzecich',
    check: 'mixed-content',
    definition:
      'Skrypty ładowane z serwerów zewnętrznych firm (np. analityka, czaty). Mają pełny dostęp do strony, więc podmiot kontrolujący ten serwer kontroluje fragment witryny.',
  },
  sri: {
    title: 'Subresource Integrity (SRI)',
    check: 'mixed-content',
    definition:
      'Skrót kryptograficzny przypisany do skryptu lub arkusza stylów, pozwalający przeglądarce zweryfikować, czy plik nie został zmodyfikowany.',
  },
  'integrity-policy': {
    title: 'Integrity-Policy',
    check: 'mixed-content',
    definition: 'Nagłówek nakazujący przeglądarce odrzucanie każdego skryptu pozbawionego skrótu SRI.',
    fail: 'Skrypty bez skrótu SRI są blokowane, co może zakłócić działanie części strony.',
  },
  'cookie-security': {
    title: 'Flagi bezpieczeństwa plików cookie',
    check: 'cookies',
    definition:
      'Flaga Secure ogranicza przesyłanie ciasteczka do HTTPS, HttpOnly ukrywa je przed skryptami JS, a SameSite chroni przed żądaniami z innych witryn.',
    pass: 'Wszystkie trzy flagi są ustawione, więc ten plik cookie jest dobrze zabezpieczony.',
  },
} satisfies Record<string, Term>;

const email = {
  spf: {
    title: 'SPF',
    check: 'mail-config',
    definition:
      'Rekord DNS wymieniający serwery uprawnione do wysyłania poczty w imieniu domeny, pozwalający wykrywać sfałszowane wiadomości.',
    fail: 'Bez poprawnego rekordu SPF inne serwery mogą wysyłać wiadomości podszywające się pod tę domenę.',
  },
  dkim: {
    title: 'DKIM',
    check: 'mail-config',
    definition:
      'Podpisuje wychodzące wiadomości kluczem opublikowanym w DNS, dzięki czemu odbiorca może potwierdzić ich autentyczność i integralność.',
  },
  dmarc: {
    title: 'DMARC',
    check: 'mail-config',
    definition:
      'Określa, jak serwery odbiorcze mają traktować pocztę niespełniającą wymogów SPF i DKIM oraz dokąd wysyłać raporty.',
    fail: 'Sfałszowane wiadomości podszywające się pod tę domenę mogą nadal trafiać do skrzynek odbiorców.',
  },
  bimi: {
    title: 'BIMI',
    check: 'mail-config',
    definition:
      'Wyświetla zweryfikowane logo marki obok wiadomości e-mail w obsługiwanych klientach pocztowych po wdrożeniu egzekwowania DMARC.',
  },
  'mta-sts': {
    title: 'MTA-STS',
    check: 'mail-config',
    definition:
      'Wymusza na serwerach pocztowych korzystanie z szyfrowanych i uwierzytelnionych połączeń TLS przy dostarczaniu poczty do tej domeny.',
  },
  'tls-rpt': {
    title: 'TLS-RPT',
    check: 'mail-config',
    definition: 'Prosi zewnętrzne serwery pocztowe o przesyłanie raportów w przypadku problemów z bezpiecznym dostarczeniem wiadomości.',
  },
  dane: {
    title: 'DANE',
    check: 'mail-config',
    definition:
      'Publikuje informacje o certyfikacie serwera pocztowego w rekordach DNS podpisanych przez DNSSEC, umożliwiając weryfikację bez pośrednictwa CA.',
  },
} satisfies Record<string, Term>;

const domains = {
  whois: {
    title: 'WHOIS',
    check: 'whois-lookup',
    definition:
      'Publiczny rejestr danych rejestracyjnych domeny: rejestratora, kluczowych dat, serwerów nazw oraz — jeśli nie są ukryte — danych kontaktowych abonenta.',
  },
  'whois-privacy': {
    title: 'Prywatność WHOIS',
    check: 'domain-info',
    definition:
      'Ukrywa imię, nazwisko i dane kontaktowe właściciela domeny w bazie WHOIS, zastępując je danymi rejestratora lub usługi proxy.',
  },
  registrar: {
    title: 'Rejestrator domeny',
    check: 'whois-lookup',
    definition:
      'Firma pośrednicząca w rejestracji domeny (np. OVH, home.pl, Namecheap). Przejęcie konta u rejestratora oznacza przejęcie kontroli nad domeną.',
  },
  registry: {
    title: 'Rejestr domeny (Registry)',
    check: 'whois-lookup',
    definition:
      'Organizacja zarządzająca całą domeną najwyższego poziomu (np. NASK dla .pl lub Verisign dla .com), utrzymująca główną bazę nazw.',
  },
  'domain-expiry': {
    title: 'Wygaśnięcie domeny',
    check: 'whois-lookup',
    definition:
      'Data zakończenia okresu rozliczeniowego domeny. Brak odnowienia powoduje wyłączenie strony i poczty, a domenę może przejąć ktoś inny.',
  },
  subdomain: {
    title: 'Subdomena',
    check: 'subdomains',
    definition:
      'Nazwa w obrębie głównej domeny, np. poczta.domena.pl. Zapomniane subdomeny często działają na nieaktualnym oprogramowaniu.',
  },
} satisfies Record<string, Term>;

const dns = {
  'dns-resolver': {
    title: 'Resolver DNS',
    check: 'block-lists',
    definition:
      'Serwer tłumaczący nazwę domeny na adres IP podczas odwiedzania strony. Zwykle obsługiwany przez dostawcę internetu lub usługę taką jak 1.1.1.1.',
  },
  'a-record': {
    title: 'Rekordy A i AAAA',
    check: 'dns',
    definition:
      'Kierują domenę na adres IP serwera. Rekordy A przechowują adresy IPv4, natomiast rekordy AAAA — adresy IPv6.',
  },
  cname: {
    title: 'Rekord CNAME',
    check: 'dns',
    definition:
      'Tworzy alias jednej nazwy domenowej wskazujący na inną. Pozostawienie rekordu CNAME po rezygnacji z usługi zewnętrznej grozi przejęciem subdomeny.',
  },
  'mx-record': {
    title: 'Rekordy MX',
    check: 'dns',
    definition: 'Wskazują serwery obsługujące pocztę przychodzącą dla domeny wraz z ich priorytetami.',
  },
  'ns-record': {
    title: 'Rekordy NS',
    check: 'dns-server',
    definition:
      'Określają autorytatywne serwery nazw przechowujące strefę DNS domeny. Kto kontroluje serwery NS, decyduje, dokąd wskazuje domena.',
  },
  'txt-record': {
    title: 'Rekordy TXT',
    check: 'txt-records',
    definition:
      'Dowolne wpisy tekstowe w DNS. Służą do potwierdzania własności domeny oraz publikowania polityk pocztowych SPF i DMARC.',
  },
  'soa-record': {
    title: 'Rekord SOA',
    check: 'dns',
    definition:
      'Zawiera podstawowe parametry strefy DNS: główny serwer nazw, adres administratora oraz czasy odświeżania strefy.',
  },
  'ptr-record': {
    title: 'Rekord PTR (Odwrotny DNS)',
    check: 'dns',
    definition:
      'Odwrotność rekordu A — przypisuje adresowi IP nazwę hosta. Serwery pocztowe często odrzucają wiadomości z serwerów bez rekordu PTR.',
  },
  ttl: {
    title: 'TTL (Time to Live)',
    check: 'dns',
    definition:
      'Czas w sekundach, przez jaki resolvery mogą przechowywać odpowiedź DNS w pamięci podręcznej. Długi TTL przyspiesza zapytania, ale spowalnia propagację zmian.',
  },
  dnskey: {
    title: 'DNSKEY',
    check: 'dnssec',
    definition: 'Klucze publiczne służące do podpisywania rekordów DNS domeny w ramach mechanizmu DNSSEC.',
    fail: 'Bez kluczy DNSKEY rekordy DNS domeny nie są podpisane cyfrowo.',
  },
  'ds-record': {
    title: 'Rekord DS',
    check: 'dnssec',
    definition:
      'Rekord w strefie nadrzędnej wskazujący na klucz DNSKEY domeny, umożliwiający zbudowanie łańcucha zaufania DNSSEC.',
    fail: 'Bez rekordu DS resolvery nie mogą zweryfikować podpisów, więc DNSSEC nie jest aktywny.',
  },
  'dnssec-validation': {
    title: 'Walidacja DNSSEC',
    check: 'dnssec',
    definition:
      'Informacja, czy resolver potwierdził autentyczność i integralność podpisanych odpowiedzi DNS.',
    fail: 'Odpowiedzi DNS nie można zweryfikować kryptograficznie, co otwiera drogę do zatruwania pamięci podręcznej DNS.',
  },
} satisfies Record<string, Term>;

const hosting = {
  'ip-address': {
    title: 'Adres IP',
    check: 'get-ip',
    definition:
      'Numeryczny identyfikator serwera w internecie. System DNS tłumaczy czytelne dla ludzi nazwy domen na adresy IP.',
  },
  'shared-hosting': {
    title: 'Hosting współdzielony',
    check: 'hosts',
    definition:
      'Wiele stron działających na jednym serwerze i tym samym adresie IP. Jeśli jedna witryna trafi na czarną listę, może to wpłynąć na pozostałe.',
  },
  asn: {
    title: 'ASN (Numer Systemu Autonomicznego)',
    check: 'server-info',
    definition:
      'Identyfikator dużej sieci w internecie należącej zwykle do dostawcy hostingu, operatora telekomunikacyjnego lub korporacji.',
  },
  'ip-geolocation': {
    title: 'Geolokalizacja IP',
    check: 'location',
    definition:
      'Przybliżone położenie geograficzne serwera ustalone na podstawie jego adresu IP. Zwykle trafnie wskazuje kraj, choć miasto bywa orientacyjne.',
  },
  traceroute: {
    title: 'Traceroute (Trasa pakietów)',
    check: 'trace-route',
    definition:
      'Lista kolejnych routerów na ścieżce między punktem pomiarowym a serwerem wraz z czasem opóźnień dla każdego przeskoku.',
  },
  cms: {
    title: 'System zarządzania treścią (CMS)',
    check: 'tech-stack',
    definition:
      'Oprogramowanie do tworzenia i edycji stron bez pisania kodu, np. WordPress, Drupal czy Joomla. Nieaktualne wtyczki są częstym celem ataków.',
  },
} satisfies Record<string, Term>;

const threats = {
  'safe-browsing': {
    title: 'Google Safe Browsing',
    check: 'threats',
    definition:
      'Lista witryn powiązanych ze złośliwym oprogramowaniem lub phishingiem, przed którymi ostrzegają Chrome, Firefox i Safari.',
    fail: 'Użytkownicy większości przeglądarek widzą czerwone ostrzeżenie o zagrożeniu zamiast strony.',
  },
  'threat-scan': {
    title: 'Skanowanie zagrożeń',
    check: 'threats',
    definition: 'Weryfikacja witryny pod kątem złośliwego oprogramowania, phishingu i innych zagrożeń dla użytkowników.',
  },
  phishing: {
    title: 'Phishing',
    check: 'threats',
    definition:
      'Strony podszywające się pod zaufane marki w celu wyłudzenia danych logowania, numerów kart lub danych osobowych.',
  },
  malware: {
    title: 'Złośliwe oprogramowanie (Malware)',
    check: 'threats',
    definition:
      'Oprogramowanie stworzone w celu zainfekowania urządzeń odwiedzających, często rozpowszechniane przez przejęte strony.',
    fail: 'Adresy URL w tej witrynie zostały zgłoszone jako źródło złośliwego oprogramowania.',
  },
  'dns-blocklist': {
    title: 'Listy blokujące DNS',
    check: 'block-lists',
    definition:
      'Listy wykorzystywane przez resolvery DNS dbające o prywatność i bezpieczeństwo rodziny do blokowania szkodliwych domen.',
    fail: 'Użytkownicy korzystający z tego resolvera DNS nie mogą otworzyć strony.',
  },
  'data-breach': {
    title: 'Wycieki danych',
    check: 'breaches',
    definition: 'Incydenty bezpieczeństwa, w wyniku których dane użytkowników serwisu zostały wykradzione i upublicznione.',
    fail: 'Konta z tego serwisu znalazły się w wycieku — powtarzające się hasła mogą być testowane w innych usługach.',
  },
  cve: {
    title: 'Znane podatności (CVE)',
    check: 'vulnerabilities',
    definition:
      'Publicznie skatalogowane luki bezpieczeństwa w oprogramowaniu serwera, oznaczone unikalnym identyfikatorem CVE.',
    fail: 'Atakujący automatycznie skanują sieć w poszukiwaniu tych luk — zaktualizuj podatne oprogramowanie.',
  },
  'known-exploited': {
    title: 'Aktywnie wykorzystywane podatności',
    check: 'vulnerabilities',
    definition: 'Luki znajdujące się w katalogu CISA KEV, co do których potwierdzono aktywne ataki w sieci.',
  },
  'open-port': {
    title: 'Otwarte porty',
    check: 'ports',
    definition:
      'Każdy otwarty port to usługa dostępna z internetu, z którą można nawiązać połączenie i badać ją pod kątem podatności.',
    fail: 'Jeśli usługa nie musi być publiczna, zamknij port lub ogranicz dostęp na zaporze sieciowej.',
  },
  waf: {
    title: 'Zapora aplikacji sieciowych (WAF)',
    check: 'firewall',
    definition:
      'Filtr ruchu HTTP chroniący witrynę przed typowymi atakami, takimi jak SQL Injection, XSS czy złośliwe boty.',
  },
} satisfies Record<string, Term>;

const securityTxt = {
  'security-txt': {
    title: 'security.txt',
    check: 'security-txt',
    definition:
      'Plik pod adresem /.well-known/security.txt informujący badaczy bezpieczeństwa, jak zgłosić wykrytą podatność.',
    fail: 'Badacze, którzy odkryją błąd bezpieczeństwa, mogą nie wiedzieć, z kim się skontaktować.',
  },
  'security-txt-signature': {
    title: 'Podpisany plik security.txt',
    check: 'security-txt',
    definition:
      'Podpis PGP potwierdzający, że plik pochodzi od właściciela witryny i nie został zmodyfikowany.',
  },
  'security-txt-contact': {
    title: 'Pole Contact',
    check: 'security-txt',
    definition: 'Wymagane pole zawierające adres e-mail lub formularz do zgłaszania luk bezpieczeństwa.',
  },
  'security-txt-expires': {
    title: 'Pole Expires',
    check: 'security-txt',
    definition:
      'Wymagana data ważności pliku security.txt. Zaleca się ustawienie jej na mniej niż rok do przodu.',
  },
} satisfies Record<string, Term>;

const quality = {
  'lighthouse-performance': {
    title: 'Wynik wydajności',
    check: 'quality',
    definition: 'Ocena Google Lighthouse określająca szybkość ładowania i osiągania interaktywności przez stronę.',
  },
  'lighthouse-accessibility': {
    title: 'Wynik dostępności',
    check: 'quality',
    definition:
      'Ocena Google Lighthouse określająca przystosowanie strony dla osób z niepełnosprawnościami (np. użytkowników czytników ekranu).',
  },
  'lighthouse-best-practices': {
    title: 'Wynik dobrych praktyk',
    check: 'quality',
    definition:
      'Ocena Google Lighthouse weryfikująca stosowanie nowoczesnych standardów webowych, od HTTPS po unikanie przestarzałych API.',
  },
  'lighthouse-seo': {
    title: 'Wynik SEO',
    check: 'quality',
    definition:
      'Ocena Google Lighthouse sprawdzająca podstawowe elementy ułatwiające wyszukiwarkom indeksowanie strony.',
  },
  'response-time': {
    title: 'Czas odpowiedzi',
    check: 'status',
    definition:
      'Czas potrzebny serwerowi na udzielenie odpowiedzi. Wolna pierwsza odpowiedź opóźnia ładowanie całej strony.',
  },
  'http-status-codes': {
    title: 'Kody statusu HTTP',
    check: 'status',
    definition:
      'Trzycyfrowy kod zwracany przez serwer: 200 oznacza sukces, 301 przekierowanie, 404 brak strony, a 500 błąd serwera.',
  },
  redirects: {
    title: 'Przekierowania',
    check: 'redirects',
    definition:
      'Każde przekierowanie kieruje przeglądarkę pod inny adres URL, dodając kolejną rundę komunikacji przed załadowaniem strony.',
  },
  'https-redirect': {
    title: 'Przekierowanie na HTTPS',
    check: 'redirects',
    definition:
      'Automatycznie kieruje użytkowników wchodzących po nieszyfrowanym HTTP na bezpieczną wersję HTTPS.',
    fail: 'Użytkownicy wpisujący adres bez https:// pozostają na nieszyfrowanym połączeniu.',
  },
  'search-crawling': {
    title: 'Indeksowanie przez wyszukiwarki',
    check: 'robots-txt',
    definition: 'Plik robots.txt może prosić roboty wyszukiwarek o pomijanie wybranych części lub całej witryny.',
    fail: 'Robot Google ma zablokowany dostęp do całej witryny, przez co może ona zniknąć z wyników wyszukiwania.',
  },
  'ai-crawlers': {
    title: 'Roboty AI (AI Crawlers)',
    check: 'robots-txt',
    definition:
      'Boty pobierające treści stron do trenowania modeli AI lub generowania odpowiedzi (np. GPTBot, ClaudeBot). Można ograniczyć im dostęp w robots.txt.',
  },
  'llms-txt': {
    title: 'llms.txt',
    check: 'robots-txt',
    definition:
      'Proponowany plik pod adresem /llms.txt udostępniający narzędziom AI zwięzłe podsumowanie witryny i linki do kluczowych podstron.',
  },
  'xml-sitemap': {
    title: 'Mapa witryny XML (Sitemap)',
    check: 'sitemap',
    definition:
      'Plik zawierający listę adresów URL witryny, ułatwiający wyszukiwarkom odnalezienie wszystkich podstron.',
  },
  'canonical-url': {
    title: 'Adres kanoniczny (Canonical URL)',
    check: 'social-tags',
    definition:
      'Wskazuje wyszukiwarkom główny adres URL strony dostępnej pod wieloma wariantami, zapobiegając rozproszeniu pozycji w wynikach.',
  },
  'open-graph': {
    title: 'Open Graph',
    check: 'social-tags',
    definition:
      'Znaczniki meta określające tytuł, opis i miniaturę wyświetlane podczas udostępniania linku w mediach społecznościowych i komunikatorach.',
    fail: 'Bez znaczników Open Graph serwisy społecznościowe same zgadują podgląd linku, często z mizernym skutkiem.',
  },
  'twitter-card': {
    title: 'Twitter Card',
    check: 'social-tags',
    definition: 'Określa wygląd karty podglądu po udostępnieniu adresu URL w serwisie X (dawniej Twitter).',
  },
  'social-verification': {
    title: 'Weryfikacja profili społecznościowych',
    check: 'social-presence',
    definition:
      'Sprawdzenie, czy profil społecznościowy wskazany na stronie zawiera link zwrotny do witryny, co potwierdza wspólnego właściciela.',
  },
  trackers: {
    title: 'Trackery',
    check: 'trackers',
    definition: 'Zewnętrzne skrypty i usługi rejestrujące aktywność odwiedzających, często w obrębie wielu witryn.',
    pass: 'Na tej stronie nie wykryto znanych trackerów.',
  },
  'ad-trackers': {
    title: 'Trackery reklamowe',
    check: 'trackers',
    definition: 'Skrypty sieci reklamowych śledzące użytkowników między witrynami w celu personalizacji reklam.',
  },
  analytics: {
    title: 'Analityka',
    check: 'trackers',
    definition: 'Narzędzia mierzące sposób korzystania ze strony przez użytkowników, np. odwiedzane podstrony.',
  },
  'carbon-footprint': {
    title: 'Ślad węglowy',
    check: 'carbon',
    definition:
      'Szacowana emisja CO2 związana z energią zużytą na przesłanie i wyświetlenie strony. Cięższe strony generują większy ślad.',
  },
  'tranco-rank': {
    title: 'Ranking Tranco',
    check: 'rank',
    definition:
      'Pozycja domeny w zestawieniu miliona najpopularniejszych witryn Tranco, łączącym dane z wielu niezależnych rankingów.',
  },
  'web-archive': {
    title: 'Archiwum WWW (Wayback Machine)',
    check: 'archives',
    definition:
      'Usługi zapisujące historyczne kopie stron internetowych, pozwalające podejrzeć dawny wygląd i treść witryny.',
  },
} satisfies Record<string, Term>;

export const glossary = {
  ...certificates,
  ...tls,
  ...tlsVulnerabilities,
  ...hsts,
  ...securityHeaders,
  ...pageContent,
  ...email,
  ...domains,
  ...dns,
  ...hosting,
  ...threats,
  ...securityTxt,
  ...quality,
};

export const termGroups: { title: string; terms: Record<string, Term> }[] = [
  { title: 'Certyfikaty', terms: certificates },
  { title: 'TLS i szyfrowanie', terms: tls },
  { title: 'Podatności TLS', terms: tlsVulnerabilities },
  { title: 'HSTS', terms: hsts },
  { title: 'Nagłówki bezpieczeństwa', terms: securityHeaders },
  { title: 'Zawartość strony', terms: pageContent },
  { title: 'Poczta e-mail', terms: email },
  { title: 'Domeny', terms: domains },
  { title: 'DNS', terms: dns },
  { title: 'Hosting i sieć', terms: hosting },
  { title: 'Zagrożenia i reputacja', terms: threats },
  { title: 'security.txt', terms: securityTxt },
  { title: 'Jakość i widoczność', terms: quality },
];

export type TermId = keyof typeof glossary;

export const termText = (id: TermId, passed: boolean): string => {
  const term: Term = glossary[id];
  return (passed ? term.pass : term.fail) ?? term.definition;
};
