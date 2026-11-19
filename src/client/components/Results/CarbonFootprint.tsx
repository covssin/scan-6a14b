import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { formatNumber } from 'client/utils/format';

// Fixed decimals, with the locale's separators
const fixed = (n: number, digits: number) => formatNumber(n, { digits });

const formatBytes = (n: number): string => {
  if (n >= 1048576) return `${fixed(n / 1048576, 2)} MB`;
  if (n >= 1024) return `${fixed(n / 1024, 2)} KB`;
  return `${fixed(n, 0)} B`;
};

const formatGrams = (g: number): string => {
  if (g >= 1000) return `${fixed(g / 1000, 2)} kg`;
  if (g >= 1) return `${fixed(g, 2)} g`;
  return `${fixed(g * 1000, 2)} mg`;
};

const formatKwh = (kwh: number): string => {
  if (kwh >= 1) return `${fixed(kwh, 3)} kWh`;
  if (kwh >= 0.001) return `${fixed(kwh * 1000, 3)} Wh`;
  return `${fixed(kwh * 1_000_000, 2)} mWh`;
};

const CarbonCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const carbons = props.data.statistics;
  const cleanerThan = props.data.cleanerThan;

  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {!carbons?.adjustedBytes && <p>Nie udało się obliczyć śladu węglowego dla tego hosta</p>}
      {carbons?.adjustedBytes > 0 && (
        <>
          {props.data.bytes > 0 && (
            <Row lbl="Początkowy rozmiar HTML" val={formatBytes(props.data.bytes)} />
          )}
          <Row lbl="Skorygowany transfer danych" val={formatBytes(carbons.adjustedBytes)} />
          <Row lbl="Emisja CO2 na odsłonę" val={formatGrams(carbons.co2.grid.grams)} />
          <Row lbl="Zużycie energii na odsłonę" val={formatKwh(carbons.energy)} />
          {cleanerThan > 0 && (
            <Row lbl="Czystsza niż średnia stron (szac.)" val={`${cleanerThan}%`} />
          )}
        </>
      )}
      <Note>
        Obliczono przy użyciu modelu{' '}
        <a
          href="https://sustainablewebdesign.org/estimating-digital-emissions"
          target="_blank"
          rel="noreferrer"
        >
          Sustainable Web Model v4
        </a>
      </Note>
    </Card>
  );
};

export default CarbonCard;
