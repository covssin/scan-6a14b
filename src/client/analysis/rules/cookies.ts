import type { Analyzer, Result } from '../types';

const parseCookies = (raw: unknown): Array<{ name: string; attrs: string[] }> => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((line) => {
      const parts = String(line).split(/;\s*/);
      const name = parts[0].split('=')[0].trim();
      const attrs = parts.slice(1).map((p) => p.split('=')[0].trim().toLowerCase());
      return { name, attrs };
    })
    .filter((c) => c.name);
};

export const checkCookie = (name: string, attrs: string[]): Result[] => {
  const out: Result[] = [];
  if (!attrs.includes('secure')) {
    out.push({ severity: 'issue', title: `Plik cookie „${name}” nie ma flagi Secure` });
  }
  if (!attrs.includes('httponly')) {
    out.push({ severity: 'warning', title: `Plik cookie „${name}” nie ma flagi HttpOnly` });
  }
  if (!attrs.includes('samesite')) {
    out.push({ severity: 'warning', title: `Plik cookie „${name}” nie ma flagi SameSite` });
  }
  return out;
};

const cookies: Analyzer = (d) => {
  const parsed = parseCookies(d.headerCookies);
  if (!parsed.length) return [];
  const out = parsed.flatMap(({ name, attrs }) => checkCookie(name, attrs));
  if (!out.length)
    out.push({ severity: 'pass', title: 'Wszystkie pliki cookie używają flag Secure/HttpOnly/SameSite' });
  return out;
};

export default cookies;
