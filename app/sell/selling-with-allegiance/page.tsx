import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard, CompareGrid, CallbackBlock } from '@/components/Cards';
import AwardsCarousel from '@/components/AwardsCarousel';

export const metadata: Metadata = {
  title: 'Sell with Allegiance — UAE’s #1 Real Estate Agency',
  description: 'Sell your Dubai property with the UAE’s #1 ranked agency. Right pricing, professional marketing, global buyer network and end-to-end paperwork — we handle it all.',
};

export default function SellingWithAllegiancePage() {
  return (
    <>
      <HeroInner
        eyebrow="// Selling with Allegiance"
        title="Sell with the"
        titleAccent="UAE&rsquo;s #1"
        titleAfter="real estate agency."
        sub="Right asking price. Professional marketing. Global buyer network. Paperwork, NOCs and transfers handled. We make selling simple, seamless, and faster than you'd expect."
        ctas={[
          { href: '/sell/book-valuation', label: 'Book a Valuation' },
          { href: '/sell/list-your-property', label: 'List Your Property', variant: 'line' },
        ]}
        stats={[
          { num: 'AED 10B', label: 'Transactions' },
          { num: '4.9/5', label: 'Customer Rating' },
          { num: '200+', label: 'Roadshows' },
          { num: '5,000+', label: 'Properties Sold' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Why list with us" title="Three reasons clients choose" titleAccent="Allegiance to sell" titleAfter="." sub="Listing your property with Allegiance Real Estate maximizes your sale value while making the process easier and more convenient." />
          <p className="long-copy"><strong>First, our agents have the knowledge and expertise to help you determine the right asking price.</strong> We provide market data and insights so you make informed pricing decisions &mdash; avoiding the trap of pricing too high or too low.</p>
          <p className="long-copy"><strong>Second, we market your property to potential buyers.</strong> We use our professional networks and connections to promote your property to a wider audience.</p>
          <p className="long-copy"><strong>Third, we handle the complex legal and administrative aspects.</strong> Paperwork, contracts, negotiations, NOCs, mortgage settlements, transfers &mdash; we navigate it all.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// What you get" title="A full-service" titleAccent="seller experience" titleAfter="." sub="Six things we bring to every listing — included as standard." />
          <div className="tools-grid">
            <ToolCard num="01" title="Accurate Pricing" body="An on-site analysis combined with live DLD transaction data, comparable sales, and rental yield benchmarks — so we land on the right number, not a guess." mini={{ row: [['price_basis', 'DLD comps'], ['onsite_visit', 'YES']] }} />
            <ToolCard num="02" title="Professional Marketing" body="Studio-quality photography, drone footage, and video walkthroughs included. Premium portal placement on Bayut, Property Finder, Dubizzle." mini={{ row: [['photo_shoot', 'INCLUDED'], ['video', 'INCLUDED']] }} />
            <ToolCard num="03" title="Global Buyer Network" body="200+ international roadshows since 2020 across Europe, GCC, Asia. We bring qualified international buyers directly to your listing." mini={{ row: [['roadshows', '200+'], ['countries', '60+']] }} />
            <ToolCard num="04" title="Negotiation Expertise" body="Experienced advisors negotiate on your behalf with data and comparable transactions to back the conversation — protecting your asking price." mini={{ row: [['data_backed', 'YES'], ['your_approval', 'EVERY STEP']] }} />
            <ToolCard num="05" title="Paperwork & NOCs" body="Form A, MOU/Form F, NOCs from developers, mortgage settlements, DEWA disconnection, DLD transfer — all coordinated by our conveyance team." mini={{ row: [['conveyance_team', 'INTERNAL'], ['your_paperwork', 'MINIMAL']] }} />
            <ToolCard num="06" title="Award-Winning Trust" body="Recognised by Damac, Sobha, Emaar and other top developers as a leading partner. 4.9/5 client rating across thousands of transactions." mini={{ row: [['damac_top_broker', '2024'], ['client_rating', '4.9/5']] }} />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// The difference" title="DIY/portal vs" titleAccent="Allegiance" titleAfter="." sub="What changes when you sell with a top-ranked agency vs. listing yourself or going through a low-effort broker." />
          <CompareGrid
            bad={{ title: 'Going it alone', tag: 'SLOW', items: [
              'Best-guess pricing based on portal listings, not closed transactions.',
              'Phone-quality photos, no video, low-priority portal placement.',
              "Local-only audience — you miss international buyers entirely.",
              'Negotiating with strangers, no leverage, no comps to back you.',
              'You handle Form A, MOU, NOC, mortgage settlements, DLD transfer.',
              'Months on market — sometimes years for harder properties.',
            ]}}
            good={{ title: 'Allegiance', tag: 'FAST', items: [
              'DLD-backed valuation — we land on a price that actually sells.',
              'Studio-quality photos & video, premium placement, buyer database.',
              '200+ international roadshows feed our pipeline directly.',
              'Experienced negotiators with data behind every counter-offer.',
              'Conveyance team handles every form, NOC, and DLD step end-to-end.',
              'Most listings sell in weeks, not months — at or above asking.',
            ]}}
          />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Recognition" title="Award-winning," titleAccent="year after year" titleAfter="." sub="Allegiance Real Estate has earned prestigious industry awards in recognition of innovative service." />
          <AwardsCarousel />
        </div>
      </section>

      <CallbackBlock formTitle="Selling with Allegiance — Callback" heading="Talk to a" headingAccent="seller&rsquo;s advisor" sub="Speak to our expert about selling, pricing, or property management. Fill in your details and our advisor will be in touch within the hour." benefits={['Get a consultation in minutes', '24x7 support from the team', 'Right pricing & right buyer pool']} />

      <FinalCTA title="Ready to" titleAccent="sell" description="Book a free, no-obligation valuation. We&rsquo;ll come to you." ctaHref="/sell/book-valuation" ctaLabel="Book a Valuation" />
    </>
  );
}
