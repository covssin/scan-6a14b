import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow, Section } from 'client/components/Form/Row';
import { getPath } from 'client/utils/result-processor';
import { formatNumber } from 'client/utils/format';

const convertToDate = (dateString: string): string => {
  const [date, time] = dateString.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute, second] = time.split(':').map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  if (isNaN(dateObject.getTime())) {
    return dateString;
  }
  return dateObject.toString();
};

const MalwareCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const urlHaus = props.data.urlHaus || {};
  const phishTank = props.data.phishTank || {};
  const cloudmersive = props.data.cloudmersive || {};
  const safeBrowsing = props.data.safeBrowsing || {};
  const netApi = props.data.netApi || {};
  const phished = phishTank.url0?.in_database === 'true' && phishTank.url0?.valid === 'true';
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {!safeBrowsing.error && (
        <Row
          lbl="Google Safe Browsing"
          val={!safeBrowsing.unsafe}
          yes="Bezpieczna"
          no="Zagrożenie"
          term="safe-browsing"
        />
      )}
      {typeof cloudmersive.CleanResult === 'boolean' && (
        <Row
          lbl="Cloudmersive"
          val={cloudmersive.CleanResult}
          yes="Bezpieczna"
          no="Zagrożenie"
          term="threat-scan"
        />
      )}
      {(!cloudmersive.error || safeBrowsing.details) && (
        <Row
          lbl="Typ zagrożenia"
          val={safeBrowsing.details?.[0]?.threatType || cloudmersive.WebsiteThreatType || 'Brak'}
        />
      )}
      {!phishTank.error && (
        <Row
          lbl="Status phishingu"
          val={!phished}
          yes="Nie wykryto phishingu"
          no="Wykryto phishing"
          term="phishing"
        />
      )}
      {phishTank.url0?.valid === 'true' && phishTank.url0.phish_detail_page && (
        <Row
          lbl="Szczegóły phishingu"
          val={phishTank.url0.phish_id}
          link={phishTank.url0.phish_detail_page}
        />
      )}
      {urlHaus.query_status === 'no_results' && (
        <Row lbl="Status malware" val="Nie wykryto złośliwego oprogramowania" status="pass" term="malware" />
      )}
      {urlHaus.query_status === 'ok' && (
        <>
          <Row lbl="Status" val="Wykryto złośliwe oprogramowanie" status="error" term="malware" />
          <Row lbl="Pierwsze wykrycie" val={convertToDate(urlHaus.firstseen)} />
          <Row lbl="Liczba szkodliwych URL" val={formatNumber(urlHaus.url_count)} />
        </>
      )}
      {typeof netApi.listed_now === 'boolean' && (
        <Row
          lbl="Baza przejętych stron NetAPI"
          val={!netApi.listed_now}
          yes={netApi.listed_ever ? 'Obecnie brak na liście' : 'Brak na liście'}
          no="Na liście"
          term="malware"
        />
      )}
      {netApi.listed_now && (
        <>
          <Row lbl="Na liście od" val={netApi.first_seen} />
          <Row lbl="Dopasowany wpis" val={netApi.matched_value} />
          {netApi.block_reason && <Row lbl="Powód" val={netApi.block_reason} />}
        </>
      )}
      {urlHaus.urls && (
        <Section title="Zgłoszone adresy URL" collapsible>
          {urlHaus.urls.map((urlResult: any) => {
            const rows = [
              { lbl: 'ID', val: urlResult.id },
              { lbl: 'Status', val: urlResult.url_status },
              { lbl: 'Data dodania', val: convertToDate(urlResult.date_added) },
              { lbl: 'Typ zagrożenia', val: urlResult.threat },
              { lbl: 'Zgłoszono przez', val: urlResult.reporter },
              {
                lbl: 'Czas usunięcia',
                val:
                  urlResult.takedown_time_seconds &&
                  `${formatNumber(urlResult.takedown_time_seconds)} s`,
              },
              { lbl: 'Larted', val: urlResult.larted },
              { lbl: 'Tagi', val: (urlResult.tags || []).join(', ') },
              { lbl: 'Odnośnik', val: urlResult.urlhaus_reference },
              { lbl: 'Ścieżka pliku', val: urlResult.url },
            ];
            return (
              <ExpandableRow
                key={urlResult.id}
                lbl={`${getPath(urlResult.url)} (${urlResult.id})`}
                rowList={rows}
              />
            );
          })}
        </Section>
      )}
    </Card>
  );
};

export default MalwareCard;
