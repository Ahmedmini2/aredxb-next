import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard, CallbackBlock } from '@/components/Cards';
import AwardsCarousel from '@/components/AwardsCarousel';

export const metadata: Metadata = {
  title: 'Why Attend Allegiance Roadshows — UAE’s #1 Real Estate Agency',
  description: 'Why attend an Allegiance Real Estate roadshow: exclusive launches, direct developer inventory, special pricing, and unbiased advice from the UAE’s #1 ranked agency.',
};

export default function WhyAttendPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Roadshows"
        title="Why attend"
        titleAccent="an Allegiance roadshow"
        titleAfter="?"
        sub="200+ roadshows in 60+ countries since 2020. Allegiance is the global real estate advisory bringing Dubai's best opportunities directly to investors — with exclusive discounts, direct developer inventory, and unbiased advice."
        ctas={[
          { href: '/roadshows/future-roadshows', label: 'View upcoming roadshows' },
          { href: '/contact', label: 'Talk to an advisor', variant: 'line' },
        ]}
        stats={[
          { num: '200+', label: 'Roadshows' },
          { num: '60+', label: 'Countries' },
          { num: 'AED 10B', label: 'Transactions' },
          { num: '4.9/5', label: 'Client Rating' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Why us" title="The best global real estate" titleAccent="advisory" titleAfter="." sub="Allegiance has run over 200 roadshows in the past three years — the most active Dubai real estate roadshow programme in the industry." />
          <p className="long-copy">Our roadshows often offer exclusive discounts and incentives to attendees &mdash; an opportunity to secure a good deal on a property before it hits the open market.</p>
          <p className="long-copy">Allegiance provides direct inventory from the developer, which is an added advantage compared to other Dubai agencies. You see units before portals do, with pricing and payment plans negotiated directly with the developer&rsquo;s sales team.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// What you get" title="Six reasons to" titleAccent="show up" titleAfter="." sub="Whether you're a seasoned investor or buying your first Dubai property, here's what an Allegiance roadshow delivers." />
          <div className="tools-grid">
            <ToolCard num="01" title="Exclusive Launches" body="Pre-launch and EOI access to new developments before they go public. We bring the units; you pick the floor and view first." mini={{ row: [['pre_launch', 'YES'], ['eoi_priority', 'YES']] }} />
            <ToolCard num="02" title="Special Pricing" body="Roadshow-only discounts and payment plans negotiated directly with the developer. Often better than what hits the brokers later." mini={{ row: [['roadshow_discount', 'YES'], ['negotiated_terms', 'YES']] }} />
            <ToolCard num="03" title="Direct Developer Inventory" body="Our partnerships with Emaar, Damac, Sobha, Aldar and others mean you're seeing units allocated to us, not scraped from a portal." mini={{ row: [['developer_partners', '30+'], ['direct_allocation', 'YES']] }} />
            <ToolCard num="04" title="Unbiased Advice" body="Sit with an advisor who knows the Dubai market end-to-end. We'll tell you when a project doesn't fit your goals — not just push the closest deal." mini={{ row: [['advisors', '20+'], ['languages', '20+']] }} />
            <ToolCard num="05" title="Live Q&A" body="Ask the questions that matter for your situation: tax, mortgages, Golden Visa, exit strategy. Live, in-person, with an expert who has the data." />
            <ToolCard num="06" title="Network with Peers" body="Meet other serious investors. Share notes. Build connections. Some of our clients have built portfolios through introductions made at our events." />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Recognition" title="Award-winning," titleAccent="year after year" titleAfter="." sub="Allegiance Real Estate has earned prestigious industry awards in recognition of innovative service." />
          <AwardsCarousel />
        </div>
      </section>

      <CallbackBlock formTitle="Roadshows — Why Attend — Callback" heading="Bring a roadshow to" headingAccent="your city" sub="Hosting a private investor circle, a family office event, or a corporate session? We travel for serious audiences." benefits={['Get a consultation in minutes', '24x7 support from the team', 'Custom programmes for HNW circles & family offices']} extraFields={<input type="text" name="city" placeholder="City / region of interest" />} />

      <FinalCTA title="See where we&rsquo;ll be" titleAccent="next" description="Browse upcoming roadshows and reserve your seat." ctaHref="/roadshows/future-roadshows" ctaLabel="Upcoming Roadshows" />
    </>
  );
}
