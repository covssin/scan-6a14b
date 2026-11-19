import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';

const FirewallCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const data = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row
        lbl="Zapora WAF"
        val={data.hasWaf ? 'Tak' : 'Nie*'}
        status={data.hasWaf ? 'pass' : 'warning'}
        term="waf"
      />
      {data.waf && <Row lbl="WAF" val={data.waf} />}
      {!data.hasWaf && (
        <Note>
          *Domena może być chroniona autorską lub niestandardową zaporą WAF, której nie udało się
          wykryć automatycznie
        </Note>
      )}
    </Card>
  );
};

export default FirewallCard;
