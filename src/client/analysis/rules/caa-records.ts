import type { Analyzer } from '../types';

const caaRecords: Analyzer = (d) => {
  const records: any[] = Array.isArray(d.records) ? d.records : [];
  const issue = records.filter((r) => r.tag === 'issue');
  if (!issue.length) {
    return [
      {
        severity: 'warning',
        title: records.length ? 'Rekordy CAA nie zawierają tagu issue' : 'Brak rekordów CAA',
        detail: 'Dowolny urząd certyfikacji może wystawić certyfikat dla tej domeny',
      },
    ];
  }
  const issuers = [...new Set(issue.map((r) => r.value.split(';')[0].trim()).filter(Boolean))];
  if (!issuers.length) {
    return [{ severity: 'info', title: 'Rekord CAA blokuje wydawanie wszystkich certyfikatów' }];
  }
  return [
    {
      severity: 'pass',
      title: `CAA ogranicza wydawanie certyfikatów do ${issuers.length} CA`,
      detail: issuers.join(', '),
    },
  ];
};

export default caaRecords;
