import type { Check } from '.';

export default {
  title: 'Rekordy TXT',
  categories: ['domain', 'email'],
  summary: 'Wpisy tekstowe DNS, w tym tokeny weryfikacyjne i polityki pocztowe',
  description:
    'Rekordy TXT przechowują dowolne ciągi znaków w systemie DNS — wykorzystywane do weryfikacji własności ' +
    'domeny w usługach zewnętrznych oraz publikowania polityk SPF i DMARC.',
  use:
    'Zestaw rekordów TXT stanowi przegląd usług zewnętrznych zintegrowanych z domeną (np. Google Workspace, ' +
    'Microsoft 365, narzędzia marketingowe i analityczne).',
  resources: [
    {
      title: 'Rekordy TXT (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/',
    },
    {
      title: 'TXT Record Lookup (MxToolbox)',
      link: 'https://mxtoolbox.com/TXTLookup.aspx',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-txt-records',
} satisfies Check;
