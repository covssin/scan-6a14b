import type { Check } from '.';

export default {
  title: 'Otwarte porty',
  categories: ['server', 'security'],
  summary: 'Które z popularnych portów sieciowych są otwarte i osiągalne na hoście',
  description:
    'Porty to numeryczne punkty końcowe usług nasłuchujących na serwerze (np. 80 dla HTTP, 443 dla HTTPS, ' +
    '22 dla SSH, 21 dla FTP). Test sprawdza, które z typowych portów akceptują połączenia.',
  use:
    'Każda publicznie dostępna usługa stanowi potencjalny punkt ataku. Otwarte porty baz danych, ' +
    'paneli administracyjnych czy zdalnego dostępu powinny być ograniczone na zaporze sieciowej.',
  resources: [
    {
      title: 'Lista portów TCP i UDP',
      link: 'https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers',
    },
    {
      title: 'NMAP - Podstawy skanowania portów',
      link: 'https://nmap.org/book/man-port-scanning-basics.html',
    },
  ],
  screenshot: 'https://pixelflare.cc/alicia/web-check/wc-ports',
} satisfies Check;
