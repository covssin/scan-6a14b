import type { Check } from '.';

export default {
  title: 'Podatności (CVE)',
  categories: ['server', 'security'],
  summary: 'Znane podatności CVE powiązane w bazie Shodan z usługami na hoście',
  description:
    'Wyświetla listę podatności CVE dopasowanych na podstawie wersji usług wykrytych na serwerze, ' +
    'wraz z oceną krytyczności CVSS, prawdopodobieństwem wykorzystania EPSS oraz oznaczeniem luki z katalogu CISA KEV.',
  use:
    'Stanowi ważny punkt wyjścia do audytu poprawek bezpieczeństwa. Dopasowanie opiera się na banerach wersji, ' +
    'dlatego wymaga weryfikacji pod kątem poprawek wstecznych (backportów).',
  resources: [
    'https://nvd.nist.gov/vuln',
    'https://www.cve.org/',
    'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
    'https://www.shodan.io/',
  ],
} satisfies Check;
