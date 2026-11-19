import type { Check } from '.';

export default {
  title: 'Rekordy DNS',
  categories: ['domain', 'email'],
  summary: 'Rekordy A, AAAA, MX, NS, CNAME i inne opublikowane dla domeny',
  description:
    'System DNS tłumaczy nazwy domenowe na adresy zrozumiałe dla maszyn. Domena publikuje różne typy ' +
    'rekordów: A i AAAA dla adresów IP, MX dla poczty, NS dla serwerów nazw, CNAME dla aliasów oraz TXT dla wpisów tekstowych.',
  use:
    'Rekordy adresowe wskazują serwery aplikacji, rekordy MX ujawniają dostawcę poczty, a rekordy TXT ' +
    'często zawierają identyfikatory weryfikacyjne usług zewnętrznych używanych przez organizację.',
  resources: [
    {
      title: 'Czym są rekordy DNS (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/dns/dns-records/',
    },
    {
      title: 'Lista typów rekordów DNS',
      link: 'https://en.wikipedia.org/wiki/List_of_DNS_record_types',
    },
    { title: 'RFC-1035 - DNS', link: 'https://tools.ietf.org/html/rfc1035' },
    {
      title: 'DNS Lookup (MxToolbox)',
      link: 'https://mxtoolbox.com/DNSLookup.aspx',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-dns',
} satisfies Check;
