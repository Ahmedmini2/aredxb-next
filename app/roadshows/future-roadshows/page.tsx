import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import RoadshowList from '@/components/RoadshowList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Future Roadshows — Allegiance Real Estate',
  description: 'Upcoming Allegiance Real Estate roadshows around the world — meet our advisors, discover Dubai investment opportunities, and book exclusive launches.',
};

export default function FutureRoadshowsPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Roadshows · Upcoming"
        title="Upcoming property"
        titleAccent="roadshows"
        titleAfter="."
        sub="Meet our advisors in your city. Allegiance roadshows give investors the opportunity to learn about new investment opportunities, connect with industry experts, and weigh their options to make informed decisions."
        ctas={[
          { href: '/roadshows/why-attend-allegiance-roadshows', label: 'Why Attend?' },
          { href: '/roadshows/previous-roadshows', label: 'Previous Roadshows', variant: 'line' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead centered eyebrow="// Filter" title="Coming up" titleAccent="soon" titleAfter="." />

          <div className="roadshow-tabs">
            <Link className="roadshow-tab" href="/roadshows/previous-roadshows">All</Link>
            <span className="roadshow-tab active">Upcoming</span>
            <Link className="roadshow-tab" href="/roadshows/previous-roadshows">Previous &rarr;</Link>
          </div>

          <div className="roadshows-grid">
            <RoadshowList filter="upcoming" />
          </div>
        </div>
      </section>

      <FinalCTA title="Want us in" titleAccent="your city" description="Get in touch — we run private events for HNW clients and family offices." ctaHref="/contact" ctaLabel="Contact Us" />
    </>
  );
}
