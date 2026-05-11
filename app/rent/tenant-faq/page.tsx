import type { Metadata } from 'next';
import { HeroInner, FinalCTA } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Tenant FAQs — Allegiance Real Estate',
  description: "Frequently asked questions for Dubai tenants — security deposits, Ejari, eviction notice, rent caps, RERA disputes, and the rules every renter should know.",
};

const FAQS = [
  { q: "What documents do I need to rent in Dubai?", a: "A passport copy, residence visa copy, Emirates ID (front and back), and a cheque book. If your visa is still under process, your employer can provide a letter to the agent confirming this." },
  { q: "How much is the security deposit?", a: "5–10% of the annual rent — typically 5% for unfurnished and 10% for furnished. The deposit is refunded at the end of the tenancy, less any reasonable damages." },
  { q: "What's the agency fee?", a: "Typically 5–8% of the first annual rent, paid once at signing. Allegiance discloses the exact fee upfront before any viewing." },
  { q: "How many cheques do landlords typically accept?", a: "1 to 12 cheques. The fewer cheques, the better the rental rate negotiation. Most modern landlords now accept 2–4 cheques as standard." },
  { q: "What is Ejari and is it mandatory?", a: "Ejari is the official tenancy contract registration with the Real Estate Regulatory Agency (RERA). It is mandatory and required for visa renewals, school enrollment, DEWA accounts, and all official tenancy disputes. The fee is AED 220." },
  { q: "Can my landlord increase my rent?", a: "Yes, but only within the RERA Rent Calculator caps and with at least 90 days written notice before contract renewal. The cap is based on how far below the average market rate your current rent sits." },
  { q: "How much notice is required for eviction?", a: "12 months written notice via notary public or registered mail, and the landlord must have a valid reason as defined by Dubai Tenancy Law (selling, personal use, demolition, etc.)." },
  { q: "What is DEWA and how do I set it up?", a: "DEWA (Dubai Electricity and Water Authority) is the utility provider. Setup requires the DEWA number (on the property's side entry), passport copies, title deed, Form DEWA-A, and an AED 130 connection fee plus a refundable deposit (AED 2,000 for apartments, AED 4,000 for villas)." },
  { q: "Who pays for maintenance — landlord or tenant?", a: "Major maintenance (structural, AC compressor, water heater) is the landlord's responsibility. Minor maintenance (under AED 500–1,000 per incident, depending on contract) typically falls to the tenant." },
  { q: "Can I sublet my apartment?", a: "Only with the landlord's written permission. Subletting without consent is grounds for eviction and a RERA penalty. For short-term rentals (Airbnb-style), you also need a Dubai Tourism (DTCM) holiday-home permit." },
];

export default function TenantFAQPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Tenant FAQs"
        title="Renting in Dubai,"
        titleAccent="answered"
        titleAfter="."
        sub="The most common questions Dubai tenants ask about deposits, Ejari, rent caps, eviction notice, DEWA setup, and the rules every renter should know."
        ctas={[
          { href: '/properties?purpose=rent', label: 'Properties for Rent' },
          { href: '/rent/tenants-guide', label: "Tenants' Guide", variant: 'line' },
        ]}
      />

      <section className="block">
        <div className="container">
          <div className="faq" style={{ maxWidth: 880 }}>
            {FAQS.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title="Still have a" titleAccent="question" description="Reach an Allegiance rental advisor — we&rsquo;ll get back to you within the hour." ctaHref="/contact" ctaLabel="Contact Us" />
    </>
  );
}
