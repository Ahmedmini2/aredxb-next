import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { getBlogs } from '@/lib/sheets';

export const metadata: Metadata = {
  title: 'Media — Latest Dubai Real Estate News & Insights | Allegiance',
  description: 'Allegiance Real Estate Media — the latest Dubai real estate news, market guides, area comparisons, lifestyle and investor insights from our editorial team.',
};

export default async function MediaPage() {
  const blogs = await getBlogs();
  // Sort newest first
  const sorted = blogs.slice().sort((a, b) => {
    const ad = new Date(a.createdate).getTime();
    const bd = new Date(b.createdate).getTime();
    if (!isNaN(ad) && !isNaN(bd)) return bd - ad;
    return String(b.createdate).localeCompare(String(a.createdate));
  });

  return (
    <>
      <HeroInner
        eyebrow="// Media"
        title="Latest"
        titleAccent="news, guides"
        titleAfter="and insights."
        sub="A wide variety of informative articles on real estate in Dubai — market updates, area guides, lifestyle, business and the technology changing the way we buy, sell and invest."
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Articles" title="Browse" titleAccent="every article" titleAfter="." />

          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
              No articles available right now.
            </div>
          ) : (
            <div className="media-grid">
              {sorted.map((b) => (
                <Link key={b.id} className="media-card" href={`/media/blog/${b.id}`}>
                  <div className="m-img" style={{ backgroundImage: `url('/images/media/${b.link}.webp')` }} />
                  <div className="m-body">
                    <div className="m-meta">
                      {b.category && <span className="m-cat">{b.category}</span>}
                      {b.createdate && <span>{b.createdate}</span>}
                    </div>
                    <h3>{b.title}</h3>
                    <span className="m-cta">Read article <i className="fa fa-angle-right" /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTA title="Want to be the" titleAccent="first to know" description="Subscribe to our newsletter for the latest Dubai real estate insights — straight to your inbox." ctaHref="/contact" ctaLabel="Talk to an advisor" />
    </>
  );
}
