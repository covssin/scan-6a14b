import type { Check } from '.';

export default {
  title: 'Informacje o domenie',
  categories: ['domain', 'privacy'],
  summary: 'Dane właściciela oraz informacje kontaktowe opublikowane w rejestrze domeny',
  description:
    'Część rekordu WHOIS dotycząca abonenta: nazwa organizacji, dane kontaktowe opublikowane dla domeny ' +
    'oraz kontakt do zgłaszania nadużyć (abuse) u rejestratora.',
  use:
    'Od czasu wprowadzenia RODO większość danych abonentów jest ukrywana przez usługi prywatności. ' +
    'Tam, gdzie dane pozostają jawne, pozwalają powiązać ze sobą różne domeny należące do tego samego podmiotu.',
  resources: [
    'https://en.wikipedia.org/wiki/WHOIS',
    'https://lookup.icann.org/',
    'https://whois.domaintools.com/',
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-domain',
} satisfies Check;
