import type { Analyzer } from '../types';

const threats: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  if (d.safeBrowsing?.unsafe) {
    out.push({
      severity: 'critical',
      title: 'Domena na liście Google Safe Browsing',
      detail: 'Witryna oznaczona jako źródło malware, phishingu lub niechcianego oprogramowania',
    });
  }
  if (Array.isArray(d.urlHaus?.urls) && d.urlHaus.urls.length) {
    out.push({ severity: 'critical', title: 'Domena figuruje w bazie zagrożeń URLhaus' });
  }
  const phish = d.phishTank?.url0;
  const inDb = phish?.in_database === 'true' || phish?.in_database === true;
  const valid = phish?.valid === 'true' || phish?.valid === true;
  if (inDb && valid) {
    out.push({ severity: 'critical', title: 'Domena zgłoszona w bazie PhishTank' });
  }
  if (d.cloudmersive?.CleanResult === false) {
    out.push({ severity: 'critical', title: 'Cloudmersive oznaczył tę witrynę jako niebezpieczną' });
  }
  if (d.netApi?.listed_now === true) {
    out.push({
      severity: 'critical',
      title: 'Wpis w bazie przejętych witryn NetAPI',
      detail: `Dopasowano: ${d.netApi.matched_value}, na liście od ${d.netApi.first_seen}`,
    });
  } else if (d.netApi?.listed_ever === true) {
    out.push({
      severity: 'info',
      title: 'Historyczny wpis w bazie przejętych witryn NetAPI',
      detail: `Ostatnio widziano: ${d.netApi.last_seen}`,
    });
  }
  if (!out.length) out.push({ severity: 'pass', title: 'Brak trafień w sprawdzonych bazach zagrożeń' });
  return out;
};

export default threats;
