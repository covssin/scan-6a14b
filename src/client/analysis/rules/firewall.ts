import type { Analyzer } from '../types';

const firewall: Analyzer = (d) => {
  if (d.hasWaf) {
    return [{ severity: 'pass', title: `Wykryto WAF: ${d.waf || 'nieznany'}` }];
  }
  return [
    {
      severity: 'warning',
      title: 'Nie wykryto zapory aplikacji sieciowych (WAF)',
      detail: 'Rozważ wdrożenie Cloudflare, AWS WAF lub podobnego rozwiązania do filtrowania ruchu',
    },
  ];
};

export default firewall;
