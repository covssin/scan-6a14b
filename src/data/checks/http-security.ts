import type { Check } from '.';

export default {
  title: 'Bezpieczeństwo HTTP',
  categories: ['security'],
  summary: 'Nagłówki ochronne takie jak CSP, X-Frame-Options oraz nosniff',
  description:
    'Analizuje nagłówki odpowiedzi chroniące użytkowników przed atakami po stronie przeglądarki: ' +
    'HSTS (wymuszenie HTTPS), Content-Security-Policy (ochrona przed XSS), X-Content-Type-Options ' +
    '(blokada zgadywania typu pliku) oraz X-Frame-Options (ochrona przed clickjackingiem).',
  use:
    'Dodanie tych nagłówków nic nie kosztuje, a mimo to często są pomijane. Ich brak oznacza rezygnację ' +
    'z wbudowanych mechanizmów obronnych nowoczesnych przeglądarek.',
  resources: [
    {
      title: 'OWASP Secure Headers Project',
      link: 'https://owasp.org/www-project-secure-headers/',
    },
    {
      title: 'HTTP Header Cheatsheet',
      link: 'https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html',
    },
    { title: 'content-security-policy.com', link: 'https://content-security-policy.com/' },
    { title: 'HTTP Security Headers', link: 'https://securityheaders.com/' },
    { title: 'Mozilla HTTP Observatory', link: 'https://developer.mozilla.org/en-US/observatory' },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-http',
} satisfies Check;
