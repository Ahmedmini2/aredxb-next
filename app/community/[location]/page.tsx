import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCommunity, slugify } from '@/lib/sheets';
import { AdvisorCard } from '@/components/Cards';
import { FinalCTA } from '@/components/Hero';

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const c = await getCommunity(decodeURIComponent(location));
  return c
    ? { title: `${c.header} Area Guide | Allegiance Real Estate`, description: c.subheader || `${c.header} community guide — Allegiance Real Estate.` }
    : { title: 'Community Guide | Allegiance Real Estate' };
}

export default async function SingleCommunityPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const c = await getCommunity(decodeURIComponent(location));
  if (!c) return notFound();

  const slug = slugify(c.header);
  const imgSrc = `/images/areas/${slug}.webp`;
  const description = (c.description || '').trim();
  let bodyHtml = '';
  if (description) {
    if (description.indexOf('<') === 0) bodyHtml = description;
    else bodyHtml = description.split(/\n\s*\n/).map((p) => '<p>' + p.replace(/\n/g, '<br/>') + '</p>').join('');
  }

  return (
    <>
      <header className="hero community-hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="container">
          <Link href="/buy/dubai-communities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Geist Mono', monospace", fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 22 }}>
            <i className="fa fa-angle-left" /> All Communities
          </Link>
          <div className="eyebrow">// Area Guide</div>
          <h1 className="hero-title" style={{ textAlign: 'left', maxWidth: 920 }}>
            <em>{c.header}</em><br />area guide.
          </h1>
          {c.subheader && <p className="hero-sub" style={{ textAlign: 'left', marginLeft: 0 }}>{c.subheader}</p>}
          <div className="hero-cta-row" style={{ justifyContent: 'flex-start' }}>
            <Link href={`/properties?purpose=sale&community=${encodeURIComponent(slug)}`} className="btn btn-primary btn-lg">Properties for Sale</Link>
            <Link href={`/properties?purpose=rent&community=${encodeURIComponent(slug)}`} className="btn btn-line btn-lg">Properties for Rent</Link>
          </div>
          <img src={imgSrc} alt={c.header} className="community-cover" />
        </div>
      </header>

      <section>
        <div className="container">
          <div className="community-grid">
            <div>
              {bodyHtml ? (
                <div className="community-content" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              ) : (
                <div className="community-content">
                  <p>Community description coming soon. <Link href="/contact">Contact our advisors</Link> for the latest insights and inventory in {c.header}.</p>
                </div>
              )}
            </div>
            <aside className="blog-aside"><AdvisorCard /></aside>
          </div>
        </div>
      </section>

      <FinalCTA title="Looking in" titleAccent={c.header} description="Browse current freehold listings, or talk to an advisor for off-market opportunities." ctaHref="/properties?purpose=sale" ctaLabel="Browse Properties" />
    </>
  );
}
