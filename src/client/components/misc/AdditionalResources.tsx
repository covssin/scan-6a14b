import styled from '@emotion/styled';
import colors from 'client/styles/colors';
import { Card } from 'client/components/Form/Card';
import type { CategoryId } from '@/data/categories';

const ResourceListOuter = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  li a.resource-wrap {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: ${colors.background};
    border-radius: 8px;
    text-decoration: none;
    color: ${colors.textColor};
    height: 100%;

    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    font-family: var(--font-mono);
    box-sizing: border-box;
    width: -moz-available;
    &:hover {
      border-color: ${colors.primary};
      a {
        opacity: 1;
      }
    }
  }
  img {
    width: 2.5rem;
    border-radius: 4px;
    margin: 0.25rem 0.1rem 0.1rem 0.1rem;
  }
  p,
  a {
    margin: 0;
  }
  .resource-link {
    color: ${colors.primaryIncreasedContrast};
    font-size: 0.9rem;
    transition: all 0.2s ease-in-out;
    text-decoration: underline;
    cursor: pointer;
  }
  .resource-title {
    font-weight: bold;
  }
  .resource-lower {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .resource-details {
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    .resource-description {
      color: ${colors.textColorSecondary};
      font-size: 0.9rem;
    }
  }
`;

const Note = styled.small`
  margin-top: 1rem;
  color: ${colors.textColorTertiary};
  display: block;
  a {
    color: ${colors.primaryIncreasedContrast};
  }
`;

const CardStyles = `
  margin: 0 auto;
  width: var(--page-width);
  position: relative;
  transition: all 0.2s ease-in-out;
  max-height: 100%;
`;

interface Resource {
  title: string;
  link: string;
  icon: string;
  description: string;
  searchLink?: string;
  categories: CategoryId[];
}

const resources: Resource[] = [
  {
    title: 'Hudson Rock',
    link: 'https://hudsonrock.com/free-tools/?=webcheck',
    icon: 'https://pixelflare.cc/alicia/icons/hudson-rock.png/w128',
    description: 'Wykrywa dane z infekcji typu infostealer powiązane z domenami i adresami e-mail',
    categories: ['security'],
  },
  {
    title: 'SSL Labs Test',
    link: 'https://ssllabs.com/ssltest/analyze.html',
    icon: 'https://pixelflare.cc/alicia/icons/qualys-ssl-labs.png/w128',
    description: 'Analizuje konfigurację SSL/TLS serwera i przyznaje jej ocenę',
    searchLink: 'https://www.ssllabs.com/ssltest/analyze.html?d={DOMAIN}',
    categories: ['security', 'server'],
  },
  {
    title: 'Virus Total',
    link: 'https://virustotal.com',
    icon: 'https://pixelflare.cc/alicia/icons/virustotal.png/w128',
    description: 'Sprawdza adres URL i domenę w kilkudziesięciu silnikach antywirusowych',
    searchLink: 'https://www.virustotal.com/gui/domain/{DOMAIN}',
    categories: ['security'],
  },
  {
    title: 'Shodan',
    link: 'https://shodan.io/',
    icon: 'https://pixelflare.cc/alicia/icons/shodan.png/w128',
    description: 'Wyszukiwarka urządzeń i serwerów podłączonych do internetu',
    searchLink: 'https://www.shodan.io/search/report?query={DOMAIN}',
    categories: ['security', 'server'],
  },
  {
    title: 'Archive',
    link: 'https://archive.org/',
    icon: 'https://pixelflare.cc/alicia/icons/internet-archive.png/w128',
    description: 'Przeglądaj archiwalne wersje witryny w Internet Archive',
    searchLink: 'https://web.archive.org/web/*/{URL}',
    categories: ['seo'],
  },
  {
    title: 'URLScan',
    link: 'https://urlscan.io/',
    icon: 'https://pixelflare.cc/alicia/icons/urlscan.png/w128',
    description: 'Skanuje adres URL i prezentuje szczegółową analizę techniczną strony',
    searchLink: 'https://urlscan.io/domain/{DOMAIN}',
    categories: ['security', 'privacy'],
  },
  {
    title: 'Sucuri SiteCheck',
    link: 'https://sitecheck.sucuri.net/',
    icon: 'https://pixelflare.cc/alicia/icons/sucuri.png/w128',
    description: 'Weryfikuje witrynę na czarnych listach i pod kątem znanych zagrożeń',
    searchLink: 'https://sitecheck.sucuri.net/results/{DOMAIN}',
    categories: ['security'],
  },
  {
    title: 'Domain Tools',
    link: 'https://whois.domaintools.com/',
    icon: 'https://pixelflare.cc/alicia/icons/domaintools.png/w128',
    description: 'Sprawdza dane rejestracyjne domeny w bazie WHOIS',
    searchLink: 'https://whois.domaintools.com/{DOMAIN}',
    categories: ['domain', 'privacy'],
  },
  {
    title: 'NS Lookup',
    link: 'https://nslookup.io/',
    icon: 'https://pixelflare.cc/alicia/icons/nslookup.png/w128',
    description: 'Podgląd rekordów DNS dla wybranej domeny',
    searchLink: 'https://www.nslookup.io/domains/{DOMAIN}/dns-records/',
    categories: ['domain', 'email'],
  },
  {
    title: 'DNS Checker',
    link: 'https://dnschecker.org/',
    icon: 'https://pixelflare.cc/alicia/icons/dns-checker.png/w128',
    description: 'Sprawdza globalną propagację rekordów DNS na wielu serwerach',
    searchLink: 'https://dnschecker.org/#A/{DOMAIN}',
    categories: ['domain'],
  },
  {
    title: 'Censys',
    link: 'https://search.censys.io/',
    icon: 'https://pixelflare.cc/alicia/icons/censys.png/w128',
    description: 'Wyszukuje hosty i usługi powiązane z domeną',
    searchLink: 'https://search.censys.io/search?resource=hosts&q={DOMAIN}',
    categories: ['security', 'server'],
  },
  {
    title: 'Page Speed Insights',
    link: 'https://developers.google.com/speed/pagespeed/insights/',
    icon: 'https://pixelflare.cc/alicia/icons/page-speed-insights.png/w128',
    description: 'Mierzy wydajność, dostępność i SEO strony na urządzeniach mobilnych oraz komputerach',
    searchLink: 'https://developers.google.com/speed/pagespeed/insights/?url={URL}',
    categories: ['performance', 'seo'],
  },
  {
    title: 'Built With',
    link: 'https://builtwith.com/',
    icon: 'https://pixelflare.cc/alicia/icons/built-with.png/w128',
    description: 'Identyfikuje technologie użyte do budowy strony',
    searchLink: 'https://builtwith.com/{DOMAIN}',
    categories: ['server', 'privacy'],
  },
  {
    title: 'DNS Dumpster',
    link: 'https://dnsdumpster.com/',
    icon: 'https://pixelflare.cc/alicia/icons/dnsdumpster.png/w128',
    description: 'Narzędzie rekonesansu DNS mapujące infrastrukturę na podstawie rekordów domeny',
    categories: ['domain', 'security'],
  },
  {
    title: 'BGP Tools',
    link: 'https://bgp.tools/',
    icon: 'https://pixelflare.cc/alicia/icons/bgp-tools.png/w128',
    description: 'Wyświetla dane routingu BGP w czasie rzeczywistym dla ASN, prefiksu lub DNS',
    searchLink: 'https://bgp.tools/dns/{DOMAIN}',
    categories: ['server', 'domain'],
  },
  {
    title: 'Similar Web',
    link: 'https://similarweb.com/',
    icon: 'https://pixelflare.cc/alicia/icons/similar-web.png/w128',
    description: 'Szacunkowe statystyki ruchu i zaangażowania użytkowników witryny',
    searchLink: 'https://similarweb.com/website/{DOMAIN}/',
    categories: ['seo'],
  },
  {
    title: 'Blacklist Checker',
    link: 'https://blacklistchecker.com/',
    icon: 'https://pixelflare.cc/alicia/icons/black-list-checker.png/w128',
    description: 'Sprawdza obecność domeny, IP lub adresu e-mail na głównych listach blokujących',
    searchLink: 'https://blacklistchecker.com/check?input={DOMAIN}',
    categories: ['security', 'email'],
  },
  {
    title: 'Cloudflare Radar',
    link: 'https://radar.cloudflare.com/',
    icon: 'https://pixelflare.cc/alicia/icons/cloudflare.png/w128',
    description: 'Analiza ruchu i danych technicznych domeny w Cloudflare Radar',
    searchLink: 'https://radar.cloudflare.com/domains/domain/{DOMAIN}',
    categories: ['seo'],
  },
  {
    title: 'Mozilla HTTP Observatory',
    link: 'https://developer.mozilla.org/en-US/observatory',
    icon: 'https://pixelflare.cc/alicia/icons/mozilla.png/w128',
    description:
      'Ocenia poziom bezpieczeństwa witryny na podstawie nagłówków HTTP i dobrych praktyk',
    searchLink: 'https://developer.mozilla.org/en-US/observatory/analyze?host={DOMAIN}',
    categories: ['security', 'privacy'],
  },
  {
    title: 'AbuseIPDB',
    link: 'https://abuseipdb.com/',
    icon: 'https://pixelflare.cc/alicia/icons/abuseipdb.png/w128',
    description: 'Sprawdza, czy domena lub adres IP były zgłaszane za nadużycia w sieci',
    searchLink: 'https://www.abuseipdb.com/check?query={DOMAIN}',
    categories: ['security', 'server'],
  },
  {
    title: 'IBM X-Force Exchange',
    link: 'https://exchange.xforce.ibmcloud.com/',
    icon: 'https://pixelflare.cc/alicia/icons/ibm-x-force-exchange.png/w128',
    description: 'Baza wiedzy o zagrożeniach i reputacji adresów URL oraz IP',
    searchLink: 'https://exchange.xforce.ibmcloud.com/url/{URL_ENCODED}',
    categories: ['security'],
  },
  {
    title: 'URLVoid',
    link: 'https://urlvoid.com/',
    icon: 'https://pixelflare.cc/alicia/icons/urlvoid.png/w128',
    description: 'Weryfikuje reputację strony w ponad 30 serwisach bezpieczeństwa',
    searchLink: 'https://urlvoid.com/scan/{DOMAIN}',
    categories: ['security'],
  },
  {
    title: 'URLhaus',
    link: 'https://urlhaus.abuse.ch/',
    icon: 'https://pixelflare.cc/alicia/icons/urlhaus.png/w128',
    description: 'Sprawdza, czy strona figuruje w bazie złośliwych adresów URLhaus',
    searchLink: 'https://urlhaus.abuse.ch/browse.php?search={URL_ENCODED}',
    categories: ['security'],
  },
  {
    title: 'ANY.RUN',
    link: 'https://any.run/',
    icon: 'https://pixelflare.cc/alicia/icons/anyrun.png/w128',
    description: 'Interaktywne środowisko piaskownicy (sandbox) do analizy stron i złośliwego kodu',
    categories: ['security'],
  },
  {
    title: 'Blacklight',
    link: 'https://themarkup.org/blacklight',
    icon: 'https://pixelflare.cc/alicia/icons/the-markup.png/w128',
    description: 'Ujawnia trackery, pliki cookie i techniki śledzenia stosowane na stronie',
    searchLink: 'https://themarkup.org/blacklight?url={DOMAIN}',
    categories: ['privacy', 'security'],
  },
];

const makeLink = (resource: Resource, scanUrl: string | undefined): string => {
  return scanUrl && resource.searchLink
    ? resource.searchLink
        .replaceAll('{URL}', scanUrl.replace(/(https?:\/\/)?/i, ''))
        .replaceAll(
          '{URL_ENCODED}',
          encodeURIComponent(scanUrl.replace(/(https?:\/\/)?/i, '')).replace(
            /['\.*]/g,
            (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
          ),
        )
        .replaceAll(
          '{DOMAIN}',
          scanUrl.replace(/(https?:\/\/)?(www.)?/i, '').replace(/(\/.*)/i, ''),
        )
    : resource.link;
};

const AdditionalResources = ({
  url,
  categories,
}: {
  url?: string;
  categories?: CategoryId[];
}): JSX.Element | null => {
  const shown = categories
    ? resources.filter((r) => r.categories.some((c) => categories.includes(c)))
    : resources;
  if (!shown.length) return null;
  return (
    <Card heading="Zewnętrzne narzędzia do dalszej analizy" styles={CardStyles}>
      <ResourceListOuter>
        {shown.map((resource, index) => {
          return (
            <li key={index}>
              <a
                className="resource-wrap"
                target="_blank"
                rel="noreferrer"
                href={makeLink(resource, url)}
              >
                <p className="resource-title">{resource.title}</p>
                <span
                  className="resource-link"
                  onClick={() => window.open(resource.link, '_blank')}
                  title={`Otwórz: ${resource.link}`}
                >
                  {new URL(resource.link).hostname}
                </span>
                <div className="resource-lower">
                  <img src={resource.icon} alt="" />
                  <div className="resource-details">
                    <p className="resource-description">{resource.description}</p>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ResourceListOuter>
      <Note>
        Powyższe narzędzia zewnętrzne nie są powiązane ze SCAN_KMucha — korzystasz z nich na własną
        odpowiedzialność.
      </Note>
    </Card>
  );
};

export default AdditionalResources;
