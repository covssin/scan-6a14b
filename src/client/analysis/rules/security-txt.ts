import type { Analyzer, Result } from '../types';
import { daysUntil } from '../helpers';
import { formatNumber } from 'client/utils/format';

export const getField = (fields: Record<string, string> = {}, name: string) =>
  Object.entries(fields).find(([key]) => key.toLowerCase().replace(/\d+$/, '') === name)?.[1];

export const checkContact = (fields?: Record<string, string>): Result | null =>
  getField(fields, 'contact')
    ? null
    : {
        severity: 'issue',
        title: 'Plik security.txt nie zawiera pola Contact',
        detail: 'Pole Contact jest wymagane i wskazuje badaczom sposób zgłoszenia podatności',
      };

export const checkExpires = (fields?: Record<string, string>): Result | null => {
  const days = daysUntil(getField(fields, 'expires'));
  if (days === null) {
    return {
      severity: 'warning',
      title: 'Plik security.txt nie ma poprawnej daty Expires',
      detail: 'Pole Expires jest wymagane — ustaw datę krótszą niż rok do przodu, np. 2027-01-01T00:00:00Z',
    };
  }
  if (days < 0) {
    return {
      severity: 'warning',
      title: `Plik security.txt wygasł ${formatNumber(-days)} dni temu`,
      detail: 'Zaktualizuj treść pliku i przesuń datę Expires na przyszły termin',
    };
  }
  if (days > 366) {
    return {
      severity: 'info',
      title: 'Data ważności security.txt przekracza rok',
      detail: 'Zaleca się ustawienie Expires na mniej niż rok, aby regularnie weryfikować dane kontaktowe',
    };
  }
  return null;
};

const securityTxt: Analyzer = (d) => {
  if (!d.isPresent) {
    return [
      {
        severity: 'warning',
        title: 'Nie opublikowano pliku security.txt',
        detail: 'Dodaj plik /.well-known/security.txt z danymi kontaktowymi do zgłaszania luk',
      },
    ];
  }
  const out: ReturnType<Analyzer> = [{ severity: 'pass', title: 'Znaleziono plik security.txt' }];
  for (const check of [checkContact(d.fields), checkExpires(d.fields)]) {
    if (check) out.push(check);
  }
  if (!d.isPgpSigned) {
    out.push({
      severity: 'info',
      title: 'Plik security.txt nie jest podpisany kluczem PGP',
      detail: 'Podpisanie pliku pozwala badaczom potwierdzić jego autentyczność',
    });
  }
  return out;
};

export default securityTxt;
