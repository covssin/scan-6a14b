import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import robotsTxt, { AI_CRAWLERS, blocksCrawler } from 'client/analysis/rules/robots-txt';

const cardStyles = `
  grid-row: span 2;
`;

const RobotsTxtCard = (props: {
  data: { robots: { lbl: string; val: string }[]; llmsTxt?: boolean };
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const { data } = props;
  const robots = data?.robots || [];
  const crawlers = AI_CRAWLERS.map((name) => ({
    lbl: name,
    val: blocksCrawler(robots, name) ? 'Zablokowany' : 'Dozwolony',
  }));
  const blocked = crawlers.filter((crawler) => crawler.val === 'Zablokowany').length;
  const [googleBlocked] = robotsTxt(data);

  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {robots.length === 0 && <p>Nie znaleziono reguł indeksowania.</p>}
      {robots.length > 0 && (
        <>
          <Row
            lbl="Wyszukiwarka Google"
            val={googleBlocked ? 'Zablokowana' : 'Dozwolona'}
            term="search-crawling"
            {...fromFinding(googleBlocked)}
          />
          <ExpandableRow
            lbl="Zablokowane roboty AI"
            val={`${blocked} z ${crawlers.length}`}
            rowList={crawlers}
          />
        </>
      )}
      {typeof data?.llmsTxt === 'boolean' && (
        <Row lbl="llms.txt" val={data.llmsTxt ? 'Znaleziono' : 'Nie znaleziono'} />
      )}
      {robots.map((row, index) => {
        return <Row key={`${row.lbl}-${index}`} lbl={row.lbl} val={row.val} />;
      })}
    </Card>
  );
};

export default RobotsTxtCard;
