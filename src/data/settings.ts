export interface Option {
  value: string;
  label: string;
  icon?: string;
  size?: number;
}

export interface Setting {
  key: string;
  label: string;
  hint?: string;
  control: 'theme' | 'select' | 'segmented' | 'toggle' | 'checks' | 'action';
  options?: Option[];
  default?: string | boolean | string[];
  media?: string; // When this media query matches, the OS has it on and it stays on
  button?: string;
}

export interface Section {
  title: string;
  settings: Setting[];
}

const localeNames = new Intl.DisplayNames(['pl'], { type: 'language' });

const locales = [
  'pl-PL',
  'de-DE',
  'en-GB',
  'en-US',
  'es-ES',
  'fr-FR',
  'it-IT',
  'ja-JP',
  'nl-NL',
  'pt-BR',
  'zh-CN',
];

export const sections: Section[] = [
  {
    title: 'Wygląd',
    settings: [
      { key: 'theme', label: 'Motyw', control: 'theme' },
      {
        key: 'language',
        label: 'Język',
        control: 'select',
        options: [{ value: 'pl', label: 'Polski' }],
        default: 'pl',
      },
      {
        key: 'locale',
        label: 'Format regionalny',
        hint: 'Używany do formatowania dat, liczb i walut',
        control: 'select',
        options: [
          { value: 'auto', label: 'Zgodny z przeglądarką' },
          ...locales.map((value) => ({ value, label: localeNames.of(value) ?? value })),
        ],
        default: 'auto',
      },
    ],
  },
  {
    title: 'Dostępność',
    settings: [
      {
        key: 'reducedMotion',
        label: 'Ogranicz ruch',
        hint: 'Wyłącza animacje i płynne przejścia',
        control: 'toggle',
        default: false,
        media: '(prefers-reduced-motion: reduce)',
      },
      {
        key: 'highContrast',
        label: 'Wysoki kontrast',
        hint: 'Wyraźniejszy tekst, obramowania i obrysy fokusu',
        control: 'toggle',
        default: false,
        media: '(prefers-contrast: more)',
      },
      {
        key: 'textSize',
        label: 'Rozmiar tekstu',
        control: 'segmented',
        options: [
          { value: 'small', label: 'Mały', icon: 'font', size: 0.6 },
          { value: 'default', label: 'Domyślny', icon: 'font', size: 0.75 },
          { value: 'large', label: 'Duży', icon: 'font', size: 0.9 },
          { value: 'larger', label: 'Bardzo duży', icon: 'font', size: 1.05 },
        ],
        default: 'default',
      },
    ],
  },
  {
    title: 'Konfiguracja',
    settings: [
      {
        key: 'skippedChecks',
        label: 'Pominięte testy',
        hint: 'Wybrane moduły będą pomijane podczas każdego skanowania',
        control: 'checks',
        default: [],
      },
    ],
  },
  {
    title: 'Prywatność',
    settings: [
      {
        key: 'errorMonitoring',
        label: 'Monitorowanie błędów',
        hint: 'Wysyła anonimowe raporty o błędach, aby ułatwić ich naprawę',
        control: 'toggle',
        default: false,
      },
      {
        key: 'trafficStats',
        label: 'Podstawowe statystyki ruchu',
        hint: 'Zlicza odsłony stron bez zbierania danych osobowych',
        control: 'toggle',
        default: true,
      },
      {
        key: 'clearData',
        label: 'Wyczyść wszystkie dane',
        hint: 'Usuwa ustawienia oraz wszystkie dane zapisane lokalnie w tej przeglądarce',
        control: 'action',
        button: 'Wyczyść dane',
      },
    ],
  },
];
