// Re-exports the editorial insight dataset from the legacy script as ES modules
// so Next.js pages can pull at build/render time. The source file mutates
// `window.AllegianceInsights` etc., so we evaluate it inside a sandbox-like
// scope here and re-export the shapes.

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export type InsightFaq = { q: string; a: string };
export type InsightComparison = { headers: string[]; rows: string[][] };
export type Insight = {
  slug: string;
  category: string;
  question: string;
  shortAnswer: string;
  keyData: { yield: string; tax: string; entry: string; holding: string };
  whyDubaiWorks: string[];
  comparison: InsightComparison;
  whoShouldInvest: string[];
  risks: string[];
  strategy: string[];
  faq: InsightFaq[];
};
export type Category = { slug: string; name: string };

let _categories: Category[] | null = null;
let _insights: Insight[] | null = null;

function load() {
  if (_categories && _insights) return;
  const file = path.resolve(process.cwd(), 'lib/insights-source.js');
  const src = fs.readFileSync(file, 'utf8');
  const sandbox: any = { window: {} };
  // The source uses `window.X = ...` pattern — emulate it
  const fn = new Function('window', src);
  fn(sandbox.window);
  _categories = sandbox.window.InsightCategories || [];
  _insights = sandbox.window.AllegianceInsights || [];
}

export function getInsights(): Insight[] {
  load();
  return _insights || [];
}
export function getCategories(): Category[] {
  load();
  return _categories || [];
}
export function getInsight(slug: string): Insight | undefined {
  load();
  return (_insights || []).find((i) => i.slug === slug);
}
export function getRelated(slug: string, limit = 3): Insight[] {
  load();
  const all = _insights || [];
  const me = all.find((i) => i.slug === slug);
  if (!me) return [];
  const sameCat = all.filter((i) => i.category === me.category && i.slug !== slug);
  const others = all.filter((i) => i.category !== me.category);
  function shuffle<T>(a: T[]): T[] { return a.slice().sort(() => Math.random() - 0.5); }
  return [...shuffle(sameCat), ...shuffle(others)].slice(0, limit);
}

// Render inline deep-link tokens like [[slug:foo|label]] as anchor tags
export function linkifyInsight(text: string): string {
  if (!text) return '';
  const escapeHtml = (s: string) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return String(text).split(/(\[\[slug:[a-z0-9-]+\|[^\]]+\]\])/g).map((part) => {
    const m = part.match(/^\[\[slug:([a-z0-9-]+)\|([^\]]+)\]\]$/);
    if (!m) return escapeHtml(part);
    return `<a class="insight-inline-link" href="/insights/${m[1]}">${escapeHtml(m[2])}</a>`;
  }).join('');
}
