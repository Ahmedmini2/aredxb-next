import Link from 'next/link';
import { getRoadshows } from '@/lib/sheets';

function isUpcoming(rs: { enddate?: string }): boolean {
  if (!rs.enddate) return true;
  const d = new Date(rs.enddate);
  if (isNaN(d.getTime())) return true;
  return d >= new Date(new Date().toDateString());
}

export default async function RoadshowList({ filter }: { filter: 'upcoming' | 'previous' }) {
  const rows = await getRoadshows();
  const sorted = rows.slice().sort((a, b) => {
    const au = isUpcoming(a), bu = isUpcoming(b);
    if (au !== bu) return au ? -1 : 1;
    const ad = new Date(a.startdate).getTime() || 0;
    const bd = new Date(b.startdate).getTime() || 0;
    return au ? ad - bd : bd - ad;
  });
  const list = filter === 'upcoming' ? sorted.filter(isUpcoming) : sorted.filter((r) => !isUpcoming(r));

  if (!list.length) {
    const msg = filter === 'upcoming'
      ? 'No upcoming roadshows scheduled yet — check back soon.'
      : 'No previous roadshows on record.';
    return <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>{msg}</div>;
  }

  return (
    <>
      {list.map((r, i) => {
        const imgSlug = (r.link || '').replace(/\s+/g, '-').toLowerCase();
        const status = isUpcoming(r) ? 'upcoming' : 'previous';
        const statusLbl = isUpcoming(r) ? 'Upcoming' : 'Previous';
        return (
          <Link key={i} className="roadshow-card" href={`/contact?subject=${encodeURIComponent('Roadshow: ' + (r.location || ''))}`}>
            <div className="rs-img" style={{ backgroundImage: `url('/images/roadshows/${imgSlug}.webp')` }}>
              <span className={`rs-status ${status}`}>{statusLbl}</span>
            </div>
            <div className="rs-body">
              <h3>{r.location}</h3>
              <div className="rs-date">{r.startdate}{r.enddate ? ' — ' + r.enddate : ''}</div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
