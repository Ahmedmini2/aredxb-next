import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard, CallbackBlock } from '@/components/Cards';
import AwardsCarousel from '@/components/AwardsCarousel';

export const metadata: Metadata = {
  title: 'Why Allegiance — Award-Winning Dubai Real Estate Agency',
  description: 'Why Allegiance: an award-winning global real estate advisory headquartered in Dubai. AED 20B in transactions over 24 months, 4.9/5 client rating, offices in Dubai, Riyadh, Paris, Venice and Limassol.',
};

export default function WhyAllegiancePage() {
  return (
    <>
      <HeroInner
        eyebrow="// Why Allegiance"
        title="An"
        titleAccent="award-winning"
        titleAfter="real estate advisory."
        sub="Headquartered in Dubai. Trusted by clients in 60+ countries. Recognised year after year by the world&rsquo;s top developers as a leading partner across the UAE."
        ctas={[
          { href: '/meet-the-team', label: 'Meet the team' },
          { href: '/contact', label: 'Contact us', variant: 'line' },
        ]}
        stats={[
          { num: 'AED 20B', label: '24-Month Transactions' },
          { num: '4.9/5', label: 'Customer Rating' },
          { num: '200+', label: 'Roadshows since 2020' },
          { num: '5,000+', label: 'Properties Sold' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead
            eyebrow="// Vision & Mission"
            title="Real estate that&rsquo;s"
            titleAccent="simple, seamless, satisfying"
            titleAfter="."
            sub="Allegiance Real Estate is an integrated real estate service provider offering world-class service to individuals and institutional clients. Our vision is to be the preferred partner for all your Dubai real estate needs."
          />
          <p className="long-copy">The company&rsquo;s mission is to make your investment journey simple, seamless, and satisfying through an integrated platform that is data-driven and technically geared. Through our in-depth understanding of the world&rsquo;s real estate demand dynamics, we have achieved AED 20 billion in total sales in the last 24 months.</p>
          <p className="long-copy">While headquartered in the UAE, we have expanded internationally within the GCC, Middle East and Europe. With over 200 international roadshows since 2020, Allegiance Real Estate played a massive role in providing a realistic and bright image of Dubai &mdash; highlighting the welcoming environment that the Emirate provides for investors from all over the world.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead
            eyebrow="// Why we&rsquo;re #1"
            title="Six reasons clients"
            titleAccent="choose us"
            titleAfter="."
            sub="An award-winning global real estate advisory firm &mdash; here&rsquo;s why investors keep coming back."
          />
          <div className="tools-grid">
            <ToolCard num="01" title="Experienced Team" body="Skilled team with extensive expertise in Dubai's real estate market. Our knowledge spans buying, selling, and managing every property type. We cater to international investors and stay up-to-date with local market trends and requirements." mini={{ row: [['specialism', 'Dubai freehold'], ['international_clients', 'YES']] }} />
            <ToolCard num="02" title="Global Presence" body="Allegiance Real Estate is rapidly expanding its reach across the globe. From our HQ in Dubai, our operations have expanded to Paris, Venice, Riyadh and Cyprus." mini={{ row: [['offices', '5 cities'], ['monthly_events', 'YES']] }} />
            <ToolCard num="03" title="Award-Winning Agency" body="Allegiance is an award-winning real estate agency with numerous awards and certifications from various developers — Damac, Sobha, Emaar and many more recognising us year after year as a top-performing partner." mini={{ row: [['damac_q3_2024', 'TOP BROKER'], ['sobha_2024', 'TOP PARTNER']] }} />
            <ToolCard num="04" title="Exclusive Inventory" body="Allegiance provides exclusive units directly from developers — meaning better offers and earlier access compared to other real estate agencies." mini={{ row: [['direct_allocation', 'YES'], ['pre_launch', 'YES']] }} />
            <ToolCard num="05" title="24/7 Availability" body="Our specialists are available to clients 24x7 to provide the right marketing support. We deal with international clients on a daily basis across different time zones." mini={{ row: [['response_time', '< 1 hour'], ['weekend_cover', 'YES']] }} />
            <ToolCard num="06" title="20+ Languages" body="Our experienced team speaks more than 20 languages — helping clients from around the world easily communicate with us about all their queries." mini={{ row: [['languages', '20+'], ['nationalities', '60+']] }} />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// What sets us apart" title="What makes us" titleAccent="different" titleAfter="." sub="Our commitment to providing exceptional service and creating a personalized experience for each of our clients." />
          <div className="tools-grid">
            <ToolCard num="A" title="Specialists in Dubai" body="We have a team of specialists with in-depth knowledge of each developer and their products. Our specialists are equipped with the expertise to guide customers through the complex real estate market and ensure they make informed decisions." />
            <ToolCard num="B" title="Unparalleled Experience" body="Our team's combined experience spans various industries and market segments — allowing us to provide a unique perspective. We leverage this expertise to stay ahead of market trends, identify potential opportunities, and provide customised solutions that meet client needs." />
            <ToolCard num="C" title="Always Available" body="Active across all time zones with correct, real-time information about UAE properties. Whether you're an investor in London, Tokyo or New York, we're happy to serve clients all day — weekends and holidays included." />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Recognition" title="Award-winning," titleAccent="year after year" titleAfter="." sub="Allegiance Real Estate has earned prestigious industry awards and certificates in recognition of innovative service. Our unwavering commitment to excellence has cemented our position as a distinguished and reputable leader in the industry." />
          <AwardsCarousel />
        </div>
      </section>

      <CallbackBlock
        formTitle="Why Allegiance — Callback"
        heading="Talk to an"
        headingAccent="advisor"
        sub="Fill in your details and one of our experts will be in touch within the hour."
        benefits={['Get a consultation in minutes', '24x7 support from the team', 'Exposure to the right properties and communities']}
      />

      <FinalCTA title="Work with the" titleAccent="UAE&rsquo;s #1" description="5,000+ properties sold. AED 20B in transactions. One advisor away." ctaHref="/contact" ctaLabel="Contact Us" />
    </>
  );
}
