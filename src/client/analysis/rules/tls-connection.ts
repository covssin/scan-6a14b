import type { Analyzer, Severity } from '../types';

const LEGACY: Record<string, string> = { TLSv1: 'TLS 1.0', 'TLSv1.1': 'TLS 1.1' };

export const protocolSeverity = (protocol: string): Severity | undefined => {
  if (/^SSLv|TLSv1(\.0)?$|TLSv1\.1/.test(protocol)) return 'critical';
  if (protocol === 'TLSv1.2') return 'info';
  if (protocol === 'TLSv1.3') return 'pass';
};

const tlsConnection: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  const protocol = String(d.protocol || '');
  const legacy = (d.versions || []).filter((v: string) => LEGACY[v]).map((v: string) => LEGACY[v]);
  const severity = protocolSeverity(protocol);

  if (severity === 'critical') {
    out.push({
      severity: 'critical',
      title: `Wynegocjowano przestarzały protokół TLS: ${protocol}`,
      detail: 'Wyłącz obsługę TLS 1.0 oraz TLS 1.1 na serwerze',
    });
  } else if (legacy.length) {
    out.push({
      severity: 'issue',
      title: `Serwer nadal akceptuje ${legacy.join(' oraz ')}`,
      detail: 'Przeglądarki wycofały te wersje w 2020 r. ze względu na znane słabości — wyłącz je',
    });
  }

  if (severity === 'info') {
    out.push({ severity: 'info', title: 'Używany jest TLS 1.2 — rozważ włączenie TLS 1.3' });
  } else if (severity === 'pass') {
    out.push({ severity: 'pass', title: 'Wynegocjowano TLS 1.3' });
  }

  if (d.forwardSecrecy === false) {
    out.push({
      severity: 'warning',
      title: 'Brak Forward Secrecy w wynegocjowanym szyfrze',
      detail: 'Preferuj zestawy szyfrów oparte na ECDHE lub DHE',
    });
  }

  if (d.ocspStapled === false) {
    out.push({
      severity: 'info',
      title: 'OCSP Stapling jest wyłączony',
      detail: 'Włącz OCSP Stapling, aby przyspieszyć weryfikację ważności certyfikatu',
    });
  }

  if (d.alpnProtocol === 'h2') {
    out.push({ severity: 'pass', title: 'Wynegocjowano HTTP/2 przez ALPN' });
  }

  return out;
};

export default tlsConnection;
