import type { Check } from '.';

export default {
  title: 'Status serwera',
  categories: ['server', 'performance'],
  summary: 'Dostępność witryny, kod odpowiedzi HTTP oraz czas reakcji serwera',
  description:
    'Sprawdza, czy serwer odpowiada na żądania, jaki kod statusu HTTP zwraca oraz ile milisekund ' +
    'zajęło nawiązanie połączenia i otrzymanie odpowiedzi.',
  use: 'Podstawowy test diagnostyczny — jeśli serwer nie odpowiada, pozostałe moduły nie będą w stanie pobrać danych.',
  resources: [],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-status',
} satisfies Check;
