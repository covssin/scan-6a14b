import type { Analyzer, Result } from '../types';
import { daysUntil } from '../helpers';
import { formatNumber } from 'client/utils/format';

export const REASONS: Record<string, string> = {
  UNABLE_TO_VERIFY_LEAF_SIGNATURE: 'Serwer nie przesyła certyfikatu pośredniego (Intermediate CA)',
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY: 'Serwer nie przesyła certyfikatu pośredniego (Intermediate CA)',
  DEPTH_ZERO_SELF_SIGNED_CERT: 'Certyfikat samopodpisany (Self-Signed), niewydany przez zaufany urząd',
  SELF_SIGNED_CERT_IN_CHAIN: 'Łańcuch certyfikatów kończy się niezaufanym certyfikatem głównym',
  ERR_TLS_CERT_ALTNAME_INVALID: 'Certyfikat nie obejmuje tej nazwy domenowej',
};

export const checkExpiry = (validTo: unknown): Result | null => {
  const days = daysUntil(validTo);
  if (days === null || days > 30) return null;
  if (days < 0) {
    return {
      severity: 'critical',
      title: 'Certyfikat SSL wygasł',
      detail: `Wygasł ${formatNumber(-days)} dni temu`,
    };
  }
  if (days <= 7) {
    return {
      severity: 'critical',
      title: 'Certyfikat SSL wygasa w ciągu tygodnia',
      detail: `Wygasa za ${days} dni — odnów natychmiast`,
    };
  }
  if (days <= 14) {
    return {
      severity: 'issue',
      title: 'Certyfikat SSL wkrótce wygasa',
      detail: `Wygasa za ${days} dni — zaplanuj odnowienie`,
    };
  }
  return {
    severity: 'warning',
    title: 'Certyfikat SSL wymaga odnowienia w ciągu miesiąca',
    detail: `Wygasa za ${days} dni`,
  };
};

const ssl: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  if (d.isValid === false) {
    out.push({
      severity: 'critical',
      title: 'Nieprawidłowy certyfikat SSL',
      detail: REASONS[d.authError] || d.authError || 'Walidacja certyfikatu nie powiodła się',
    });
  } else if (d.isValid === true) {
    out.push({ severity: 'pass', title: 'Certyfikat SSL jest prawidłowy' });
  }
  const expiry = checkExpiry(d.valid_to);
  if (expiry) out.push(expiry);
  return out;
};

export default ssl;
