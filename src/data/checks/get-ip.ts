import type { Check } from '.';

export default {
  title: 'Adres IP',
  categories: [],
  summary: 'Adres IP, na który aktualnie wskazuje domena',
  description:
    'Adres IP to numeryczny identyfikator urządzenia w sieci. Aby ustalić adres przypisany do domeny, ' +
    'narzędzie odpytuje DNS o rekord A (IPv4) lub AAAA (IPv6).',
  use:
    'Adres IP to punkt wyjścia do dalszej analizy: pozwala ustalić operatora sieci, przybliżoną lokalizację ' +
    'centrum danych oraz inne usługi działające na tym samym hoście.',
  resources: [
    {
      title: 'Zrozumieć adresy IP',
      link: 'https://www.digitalocean.com/community/tutorials/understanding-ip-addresses-subnets-and-cidr-notation-for-networking',
    },
    { title: 'Adresy IP - Wiki', link: 'https://en.wikipedia.org/wiki/IP_address' },
    { title: 'RFC-791 Internet Protocol', link: 'https://tools.ietf.org/html/rfc791' },
  ],
} satisfies Check;
