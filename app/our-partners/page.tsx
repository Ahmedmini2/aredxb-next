import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Our Partners — Allegiance Real Estate',
  description: 'Our developer partners include Emaar, Damac, Nakheel, Sobha, Aldar, Meraas, Dubai Properties and more — bringing exclusive UAE inventory to clients worldwide.',
};

const PARTNERS = [
  { slug: 'emaar', name: 'Emaar', img: 'emaar.webp' },
  { slug: 'damac', name: 'Damac', img: 'damac.webp' },
  { slug: 'nakheel', name: 'Nakheel', img: 'nakheel.webp' },
  { slug: 'sobha', name: 'Sobha', img: 'sobha.webp' },
  { slug: 'aldar', name: 'Aldar', img: 'aldar.webp' },
  { slug: 'meraas', name: 'Meraas', img: 'meraas.webp' },
  { slug: 'dubai-properties', name: 'Dubai Properties', img: 'dubai-properties.webp' },
  { slug: 'majid-al-futtaim', name: 'Majid Al Futtaim', img: 'majid-al-futtaim.webp' },
  { slug: 'arada', name: 'Arada', img: 'arada.webp' },
  { slug: 'azizi', name: 'Azizi', img: 'azizi.webp' },
  { slug: 'binghatti', name: 'Binghatti', img: 'binghatti.webp' },
  { slug: 'danube', name: 'Danube', img: 'danube.webp' },
  { slug: 'deyaar', name: 'Deyaar', img: 'deyaar.webp' },
  { slug: 'district-one', name: 'District One', img: 'district-one.webp' },
  { slug: 'ellington', name: 'Ellington', img: 'ellington.webp' },
  { slug: 'expo-city', name: 'Expo City', img: 'expo-city.webp' },
  { slug: 'habtoor-real-estate', name: 'Al Habtoor', img: 'habtoor-real-estate.webp' },
  { slug: 'imkan', name: 'Imkan', img: 'imkan.webp' },
  { slug: 'jumeirah-luxury', name: 'Jumeirah Luxury', img: 'jumeirah-luxury.webp' },
  { slug: 'mag', name: 'MAG', img: 'mag.webp' },
  { slug: 'nshama', name: 'Nshama', img: 'nshama.webp' },
  { slug: 'omniyat', name: 'Omniyat', img: 'omniyat.webp' },
  { slug: 'oro24', name: 'Oro24', img: 'oro24.webp' },
  { slug: 'samana-developers', name: 'Samana', img: 'samana-developers.webp' },
  { slug: 'seven-tides', name: 'Seven Tides', img: 'seven-tides.webp' },
  { slug: 'sls', name: 'SLS', img: 'sls.webp' },
  { slug: 'the-first-group', name: 'The First Group', img: 'the-first-group.webp' },
  { slug: 'tiger-properties', name: 'Tiger Properties', img: 'tiger-properties.webp' },
  { slug: 'aqua-properties', name: 'Aqua Properties', img: 'aqua-properties.webp' },
  { slug: 'falcon-city', name: 'Falcon City', img: 'falcon-city.webp' },
  { slug: 'grovy-real-estate', name: 'Grovy', img: 'grovy-real-estate.webp' },
  { slug: 'unique-properties', name: 'Unique Properties', img: 'unique-properties.webp' },
];

export default function OurPartnersPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Our Partners"
        title="The developers we"
        titleAccent="work with"
        titleAfter="."
        sub="Our partnerships give clients access to high-quality, well-designed properties that meet their specific needs — with direct allocations from the most reputable developers in the UAE: Emaar, Damac, Nakheel, Sobha, Aldar, Dubai Properties and many more."
        ctas={[
          { href: '/properties?purpose=sale', label: 'Browse Properties' },
          { href: '/contact', label: 'Talk to an advisor', variant: 'line' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Direct allocations" title="30+ developer" titleAccent="partners" titleAfter="." sub="Direct relationships mean better pricing, exclusive units, and earlier access than what's available on the open market." />
          <div className="partners-grid">
            {PARTNERS.map((p) => (
              <Link key={p.slug} href={`/properties?developer=${p.slug}`} className="partner-tile" data-name={p.name}>
                <img src={`/images/developers/${p.img}`} alt={p.name} loading="lazy" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Why partnerships matter" title="More inventory." titleAccent="Better terms." sub="A direct relationship with a developer changes the math for our clients." />
          <div className="tools-grid">
            <ToolCard num="01" title="Pre-Launch Access" body="Our partners give us early visibility into upcoming launches and EOIs — meaning our clients get to choose the best units before the public release." />
            <ToolCard num="02" title="Exclusive Inventory" body="Direct allocations of units that don't hit the open portals. If you can only get it from us, that usually means better pricing too." />
            <ToolCard num="03" title="Negotiated Terms" body="Better payment plans, waived service charges, post-handover terms — benefits we can negotiate because we move volume with our partners." />
            <ToolCard num="04" title="Project Intelligence" body="We know which developers deliver on time, which projects appreciate, and which to avoid." />
          </div>
        </div>
      </section>

      <FinalCTA title="Find a property from" titleAccent="any partner" description="Browse the full inventory across 30+ developers, or talk to an advisor about what&rsquo;s coming next." ctaHref="/properties?purpose=sale" ctaLabel="Browse Properties" />
    </>
  );
}
