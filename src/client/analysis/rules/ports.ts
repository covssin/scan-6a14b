import type { Analyzer, Severity } from '../types';

export const RISKY: Record<number, [Severity, string]> = {
  21: ['warning', 'FTP (nieszyfrowany transfer plików)'],
  23: ['critical', 'Telnet (nieszyfrowana powłoka zdalna)'],
  25: ['info', 'SMTP (serwer pocztowy)'],
  110: ['warning', 'POP3 (nieszyfrowana poczta)'],
  143: ['warning', 'IMAP (nieszyfrowana poczta)'],
  3306: ['critical', 'MySQL wystawiony bezpośrednio do internetu'],
  3389: ['warning', 'RDP wystawiony bezpośrednio do internetu'],
  5900: ['warning', 'VNC wystawiony bezpośrednio do internetu'],
};

const ports: Analyzer = (d) => {
  if (!d || !Array.isArray(d.openPorts)) return [];
  const out: ReturnType<Analyzer> = [];
  for (const p of d.openPorts) {
    const port = Number(p);
    const known = RISKY[port];
    if (known) {
      out.push({
        severity: known[0],
        title: `Otwarty port ${port}: ${known[1]}`,
        detail: 'Zamknij port lub ogranicz dostęp na zaporze sieciowej, jeśli nie musi być publiczny',
      });
    }
  }
  return out;
};

export default ports;
