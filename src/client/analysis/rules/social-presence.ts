import type { Analyzer, Result } from '../types';

const label = (profile: any): string => `${profile.network} @${profile.handle}`;

const socialPresence: Analyzer = (d) => {
  const profiles: any[] = Array.isArray(d.profiles) ? d.profiles : [];
  const missing = profiles.filter((p) => p.exists === false);
  const unconfirmed = profiles.filter((p) => p.exists && !p.domainVerified && !p.linksBack);
  const confirmed = profiles.filter((p) => p.exists && (p.domainVerified || p.linksBack));
  const unchecked = profiles.filter((p) => p.checked === false);
  const findings: Result[] = [];

  if (missing.length) {
    findings.push({
      severity: 'issue',
      title: `Nie znaleziono kont społecznościowych: ${missing.length}`,
      detail: `Strona odwołuje się do nieistniejących profili: ${missing.map(label).join(', ')}`,
    });
  }
  if (unconfirmed.length) {
    findings.push({
      severity: 'warning',
      title: `Niepotwierdzone profile społecznościowe: ${unconfirmed.length}`,
      detail: `${unconfirmed.map(label).join(', ')} nie zawiera linku zwrotnego do tej witryny`,
    });
  }
  if (!findings.length && confirmed.length && !unchecked.length) {
    findings.push({ severity: 'pass', title: 'Profile społecznościowe potwierdzają powiązanie ze stroną' });
  }
  return findings;
};

export default socialPresence;
