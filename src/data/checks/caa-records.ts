import type { Check } from '.';

export default {
  title: 'Rekordy CAA',
  categories: ['security', 'domain'],
  summary: 'Które urzędy certyfikacji mogą wystawiać certyfikaty dla tej domeny',
  description:
    'Rekordy CAA określają urzędy certyfikacji (CA) uprawnione do wystawiania certyfikatów TLS dla domeny. ' +
    'Każdy publiczny urząd CA ma obowiązek sprawdzić je przed wydaniem certyfikatu. Rekordy mogą też ' +
    'wskazywać adres do raportowania nieuprawnionych prób wydania certyfikatu.',
  use:
    'Bez rekordów CAA dowolny publiczny urząd certyfikacji może wystawić certyfikat dla domeny, więc atakującemu ' +
    'wystarczy oszukać najsłabiej zabezpieczonego wystawcę. Wpis CAA blokuje pozostałe urzędy.',
  resources: [
    { title: 'RFC-8659 - CAA', link: 'https://datatracker.ietf.org/doc/html/rfc8659' },
    { title: "CAA (via Let's Encrypt)", link: 'https://letsencrypt.org/docs/caa/' },
    { title: 'Generator rekordów CAA (SSLMate)', link: 'https://sslmate.com/caa/' },
    { title: 'CAA Lookup (MxToolbox)', link: 'https://mxtoolbox.com/CAALookup.aspx' },
    {
      title: 'DNS CAA - Wiki',
      link: 'https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization',
    },
  ],
} satisfies Check;
