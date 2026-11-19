import type { ServerInfo } from 'client/utils/result-processor';
import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';

const ServerInfoCard = (props: {
  data: ServerInfo;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const info = props.data;
  const { org, asn, isp, os, ports, ip, loc, type } = info;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {org && <Row lbl="Organizacja" val={org} />}
      {isp && isp !== org && <Row lbl="Dostawca usług (ISP)" val={isp} />}
      {os && <Row lbl="System operacyjny" val={os} />}
      {asn && <Row lbl="Kod ASN" val={asn} />}
      {ports && <Row lbl="Porty" val={ports} />}
      {ip && <Row lbl="IP" val={ip} />}
      {type && <Row lbl="Typ" val={type} />}
      {loc && <Row lbl="Lokalizacja" val={loc} />}
    </Card>
  );
};

export default ServerInfoCard;
