import { Card } from 'client/components/Form/Card';
import Row, { ListRow, type RowProps } from 'client/components/Form/Row';
import { fromFindings } from 'client/components/misc/Icon';
import { integrityFindings, mixedFindings } from 'client/analysis/rules/mixed-content';

// Sum up the mixed content, noting when the page's CSP upgrades it to https
const mixedSummary = (d: any, count: number): RowProps => {
  if (!d.url.startsWith('https:')) return { val: 'Nie dotyczy (strona działa po HTTP)' };
  const result = fromFindings(mixedFindings(d));
  if (!count) return { val: 'Brak', ...result };
  return {
    val: d.upgradeInsecureRequests ? `CSP uaktualnia: ${count}` : `Wykryto: ${count}`,
    ...result,
  };
};

const MixedContentCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const { url, upgradeInsecureRequests, integrityPolicy, thirdPartyScripts } = props.data;
  const { active = [], passive = [], forms = [], missingCrossorigin = [] } = props.data;
  const { versioned = [], unversioned = [] } = props.data.missingIntegrity || {};
  const https = url.startsWith('https:');
  const mixed = active.length + passive.length + forms.length;
  const summary = mixedSummary(props.data, mixed);
  const unhashed = versioned.length + unversioned.length;
  const lists: [string, string[]][] = [
    ['Nieszyfrowane skrypty, style i ramki', active],
    ['Nieszyfrowane obrazy i multimedia', passive],
    ['Nieszyfrowane cele formularzy', forms],
    ['Wersjonowane skrypty bez SRI', versioned],
    ['Niewersjonowane skrypty bez SRI', unversioned],
    ['Skrypty SRI bez atrybutu crossorigin', missingCrossorigin],
  ];
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl="Strona" val={url} />
      <Row lbl="Mieszana zawartość" term="mixed-content" {...summary} />
      {https && (upgradeInsecureRequests || mixed > 0) && (
        <Row
          lbl="Upgrade Insecure Requests"
          val={upgradeInsecureRequests}
          status={upgradeInsecureRequests ? 'pass' : summary.status}
          term="upgrade-insecure-requests"
        />
      )}
      <Row lbl="Skrypty podmiotów trzecich w HTML" val={thirdPartyScripts} />
      {thirdPartyScripts > 0 && (
        <Row
          lbl="Zabezpieczone przez SRI"
          val={`${thirdPartyScripts - unhashed} z ${thirdPartyScripts}`}
          term="sri"
          {...fromFindings(integrityFindings(props.data))}
        />
      )}
      {integrityPolicy && (
        <Row
          lbl="Integrity-Policy"
          val={unhashed ? `Blokuje skryptów: ${unhashed}` : 'Egzekwowana'}
          status={unhashed ? 'error' : 'pass'}
          term="integrity-policy"
        />
      )}
      {lists.map(
        ([title, list]) => list.length > 0 && <ListRow key={title} title={title} list={list} />,
      )}
    </Card>
  );
};

export default MixedContentCard;
