import type { Analyzer, Severity } from '../types';

export const FLAGGED: Record<string, Severity> = {
  Advertising: 'warning',
  'Adult Advertising': 'warning',
  'Site Analytics': 'info',
};

const names = (list: any[]): string => list.map((t) => t.name).join(', ');

const trackers: Analyzer = (d) => {
  const list: any[] = Array.isArray(d.trackers) ? d.trackers : [];
  const others: string[] = Array.isArray(d.otherTrackers) ? d.otherTrackers : [];
  const ads = list.filter((t) => FLAGGED[t.category] === 'warning');
  const analytics = list.filter((t) => FLAGGED[t.category] === 'info');
  const out: ReturnType<Analyzer> = [];
  if (ads.length) {
    out.push({
      severity: 'warning',
      title: `Ładuje ${ads.length} tracker(ów) reklamowych`,
      detail: names(ads),
    });
  }
  if (analytics.length) {
    out.push({
      severity: 'info',
      title: `Przesyła dane do ${analytics.length} narzędzi analitycznych`,
      detail: names(analytics),
    });
  }
  if (others.length) {
    out.push({
      severity: 'info',
      title: `Łączy się z ${others.length} innymi hostami śledzącymi`,
      detail: others.join(', '),
    });
  }
  if (!out.length) out.push({ severity: 'pass', title: 'Nie wykryto trackerów' });
  return out;
};

export default trackers;
