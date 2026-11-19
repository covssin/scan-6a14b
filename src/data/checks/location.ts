import type { Check } from '.';

export default {
  title: 'Lokalizacja serwera',
  categories: ['server'],
  summary: 'Przybliżone położenie geograficzne serwera na podstawie adresu IP',
  description:
    'Mapuje adres IP serwera na lokalizację geograficzną przy użyciu bazy geolokalizacyjnej, ' +
    'podając kraj, region, współrzędne, strefę czasową oraz operatora sieci (ASN).',
  use:
    'Lokalizacja serwera wpływa na opóźnienia sieciowe oraz jurysdykcję prawną dotyczącą przechowywania danych. ' +
    'Należy pamiętać, że wynik wskazuje lokalizację centrum danych, a nie siedzibę firmy.',
  resources: [
    { title: 'IP Locator', link: 'https://geobytes.com/iplocator/' },
    {
      title: 'Geolokalizacja internetowa - Wiki',
      link: 'https://en.wikipedia.org/wiki/Internet_geolocation',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-location',
} satisfies Check;
