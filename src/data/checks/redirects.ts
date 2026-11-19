import type { Check } from '.';

export default {
  title: 'Łańcuch przekierowań',
  categories: ['seo', 'performance'],
  summary: 'Pełna sekwencja przekierowań HTTP przed załadowaniem docelowej strony',
  description:
    'Śledzi kolejne przekierowania HTTP od wpisanego adresu URL aż do miejsca docelowego, ' +
    'rejestrując kody statusu oraz pośrednie adresy.',
  use:
    'Każde dodatkowe przekierowanie wydłuża czas ładowania i osłabia SEO. Wieloetapowe przekierowania ' +
    'przez nieszyfrowane HTTP stwarzają również ryzyko przechwycenia połączenia.',
  resources: [
    {
      title: 'Przekierowania HTTP - MDN',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections',
    },
    { title: 'Przekierowania 301 - poradnik', link: 'https://ahrefs.com/blog/301-redirects/' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-redirects',
} satisfies Check;
