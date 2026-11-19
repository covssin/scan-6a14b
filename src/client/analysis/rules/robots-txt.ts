import type { Analyzer } from '../types';

type Rule = { lbl: string; val: string };

export const AI_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'PerplexityBot',
  'CCBot',
  'Bytespider',
  'Meta-ExternalAgent',
];

const groupRules = (rules: Rule[]) => {
  const groups: { agents: string[]; rules: Rule[] }[] = [];
  for (const rule of rules) {
    const field = rule.lbl.toLowerCase();
    const last = groups[groups.length - 1];
    if (field === 'user-agent') {
      if (last && !last.rules.length) last.agents.push(rule.val.toLowerCase());
      else groups.push({ agents: [rule.val.toLowerCase()], rules: [] });
    } else if (last && (field === 'allow' || field === 'disallow')) {
      last.rules.push(rule);
    }
  }
  return groups;
};

export const blocksCrawler = (rules: Rule[], crawler: string) => {
  const groups = groupRules(rules);
  const named = groups.filter((group) => group.agents.includes(crawler.toLowerCase()));
  const applied = (named.length ? named : groups.filter((group) => group.agents.includes('*')))
    .flatMap((group) => group.rules)
    .map((rule) => `${rule.lbl.toLowerCase()} ${rule.val}`);
  const disallowed = applied.includes('disallow /') || applied.includes('disallow /*');
  return disallowed && !applied.includes('allow /');
};

const robotsTxt: Analyzer = (d) => {
  if (!d || !Array.isArray(d.robots) || !d.robots.length) return [];
  if (blocksCrawler(d.robots, 'Googlebot')) {
    return [
      {
        severity: 'warning',
        title: 'Plik robots.txt blokuje robotowi Google dostęp do całej strony',
        detail: 'Upewnij się, że to zamierzone — w przeciwnym razie witryna nie pojawi się w wynikach wyszukiwania Google',
      },
    ];
  }
  return [];
};

export default robotsTxt;
