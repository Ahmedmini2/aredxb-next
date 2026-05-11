import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard, CallbackBlock } from '@/components/Cards';
import AwardsCarousel from '@/components/AwardsCarousel';

export const metadata: Metadata = {
  title: 'Why Rent with Allegiance — Dubai Rentals Made Easy',
  description: 'Renting in Dubai — whether you’re a tenant looking for the right home or an owner looking for the right tenant. Allegiance handles every step.',
};

export default function WhyRentPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Renting with Allegiance"
        title="Rent with the"
        titleAccent="UAE&rsquo;s #1"
        titleAfter="real estate agency."
        sub="Whether you're looking to rent out your property or find one to live in, Allegiance is here to support every step. Right pricing, the right tenants, and zero paperwork hassle."
        ctas={[
          { href: '/properties?purpose=rent', label: 'Properties for Rent' },
          { href: '/sell/list-your-property', label: 'List Your Property', variant: 'line' },
        ]}
        stats={[
          { num: 'AED 10B', label: 'Transactions' },
          { num: '4.9/5', label: 'Customer Rating' },
          { num: '20+', label: 'Languages' },
          { num: '5,000+', label: 'Properties Sold' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// For owners" title="Rent your property out," titleAccent="the smart way" titleAfter="." sub="If you want to rent your property in Dubai, there are several steps to make the process smooth and successful — we handle them all." />
          <p className="long-copy"><strong>Set the right rental price.</strong> We research similar properties to determine a competitive, fair rental price &mdash; one that minimises vacancy without leaving money on the table.</p>
          <p className="long-copy"><strong>Advertise to the right tenants.</strong> Premium listings on portals, our own database of qualified tenants, and professional photography included.</p>
          <p className="long-copy"><strong>Screen carefully and execute.</strong> Background checks, employment verification, income confirmation. When we find the right fit, we draft the tenancy agreement and handle Ejari registration.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// For tenants" title="Looking to" titleAccent="rent" titleAfter="?" sub="If you're looking to rent a property in Dubai, follow these steps to find one that meets your needs and budget." />
          <p className="long-copy"><strong>Determine your budget and priorities.</strong> Decide on size, location, amenities and any features you need.</p>
          <p className="long-copy"><strong>Search efficiently.</strong> Browse online listings, contact our agents, ask friends and colleagues. Allegiance can show you properties that match your brief without you having to filter portal noise.</p>
          <p className="long-copy"><strong>Inspect carefully.</strong> When viewing a potential rental, check it for condition. Ask the landlord or property manager any questions about the rental process or the property itself.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// What we bring" title="Six things we do" titleAccent="differently" titleAfter="." sub="Whether you're renting in or renting out, here's what makes Allegiance worth the call." />
          <div className="tools-grid">
            <ToolCard num="01" title="Right Rental Pricing" body="Live data on actual rental rates in your community, by tower, by bedroom count. Owners list at the right price — tenants pay fair market rate." />
            <ToolCard num="02" title="Verified Tenants" body="Background checks, employment verification, income confirmation. Owners get peace of mind. Tenants get a transparent process from a RERA-registered agent." />
            <ToolCard num="03" title="20+ Languages" body="Our team speaks more than 20 languages. Whether you're an investor in London or a tenant from Tokyo, you'll always have someone who speaks your language." />
            <ToolCard num="04" title="Property Management" body="If you want hands-off ownership, our property management team handles maintenance, tenant queries, rent collection, renewals and Ejari." />
            <ToolCard num="05" title="End-to-End Paperwork" body="Tenancy contract drafted to RERA standards. Ejari registered. DEWA connections coordinated. Move-in checklist handled." />
            <ToolCard num="06" title="24/7 Availability" body="Maintenance emergency? Tenant query? Owner question? Our team is reachable across time zones, weekends, holidays." />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Recognition" title="Award-winning," titleAccent="year after year" titleAfter="." sub="Allegiance Real Estate has earned prestigious industry awards in recognition of innovative service." />
          <AwardsCarousel />
        </div>
      </section>

      <CallbackBlock formTitle="Why Rent with Allegiance — Callback" heading="Talk to a" headingAccent="rentals advisor" sub="Speak to our expert about renting your property, finding a place to live, or property management. Fill in your details and an advisor will be in touch within the hour." benefits={['Get a consultation in minutes', '24x7 support from the team', 'Right pricing & right tenants']} />

      <FinalCTA title="Ready to" titleAccent="rent" description="Browse rental listings or speak to an advisor about renting out your property." ctaHref="/properties?purpose=rent" ctaLabel="Properties for Rent" />
    </>
  );
}
