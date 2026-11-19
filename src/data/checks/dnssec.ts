import type { Check } from '.';

export default {
  title: 'DNSSEC',
  categories: ['security', 'domain'],
  summary: 'Rekordy DNSSEC potwierdzające, że odpowiedzi DNS nie zostały sfałszowane',
  description:
    'Zwykły protokół DNS nie pozwala klientowi odróżnić prawdziwej odpowiedzi od sfałszowanej, co umożliwia ' +
    'zatruwanie pamięci podręcznej (cache poisoning). DNSSEC podpisuje rekordy kryptograficznie, dzięki czemu ' +
    'resolver może zweryfikować ich autentyczność.',
  use:
    'Podpisana strefa DNS świadczy o dbałości o bezpieczeństwo infrastruktury. Brak DNSSEC nie jest błędem ' +
    'krytycznym sam w sobie, ale usuwa ważną warstwę ochrony przed przechwyceniem ruchu.',
  resources: [
    'https://dnssec-analyzer.verisignlabs.com/',
    'https://www.cloudflare.com/dns/dnssec/how-dnssec-works/',
    'https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions',
    'https://www.icann.org/resources/pages/dnssec-what-is-it-why-important-2019-03-05-en',
    'https://dnsviz.net/',
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-dnssec',
} satisfies Check;
