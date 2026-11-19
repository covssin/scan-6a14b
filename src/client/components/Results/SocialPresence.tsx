import { faXTwitter, faBluesky, faGithub, faMastodon } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Card } from 'client/components/Form/Card';
import Row, { Section, type RowProps } from 'client/components/Form/Row';
import Icon from 'client/components/misc/Icon';
import { formatNumber } from 'client/utils/format';

const cardStyles = `
  h4 {
    gap: 0.5rem;
  }
  img.avatar {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    vertical-align: text-bottom;
    margin-right: 0.35rem;
  }
`;

const ICONS: Record<string, IconDefinition> = {
  X: faXTwitter,
  Bluesky: faBluesky,
  GitHub: faGithub,
  Mastodon: faMastodon,
};

const LABELS: Record<string, string> = { X: 'X (Twitter)' };

const verification = (profile: any): RowProps => {
  if (profile.checked === false) {
    return {
      val: 'Nieznana',
      status: 'info',
      reason: 'Nie udało się połączyć z serwisem, więc konto nie zostało zweryfikowane',
    };
  }
  if (!profile.exists) {
    return { val: false, reason: 'Ten identyfikator nie prowadzi do aktywnego konta' };
  }
  if (profile.domainVerified) {
    return {
      val: true,
      reason: 'Nazwa profilu odpowiada tej domenie, więc kontrola nad nią została potwierdzona',
    };
  }
  if (profile.linksBack) {
    return {
      val: true,
      reason: profile.websiteVerified
        ? 'Profil zawiera zweryfikowany link powrotny do tej witryny'
        : 'Profil zawiera link powrotny do tej witryny',
    };
  }
  return {
    val: false,
    status: 'warning',
    reason: profile.website
      ? `Profil wskazuje na inny adres: ${profile.website}`
      : 'Profil nie zawiera adresu strony internetowej do weryfikacji',
  };
};

const num = (value: any): string =>
  typeof value === 'number' ? formatNumber(value) : String(value);

const SocialPresenceCard = (props: {
  data: any;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const profiles: any[] = props.data || [];
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {profiles.map((profile) => (
        <Section
          key={`${profile.network}-${profile.handle}`}
          title={
            <>
              {ICONS[profile.network] && <Icon icon={ICONS[profile.network]} />}
              {LABELS[profile.network] || profile.network}
            </>
          }
        >
          <Row>
            <span className="lbl">Profil</span>
            <span className="val">
              <a target="_blank" rel="noreferrer" href={profile.url}>
                {profile.avatar && <img className="avatar" src={profile.avatar} alt="" />}@
                {profile.handle}
              </a>
            </span>
          </Row>
          {profile.name && <Row lbl="Nazwa" val={profile.name} />}
          {profile.joined && <Row lbl="Dołączył(a)" val={profile.joined} />}
          {profile.count !== undefined && (
            <Row
              lbl={profile.network === 'GitHub' ? 'Repozytoria' : 'Wpisy'}
              val={num(profile.count)}
            />
          )}
          {profile.followers !== undefined && <Row lbl="Obserwujący" val={num(profile.followers)} />}
          {profile.website && !profile.linksBack && <Row lbl="Strona WWW" val={profile.website} />}
          <Row lbl="Weryfikacja" term="social-verification" {...verification(profile)} />
        </Section>
      ))}
    </Card>
  );
};

export default SocialPresenceCard;
