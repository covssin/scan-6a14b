import type { Check } from '.';

export default {
  title: 'Subdomeny',
  categories: ['domain'],
  summary: 'Subdomeny ujawnione w publicznych logach Certificate Transparency',
  description:
    'Wyszukuje subdomeny w publicznych rejestrach Certificate Transparency (crt.sh). Każdy certyfikat ' +
    'wystawiony przez publiczny urząd CA trafia do jawnego logu, co pozwala odnaleźć historyczne i aktywne subdomeny.',
  use:
    'Na subdomenach często działają środowiska testowe, stare panele logowania lub zapomniane usługi ' +
    'utrzymywane gorzej niż główna witryna.',
  resources: [
    { title: 'crt.sh', link: 'https://crt.sh/' },
    {
      title: 'Certificate Transparency',
      link: 'https://en.wikipedia.org/wiki/Certificate_Transparency',
    },
    { title: 'RFC-6962 (CT)', link: 'https://datatracker.ietf.org/doc/html/rfc6962' },
  ],
} satisfies Check;
