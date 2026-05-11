import type { Metadata } from 'next';
import Link from 'next/link';
import { getProperties } from '@/lib/properties';
import PropertiesListing from '@/components/PropertiesListing';

export const revalidate = 600; // 10 minutes

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ purpose?: string }> }): Promise<Metadata> {
  const { purpose } = await searchParams;
  const isRent = purpose === 'rent';
  return {
    title: isRent
      ? 'Properties for Rent in Dubai — Allegiance Real Estate'
      : 'Properties for Sale in Dubai — Allegiance Real Estate',
    description: isRent
      ? 'Live rental inventory across Dubai — furnished and unfurnished, yearly and short-term apartments, villas and townhouses from the UAE\'s #1 ranked agency.'
      : "Live freehold inventory across Dubai — apartments, villas, townhouses and penthouses from the UAE's #1 ranked agency.",
  };
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ purpose?: string }> }) {
  const { purpose } = await searchParams;
  const isRent = purpose === 'rent';
  const full = await getProperties();
  // Strip fields the listing client doesn't read so they don't bloat the HTML hydration payload.
  const properties = full.map((p) => ({
    ...p,
    description_en: '',
    title_en: '',
    permit_number: '',
    geopoints: '',
    tower_name: '',
    city: '',
    bedrooms: p.bedroom,
    area: p.size,
    photo: { url: (p.photo?.url || []).slice(0, 1) },
    agent: { name: '', phone: p.agent.phone, email: p.agent.email, photo: '' },
  }));

  return (
    <>
      <header className="hero props-hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="container hero-inner" style={{ textAlign: 'left' }}>
          <div className="crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>{isRent ? 'Properties for Rent' : 'Properties for Sale'}</span>
          </div>
          <h1>
            Properties <em>{isRent ? 'for Rent' : 'for Sale'}</em>.
          </h1>
          <p>
            {isRent
              ? 'Live rental inventory across Dubai — furnished and unfurnished, yearly and short-term.'
              : 'Live freehold inventory across Dubai — apartments, villas, townhouses and penthouses.'}
          </p>
        </div>
      </header>

      <PropertiesListing key={isRent ? 'rent' : 'sale'} properties={properties} initialPurpose={isRent ? 'rent' : 'sale'} />
    </>
  );
}
