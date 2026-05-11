import { SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard, CompareGrid } from '@/components/Cards';
import HomeHero from '@/components/HomeHero';
import IntroSplash from '@/components/IntroSplash';
import DevelopersMarquee from '@/components/DevelopersMarquee';

export const metadata = {
  title: 'Allegiance Real Estate — Find Winning Properties in Seconds',
  description: 'Allegiance Real Estate — your AI property research agent. Find cash-flowing rentals, screen neighborhoods, and underwrite Dubai deals across 300+ market signals in one conversation.',
};

const DEALS = [
  { tag: 'BUY', title: '2 BR Apartment in Damac Lagoons', price: '2.7M AED', ago: '10 mins ago' },
  { tag: 'BUY', title: 'Studio in Dubai South Boulevard', price: '685K AED', ago: '38 mins ago' },
  { tag: 'BUY', title: '4 BR Villa in Arabian Ranches III', price: '5.85M AED', ago: '1 hr ago' },
  { tag: 'RENT', title: '1 BR in Dubai Marina — Marina Gate', price: '1.45M AED', ago: '2 hrs ago' },
  { tag: 'BUY', title: 'Penthouse at Bluewaters Residences', price: '14.2M AED', ago: '3 hrs ago' },
  { tag: 'OFF-PLAN', title: 'Townhouse in Tilal Al Ghaf — Aura', price: '3.95M AED', ago: '5 hrs ago' },
  { tag: 'BUY', title: '2 BR at Sobha Hartland Greens', price: '2.42M AED', ago: '6 hrs ago' },
  { tag: 'OFF-PLAN', title: '3 BR at Emaar Beachfront — Beach Vista', price: '6.1M AED', ago: '8 hrs ago' },
  { tag: 'BUY', title: 'Studio at JVC — Binghatti Crystals', price: '740K AED', ago: '11 hrs ago' },
];

const PROMPTS = [
  { rank: '01', text: 'Find me 1BR off-plan units in JVC under AED 900K with handover before 2027 and a payment plan past handover.', uses: '8,142 runs' },
  { rank: '02', text: 'Compare 5-year capital appreciation between Dubai Marina and Business Bay by tower.', uses: '6,327 runs' },
  { rank: '03', text: 'Which Damac Lagoons clusters have the strongest secondary-market velocity right now?', uses: '5,890 runs' },
  { rank: '04', text: 'Best beachfront units under AED 5M with projected net yield above 7% and a Golden-Visa-eligible price tag.', uses: '4,612 runs' },
  { rank: '05', text: 'Show me studios in Downtown with service charges below AED 18 per sqft and rental ROI above 6.5%.', uses: '3,755 runs' },
  { rank: '06', text: "What's the ideal exit window for a 2BR Sobha Hartland unit bought in 2024?", uses: '3,410 runs' },
];

const FAQS = [
  { q: 'Is Dubai a good investment market right now?', a: 'Yes. Dubai consistently ranks among the strongest property investment markets globally, offering 5–9% net rental yields, 0% personal income and capital gains tax, full freehold ownership for foreigners in designated zones and a USD-pegged currency that limits FX risk for international investors.' },
  { q: 'Are returns really tax-free?', a: 'Yes. The UAE imposes no personal income tax, no capital gains tax and no annual property tax on residential real estate. Recurring service charges still apply, but those are operating costs, not taxes.' },
  { q: 'Can I buy as a non-resident?', a: 'Yes. Non-residents of any nationality can purchase 100% freehold property in designated zones such as Downtown Dubai, Dubai Marina, Palm Jumeirah and most master-planned communities, with full title registered at the Dubai Land Department.' },
  { q: 'What is the typical entry budget?', a: 'AED 750K (around USD 200K) is the realistic entry point for a 1-bedroom apartment in a strong yielding community such as JVC or Dubai South, and is also the threshold for the renewable investor visa.' },
  { q: 'What ROI can I expect?', a: 'Net rental yields in Dubai typically run 5–9% depending on community and unit type, plus 4–8% annual capital appreciation in established freehold areas. Combined, total returns consistently outperform London, New York and Sydney on a tax-adjusted basis.' },
  { q: 'How does Alpha source data?', a: 'Alpha is wired into Dubai Land Department transactions, RERA service-charge registers, Reidin price indices, PropertyFinder and Bayut listings, plus a partner network of 200+ Dubai brokers feeding off-market inventory and pre-launch pricing.' },
  { q: 'Is off-plan or ready property the better entry?', a: "Off-plan typically wins on capital appreciation (handover-day premiums often run +20–35% versus launch price) and softer payment plans. Ready property wins on immediate yield and on financing terms. Alpha's Flip Window Calculator and Launch Timing Analyser help you decide which fits your hold period." },
  { q: 'Does buying property qualify me for the Golden Visa?', a: 'Yes. A property purchase with a value of AED 2 million or more qualifies the buyer for the 10-year UAE Golden Visa, with the visa renewable as long as the property is held. Mortgaged units now qualify subject to the standard down-payment threshold.' },
];

export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <HomeHero />
      <DevelopersMarquee />

      <section className="block" id="tools">
        <div className="container">
          <SectionHead eyebrow="// What Alpha can do" title="AI research, with" titleAccent="4 tools" titleAfter="." sub="Each one is a purpose-built agent. Ask once, get a verdict you can act on — not a list of links you have to read." />
          <div className="tools-grid">
            <ToolCard num="01" title="Exit Strategy" body="Plug in your acquisition price, hold period and target IRR. Alpha runs scenarios across the Dubai freehold market and tells you when to flip, refinance or hold for yield — with the comparable transactions to back the call." mini={{ row: [['scenarios_modeled', '1,284'], ['avg_irr_uplift', '+4.2pp'], ['verdict', 'HOLD → Y3']] }} />
            <ToolCard num="02" title="Is this the right property for you?" body="Paste a Bayut, PropertyFinder or developer brochure link. Alpha cross-checks comps, service charges, projected net yield and your stated thesis — then returns a verdict (buy, watch, skip) in under 90 seconds." mini={{ row: [['comps_checked', '62'], ['net_yield_est', '7.4%'], ['verdict', 'BUY']] }} />
            <ToolCard num="03" title="Flip Window Calculator" body="Tells you the optimal sell window for an off-plan unit. Combines handover dates, payment plans, secondary-market velocity in the same tower and historic launch-to-handover price curves to flag months with the highest probability of a profitable exit." mini={{ row: [['tower_velocity', 'HIGH'], ['peak_window', 'M+18 → M+22'], ['est_uplift', '+27%']] }} />
            <ToolCard num="04" title="Launch Timing Analyser" body="Pinpoints the ideal week to enter a new launch. Alpha tracks developer sales-velocity, broker pre-launch chatter and pricing trajectories from the last six comparable launches to tell you whether to buy in EOI, day-one launch or wait for the resale spillover." mini={{ row: [['launches_tracked', '318'], ['recommended_entry', 'EOI Day 1'], ['discount_vs_launch', '-9.6%']] }} />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// The old way is broken" title="Your investment is" titleAccent="costing you time" titleAfter="." sub="By the time you've cross-checked PropertyFinder, Bayut, dubizzle and called five brokers — the unit's already booked." />
          <CompareGrid
            bad={{ title: 'Without Alpha', tag: '3–5 days per shortlist', items: [
              'Six tabs open: PropertyFinder, Bayut, dubizzle, Reidin, Property Monitor, plus your spreadsheet.',
              '2–4 hours scrolling listings just to compile a shortlist of five units.',
              'Calling 8–12 brokers to find which towers actually have inventory left.',
              'Manually comparing service charges, sqft pricing and yields across every tower.',
              'No view on launch-to-handover appreciation by community or developer.',
              'Refreshing PropertyFinder every morning to spot price drops.',
              'Decision lag of 3–5 days. Best units are already off-market.',
            ] }}
            good={{ title: 'With Alpha', tag: '8 minutes per shortlist', items: [
              'One conversation. DLD transactions, MLS, broker partners and developer feeds unified.',
              'Ranked shortlist of 5 units delivered in under 8 minutes — with the thesis included.',
              'Off-market inventory surfaced from 200+ Dubai broker partners in real time.',
              'Net yield, service charges and sqft pricing computed per unit, side by side.',
              '7-year appreciation curves on every freehold tower in Dubai.',
              'Daily price-drop and new-launch alerts, scoped to your buy criteria.',
              "Decision in one sitting. You're first to put down the deposit.",
            ] }}
          />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Live from Salesforce" title="Real deals." titleAccent="Closed today" titleAfter="." sub="A live feed of transactions Allegiance investors closed using Alpha — pulled directly from our Salesforce pipeline." />
          <div className="deals-feed">
            {DEALS.map((d, i) => (
              <div className="deal" key={i}>
                <div className="deal-head"><span className="deal-tag">CLOSED</span><span>{d.tag}</span></div>
                <h4>{d.title}</h4>
                <div className="deal-meta">
                  <span className="price">{d.price}</span>
                  <span className="ago">{d.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="prompts">
        <div className="container">
          <SectionHead eyebrow="// What investors are asking" title="Top trending prompts on" titleAccent="Alpha" titleAfter="." sub="The questions Dubai property investors are asking Alpha right now. Click any prompt to run it on your own portfolio." />
          <div className="prompts">
            {PROMPTS.map((p, i) => (
              <div className="prompt" key={i}>
                <div className="prompt-rank">{p.rank}</div>
                <div className="prompt-body">
                  <div className="prompt-text">{p.text}</div>
                  <div className="prompt-meta">
                    <span className="uses">{p.uses}</span>
                    <span>last 30 days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="faq">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 36px' }}>
            <div className="eyebrow" style={{ display: 'inline-block' }}>// FAQ</div>
            <h2 className="section-h serif" style={{ margin: '0 auto 18px' }}>Frequently asked questions.</h2>
          </div>
          <div className="faq">
            {FAQS.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title="Stop researching. Start" titleAccent="buying" description="Your next deal is one question away." ctaHref="/#searchInput" ctaLabel="Ask Alpha" />
    </>
  );
}
