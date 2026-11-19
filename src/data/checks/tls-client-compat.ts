import type { Check } from '.';

export default {
  title: 'Kompatybilność klientów TLS',
  categories: ['security'],
  summary: 'Symulacja połączeń z różnych przeglądarek, systemów i urządzeń',
  description:
    'Symuluje uzgadnianie połączenia TLS dla zestawu przeglądarek i systemów (Chrome, Firefox, Safari, ' +
    'Edge, Java, Android, iOS), pokazując wynegocjowany protokół i szyfr lub brak możliwości połączenia.',
  use:
    'Pozwala upewnić się, że zaostrzenie konfiguracji szyfrowania na serwerze nie odcięło dostępu ' +
    'docelowym grupom użytkowników.',
  resources: [{ title: 'SSL Test (SSL Labs)', link: 'https://www.ssllabs.com/ssltest/' }],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-tls-handshake',
} satisfies Check;
