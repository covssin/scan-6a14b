import type { Whois } from 'client/utils/result-processor';
import { Card } from 'client/components/Form/Card';
import Row, { ListRow } from 'client/components/Form/Row';

const WhoIsCard = (props: { data: Whois; title: string; actionButtons: any }): JSX.Element => {
  const { created, updated, expires, nameservers } = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {created && <Row lbl="Utworzono" val={created} />}
      {updated && <Row lbl="Zaktualizowano" val={updated} />}
      {expires && <Row lbl="Wygasa" val={expires} />}
      {nameservers && <ListRow title="Serwery nazw (NS)" list={nameservers} />}
    </Card>
  );
};

export default WhoIsCard;
