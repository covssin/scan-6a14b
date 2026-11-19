import type { Check } from '.';

export default {
  title: 'Serwery DNS',
  categories: ['domain'],
  summary: 'Autorytatywne serwery nazw obsługujące domenę wraz z ich adresami IP',
  description:
    'Wyszukuje serwery nazw (NS) dla strefy DNS, do której należy domena, i rozwiązuje każdy z nich ' +
    'na adres IP. Dla subdomen bez własnej delegacji wyświetlane są serwery domeny nadrzędnej.',
  use:
    'Serwery nazw wskazują operatora strefy DNS, który często różni się od firmy hostingowej. ' +
    'Domeny korzystające z tego samego nietypowego zestawu serwerów NS zwykle należą do tego samego administratora.',
  resources: [],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-dns-servers',
} satisfies Check;
