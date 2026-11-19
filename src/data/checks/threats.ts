import type { Check } from '.';

export default {
  title: 'Zagrożenia i phishing',
  categories: ['security', 'privacy'],
  summary: 'Czy domena figuruje na publicznych listach phishingu i złośliwego oprogramowania',
  description:
    'Weryfikuje domenę i adres URL w bazach zagrożeń URLHaus, PhishTank oraz NetAPI pod kątem ' +
    'zgłoszeń dotyczących phishingu, złośliwego oprogramowania lub przejęcia witryny.',
  use:
    'Obecność na liście jest silnym sygnałem ostrzegawczym. Brak wpisu nie gwarantuje jednak pełnego ' +
    'bezpieczeństwa, ponieważ świeżo utworzone domeny phishingowe trafiają do baz z opóźnieniem.',
  resources: [
    { title: 'URLHaus', link: 'https://urlhaus-api.abuse.ch/' },
    { title: 'PhishTank', link: 'https://www.phishtank.com/' },
    { title: 'NetAPI', link: 'https://netapi.com/compromised-urls/' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-threats',
} satisfies Check;
