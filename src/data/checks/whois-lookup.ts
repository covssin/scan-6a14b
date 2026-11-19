import type { Check } from '.';

export default {
  title: 'Rejestr WHOIS',
  categories: ['domain'],
  summary: 'Rejestrator, daty utworzenia i wygaśnięcia oraz serwery nazw z bazy WHOIS',
  description:
    'Odczytuje rekord rejestracyjny domeny: nazwę rejestratora, datę utworzenia, ostatniej aktualizacji ' +
    'i wygaśnięcia, kody statusu EPP oraz delegowane serwery nazw.',
  use:
    'Daty rejestracji i wygaśnięcia są kluczowym wskaźnikiem wiarygodności domeny, a kody statusu ' +
    'informują o blokadzie transferu lub okresie karencji.',
  resources: [
    'https://en.wikipedia.org/wiki/WHOIS',
    'https://lookup.icann.org/',
    'https://whois.domaintools.com/',
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-domain',
} satisfies Check;
