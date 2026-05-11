import type { Metadata } from 'next';
import { HeroInner, FinalCTA } from '@/components/Hero';
import { GuideStep, AdvisorCard } from '@/components/Cards';

export const metadata: Metadata = {
  title: "Buyer's Guide — How to Buy Property in Dubai",
  description: "The 9-step Allegiance Buyer's Guide to buying property in Dubai — budgeting, mortgage pre-approval, MOU, NOC, and DLD transfer.",
};

export default function BuyersGuidePage() {
  return (
    <>
      <HeroInner
        eyebrow="// Buyer&rsquo;s Guide"
        title="A 9-step guide"
        titleAfter={"to "}
        sub="Budgeting, mortgage pre-approval, finding the right agent, making an offer, MOU, NOC, and the final DLD transfer — everything you need to know before you buy."
        ctas={[
          { href: '/properties?purpose=sale', label: 'Properties for Sale' },
          { href: '/sell/list-your-property', label: 'List Your Property', variant: 'line' },
        ]}
      />

      <section className="block">
        <div className="container">
          <div className="guide-grid">
            <div className="guide-steps">
              <GuideStep num={1} title="Estimate how much you can afford">
                <p>Buyers must account for 2% agency fees and 4% DLD transfer fees on top of the purchase price. Planning a mortgage? You&rsquo;ll need a down payment of at least 25% of the property&rsquo;s purchase price.</p>
              </GuideStep>
              <GuideStep num={2} title="Get pre-approved as a finance buyer">
                <p>Pre-approval not only confirms your budget — it strengthens your purchasing position. The bank assesses your loan application and provides a letter announcing the approved loan amount, normally valid for 60 days.</p>
              </GuideStep>
              <GuideStep num={3} title="Find a professional real estate agent and company">
                <p>Seek out an experienced agency like Allegiance who is willing to work closely with you. Sharing detailed information during the preparatory phase significantly reduces the time it takes to find the perfect property.</p>
              </GuideStep>
              <GuideStep num={4} title="Start exploring properties">
                <p>Your real estate agent will act as a property consultant, identifying neighborhoods and homes for sale that meet your financial constraints and other criteria.</p>
              </GuideStep>
              <GuideStep num={5} title="Make an offer for the property">
                <p>We strongly recommend placing your offer in writing, including a copy of a cheque for the 10% deposit, plus copies of passports and Emirates IDs of all parties whose names will appear on the title deed.</p>
              </GuideStep>
              <GuideStep num={6} title="When you are satisfied with the offer, sign the MOU">
                <p>An MOU (Memorandum of Understanding, also referred to as Form F) will be drafted by the agency. Both parties sign, and the buyer hands over the cheque for the 10% deposit.</p>
              </GuideStep>
              <GuideStep num={7} title="The process of progressing through sales">
                <p>If financing with a mortgage, the bank performs an appraisal on the property and the lender provides a final offer letter before you can proceed.</p>
                <p>If the seller has a mortgage on the property, the buyer must pay off the seller&rsquo;s mortgage in full before applying for the NOC.</p>
              </GuideStep>
              <GuideStep num={8} title="Apply for the NOC">
                <p>To obtain a NOC for selling, all parties gather at the developer&rsquo;s office. The developer issues the NOC for a fee (typically AED 500–5,000 depending on the developer).</p>
              </GuideStep>
              <GuideStep num={9} title="The transfer of ownership">
                <p>Once the NOC is granted, ownership is transferred officially at the Dubai Land Department office. Payment is made via a manager&rsquo;s cheque payable to the seller on the transfer date.</p>
                <p>After completion, a new title deed is issued in the buyer&rsquo;s name.</p>
              </GuideStep>
            </div>
            <aside><AdvisorCard /></aside>
          </div>
        </div>
      </section>

      <FinalCTA title="Ready to" titleAccent="buy" description="Browse our curated freehold inventory or speak to an advisor today." ctaHref="/properties?purpose=sale" ctaLabel="Browse Properties" />
    </>
  );
}
