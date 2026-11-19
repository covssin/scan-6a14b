# SCAN_KMucha

**SCAN_KMucha** to kompleksowe narzędzie typu OSINT (biały wywiad) oraz audytu technicznego, służące do wielowymiarowej analizy konfiguracji, infrastruktury sieciowej, zabezpieczeń oraz widoczności dowolnej strony internetowej lub domeny. Po podaniu adresu URL lub IP aplikacja równolegle uruchamia kilkadziesiąt niezależnych modułów badawczych i prezentuje zebrane dane w formie spójnego raportu wraz z automatyczną oceną ryzyka.

## Metodologia i sposób działania

Narzędzie łączy trzy podejścia analityczne, działając w pełni z zewnątrz (bez konieczności posiadania dostępu administracyjnego do badanej witryny):

1. **Pasywny rekonesans OSINT** — odpytywanie publicznych rejestrów domenowych, baz geolokalizacyjnych, logów przejrzystości certyfikatów (Certificate Transparency), rankingów ruchu, archiwów internetowych oraz baz reputacji i wycieków danych.
2. **Aktywne sondowanie sieciowe i protokołów** — nawiązywanie bezpośrednich połączeń TCP i uzgadnianie sesji TLS (handshake), wysyłanie żądań HTTP/HTTPS z analizą nagłówków i łańcucha przekierowań, odpytywanie autorytatywnych serwerów DNS oraz skanowanie popularnych portów sieciowych.
3. **Analiza renderowanej strony (Headless Browser)** — uruchamianie witryny w środowisku bezinterfejsowej przeglądarki Chromium w celu przechwycenia dynamicznie ładowanych zasobów, skryptów podmiotów trzecich, plików cookie, sygnatur technologii oraz wykonania zrzutu ekranu.

Zebrane odpowiedzi są następnie przetwarzane przez wbudowany **silnik reguł analitycznych**, który klasyfikuje wykryte nieprawidłowości według stopnia ważności (*Krytyczne*, *Problemy*, *Ostrzeżenia*, *Informacyjne*, *Zaliczone*) i generuje konkretne zalecenia naprawcze.

---

## Szczegółowy zakres testów i źródła danych

Aplikacja wykonuje ponad 40 testów podzielonych na siedem głównych obszarów tematycznych:

### 1. Bezpieczeństwo i kryptografia (SSL/TLS, HTTP, WAF)
* **Certyfikat SSL/TLS:** bezpośrednia inspekcja certyfikatu X.509 serwera — weryfikacja wystawcy (CA), łańcucha zaufania, dat ważności, algorytmu i długości klucza publicznego, odcisku palca (fingerprint), rozszerzonego użycia klucza (EKU) oraz listy alternatywnych nazw domenowych (SAN).
* **Połączenie TLS (Live Handshake):** nawiązanie rzeczywistego połączenia szyfrowanego z hostem w celu sprawdzenia wynegocjowanej wersji protokołu (TLS 1.3, TLS 1.2 oraz wykrywanie przestarzałych TLS 1.0/1.1), zestawu szyfrów, obsługi Forward Secrecy, ALPN (`h2`) oraz OCSP Stapling.
* **Audyt TLS i kompatybilność klientów:** pobieranie szczegółowej oceny konfiguracji (skala od `A+` do `F`) z **Qualys SSL Labs**, symulacja połączeń dla różnych przeglądarek i systemów (Chrome, Firefox, Safari, Edge, Java, Android, iOS) oraz weryfikacja podatności na znane ataki protokołu (m.in. Heartbleed, POODLE, ROBOT, FREAK, LOGJAM, DROWN, Ticketbleed, CCS Injection).
* **Nagłówki bezpieczeństwa HTTP i HSTS:** analiza nagłówków odpowiedzi serwera pod kątem obecności i poprawności dyrektyw `Strict-Transport-Security` (wraz z `max-age`, `includeSubDomains` i gotowością do listy HSTS Preload), `Content-Security-Policy` (CSP), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `CORP` i `COEP`, a także wykrywanie nagłówków ujawniających wersję oprogramowania (`Server`, `X-Powered-By`).
* **Mieszana zawartość (Mixed Content) i SRI:** parsowanie kodu HTML strony HTTPS w poszukiwaniu zasobów i formularzy przesyłanych po nieszyfrowanym HTTP oraz weryfikacja sum kontrolnych Subresource Integrity (`integrity` i `crossorigin`) dla zewnętrznych skryptów.
* **Zapora aplikacji sieciowych (WAF):** identyfikacja systemów ochrony przed atakami (np. Cloudflare, AWS WAF, Akamai, Sucuri) na podstawie sygnatur nagłówków i ciasteczek.
* **Plik `security.txt`:** pobieranie i walidacja pliku `/.well-known/security.txt` (zgodnie ze standardem RFC 9116) pod kątem obecności pola `Contact`, daty wygaśnięcia `Expires` oraz podpisu PGP.

### 2. Domena, DNS i listy blokujące
* **Rekordy DNS i serwery nazw:** bezpośrednie odpytywanie strefy DNS o rekordy `A`, `AAAA`, `MX`, `NS`, `CNAME`, `TXT`, `SOA`, `PTR` oraz `SRV`, wraz z weryfikacją adresów IP autorytatywnych serwerów nazw.
* **DNSSEC i rekordy CAA:** sprawdzanie podpisów kryptograficznych strefy (`DNSKEY`, `DS`, `RRSIG`) chroniących przed zatruwaniem pamięci podręcznej DNS oraz rekordów `CAA` ograniczających listę urzędów certyfikacji uprawnionych do wydawania certyfikatów dla domeny.
* **Rejestr WHOIS i dane abonenta:** odpytywanie serwerów WHOIS rejestratorów w celu ustalenia daty utworzenia, aktualizacji i wygaśnięcia domeny, kodów statusu EPP oraz zakresu ukrycia danych właściciela (WHOIS Privacy).
* **Wykrywanie subdomen:** przeszukiwanie publicznych logów Certificate Transparency w bazie **crt.sh** (oraz opcjonalnie **CertSpotter**), pozwalające odnaleźć aktywne i historyczne subdomeny, dla których kiedykolwiek wystawiono certyfikat.
* **Filtrujące resolvery DNS:** weryfikacja domeny na kilkunastu publicznych serwerach DNS blokujących reklamy, trackery, złośliwe oprogramowanie oraz treści dla dorosłych (kontrola rodzicielska).

### 3. Konfiguracja i bezpieczeństwo poczty e-mail
* **Uwierzytelnianie i dostarczalność:** analiza rekordów `MX` oraz wpisów `TXT` pod kątem poprawności polityki **SPF** (w tym zliczanie zagnieżdżonych zapytań DNS względem limitu 10), polityki **DMARC** (`_dmarc`, tryb egzekwowania `quarantine`/`reject`, raportowanie `rua`, ochrona subdomen `sp`) oraz obecności kluczy **DKIM** dla najpopularniejszych selektorów.
* **Rozszerzone standardy pocztowe:** weryfikacja rekordów **BIMI**, polityki wymuszania szyfrowania **MTA-STS** (`mta-sts.<domena>/.well-known/mta-sts.txt`), raportowania błędów TLS (**TLS-RPT**) oraz rekordów **DANE** (`TLSA`).

### 4. Infrastruktura sieciowa i podatności serwera
* **Geolokalizacja IP i ASN:** mapowanie adresu IP serwera na kraj, region, przybliżone współrzędne geograficzne, strefę czasową, dostawcę usług (ISP) oraz numer systemu autonomicznego (**ASN**).
* **Skanowanie otwartych portów i trasa pakietów:** sprawdzanie dostępności popularnych portów TCP (m.in. 21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS, 3306 MySQL, 3389 RDP, 5900 VNC, 8080) oraz śledzenie kolejnych węzłów sieciowych (**traceroute**) wraz z czasami opóźnień.
* **Powiązane hosty i podatności (CVE):** integracja z bazą **Shodan** w celu wykrycia innych domen działających na tym samym adresie IP, identyfikacji usług oraz dopasowania znanych podatności **CVE** wraz z oceną krytyczności **CVSS**, prawdopodobieństwem wykorzystania **EPSS** oraz oznaczeniem luk z katalogu **CISA KEV**.

### 5. Zagrożenia i wycieki danych
* **Bazy phishingu i malware:** sprawdzanie reputacji adresu URL i domeny w serwisach **URLhaus** (abuse.ch), **PhishTank**, **NetAPI**, **Google Safe Browsing** oraz **Cloudmersive**.
* **Historia wycieków danych:** wyszukiwanie incydentów naruszenia bezpieczeństwa powiązanych z badaną domeną w bazie **Have I Been Pwned** (liczba ujawnionych kont, data wycieku oraz zakres danych).

### 6. SEO, wydajność i struktura witryny
* **Dostępność i łańcuch przekierowań:** pomiar czasu odpowiedzi serwera w rozbiciu na etapy (DNS, połączenie TCP, uzgadnianie TLS, oczekiwanie TTFB, pobieranie treści) oraz śledzenie pełnej ścieżki przekierowań HTTP/HTTPS.
* **Indeksowanie i mapa witryny:** analiza pliku `/robots.txt` (w tym reguł dla robotów wyszukiwarek oraz crawlerów AI takich jak GPTBot czy ClaudeBot), sprawdzanie obecności `/llms.txt`, parsowanie `/sitemap.xml` oraz ekstrakcja wszystkich odnośników wewnętrznych i zewnętrznych.
* **Metadane i podgląd udostępniania:** odczyt znaczników Open Graph, Twitter Card, adresu kanonicznego oraz wykonanie pełnego zrzutu ekranu wyrenderowanej strony.
* **Metryki jakości, ślad węglowy i archiwa:** audyt **Google Lighthouse** (Wydajność, Dostępność, Dobre praktyki, SEO), szacowanie emisji $\text{CO}_2$ i zużycia energii według modelu **Sustainable Web Model**, sprawdzanie pozycji w globalnym rankingu **Tranco** oraz pobieranie historii archiwalnych migawek z **Internet Archive Wayback Machine**.

### 7. Prywatność, stos technologiczny i profile społecznościowe
* **Stos technologiczny:** identyfikacja systemów CMS, frameworków, serwerów i bibliotek na podstawie sygnatur **Wappalyzer**.
* **Pliki cookie i trackery:** analiza atrybutów bezpieczeństwa plików cookie (`Secure`, `HttpOnly`, `SameSite`) oraz przechwytywanie połączeń z zewnętrznymi sieciami reklamowymi i narzędziami analitycznymi.
* **Weryfikacja profili społecznościowych:** wyszukiwanie powiązanych kont (m.in. GitHub, Mastodon, Bluesky, X) w linkach `rel="me"` oraz danych strukturalnych `sameAs` i weryfikacja, czy wskazują one zwrotnie na badaną domenę.

---

## Architektura i REST API

* **Frontend:** zbudowany w oparciu o **Astro** oraz **React**, z obsługą trybu ciemnego/jasnego, wysokiego kontrastu, filtrowania modułów oraz eksportu surowych wyników do pliku JSON.
* **Backend / API:** oparty na **Node.js** z modularnymi endpointami w katalogu `api/`, udokumentowanymi za pomocą interaktywnej specyfikacji **OpenAPI / Swagger** (dostępnej pod ścieżką `/web-check-api/spec`).

## Uruchomienie i konfiguracja

Aplikację można uruchomić lokalnie lub na własnym serwerze za pomocą kontenera **Docker** (`docker-compose.yml`), a także wdrożyć na platformach chmurowych (m.in. Vercel, Netlify, Render). Podstawowy zestaw testów działa bez dodatkowej konfiguracji, natomiast opcjonalne zmienne środowiskowe (`.env`) pozwalają podpiąć klucze zewnętrznych usług (`GOOGLE_CLOUD_API_KEY`, `SHODAN_API_KEY`, `CLOUDMERSIVE_API_KEY`, `TRANCO_API_KEY`, `GITHUB_TOKEN`, `CERTSPOTTER_TOKEN`) oraz zarządzać limitami zapytań i listą aktywnych modułów.

## Informacje o projekcie i licencja

Narzędzie rozwijane w ramach [kmucha.pl](https://kmucha.pl) na bazie otwartego projektu *Web-Check* stworzonego przez Alicię Sykes. Oprogramowanie jest udostępniane na warunkach licencji **MIT**.

<p align="center">
  <a href="https://scan.kmucha.pl">
    <img src="https://img.shields.io/badge/Uruchom-scan.kmucha.pl-467099?style=for-the-badge" alt="Uruchom scan.kmucha.pl" />
  </a>
</p>