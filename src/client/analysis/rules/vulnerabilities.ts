import type { Analyzer } from '../types';
import type { Vuln } from 'client/utils/result-processor';

const MAX_LISTED = 8;

const vulnerabilities: Analyzer = (d) => {
  const vulns: Vuln[] = Array.isArray(d?.vulns) ? d.vulns : [];
  if (!vulns.length) return [{ severity: 'pass', title: 'Brak znanych podatności CVE dla tego hosta' }];
  const exploited = vulns.filter((v) => v.kev).length;
  const note = exploited ? `${exploited} aktywnie wykorzystywanych w atakach (CISA KEV). ` : '';
  const cves = vulns
    .slice(0, MAX_LISTED)
    .map((v) => v.id)
    .join(', ');
  const more = vulns.length > MAX_LISTED ? ` (+${vulns.length - MAX_LISTED} więcej)` : '';
  return [
    {
      severity: exploited ? 'critical' : (vulns[0].epss ?? 0) >= 0.1 ? 'issue' : 'warning',
      title: `Shodan zgłasza ${vulns.length} podatności CVE dla tego hosta`,
      detail: `${note}${cves}${more}. Zaktualizuj oprogramowanie lub ogranicz dostęp na zaporze`,
    },
  ];
};

export default vulnerabilities;
