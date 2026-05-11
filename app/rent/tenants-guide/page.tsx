import type { Metadata } from 'next';
import { HeroInner, FinalCTA } from '@/components/Hero';
import { GuideStep, AdvisorCard } from '@/components/Cards';

export const metadata: Metadata = {
  title: "Tenants' Guide — How to Rent in Dubai | Allegiance",
  description: "The 9-step Allegiance Tenants' Guide to renting in Dubai — budget, viewings, MOU, tenancy contract, Ejari registration and DEWA setup.",
};

export default function TenantsGuidePage() {
  return (
    <>
      <HeroInner
        eyebrow="// Tenants&rsquo; Guide"
        title="Looking to rent"
        titleAfter={"a property in "}
        sub="Tenants in Dubai have the right to a safe and secure living environment, privacy, and peaceful enjoyment of their rental — plus timely repairs and maintenance. Here's your 9-step guide."
        ctas={[
          { href: '/properties?purpose=rent', label: 'Properties for Rent' },
          { href: '/sell/list-your-property', label: 'List Your Property', variant: 'line' },
        ]}
      />

      <section className="block">
        <div className="container">
          <div className="guide-grid">
            <div className="guide-steps">
              <GuideStep num={1} title="Determine what you can afford and what you require">
                <p>In Dubai, rent is paid in post-dated cheques throughout the contract length. Industry practice is 1–12 cheques, with better deals usually available for tenants paying in fewer cheques.</p>
                <p>Budget for these costs: Ejari fees (AED 220), Security deposit (5–10% of rent), Moving fees, Agency fee (typically 5–8% of first annual rent), DEWA fees.</p>
              </GuideStep>
              <GuideStep num={2} title="Explore the market for the right property">
                <p>Check internet resources and ask people you know. Find a knowledgeable agent who&rsquo;ll work with you to determine your needs and price range.</p>
              </GuideStep>
              <GuideStep num={3} title="Arrange property viewings with your agent">
                <p>Your agent will identify neighbourhoods and homes for rent that meet your financial constraints. Avoid viewing the same property with multiple brokers — multiple brokers contacting the same landlord may push expectations higher.</p>
              </GuideStep>
              <GuideStep num={4} title="Make an offer for the property">
                <p>Once you find the ideal residence, you&rsquo;ll make an offer. The offer covers price, number of cheques, start date, contract duration, and deposit amount.</p>
              </GuideStep>
              <GuideStep num={5} title="Check the terms of the lease agreement">
                <p>Once all parties agree, the tenancy agreement is drafted. Your RERA-registered agent will ensure the contract complies with Dubai&rsquo;s tenancy rules.</p>
              </GuideStep>
              <GuideStep num={6} title="Sign the agreement">
                <p>Once both parties are satisfied, the contract is signed. You&rsquo;ll hand over the rental cheques and the agency commission. Keys and access cards are then provided.</p>
              </GuideStep>
              <GuideStep num={7} title="Register on Ejari">
                <p>Ejari registration is mandatory. You&rsquo;ll need a copy of the Ejari Certificate for visa renewals, etc.</p>
              </GuideStep>
              <GuideStep num={8} title="Get your DEWA connections">
                <p>To get connected, send the DEWA number, passport copies, title deed, and Form DEWA-A. Activation typically takes place within 24 hours.</p>
              </GuideStep>
              <GuideStep num={9} title="Ready to move in?">
                <p>Some developers require an NOC before tenants can move in. Check building restrictions on day/time before booking your moving company. Inspect the property for problems and photograph any issues.</p>
              </GuideStep>
            </div>
            <aside><AdvisorCard ctaEyebrow="Looking to rent?" body="Whether you're a tenant or an owner, our team handles every step of the rental process — from search to signed Ejari." /></aside>
          </div>
        </div>
      </section>

      <FinalCTA title="Ready to" titleAccent="find your home" description="Browse rentals across every Dubai community." ctaHref="/properties?purpose=rent" ctaLabel="Properties for Rent" />
    </>
  );
}
