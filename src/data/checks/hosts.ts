import type { Check } from '.';

export default {
  title: 'Powiązane hosty',
  categories: ['server'],
  summary: 'Inne nazwy hostów zaobserwowane przez Shodan na tym samym adresie IP',
  description:
    'Wyświetla inne nazwy domenowe powiązane z tym samym adresem IP w bazie Shodan oraz hosty ' +
    'wynikające z rekordów DNS badanego celu.',
  use:
    'Na hostingu współdzielonym na jednym IP działa wiele niepowiązanych stron, ale na infrastrukturze ' +
    'dedykowanej pozwala to odkryć środowiska testowe, zapomniane mikrostrony i panele wewnętrzne.',
  resources: [
    {
      title: 'Reverse DNS Lookup - Wiki',
      link: 'https://en.wikipedia.org/wiki/Reverse_DNS_lookup',
    },
    {
      title: 'OWASP - Enumerate Applications on Webserver',
      link: 'https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/01-Information_Gathering/04-Enumerate_Applications_on_Webserver/',
    },
    { title: 'DNS Dumpster', link: 'https://dnsdumpster.com/' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-hosts',
} satisfies Check;
