import type { Analyzer, Severity } from '../types';

const GRADE_SEVERITY: Record<string, Severity> = {
  'A+': 'pass',
  A: 'pass',
  'A-': 'pass',
  B: 'warning',
  C: 'issue',
  D: 'issue',
  E: 'critical',
  F: 'critical',
  T: 'critical',
  M: 'critical',
};

const RANK: Severity[] = ['pass', 'info', 'warning', 'issue', 'critical'];
const rank = (s: Severity) => RANK.indexOf(s);
const GRADES = Object.keys(GRADE_SEVERITY);

export const gradeSeverity = (grade: string): Severity => GRADE_SEVERITY[grade] || 'info';

const tlsSecurityAudit: Analyzer = (d) => {
  if (!d || !Array.isArray(d.endpoints) || !d.endpoints.length) return [];
  const grades: string[] = [];
  for (const e of d.endpoints) {
    if (e && typeof e.grade === 'string') grades.push(e.grade);
  }
  if (!grades.length) return [];
  let severity: Severity = 'pass';
  let worstGrade = grades[0];
  for (const g of grades) {
    const sev = gradeSeverity(g);
    if (rank(sev) > rank(severity)) severity = sev;
    if (GRADES.indexOf(g) > GRADES.indexOf(worstGrade)) worstGrade = g;
  }
  if (severity === 'pass') {
    return [{ severity: 'pass', title: `Ocena SSL Labs: ${worstGrade}` }];
  }
  return [
    {
      severity,
      title: `Ocena SSL Labs: ${worstGrade}`,
      detail: 'Zweryfikuj zestawy szyfrów, obsługiwane wersje protokołów oraz długość kluczy',
    },
  ];
};

export default tlsSecurityAudit;
