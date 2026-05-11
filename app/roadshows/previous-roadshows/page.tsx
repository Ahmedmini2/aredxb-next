import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import RoadshowList from '@/components/RoadshowList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Previous Roadshows — Allegiance Real Estate',
  description: 'Previous Allegiance Real Estate roadshows around the world. 200+ roadshows since 2020 across the GCC, Europe, Asia and beyond.',
};

export default function PreviousRoadshowsPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Roadshows · Previous"
        title="Where we&rsquo;ve"
        titleAccent="been"
        titleAfter="."
        sub="Allegiance roadshows offer investors a unique opportunity to delve deeper into investment opportunities, engage with industry experts, assess market conditions, and carefully evaluate choices for making well-informed decisions."
        ctas={[
          { href: '/roadshows/future-roadshows', label: 'Upcoming Roadshows' },
          { href: '/roadshows/why-attend-allegiance-roadshows', label: 'Why Attend?', variant: 'line' },
        ]}
        stats={[
          { num: '200+', label: 'Roadshows since 2020' },
          { num: '60+', label: 'Countries Visited' },
          { num: '5,000+', label: 'Investors Met' },
          { num: 'AED 10B', label: 'Transactions' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead centered eyebrow="// Filter" title="Past" titleAccent="roadshows" titleAfter="." />

          <div className="roadshow-tabs">
            <span className="roadshow-tab active">All / Previous</span>
            <Link className="roadshow-tab" href="/roadshows/future-roadshows">&larr; Upcoming</Link>
          </div>

          <div className="roadshows-grid">
            <RoadshowList filter="previous" />
          </div>
        </div>
      </section>

      <FinalCTA title="Coming up" titleAccent="next" description="See where we'll be visiting in the coming months." ctaHref="/roadshows/future-roadshows" ctaLabel="Upcoming Roadshows" />
    </>
  );
}
