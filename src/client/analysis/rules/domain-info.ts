import type { Analyzer } from '../types';
import { daysUntil } from '../helpers';
import { formatNumber } from 'client/utils/format';

const domainInfo: Analyzer = (d) => {
  const days = daysUntil(d.expires);
  if (days === null) return [];
  if (days < 0) {
    return [
      {
        severity: 'critical',
        title: 'Rejestracja domeny wygasła',
        detail: `Wygasła ${formatNumber(-days)} dni temu — odnów ją przed całkowitym usunięciem`,
      },
    ];
  }
  if (days <= 7) {
    return [
      {
        severity: 'critical',
        title: 'Domena wygasa w ciągu tygodnia',
        detail: `Wygasa za ${days} dni — odnów natychmiast`,
      },
    ];
  }
  if (days <= 30) {
    return [
      {
        severity: 'warning',
        title: 'Domena wygasa w ciągu miesiąca',
        detail: `Wygasa za ${days} dni`,
      },
    ];
  }
  return [{ severity: 'pass', title: 'Rejestracja domeny jest ważna' }];
};

export default domainInfo;
