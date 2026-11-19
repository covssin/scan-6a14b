import type { Analyzer } from '../types';

const blockLists: Analyzer = (d) => {
  if (!d || !Array.isArray(d.blocklists)) return [];
  const blocked = d.blocklists.filter((b: any) => b?.isBlocked);
  if (!blocked.length) return [{ severity: 'pass', title: 'Brak obecności na sprawdzonych listach blokujących DNS' }];
  const names = blocked.map((b: any) => b.server).join(', ');
  const severity = blocked.length >= 3 ? 'critical' : 'issue';
  return [
    {
      severity,
      title: `Blokada przez ${blocked.length} serwer(y) DNS`,
      detail: `Zablokowano przez: ${names}`,
    },
  ];
};

export default blockLists;
