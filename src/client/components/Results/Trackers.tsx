import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow, ListRow, Section } from 'client/components/Form/Row';
import { toStatus } from 'client/components/misc/Icon';
import { FLAGGED } from 'client/analysis/rules/trackers';
import type { TermId } from '@/data/glossary';

// The glossary term for each tracker category that gets a status
const TERMS: Record<string, TermId> = {
  Advertising: 'ad-trackers',
  'Adult Advertising': 'ad-trackers',
  'Site Analytics': 'analytics',
};

const regions = new Intl.DisplayNames(['pl'], { type: 'region' });

// Rows shown when a tracker is expanded, skipping any that are unknown
const details = (tracker: any) =>
  [
    { lbl: 'Żądania', val: String(tracker.requests) },
    ...tracker.hosts.map((host: string) => ({ lbl: 'Host', val: host })),
    { lbl: 'Kraj', val: tracker.country && regions.of(tracker.country) },
    { lbl: 'Polityka prywatności', val: tracker.privacyPolicy && 'Otwórz', link: tracker.privacyPolicy },
  ].filter((row) => row.val);

const TrackersCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const { requests, trackers = [], otherTrackers = [], unknown = [] } = props.data;
  const categories: string[] = [...new Set<string>(trackers.map((t: any) => t.category))];
  const companies = new Set(trackers.map((t: any) => t.company)).size;
  const found = trackers.length + otherTrackers.length + unknown.length;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl="Wykonane żądania" val={requests} />
      {companies > 0 && <Row lbl="Firmy / dostawcy" val={companies} />}
      {!found && <Row lbl="Podmioty trzecie" val="Brak" status="pass" term="trackers" />}
      {categories.map((category) => (
        <Section key={category} title={category}>
          {trackers
            .filter((t: any) => t.category === category)
            .map((tracker: any) => (
              <ExpandableRow
                key={tracker.name}
                lbl={tracker.name}
                val={tracker.company}
                status={FLAGGED[category] && toStatus(FLAGGED[category])}
                term={TERMS[category]}
                rowList={details(tracker)}
              />
            ))}
        </Section>
      ))}
      {otherTrackers.length > 0 && <ListRow title="Inne trackery" list={otherTrackers} />}
      {unknown.length > 0 && <ListRow title="Nierozpoznane" list={unknown} />}
    </Card>
  );
};

export default TrackersCard;
