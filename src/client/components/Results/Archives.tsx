import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { formatNumber } from 'client/utils/format';

const ArchivesCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const data = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl="Pierwszy zapis" val={data.firstScan} />
      <Row lbl="Ostatni zapis" val={data.lastScan} />
      <Row lbl="Dni w archiwum" val={formatNumber(data.daysArchived)} />
      <Row lbl="Liczba zmian" val={formatNumber(data.changeCount)} />
      <Row lbl="Średni rozmiar" val={`${formatNumber(data.averagePageSize)} B`} />
      <Row
        lbl="Śr. dni między zapisami"
        val={formatNumber(data.scanFrequency.daysBetweenScans)}
      />

      <Note>
        Zobacz historyczne wersje tej strony{' '}
        <a rel="noreferrer" target="_blank" href={`https://web.archive.org/web/*/${data.scanUrl}`}>
          tutaj
        </a>{' '}
        w archiwum Internet Archive Wayback Machine.
      </Note>
    </Card>
  );
};

export default ArchivesCard;
