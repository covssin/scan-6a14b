import type { Analyzer } from '../types';

const breaches: Analyzer = (d) => {
  const list: any[] = Array.isArray(d.breaches) ? d.breaches : [];
  if (!list.length) return [{ severity: 'pass', title: 'Brak znanych wycieków danych' }];
  const leakedPasswords = list.some((b) => b.verified && b.exposed?.includes('Passwords'));
  const risk = leakedPasswords ? '. Wyciekły hasła — istnieje ryzyko ataków credential stuffing' : '';
  return [
    {
      severity: leakedPasswords ? 'issue' : 'warning',
      title: `Wykryto ${list.length} wyciek(ów) danych`,
      detail: `Ostatni incydent: ${list[0].title} (${list[0].date})${risk}`,
    },
  ];
};

export default breaches;
