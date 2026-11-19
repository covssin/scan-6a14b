import type { Analyzer } from '../types';

const dnssec: Analyzer = (d) => {
  const dnskey = !!d.DNSKEY?.isFound;
  const ds = !!d.DS?.isFound;
  if (dnskey && ds) {
    return [{ severity: 'pass', title: 'DNSSEC włączony' }];
  }
  return [
    {
      severity: 'warning',
      title: 'DNSSEC wyłączony',
      detail: 'Podpisz strefę DNS, aby chronić przed fałszowaniem odpowiedzi i zatruwaniem cache',
    },
  ];
};

export default dnssec;
