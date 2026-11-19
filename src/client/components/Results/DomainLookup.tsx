import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';

const DomainLookupCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const d = props.data || {};
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {d.domain && <Row lbl="Zarejestrowana domena" val={d.domain} />}
      {d.created && <Row lbl="Data rejestracji" val={d.created} />}
      {d.updated && <Row lbl="Ostatnia aktualizacja" val={d.updated} />}
      {d.expires && <Row lbl="Data wygaśnięcia" val={d.expires} />}
      {d.registryDomainId && <Row lbl="ID domeny w rejestrze" val={d.registryDomainId} />}
      {d.registrarWhoisServer && <Row lbl="Serwer WHOIS rejestratora" val={d.registrarWhoisServer} />}
      {d.registrar && <Row lbl="Rejestrator" val={d.registrar} link={d.registrarUrl} />}
      {d.registrarIanaId && <Row lbl="ID IANA rejestratora" val={d.registrarIanaId} />}
      {d.dnssec && <Row lbl="DNSSEC" val={d.dnssec} />}
    </Card>
  );
};

export default DomainLookupCard;
