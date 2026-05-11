import type { Metadata } from 'next';
import { HeroInner, FinalCTA } from '@/components/Hero';
import { GuideStep, AdvisorCard } from '@/components/Cards';

export const metadata: Metadata = {
  title: "Seller's Guide — How to Sell Property in Dubai",
  description: "The 10-step Allegiance Seller's Guide to selling property in Dubai — from preparation and pricing to MOU, NOC, and DLD transfer.",
};

export default function SellersGuidePage() {
  return (
    <>
      <HeroInner
        eyebrow="// Seller&rsquo;s Guide"
        title="A 10-step guide"
        titleAfter={"to "}
        sub="Want to sell your property? Get the right knowledge from our experts — or follow this complete walk-through, from preparation through to the final DLD transfer."
        ctas={[
          { href: '/properties?purpose=sale', label: 'Properties for Sale' },
          { href: '/sell/list-your-property', label: 'List Your Property', variant: 'line' },
        ]}
      />

      <section className="block">
        <div className="container">
          <div className="guide-grid">
            <div className="guide-steps">
              <GuideStep num={1} title="Presentation of your property">
                <p>If you want to sell your home quickly and for a higher price, prioritise making it look its best: fix any cracks, flaws, and maintenance issues, clean thoroughly, repaint if needed, tend to the garden.</p>
              </GuideStep>
              <GuideStep num={2} title="Conduct a full market analysis">
                <p>A real estate expert will conduct an on-site analysis of the current market and provide pricing suggestions based on property type, location, and development.</p>
                <p>Online tools like DXBinteract provide reliable information on previous transactions, rentals, and relevant data — helping you make informed pricing decisions.</p>
              </GuideStep>
              <GuideStep num={3} title="List your property with a good real estate firm">
                <p>You&rsquo;ll need to sign Form A (a contract by the Dubai Land Department) and share a copy of your passport or Emirates ID and your title deed. Form A is a contract between the seller and the broker outlining all requirements.</p>
              </GuideStep>
              <GuideStep num={4} title="Time to market your property">
                <p>Marketing is crucial. Listings with professional photos and descriptions, upgraded to a premium level, have a higher chance of selling within the first four weeks.</p>
                <p>Choose an agent with knowledge of various marketing platforms and access to premium tools that enhance exposure.</p>
              </GuideStep>
              <GuideStep num={5} title="Expose the property to prospective buyers">
                <p>Your property consultant will coordinate viewings with interested parties. Our expert will keep you updated on new leads and negotiate with prospective buyers on your behalf.</p>
              </GuideStep>
              <GuideStep num={6} title="Agreement between seller and buyer">
                <p>Once the buyer is interested, the price and terms of sale are negotiated. After consensus, both parties sign a Memorandum of Understanding (MOU / Form F).</p>
                <p>The 10% security deposit is typically retained by the agency until transfer.</p>
              </GuideStep>
              <GuideStep num={7} title="Are you a mortgage seller?">
                <p>Before the NOC can be issued, the buyer must pay off the seller&rsquo;s mortgage. Start the process with your bank or lender on the same day you sign the MOU.</p>
              </GuideStep>
              <GuideStep num={8} title="Apply for the NOC">
                <p>All parties gather at the developer&rsquo;s office to apply for a No Objection Certificate. The developer checks for any outstanding service charges or instalments. NOC fees are typically AED 500–5,000 + VAT.</p>
              </GuideStep>
              <GuideStep num={9} title="Disconnect the utilities">
                <p>Begin the procedure of disconnecting your utilities by speaking to DEWA (Dubai Electricity and Water Authority). Disconnection is typically done online and takes 24–48 hours.</p>
              </GuideStep>
              <GuideStep num={10} title="Time to hand over the keys">
                <p>Once the NOC is issued, all parties go to the DLD Trustee office to officially transfer ownership. Manager&rsquo;s cheques are required for the 4% transfer fee and an admin fee.</p>
                <p>After completion, a new title deed is issued in the buyer&rsquo;s name.</p>
              </GuideStep>
            </div>
            <aside><AdvisorCard /></aside>
          </div>
        </div>
      </section>

      <FinalCTA title="Ready to" titleAccent="sell" description="Book a no-obligation valuation. An advisor will come to you." ctaHref="/sell/book-valuation" ctaLabel="Book a Valuation" />
    </>
  );
}
