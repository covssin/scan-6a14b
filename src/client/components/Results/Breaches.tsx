import { Card, Note } from 'client/components/Form/Card';
import Row, { ExpandableRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import checkBreaches from 'client/analysis/rules/breaches';
import { formatNumber } from 'client/utils/format';

const BreachesCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const { domain, breaches = [] } = props.data;
  const [result] = checkBreaches(props.data);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl="Domena" val={domain} />
      <Row
        lbl="Wycieki"
        val={breaches.length || 'Brak'}
        term="data-breach"
        {...fromFinding(result)}
      />
      {breaches.map((breach: any) => (
        <ExpandableRow
          key={breach.name}
          lbl={breach.title}
          val={`${formatNumber(breach.accounts)} kont`}
          rowList={[
            { lbl: 'Data wycieku', val: breach.date },
            { lbl: 'Serwis', val: breach.domain },
            { lbl: 'Zweryfikowany', val: breach.verified ? 'Tak' : 'Nie' },
            { lbl: 'Ujawnione dane', listResults: breach.exposed },
            { lbl: 'Szczegóły', plaintext: breach.description },
          ]}
        />
      ))}
      <Note>
        Źródło:{' '}
        <a href="https://haveibeenpwned.com/" target="_blank" rel="noreferrer">
          Have I Been Pwned
        </a>
      </Note>
    </Card>
  );
};

export default BreachesCard;
