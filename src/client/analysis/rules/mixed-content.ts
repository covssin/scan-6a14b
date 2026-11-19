import type { Analyzer } from '../types';

type Findings = ReturnType<Analyzer>;

const hosts = (urls: string[]) => [...new Set(urls.map((url) => new URL(url).hostname))].join(', ');

export const mixedFindings = (d: any): Findings => {
  if (!String(d.url).startsWith('https:')) return [];
  const { active = [], passive = [], forms = [] } = d;
  const count = active.length + passive.length + forms.length;
  if (!count) return [{ severity: 'pass', title: 'Brak mieszanej zawartości (HTTP) w kodzie HTML strony' }];
  if (d.upgradeInsecureRequests) {
    return [
      {
        severity: 'info',
        title: `CSP automatycznie podnosi ${count} zasobów HTTP do HTTPS`,
        detail: 'Ustawiono dyrektywę upgrade-insecure-requests',
      },
    ];
  }
  const out: Findings = [];
  if (active.length) {
    out.push({
      severity: 'issue',
      title: `Ładuje ${active.length} skrypt(ów), stylów lub ramek po nieszyfrowanym HTTP`,
      detail: `Przeglądarki blokują te zasoby, co może zepsuć działanie strony. Źródła: ${hosts(active)}`,
    });
  }
  if (passive.length) {
    out.push({
      severity: 'warning',
      title: `Ładuje ${passive.length} obraz(ów) lub plików multimedialnych po HTTP`,
      detail: `Źródła: ${hosts(passive)}`,
    });
  }
  if (forms.length) {
    out.push({
      severity: 'issue',
      title: `${forms.length} formularz(y) przesyła dane po nieszyfrowanym HTTP`,
      detail: `Wprowadzone dane są wysyłane otwartym tekstem do: ${hosts(forms)}`,
    });
  }
  return out;
};

export const integrityFindings = (d: any): Findings => {
  const { versioned = [], unversioned = [] } = d.missingIntegrity || {};
  const blocked: string[] = d.missingCrossorigin || [];
  const unhashed = [...versioned, ...unversioned];
  const out: Findings = [];
  if (d.integrityPolicy) {
    out.push(
      unhashed.length
        ? {
            severity: 'issue',
            title: `Integrity-Policy blokuje ${unhashed.length} zewnętrznych skryptów`,
            detail: `Brakuje im skrótu SRI, więc przeglądarka ich nie uruchomi. Źródła: ${hosts(unhashed)}`,
          }
        : { severity: 'pass', title: 'Integrity-Policy wymaga skrótu SRI dla każdego skryptu' },
    );
  } else {
    if (versioned.length) {
      out.push({
        severity: 'warning',
        title: `${versioned.length} wersjonowanych skryptów zewnętrznych bez SRI`,
        detail: `Stałe wersje plików powinny posiadać atrybut integrity. Źródła: ${hosts(versioned)}`,
      });
    }
    if (unversioned.length) {
      out.push({
        severity: 'info',
        title: `${unversioned.length} niewersjonowanych skryptów zewnętrznych bez SRI`,
        detail: `Dynamiczne skrypty mogą się zmieniać bez zapowiedzi. Źródła: ${hosts(unversioned)}`,
      });
    }
    if (!unhashed.length && !blocked.length && d.thirdPartyScripts > 0) {
      out.push({
        severity: 'pass',
        title: `Wszystkie zewnętrzne skrypty (${d.thirdPartyScripts}) posiadają SRI`,
      });
    }
  }
  if (blocked.length) {
    out.push({
      severity: 'issue',
      title: `${blocked.length} skrypt(ów) z SRI zablokowanych z powodu braku atrybutu crossorigin`,
      detail: `Przeglądarka wymaga CORS do weryfikacji skrótu SRI. Źródła: ${hosts(blocked)}`,
    });
  }
  return out;
};

const mixedContent: Analyzer = (d) =>
  Array.isArray(d.missingCrossorigin) ? [...mixedFindings(d), ...integrityFindings(d)] : [];

export default mixedContent;
