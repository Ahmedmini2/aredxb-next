// Helpers for fetching Google Sheets CSVs at request time (server-side).
// Each function caches the response via Next's `revalidate` for ~10 minutes.

import Papa from 'papaparse';

const REVALIDATE_SECONDS = 600; // 10 min

const CSV_URLS = {
  blogs: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTn0oAMJeLFqTbSj_8MVVebrAluRU8-rWpxXbC7RY9Z4rRYIqQMRID-atEm9XZj-fWQBhEiM6VTHNp7/pub?gid=0&single=true&output=csv',
  team: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTn0oAMJeLFqTbSj_8MVVebrAluRU8-rWpxXbC7RY9Z4rRYIqQMRID-atEm9XZj-fWQBhEiM6VTHNp7/pub?gid=1639623629&single=true&output=csv',
  communities: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTn0oAMJeLFqTbSj_8MVVebrAluRU8-rWpxXbC7RY9Z4rRYIqQMRID-atEm9XZj-fWQBhEiM6VTHNp7/pub?gid=9962438&single=true&output=csv',
  roadshows: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTn0oAMJeLFqTbSj_8MVVebrAluRU8-rWpxXbC7RY9Z4rRYIqQMRID-atEm9XZj-fWQBhEiM6VTHNp7/pub?gid=1465917808&single=true&output=csv',
};

async function fetchCsv<T = Record<string, string>>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return [];
    const text = await res.text();
    const parsed = Papa.parse<T>(text, { header: true });
    return (parsed.data || []).filter((r: any) => r && Object.values(r).some(Boolean));
  } catch {
    return [];
  }
}

export type Blog = { id: string; title: string; link: string; createdate: string; category: string; body: string };
export type TeamMember = { name: string; position: string; language: string; phone: string; email: string; level: string };
export type Community = { id?: string; header: string; subheader?: string; description?: string; link?: string };
export type Roadshow = { link: string; location: string; startdate: string; enddate: string };

export async function getBlogs(): Promise<Blog[]> {
  const rows = await fetchCsv<Blog>(CSV_URLS.blogs);
  return rows.filter((r) => r.title && r.id);
}
export async function getBlog(id: string): Promise<Blog | undefined> {
  const all = await getBlogs();
  return all.find((b) => b.id === id);
}
export async function getTeam(): Promise<TeamMember[]> {
  const rows = await fetchCsv<TeamMember>(CSV_URLS.team);
  return rows.filter((r) => r.name);
}
export async function getCommunities(): Promise<Community[]> {
  const rows = await fetchCsv<Community>(CSV_URLS.communities);
  return rows.filter((r) => r.header);
}
export async function getCommunity(slug: string): Promise<Community | undefined> {
  const all = await getCommunities();
  const slugify = (s: string) => (s || '').trim().toLowerCase().split(' ').join('-');
  return all.find((c) => c.link === slug) || all.find((c) => slugify(c.header) === slugify(slug));
}
export async function getRoadshows(): Promise<Roadshow[]> {
  const rows = await fetchCsv<Roadshow>(CSV_URLS.roadshows);
  return rows.filter((r) => r.location);
}

export function slugify(s: string): string {
  return (s || '').trim().toLowerCase().split(' ').join('-');
}
