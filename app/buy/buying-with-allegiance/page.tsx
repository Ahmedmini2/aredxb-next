import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard, CompareGrid, CallbackBlock } from '@/components/Cards';
import AwardsCarousel from '@/components/AwardsCarousel';

export const metadata: Metadata = {
  title: 'Buying with Allegiance — Dubai’s #1 Real Estate Agency',
  description: 'Buy with Allegiance Real Estate — the UAE’s #1 ranked agency. AED 10B+ in transactions, 5,000+ properties sold, 20+ languages. Award-winning advisors at every step.',
};

export default function BuyingWithAllegiancePage() {
  return (
    <>
      <HeroInner
        eyebrow="// Buying with Allegiance"
        title="Buy with the"
        titleAccent="UAE&rsquo;s #1"
        titleAfter="real estate agency."
        sub="AED 10 billion in transactions. 5,000+ properties sold. 20+ languages spoken. An award-winning team that pairs deep Dubai market expertise with unbiased, data-driven advice."
        ctas={[
          { href: '/properties?purpose=sale', label: 'Browse Properties' },
          { href: '/meet-the-team', label: 'Meet the team', variant: 'line' },
        ]}
        stats={[
          { num: 'AED 10B', label: 'Transactions' },
          { num: '4.9/5', label: 'Customer Rating' },
          { num: '20+', label: 'Languages Spoken' },
          { num: '5,000+', label: 'Properties Sold' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Why Allegiance" title="Real estate," titleAccent="reimagined" titleAfter="." sub="Allegiance Real Estate is a leading integrated real estate service provider headquartered in the UAE — consistently ranked the country's number one agency. We serve a diverse clientele from local and international backgrounds." />
          <p className="long-copy">What makes Allegiance truly exceptional is its innovative framework, meticulously designed to enhance the client experience. This distinctive approach equips clients with essential tools, unbiased guidance, and profound insights into specific locations &mdash; empowering them at every step of their real estate journey.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// What you get" title="Everything you need," titleAccent="in one place" titleAfter="." sub="Six reasons clients choose Allegiance over a traditional brokerage." />
          <div className="tools-grid">
            <ToolCard num="01" title="Experienced Team" body="A skilled team with deep expertise across Dubai's freehold market. We cover buying, selling, and managing every property type and serve international investors with up-to-date knowledge of local trends and requirements." mini={{ row: [['years_in_dubai', '10+'], ['international_clients', 'YES']] }} />
            <ToolCard num="02" title="Global Presence" body="Headquartered in Dubai with offices in Riyadh, Paris, Venice, and Limassol. We run roadshows in dozens of countries each year." mini={{ row: [['offices', '5 cities'], ['roadshows_since_2020', '200+']] }} />
            <ToolCard num="03" title="Award-Winning Agency" body="Multiple awards from Damac, Sobha, Emaar, and other top developers. Recognised year after year as a top-performing partner across UAE's major projects." mini={{ row: [['damac_top_broker', 'Q3 2024'], ['sobha_top_partner', '2024']] }} />
            <ToolCard num="04" title="Exclusive Inventory" body="Direct allocations from developers mean access to units other agencies cannot offer — with better pricing and earlier launch windows than the open market." mini={{ row: [['direct_allocation', 'YES'], ['pre_launch_access', 'YES']] }} />
            <ToolCard num="05" title="24/7 Availability" body="Our specialists work across time zones to support international clients around the clock. Whether you're in London, Tokyo, or New York, an advisor is always reachable." mini={{ row: [['response_time', '< 1 hour'], ['weekend_cover', 'YES']] }} />
            <ToolCard num="06" title="20+ Languages" body="Our team speaks English, Arabic, French, Russian, Mandarin, Spanish, German, Italian, Hindi, Urdu and more — making it easy to do business in your native language." mini={{ row: [['languages', '20+'], ['nationalities_served', '60+']] }} />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// The difference" title="Traditional brokerage vs." titleAccent="Allegiance" titleAfter="." sub="Why clients consistently choose us over the conventional Dubai brokerage experience." />
          <CompareGrid
            bad={{
              title: 'Traditional brokerage',
              tag: 'SLOW',
              items: [
                'Generic property lists with no insight into investment fit.',
                'Limited inventory, often dependent on portals.',
                'One-size-fits-all sales approach with biased recommendations.',
                'Advisors available only in office hours, single language.',
                'No post-purchase support or property management.',
                'Limited international roadshows or global reach.',
              ],
            }}
            good={{
              title: 'Allegiance',
              tag: '+1st CHOICE',
              items: [
                'Personalized matching based on yield, ticket size, and risk profile.',
                'Direct developer allocations — pre-launch and exclusive units.',
                'Unbiased advice backed by data and 300+ Dubai market signals.',
                '24/7 cover across time zones, 20+ languages spoken.',
                'End-to-end: purchase, handover, leasing, resale, exit strategy.',
                '5 international offices and 200+ roadshows since 2020.',
              ],
            }}
          />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Recognition" title="Award-winning," titleAccent="year after year" titleAfter="." sub="Allegiance Real Estate has earned prestigious industry awards and certificates in recognition of innovative service." />
          <AwardsCarousel />
        </div>
      </section>

      <CallbackBlock formTitle="Buying with Allegiance — Callback" heading="Talk to an" headingAccent="advisor" sub="Fill in your details and one of our experts will be in touch within the hour." benefits={['Get a consultation in minutes', '24x7 support from the team', 'Exposure to the right properties and communities']} />

      <FinalCTA title="Ready to find" titleAccent="your next property" description="Browse our curated freehold inventory or speak to an advisor today." ctaHref="/properties?purpose=sale" ctaLabel="Browse Properties" />
    </>
  );
}
