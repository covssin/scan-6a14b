import type { Check } from '.';

export default {
  title: 'Zapora sieciowa (WAF)',
  categories: ['server', 'security'],
  summary: 'Wykrywanie zapory aplikacji sieciowych (WAF) chroniącej witrynę',
  description:
    'Sprawdza, czy między internetem a witryną działa zapora aplikacji sieciowych (WAF) i identyfikuje jej dostawcę. ' +
    'WAF filtruje ruch HTTP, blokując typowe ataki takie jak SQL Injection, XSS czy skanowanie podatności.',
  use:
    'Obecność WAF wpływa na interpretację pozostałych testów, ponieważ część odpowiedzi może pochodzić z zapory, ' +
    'a nie bezpośrednio z serwera aplikacji.',
  resources: [
    {
      title: 'Czym jest WAF (Cloudflare)',
      link: 'https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/',
    },
    {
      title: 'OWASP - Web Application Firewalls',
      link: 'https://owasp.org/www-community/Web_Application_Firewall',
    },
    {
      title: 'WAF - Wiki',
      link: 'https://en.wikipedia.org/wiki/Web_application_firewall',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-firewall',
} satisfies Check;
