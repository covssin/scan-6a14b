import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import colors from 'client/styles/colors';
import { REQUIRED } from 'client/analysis/rules/social-tags';

const cardStyles = `
  .banner-image img {
    width: 100%;
    border-radius: 4px;
    margin: 0.5rem 0;
  }
  .color-field {
    border-radius: 4px;
    &:hover {
      color: ${colors.primaryIncreasedContrast};
    }
  }
`;

const OgBanner = ({ ogImage, ogUrl }: { ogImage: string; ogUrl?: string }): JSX.Element => {
  const urlCover = ogImage.startsWith('/') && ogUrl ? `${ogUrl}${ogImage}` : ogImage;
  return (
    <div className="banner-image">
      <img src={urlCover} alt="Banner" />
    </div>
  );
};

const SocialTagsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const tags = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {tags.title && <Row lbl="Tytuł" val={tags.title} />}
      {tags.description && <Row lbl="Opis" val={tags.description} />}
      {tags.keywords && <Row lbl="Słowa kluczowe" val={tags.keywords} />}
      {tags.canonicalUrl && <Row lbl="Adres kanoniczny" val={tags.canonicalUrl} />}
      {REQUIRED.map(([key, label]) => (
        <Row
          key={key}
          lbl={label}
          val={tags[key] || 'Brak'}
          status={tags[key] ? 'pass' : 'warning'}
          term={key === 'twitterCard' ? 'twitter-card' : 'open-graph'}
        />
      ))}
      {tags.themeColor && (
        <Row>
          <span className="lbl">Kolor motywu</span>
          <span className="val color-field" style={{ background: tags.themeColor }}>
            {tags.themeColor}
          </span>
        </Row>
      )}
      {tags.twitterSite && (
        <Row
          lbl="Profil X"
          val={tags.xHandle ? `@${tags.xHandle}` : tags.twitterSite}
          link={tags.xHandle && `https://x.com/${tags.xHandle}`}
        />
      )}
      {tags.author && <Row lbl="Autor" val={tags.author} />}
      {tags.publisher && <Row lbl="Wydawca" val={tags.publisher} />}
      {tags.generator && <Row lbl="Generator" val={tags.generator} />}
      {tags.ogImage && <OgBanner ogImage={tags.ogImage} ogUrl={tags.ogUrl} />}
    </Card>
  );
};

export default SocialTagsCard;
