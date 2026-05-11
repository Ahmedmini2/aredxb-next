import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { getCommunities, slugify } from '@/lib/sheets';

export const metadata: Metadata = {
  title: 'Dubai Communities — Area Guides | Allegiance Real Estate',
  description: 'Explore every Dubai community: Downtown, Marina, Palm Jumeirah, Business Bay, JVC, Arabian Ranches, MBR City, Dubai Hills and more. Compare lifestyle, prices, yields and amenities.',
};

export default async function DubaiCommunitiesPage() {
  const communities = await getCommunities();

  return (
    <>
      <HeroInner
        eyebrow="// Dubai Communities"
        title="Explore Dubai&rsquo;s"
        titleAccent="communities"
        titleAfter="."
        sub="Dubai is a diverse metropolis with communities offering very different experiences. Whether you're looking for a bustling city centre or a peaceful suburban retreat, there's a community here that fits your needs."
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Browse by area" title="Every" titleAccent="community" titleAfter="we cover." />

          {communities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>// No communities loaded</div>
          ) : (
            <div className="communities-grid">
              {communities.map((c, i) => {
                const slug = slugify(c.header);
                const link = c.link || slug;
                const sub = (c.subheader || '').split(',')[0];
                return (
                  <Link key={i} className="community-card" href={`/community/${encodeURIComponent(link)}`}>
                    <div className="com-img" style={{ backgroundImage: `url('/images/areas/${slug}.webp')` }} />
                    <div className="com-body">
                      <h4>{c.header}</h4>
                      <div className="com-meta">
                        <span>Area Guide</span>
                        {sub && <span>{sub}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FinalCTA title="Not sure where to" titleAccent="start" description="An advisor can match the right community to your budget, lifestyle, and ROI goals." ctaHref="/contact" ctaLabel="Talk to an advisor" />
    </>
  );
}
