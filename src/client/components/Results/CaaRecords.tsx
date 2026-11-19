import { Card, Note } from 'client/components/Form/Card';
import Row, { ListRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import caaRecords from 'client/analysis/rules/caa-records';

const titles: Record<string, string> = {
  issue: 'Uprawnione urzędy CA',
  issuewild: 'Uprawnione CA dla subdomen (Wildcard)',
  iodef: 'Raportowanie naruszeń',
  contactemail: 'E-mail kontaktowy',
  contactphone: 'Telefon kontaktowy',
};

// Group record values by tag, with the known tags first
const groupByTag = (records: any[]) => {
  const groups: Record<string, string[]> = { issue: [], issuewild: [], iodef: [] };
  for (const { tag, value, critical } of records) {
    groups[tag] = [...(groups[tag] || []), critical ? `${value} (krytyczny)` : value];
  }
  return Object.entries(groups).filter(([, values]) => values.length);
};

const CaaRecordsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const { domain, records = [] } = props.data;
  const [finding] = caaRecords(props.data);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl="Domena" val={domain} />
      <Row lbl="Rekordy CAA" val={records.length || 'Brak'} term="caa" {...fromFinding(finding)} />
      {groupByTag(records).map(([tag, values]) => (
        <ListRow key={tag} title={titles[tag] || tag} list={values} />
      ))}
      {!records.length && (
        <Note>Bez rekordów CAA dowolny urząd certyfikacji może wystawić certyfikat dla tej domeny</Note>
      )}
    </Card>
  );
};

export default CaaRecordsCard;
