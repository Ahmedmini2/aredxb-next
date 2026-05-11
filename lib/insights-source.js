// Dubai Investment Insights dataset.
// Each insight powers the listing page, homepage cards, and the single insight page.
// Content is editorial guidance — confirm specific figures with Allegiance advisors.

window.InsightCategories = [
    { slug: 'basics',     name: 'Investment Basics' },
    { slug: 'budget',     name: 'Budget & Strategy' },
    { slug: 'comparison', name: 'Comparison' },
    { slug: 'timing',     name: 'Market Timing' },
    { slug: 'legal',      name: 'Buying & Legal' }
];

window.AllegianceInsights = [
    {
        slug: 'is-dubai-good-investment',
        category: 'basics',
        question: 'Is Dubai a Good Investment?',
        shortAnswer: 'Yes — Dubai is consistently one of the strongest property investment markets globally, offering 5–9% net rental yields, 0% personal income and capital gains tax, full freehold ownership for foreigners in designated zones, and a USD-pegged currency that limits FX risk.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            '0% personal income tax and 0% capital gains tax on rental returns and resale profits',
            'Net rental yields of 5–9%, materially higher than London, Singapore, New York and Sydney',
            'Long-run capital appreciation supported by population growth and infrastructure investment',
            'Liquid resale market with strong international and GCC investor demand',
            'Stable AED currency pegged to the US dollar at AED 3.6725, removing local FX volatility'
        ],
        comparison: {
            headers: ['Metric', 'Dubai', 'London', 'Singapore'],
            rows: [
                ['Net rental yield', '5–9%', '2–4%', '2–3%'],
                ['Property tax / income tax', '0%', '5–12% + income tax', '4–20% ABSD'],
                ['Foreign ownership', 'Full freehold', 'Yes', 'Restricted'],
                ['Time to close', '2–6 weeks', '8–16 weeks', '8–12 weeks']
            ]
        },
        whoShouldInvest: [
            'Investors prioritising rental yield and tax efficiency over pure capital growth',
            'GCC-based families wanting a UAE property foothold and Golden Visa eligibility',
            'International buyers diversifying out of higher-tax UK, EU or Australian markets',
            'Cash buyers comfortable with off-plan staggered payments to tier-1 developers'
        ],
        risks: [
            'Service charges vary 2x between buildings — always verify Mollak history before LOI',
            'Off-plan delivery delays in lower-tier developers can extend handover by 6–18 months',
            'Short-term price corrections can occur in submarkets with concentrated supply',
            'Currency mismatch risk if your income is in GBP, EUR or other non-USD currencies'
        ],
        strategy: [
            'Enter via tier-1 developers (Emaar, Damac, Nakheel, Sobha) in established communities',
            'Underwrite to 6%+ net yield after service charges, management fees and vacancy',
            'Hold 3–5 years minimum so transaction costs are amortised and compounding works',
            'Diversify between yielding apartments and capital-growth villas or branded residences'
        ],
        faq: [
            { q: 'Are returns really tax-free?', a: 'Yes. The UAE imposes no personal income tax, no capital gains tax and no annual property tax on residential real estate. Recurring service charges still apply, but those are operating costs, not taxes.' },
            { q: 'Can I buy as a non-resident?', a: 'Yes. Non-residents of any nationality can purchase 100% freehold property in designated zones such as Downtown Dubai, Dubai Marina, Palm Jumeirah and most master-planned communities, with full title registered at the Dubai Land Department.' },
            { q: 'What is the typical entry budget?', a: 'AED 750K (around USD 200K) is the realistic entry point for a 1-bedroom apartment in a strong yielding community such as JVC or Dubai South, and is also the threshold for the renewable investor visa. See [[slug:what-roi-expect|expected ROI by unit type]] and [[slug:golden-visa|Golden Visa requirements]] for more detail.' }
        ]
    },
    {
        slug: 'what-roi-expect',
        category: 'basics',
        question: 'What ROI Can I Expect?',
        shortAnswer: 'Net rental yields in Dubai typically run 5–9% depending on community and unit type, plus 4–8% annual capital appreciation in established freehold areas, giving total returns that consistently outperform London, New York and Sydney on a tax-adjusted basis.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Yields outperform London, New York, Singapore and Sydney by 200–600 basis points — see [[slug:rental-yield-by-area|net yields by community]]',
            'Zero tax drag on rental income — gross yield is close to net of fees and charges',
            'Short-term holiday-home rentals can lift effective yield to 9–12% in tourist zones',
            'Increasing service-charge transparency via RERA Mollak protects investor returns'
        ],
        comparison: {
            headers: ['Asset Class', 'Avg Net Yield', 'Avg Capital Growth', 'Total Return'],
            rows: [
                ['Studio / 1BR apartment', '7–9%', '5–8%', '12–17%'],
                ['2–3BR apartment', '6–7%', '5–7%', '11–14%'],
                ['Townhouse / villa', '5–6%', '6–10%', '11–16%'],
                ['Branded residences', '5–6%', '7–12%', '12–18%']
            ]
        },
        whoShouldInvest: [
            'Yield-focused investors building tax-efficient passive income portfolios',
            'Buyers replacing low-return cash or bond holdings with hard-asset cash flow',
            'Family offices and HNW clients rotating capital into MENA real assets'
        ],
        risks: [
            'Gross-vs-net yield gap: service charges, agency, vacancy and management can take 1–2%',
            'Vacancy risk in oversupplied micro-markets where competing handovers stack',
            'Property management quality varies — poor agents can erode 1–2% of yield annually'
        ],
        strategy: [
            'Underwrite using net yield, not gross — apply realistic occupancy and cost assumptions',
            'Stick to communities with 90%+ occupancy and stable tenant demand profiles',
            'Use furnished short-let in tourist-driven locations like Marina, Palm and Downtown — see [[slug:best-areas|the best areas to invest in Dubai]]'
        ],
        faq: [
            { q: 'Is short-term rental allowed?', a: 'Yes. Properties can operate as holiday homes once registered with Dubai Tourism (DTCM). Permits typically take 2–4 weeks and yields can exceed 10% for well-located furnished units.' },
            { q: 'Are yields stable across cycles?', a: 'The 5–9% range has held across the past five years in tier-1 communities. Yields compress slightly when prices rise faster than rents and expand when prices soften, but the band is materially stable.' }
        ,
            { q: 'Are gross and net yields very different?', a: 'Yes — the gap is typically 100–200 basis points. A 9% gross yield often becomes 7–7.5% net after service charges (AED 10–25/sqft), agency commission (~5% of annual rent), 5% municipality fee on rent, and realistic vacancy provision.' }
        ]
    },
    {
        slug: 'is-now-right-time',
        category: 'basics',
        question: 'Is Now the Right Time to Invest?',
        shortAnswer: 'Yes — Dubai\'s 2026 fundamentals are strong: net population growth above 5% per year, sustained Golden Visa-driven retention, a controlled supply pipeline managed by master developers, and a tourism rebound that supports both long-let and short-let rental demand.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Net population growth above 5% annually drives structural demand for housing',
            'Golden Visa programme retains residents long-term, deepening the tenant base',
            'Off-plan supply tightly controlled by master developers and government zoning',
            'Tourism rebound to record visitor numbers supports short-let yields',
            'Mortgage market remains conservative vs 2008 — lower system-level leverage'
        ],
        comparison: {
            headers: ['Indicator', 'Direction', 'Why it matters'],
            rows: [
                ['Population growth', 'Up', 'More tenants, deeper demand'],
                ['Tourism arrivals', 'Up', 'Drives short-let occupancy'],
                ['Mortgage rates', 'Stabilising', 'Improves buyer affordability'],
                ['Supply pipeline', 'Managed', 'Avoids 2008-style overhang'],
                ['Service-charge transparency', 'Improving', 'Lifts net yield visibility']
            ]
        },
        whoShouldInvest: [
            'Long-term holders with a 3+ year horizon, willing to ride short-cycle volatility',
            'Buyers comfortable with off-plan staggered payments and post-handover plans',
            'Investors expecting US rate cuts in the next cycle to support AED financing costs'
        ],
        risks: [
            'Short-term volatility likely in submarkets with concentrated 2026–2027 deliveries',
            'Global rate environment still affects mortgage cost via the AED-USD peg',
            'Some lower-tier off-plan launches may struggle if speculative demand softens'
        ],
        strategy: [
            'Lock prices via off-plan with post-handover payment plans to preserve cash',
            'Avoid speculation in untested communities without proven amenities or transit',
            'Buy on fundamentals — net yield, location, developer quality and macro tailwinds — see [[slug:market-cycles|where we are in the cycle]]'
        ],
        faq: [
            { q: 'Should I wait for prices to drop?', a: 'Tier-1 freehold communities rarely correct meaningfully outside of global shocks — see [[slug:crisis-investing|how Dubai recovers from crises]]. Time in market beats timing the market — averaging in over 6–12 months is a better strategy than waiting for a perfect entry.' },
            { q: 'Is the market overheated?', a: 'Some pockets, particularly speculative off-plan in non-prime areas, look frothy. Tier-1 ready inventory in Downtown, Marina, Hills and Palm remains rationally priced relative to yield and replacement cost.' }
        ,
            { q: 'How long should I plan to hold?', a: 'A minimum 3-year holding period is recommended so transaction costs (4% DLD plus 2% agency) are amortised across appreciation and rental income. Investors targeting Golden Visa or capital growth typically hold 5–7 years.' }
        ]
    },
    {
        slug: 'capital-appreciation',
        category: 'basics',
        question: 'What Capital Appreciation Can I Expect?',
        shortAnswer: 'Established Dubai freehold communities have averaged 6–10% annual capital appreciation over the past five years, with off-plan units in scarcity-driven locations like Palm Jumeirah and branded residences often delivering double-digit gains pre-handover.',
        keyData: { yield: '5–7%', tax: '0%', entry: 'AED 1M+', holding: '5–10 yrs' },
        whyDubaiWorks: [
            'Limited freehold land in tier-1 districts — see [[slug:best-areas|best areas to invest]] — creates structural scarcity',
            'Branded residences (Bulgari, Armani, Dorchester) hold a durable price premium',
            'Infrastructure expansion — metro, schools, retail — lifts adjacent communities',
            'Golden Visa demand concentrates buying into AED 2M+ inventory'
        ],
        comparison: {
            headers: ['Community', '5-yr avg appreciation', 'Driver'],
            rows: [
                ['Palm Jumeirah', '~12%/yr', 'Trophy / branded scarcity'],
                ['Downtown Dubai', '~7%/yr', 'Iconic address, liquidity'],
                ['Dubai Marina', '~6%/yr', 'Waterfront lifestyle'],
                ['Dubai Hills Estate', '~7%/yr', 'Family villa demand'],
                ['JVC', '~5%/yr', 'Yield-driven, depth of stock']
            ]
        },
        whoShouldInvest: [
            'Capital-growth investors with 5–10 year horizons and patient capital',
            'Buyers willing to underweight current yield in exchange for scarcity exposure',
            'Branded-residence collectors building a global trophy portfolio'
        ],
        risks: [
            'Short windows of 12–24 months can show flat or negative growth',
            'Off-plan flips depend on liquidity and sentiment at handover',
            'Lower-tier developers can underdeliver on the location or finish promised at launch'
        ],
        strategy: [
            'Buy genuine scarcity — waterfront, branded, golf-front, or metro-adjacent',
            'Avoid commodity stock unless your mandate is yield, not appreciation',
            'Refinance at handover to release equity into the next acquisition'
        ],
        faq: [
            { q: 'What drives appreciation?', a: 'A combination of scarcity (limited freehold land), infrastructure (transit, schools, retail), brand (developer or hotelier name), and net population growth pushing tenant and end-user demand higher each year.' }
        ,
            { q: 'Which communities have appreciated most?', a: 'Over the past five years, Palm Jumeirah villas have led with ~12%/year, followed by Dubai Hills Estate and Downtown Dubai at ~7%/year. Branded residences (Bulgari, Armani) have outperformed broader averages by 200–400 bps.' },
            { q: 'Does off-plan beat ready for appreciation?', a: 'Often yes pre-handover — see [[slug:off-plan-vs-ready|off-plan vs ready trade-offs]]. Well-located tier-1 off-plan can gain 20–40% from launch to handover in scarcity-driven projects. After handover, ready and off-plan converge to similar long-run growth rates.' }
        ]
    },
    {
        slug: 'where-invest-200k',
        category: 'budget',
        question: 'Where to Invest $200K?',
        shortAnswer: 'AED 750K (~USD 200K) opens up high-yield 1-bedroom apartments in JVC, Dubai South, Arjan and entry-level Business Bay, where modern stock, strong tenant demand and 7–9% net yields make it the most efficient entry point for first-time investors.',
        keyData: { yield: '7–9%', tax: '0%', entry: 'AED 750K', holding: '3–5 yrs' },
        whyDubaiWorks: [
            'High-yield zones still have inventory under AED 1M, despite recent appreciation',
            'Strong tenant demand from young professionals, GCC commuters and remote workers',
            'Newer stock with modern amenities — pool, gym, co-working, retail at the base',
            'AED 750K is also the threshold for the renewable 3-year investor visa — see [[slug:golden-visa|how to get the Golden Visa]]'
        ],
        comparison: {
            headers: ['Community', '1BR Entry', 'Net Yield', 'Tenant Profile'],
            rows: [
                ['JVC', 'AED 750K+', '7–9%', 'Young professionals'],
                ['Dubai South', 'AED 700K+', '7–8%', 'Aviation / logistics staff'],
                ['Arjan', 'AED 800K+', '7–8%', 'Healthcare district'],
                ['Business Bay (entry)', 'AED 1.2M+', '6–7%', 'Corporate']
            ]
        },
        whoShouldInvest: [
            'First-time investors testing the Dubai market with limited initial capital',
            'Yield-focused buyers prioritising cash flow over capital growth',
            'Buyers wanting cash-flow-positive units that self-fund mortgage payments'
        ],
        risks: [
            'Some sub-communities have weaker amenities, retail and transit access',
            'Service charges can erode yield meaningfully — verify Mollak history before LOI',
            'Resale liquidity is stronger in JVC than in more peripheral districts'
        ],
        strategy: [
            'Target completed or handing-over inventory rather than 4-year off-plan launches',
            'Furnish the unit for short-let to lift yield by 200–400 bps in tourist-friendly zones',
            'Buy in clusters with retail, F&B and metro or major-road access'
        ],
        faq: [
            { q: 'Cash or mortgage?', a: 'Cash buyers can typically negotiate 5–8% lower headline prices on completed inventory — see [[slug:minimum-investment|minimum investment thresholds]] and avoid 1% mortgage processing plus valuation fees, but mortgage buyers benefit from leverage when rental yield exceeds the borrowing rate.' }
        ,
            { q: 'What yields can I realistically achieve at this entry?', a: 'Net yields of 7–9% are realistic in JVC, Dubai South and Arjan for completed 1-bedroom stock, after factoring in service charges, agency fees and a 5–8% vacancy assumption.' },
            { q: 'Should I buy one bigger or two smaller?', a: 'Two smaller units typically deliver higher aggregate yield and tenant-base diversification, but a single larger unit has lower management overhead and better resale liquidity in slower cycles. Choose based on time available and risk preference.' }
        ]
    },
    {
        slug: 'minimum-investment',
        category: 'budget',
        question: 'What is the Minimum Investment?',
        shortAnswer: 'Studios in Dubai start from AED 450K cash, freehold 1-bedroom units from AED 700K, and mortgage buyers need 25–35% down depending on residency status, with all-in transaction fees adding roughly 7–10% on top of the headline price.',
        keyData: { yield: '7–9%', tax: '0%', entry: 'AED 450K', holding: '3–5 yrs' },
        whyDubaiWorks: [
            'Studio segment is well-leased to single professionals and short-stay tenants',
            'Off-plan post-handover plans reduce upfront cash requirement to 10–20%',
            'Cash buyers regularly unlock 3–8% developer or seller discounts',
            'Investor visa available from AED 750K, Golden Visa from AED 2M aggregate'
        ],
        comparison: {
            headers: ['Unit Type', 'Cash Entry', 'Mortgage Entry (25%)', 'Visa Eligibility'],
            rows: [
                ['Studio', 'AED 450K', 'AED 130K + fees', 'No standalone visa'],
                ['1BR', 'AED 700K', 'AED 200K + fees', 'Investor visa (3-yr)'],
                ['2BR', 'AED 1.2M', 'AED 320K + fees', 'Investor visa (3-yr)'],
                ['Aggregate AED 2M+', '—', '—', 'Golden Visa (10-yr)']
            ]
        },
        whoShouldInvest: [
            'First-time investors testing the market with the smallest defensible commitment',
            'Yield-seeking buyers stretching capital across multiple smaller units'
        ],
        risks: [
            'Studios can have weaker resale demand than 1-bedrooms in slower cycles',
            'Smaller units are more sensitive to localised oversupply and short-let competition'
        ],
        strategy: [
            'Buy a 1BR over a studio if budget allows — better resale, broader tenant pool',
            'Stick to communities with metro, tram or major-road access for tenant retention'
        ],
        faq: [
            { q: 'How much in fees on top?', a: 'Roughly 7–10% all-in — see the [[slug:costs|full cost breakdown]] — DLD transfer fee 4%, agency commission 2% + VAT, NOC AED 500–5,000, trustee/registration AED 4,000, conveyancer AED 5,000–10,000, plus mortgage processing ~1% if applicable.' }
        ,
            { q: 'Can I qualify for a visa with the minimum?', a: 'AED 750K is the minimum threshold for the renewable 3-year investor visa. Studios under AED 750K do not qualify on a standalone basis but can be combined with another property to meet the threshold.' },
            { q: 'Is mortgage available at the minimum entry?', a: 'Yes — UAE banks offer mortgages from AED 500K loan amounts. See [[slug:mortgage-for-foreigners|mortgage options for foreigners]]. Non-residents typically need 40–50% down on the smallest units and must demonstrate stable income, usually verified by 6 months of bank statements and a salary certificate or business registration.' }
        ]
    },
    {
        slug: 'property-types',
        category: 'budget',
        question: 'Which Property Type is Best?',
        shortAnswer: 'Apartments deliver the highest rental yields and easiest leasing, while villas and townhouses deliver the strongest long-term capital appreciation; the right choice depends on whether your priority is monthly cash flow or long-term wealth compounding.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 450K+', holding: '3–10 yrs' },
        whyDubaiWorks: [
            'Apartments deliver the highest net yield (see [[slug:rental-yield-by-area|yields by area]]), are easiest to lease and fastest to resell',
            'Townhouses: family demand from GCC commuters, balanced yield and growth',
            'Villas: strongest capital growth, lifestyle holding, lower transaction frequency',
            'Branded residences: premium pricing, brand floor, hotel-grade services'
        ],
        comparison: {
            headers: ['Type', 'Net Yield', 'Capital Growth', 'Liquidity', 'Best For'],
            rows: [
                ['Apartment', '6–9%', '5–7%', 'High', 'Yield, first-time'],
                ['Townhouse', '5–6%', '6–9%', 'Medium', 'Family / end-user'],
                ['Villa', '4–6%', '7–10%', 'Lower', 'Long-term holder'],
                ['Branded', '5–6%', '7–12%', 'Medium', 'Trophy / collector']
            ]
        },
        whoShouldInvest: [
            'Yield buyer → apartment in JVC, Business Bay or Marina',
            'Family or end-user → townhouse in Dubai Hills, Arabian Ranches or Tilal Al Ghaf',
            'Long-term holder → villa or branded residence in Palm or Downtown'
        ],
        risks: [
            'Villas have higher maintenance, gardening and pool costs that compress yield',
            'Branded residences carry premium service charges that can be 25–40 AED/sqft'
        ],
        strategy: [
            'Mix the portfolio: one yielding apartment plus one growth villa or branded unit',
            'Avoid type or community drift — define your mandate before evaluating listings'
        ],
        faq: [
            { q: 'Off-plan or ready?', a: 'Ready stock generates cash flow immediately and removes delivery risk. Off-plan trades cash flow for capital deployment over time and the chance of pre-handover appreciation, especially with tier-1 developers in scarcity locations.' }
        ,
            { q: 'Are short-term rentals permitted on all types?', a: 'Most freehold apartments and villas can be operated as holiday homes after registering with Dubai Tourism (DTCM). Some communities and buildings restrict short-let in their owners association rules — always verify before purchase if short-let yield is part of your underwriting.' },
            { q: 'Which type has the lowest service charges?', a: 'Townhouses and villas typically have the lowest [[slug:service-charges|service charges]] per square foot (AED 4–10), since amenities are community-shared rather than building-shared. Apartments range AED 10–25, branded residences AED 25–40 due to hotel-grade services.' }
        ]
    },
    {
        slug: 'best-areas',
        category: 'budget',
        question: 'Best Areas in Dubai to Invest?',
        shortAnswer: 'For yield, target JVC and Business Bay; for capital growth, target Palm Jumeirah, Downtown Dubai and Dubai Hills Estate; for lifestyle balance, target Dubai Marina and Dubai Creek Harbour — each has a distinct tenant base and return profile.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 700K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Each tier-1 area has a distinct yield-vs-growth profile (see [[slug:rental-yield-by-area|yields by area]] and [[slug:capital-appreciation|capital appreciation drivers]]) suited to a clear mandate',
            'Master-planned communities reduce surprises around amenities and service charges',
            'Tier-1 developers concentrate in known zones, lowering delivery risk'
        ],
        comparison: {
            headers: ['Area', 'Net Yield', 'Capital Growth', 'Profile'],
            rows: [
                ['Palm Jumeirah', '5–6%', 'High', 'Trophy / branded'],
                ['Downtown Dubai', '5–6%', 'High', 'Iconic / most liquid'],
                ['Dubai Marina', '6–7%', 'Medium', 'Waterfront lifestyle'],
                ['Dubai Hills Estate', '5–6%', 'High', 'Family villa community'],
                ['JVC', '7–9%', 'Medium', 'Highest yield apartments'],
                ['Business Bay', '6–7%', 'Medium', 'Central yield + office demand'],
                ['Dubai Creek Harbour', '5–6%', 'High', 'Emerging waterfront']
            ]
        },
        whoShouldInvest: [
            'Yield-focused investors → JVC and Business Bay',
            'Capital-growth investors → Palm Jumeirah, Downtown Dubai, Dubai Hills',
            'Lifestyle-led buyers → Dubai Marina and Dubai Creek Harbour'
        ],
        risks: [
            'Trophy areas have higher entry prices and lower current yields',
            'Yield-focused areas can have weaker amenity depth and slower long-term growth'
        ],
        strategy: [
            'Define your mandate (yield vs growth vs lifestyle) before evaluating any listing',
            'Visit at multiple times of day before committing — micro-location matters'
        ],
        faq: [
            { q: 'Which area is most stable?', a: 'Downtown Dubai, Palm Jumeirah and Dubai Hills Estate have shown the most consistent prices and rents across the past five years, with the lowest drawdowns during soft cycles and the strongest snapbacks during recoveries.' }
        ,
            { q: 'Are emerging areas worth considering?', a: 'Yes for growth, with caveats. Dubai Creek Harbour and Mohammed Bin Rashid City offer strong upside as infrastructure completes, but execution risk is higher than mature areas. Allocate no more than 20–30% of your portfolio to emerging zones.' },
            { q: 'How important is metro access?', a: 'Very important for apartments aimed at renters. Buildings within 10-minute walk of a metro station typically command 5–10% rent premium and rent faster, especially in Marina, Business Bay, JLT and Downtown.' }
        ]
    },
    {
        slug: 'dubai-vs-uk',
        category: 'comparison',
        question: 'Dubai vs UK — Where to Invest?',
        shortAnswer: 'Dubai outperforms the UK on rental yield (5–9% vs 2–4%), tax efficiency (0% vs 20–45% income tax plus 18–28% capital gains tax), and transaction speed (2–6 weeks vs 8–16 weeks); the UK retains advantages in lender depth and legal precedent.',
        keyData: { yield: '5–9% vs 2–4%', tax: '0% vs 5–12%', entry: 'AED 750K', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'No personal income tax on rents and no capital gains tax on resale',
            'Higher gross and net yields in every comparable city tier',
            'Faster transaction process — ready resale closes in 2–6 weeks via DLD',
            'Newer stock and amenities versus the UK\'s ageing rental housing'
        ],
        comparison: {
            headers: ['Metric', 'Dubai', 'UK'],
            rows: [
                ['Net rental yield', '5–9%', '2–4%'],
                ['Income tax on rent', '0%', '20–45%'],
                ['Capital gains tax', '0%', '18–28%'],
                ['Stamp duty / DLD', '4% one-off', '0–15% tiered'],
                ['Inheritance tax', '0%', '40% above threshold'],
                ['Mortgage rate (HNW)', '~5–6%', '~4–5%'],
                ['Time to close', '2–6 wks', '8–16 wks']
            ]
        },
        whoShouldInvest: [
            'Yield-focused investors → Dubai outperforms on every yield-related metric',
            'Long-cycle, lender-driven investors → UK still has deeper mortgage market',
            'Tax-residency planners → Dubai for 0% personal tax and Golden Visa options'
        ],
        risks: [
            'Dubai: currency mismatch if your income or liabilities are in GBP',
            'UK: ongoing tax tightening on non-resident landlords and second homes'
        ],
        strategy: [
            'Use Dubai for cash flow and tax efficiency, UK for legacy and lender access',
            'Diversify — concentration in either market alone misses both opportunities'
        ],
        faq: [
            { q: 'Can UK residents own in Dubai?', a: 'Yes — see [[slug:foreign-ownership|foreign ownership rules]]. UK residents can hold full freehold ownership in designated areas, register the title at the Dubai Land Department, and benefit from 0% UAE personal tax — though UK tax residents still need to declare worldwide income to HMRC.' }
        ,
            { q: 'How do total returns compare?', a: 'See [[slug:global-comparison|how Dubai compares globally]]. On a 5-year basis, after-tax total returns in Dubai (yield + appreciation, taxed at 0%) typically beat UK by 4–7% per year for a similarly-sized portfolio, before considering currency effects.' },
            { q: 'Is the legal protection comparable?', a: 'Dubai property law is codified, title is registered at the Dubai Land Department, and disputes are handled by the specialised Real Estate Court. Protection is robust though the legal precedent base is younger than the UK system.' }
        ]
    },
    {
        slug: 'global-comparison',
        category: 'comparison',
        question: 'Dubai vs Global Markets',
        shortAnswer: 'Dubai consistently sits in the top tier of global cities for net rental yield (5–9%) and is the only major market combining 0% personal income tax, 0% capital gains tax, full foreign freehold ownership and a USD-pegged currency.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Top-tier global yield among comparable major cities',
            'Zero personal tax on rents, gains and inheritance for individuals',
            'AED-USD peg gives strong currency stability for dollar-based portfolios',
            'Faster, more transparent transaction process via DLD vs many global peers'
        ],
        comparison: {
            headers: ['City', 'Net Yield', 'Property / Income Tax', 'Foreign Ownership'],
            rows: [
                ['Dubai', '5–9%', '0%', 'Full freehold'],
                ['London', '2–4%', '5–12% + income tax', 'Yes'],
                ['Singapore', '2–3%', '4–20% ABSD', 'Restricted'],
                ['New York', '3–5%', '~1.5% + income tax', 'Yes'],
                ['Sydney', '3–4%', '5–7% + income tax', 'Restricted'],
                ['Hong Kong', '2–3%', '15% + tiered', 'Yes']
            ]
        },
        whoShouldInvest: [
            'Globally diversified portfolios looking for a tax-efficient income sleeve',
            'Investors prioritising USD-denominated hard assets',
            'HNW buyers using residency-by-investment as a secondary benefit'
        ],
        risks: [
            'Concentration risk — no single market should hold 100% of a property book',
            'Currency exposure if your income, debt or liabilities are in non-USD currencies'
        ],
        strategy: [
            'Allocate 20–40% of property exposure to Dubai for yield and tax efficiency',
            'Pair Dubai with one growth-led market (e.g. UK or US) for balanced returns'
        ],
        faq: [
            { q: 'How does Dubai compare on capital growth?', a: 'Dubai sits mid-tier on long-run capital appreciation versus cities like London or Sydney, but the yield premium and zero-tax treatment more than compensate on a total-return, after-tax basis over a 5–10 year horizon.' }
        ,
            { q: 'How does Dubai compare for HNW buyers?', a: 'For HNW buyers, Dubai\'s combination of 0% tax, full freehold, [[slug:golden-visa|AED 2M+ Golden Visa pathway]] and trophy stock (Palm Jumeirah, Bulgari, Atlantis Royal residences) is unmatched among global cities for after-tax preservation of wealth.' },
            { q: 'What about emerging markets?', a: 'Some emerging markets offer higher headline yields (see [[slug:dubai-vs-uk|Dubai vs UK]] for a developed-market comparison) but come with currency volatility, weaker legal protection, repatriation friction and political risk. Dubai sits in a unique tier — emerging-market yields with developed-market governance.' }
        ]
    },
    {
        slug: 'off-plan-vs-ready',
        category: 'comparison',
        question: 'Off-Plan vs Ready — Which is Better?',
        shortAnswer: 'Off-plan offers lower entry cost (10–20% down), staggered payment plans, and stronger pre-handover capital growth potential, while ready inventory delivers immediate cash flow, full transparency on the unit, and zero delivery risk.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 700K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Off-plan staggered payments preserve cash for diversification or other deals',
            'Ready inventory is fully transparent — view, valuation and rent are all knowable',
            'Both segments have active resale markets registered through Oqood and DLD',
            'Tier-1 developers offer 50/50 and post-handover plans that lower upfront capital'
        ],
        comparison: {
            headers: ['Factor', 'Off-Plan', 'Ready'],
            rows: [
                ['Entry cost', 'Lower (10–20%)', 'Full price or mortgage'],
                ['Cash flow', 'None until handover', 'From day 1'],
                ['Capital upside', 'Higher pre-handover', 'Steady post-purchase'],
                ['Delivery risk', 'Yes — depends on developer', 'No'],
                ['Title transfer', 'At handover', 'At purchase']
            ]
        },
        whoShouldInvest: [
            'Off-plan → patient capital, growth focus, comfortable with 2–4 year timelines',
            'Ready → income now, lower risk profile, faster path to investor visa'
        ],
        risks: [
            'Off-plan: developer delivery risk, especially with non-tier-1 names',
            'Ready: less negotiation room on price, particularly in tight tier-1 markets'
        ],
        strategy: [
            'Restrict off-plan to tier-1 developers (Emaar, Damac, Nakheel, Sobha, Meraas) — see [[slug:crisis-investing|how to invest during stress]] for cycle-aware tactics',
            'Verify ESCROW account, DLD project registration and consultant before paying'
        ],
        faq: [
            { q: 'How much down for off-plan?', a: 'Typically 10–20% to book the unit, then milestone payments tied to construction phases through to handover. Some tier-1 plans allow 60–70% during construction and 30–40% post-handover spread over 2–4 years.' }
        ,
            { q: 'Is there a price difference at launch vs handover?', a: 'Tier-1 off-plan typically launches at a 5–15% discount to comparable ready stock — see [[slug:costs|all-in transaction costs]] for budgeting to compensate for delivery risk and time value. By handover, well-executed projects often trade at parity or above ready market price.' },
            { q: 'How do I evaluate developer risk?', a: 'Check track record (delivered projects, on-time delivery rate), financial backing (listed parent or strong holding), DLD project registration with active ESCROW, and current launch absorption (sold-out projects signal market confidence).' }
        ]
    },
    {
        slug: 'crisis-investing',
        category: 'timing',
        question: 'Should I Invest During a Crisis?',
        shortAnswer: 'Yes — historical Dubai cycles show that buyers entering during stress periods (2010, 2020) captured the strongest 3-year total returns; tier-1 freehold inventory recovers fastest and distressed sellers create rare entry points unavailable in normal cycles.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Government and developers act decisively to support market liquidity in stress',
            'Distressed sellers and motivated developers create rare pricing opportunities',
            'Tier-1 communities recover first and lead the rebound across the broader market',
            'Mortgage moratoria and deferred-payment plans appear in stress periods'
        ],
        comparison: {
            headers: ['Cycle', 'Bottom-to-peak (3 yrs)', 'Best segment'],
            rows: [
                ['2010–2013', '+45%', 'Downtown, Marina ready stock'],
                ['2020–2023', '+50–80%', 'Palm villas, branded residences'],
                ['Future stress', 'TBD', 'Tier-1 ready inventory likely repeats']
            ]
        },
        whoShouldInvest: [
            'Cash buyers ready to deploy quickly without lender approval delays',
            'Investors with 3–5 year horizons able to ride the recovery curve',
            'Patient capital comfortable with 12–18 months of headline-driven volatility'
        ],
        risks: [
            'Hard to call the exact bottom — mid-cycle deployment is often more reliable',
            'Lower-tier developers may stall, default or restructure during prolonged stress'
        ],
        strategy: [
            'Buy ready inventory in tier-1 areas during dips to lock cash flow immediately',
            'Avoid speculative off-plan launches in stress periods — execution risk spikes'
        ],
        faq: [
            { q: 'How do I spot the bottom?', a: 'You don\'t — calling exact tops and bottoms is unreliable. See [[slug:is-now-right-time|whether now is the right time]]. Average in over 6–12 months once distressed listings exceed normal levels and developer payment plans become more aggressive than usual.' }
        ,
            { q: 'What asset types fall most in stress?', a: 'Speculative off-plan in non-prime areas falls hardest — see [[slug:market-cycles|where we are in the cycle]] — both because demand evaporates and because some developers stall or default. Tier-1 ready freehold typically holds value better, since end-users continue buying through stress periods.' },
            { q: 'Should I use leverage during a crisis?', a: 'Conservative leverage (50–60% LTV) can amplify returns during recovery, but only with cash reserves to cover 12–18 months of debt service. Avoid stretching to maximum LTV — flexibility matters more than yield optimisation in stress.' }
        ]
    },
    {
        slug: 'market-cycles',
        category: 'timing',
        question: 'Where Are We in the Market Cycle?',
        shortAnswer: 'Dubai is in mid-cycle as of 2026: post-recovery growth has matured, supply discipline is holding, and structural tenant demand from population growth and Golden Visa retention is supporting both rents and prices in tier-1 freehold communities.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Population growth above 5%/year supports rents and tenant turnover',
            'Developer discipline avoids the 2008-style oversupply overhang',
            'Mortgage market is more conservative than past cycles — less systemic leverage',
            'Service-charge transparency and Mollak adoption have lifted investor confidence'
        ],
        comparison: {
            headers: ['Phase', 'Years', 'Behaviour'],
            rows: [
                ['Recovery', '2020–2022', 'Sharp rebound from COVID lows'],
                ['Growth', '2023–2025', 'Healthy double-digit appreciation in tier-1'],
                ['Mid-cycle', '2026', 'Slower growth, yield compression in some areas'],
                ['Late-cycle', 'Future', 'Watch supply pipeline and rate environment']
            ]
        },
        whoShouldInvest: [
            'Long-term holders unaffected by 12-month price swings',
            'Buyers using cycle-aware area selection, avoiding peak-supply clusters'
        ],
        risks: [
            'Late-cycle pockets in 2026–2027 deliveries in oversupplied JVC, JVT clusters',
            'Concentrated handover schedules can soften local rents for 6–12 months'
        ],
        strategy: [
            'Avoid clusters with concentrated 2026–2027 deliveries unless deeply discounted',
            'Prefer areas with diversified handover schedules and end-user demand'
        ],
        faq: [
            { q: 'Will there be a correction?', a: 'Some submarkets — particularly speculative off-plan in non-prime areas — may see softening in 2026–2027 (see [[slug:crisis-investing|crisis investing playbook]] and [[slug:capital-appreciation|where appreciation comes from]]) as supply lands. Tier-1 freehold inventory is broadly stable and supported by strong end-user and yield-investor demand.' }
        ,
            { q: 'How long is a typical Dubai cycle?', a: 'Historical cycles have lasted roughly 7–10 years from trough to trough, with 3–5 years of sharp recovery, 2–3 years of mid-cycle growth, then 1–2 years of softening. Past performance is no guarantee, but cycle awareness aids timing.' },
            { q: 'Which indicators should I track?', a: 'Population growth, tourism arrivals, mortgage rates and originations, off-plan launch volumes vs absorption, and handover schedules vs new project starts. RERA, DLD and Dubai Statistics Center publish most of this data quarterly.' }
        ]
    },
    {
        slug: 'rental-yield-by-area',
        category: 'timing',
        question: 'Rental Yield by Area',
        shortAnswer: 'Dubai net rental yields by community: JVC (7–9%), Business Bay and Dubai Marina (6–7%), Downtown Dubai (5–6%), Palm Jumeirah (5–6%) — yield generally falls as prestige and entry price rise, with mid-prestige zones often best risk-adjusted.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 700K+', holding: '3–5 yrs' },
        whyDubaiWorks: [
            'Yield broadly inversely correlates with prestige and entry price',
            'Mid-prestige zones often deliver the best risk-adjusted total return',
            'Short-let permitted in most freehold areas, lifting yield in tourist zones'
        ],
        comparison: {
            headers: ['Area', 'Net Yield', 'Tenant Profile', 'Notes'],
            rows: [
                ['JVC', '7–9%', 'Young professionals', 'Highest yield, deep stock'],
                ['Business Bay', '6–7%', 'Corporate', 'Central, office-led demand'],
                ['Dubai Marina', '6–7%', 'Lifestyle / expats', 'Strong short-let demand'],
                ['Downtown Dubai', '5–6%', 'Premium expats', 'Iconic address premium'],
                ['Palm Jumeirah', '5–6%', 'HNW / short-let', 'Trophy holding']
            ]
        },
        whoShouldInvest: [
            'Yield seekers → JVC, Business Bay, Arjan, Dubai South',
            'Capital-growth + decent yield → Marina, Hills, Creek Harbour'
        ],
        risks: [
            'Higher gross yield ≠ higher net — service charges can vary 2x between buildings',
            'Furnishing capex (AED 30–80K per 1BR) affects 1st-year cash flow'
        ],
        strategy: [
            'Underwrite net yield after service charges, agency fees and management fees',
            'Consider short-let with DTCM permit in Marina, Palm and Downtown for top yields'
        ],
        faq: [
            { q: 'Are yields stable across cycles?', a: 'Yields compress in growth phases when prices rise faster than rents (also factor in [[slug:service-charges|service charges]] and [[slug:property-types|property type]]) and expand in soft phases when rents hold but prices ease. The 5–9% headline range across tier-1 communities has been remarkably stable for the past five years.' }
        ,
            { q: 'How do I verify a building\'s real yield?', a: 'Pull comparable lease records from the DLD Rental Index, check Mollak service charges for the past 3 years, and adjust for occupancy. Listed asking rents on portals are generally 5–10% above achieved rents.' },
            { q: 'Does furnishing improve yield?', a: 'Typically yes by 15–30% on long-let, more on short-let. Furnishing capex of AED 30–80K per 1BR usually pays back in 18–36 months via the rental premium, depending on location and short-let intensity.' }
        ]
    },
    {
        slug: 'foreign-ownership',
        category: 'legal',
        question: 'Can Foreigners Own Property?',
        shortAnswer: 'Yes — non-residents of any nationality can hold 100% freehold property in Dubai\'s designated freehold zones, with title registered at the Dubai Land Department; no UAE residency is required to purchase, and ownership is perpetual and inheritable.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'Full freehold title in designated zones with perpetual ownership rights',
            'No nationality restrictions on individual buyers',
            'No residency requirement to purchase — fully open to non-residents',
            'Title registered with the Dubai Land Department and protected by RERA'
        ],
        comparison: {
            headers: ['Tenure', 'Description', 'Best For'],
            rows: [
                ['Freehold', 'Full ownership, perpetual', 'Most investors'],
                ['Leasehold', '99 years, renewable', 'Some non-freehold zones'],
                ['Usufruct', 'Limited use rights', 'Specific commercial use cases']
            ]
        },
        whoShouldInvest: [
            'Any non-resident individual buyer of any nationality',
            'Companies via a UAE-registered entity, mainland or freezone',
            'Joint owners — up to 4 names per title deed'
        ],
        risks: [
            'Some areas of Dubai remain leasehold or non-freehold',
            'Off-plan title transfers occur at handover, not at booking — Oqood is interim'
        ],
        strategy: [
            'Confirm freehold zoning with DLD before signing any reservation form',
            'Use a registered conveyancer for due diligence on title, charges and developer NOC — and budget for [[slug:costs|all-in transaction costs]]'
        ],
        faq: [
            { q: 'Do I get UAE residency from buying?', a: 'Properties valued AED 750K+ qualify for the renewable 3-year investor visa. Aggregate ownership of AED 2M+ qualifies for the [[slug:golden-visa|10-year Golden Visa]]. Aggregate ownership of AED 2M+ qualifies for the 10-year Golden Visa, with sponsorship rights for spouse, children and domestic staff.' }
        ,
            { q: 'Can I own through a company?', a: 'Yes. Foreigners can own through a UAE-registered company (mainland or freezone). This is common for HNW buyers seeking estate planning structuring or shareholder-level transfers without DLD re-registration each time.' },
            { q: 'What happens to property on inheritance?', a: 'UAE applies its own inheritance rules unless a registered will (DIFC or ADJD) specifies otherwise. Foreign owners are strongly advised to register a UAE-recognised will to ensure assets transfer per their wishes rather than UAE default succession.' }
        ]
    },
    {
        slug: 'golden-visa',
        category: 'legal',
        question: 'How Do I Get the Golden Visa?',
        shortAnswer: 'Buy property worth AED 2M or more (single or aggregate ownership) to qualify for the UAE Golden Visa — a 10-year self-renewing residency that allows you to sponsor family without salary requirements, with no minimum stay obligations.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 2M+', holding: '10 yrs visa' },
        whyDubaiWorks: [
            '10-year residency, self-renewing as long as property is owned',
            'Sponsor spouse, children and parents with no minimum salary requirement',
            'Cash or mortgage-bought properties qualify — full title required at issuance',
            'Aggregate multiple properties to reach the AED 2M threshold'
        ],
        comparison: {
            headers: ['Visa Tier', 'Property Value', 'Validity', 'Family Sponsorship'],
            rows: [
                ['Investor (3-yr)', 'AED 750K+', '3 years', 'Yes (limited)'],
                ['Golden (10-yr)', 'AED 2M+', '10 years', 'Spouse, children, parents'],
                ['Long-term (5-yr)', 'AED 1M cash + GP', '5 years', 'Yes (limited)']
            ]
        },
        whoShouldInvest: [
            'Buyers wanting long-term UAE residency without employer sponsorship',
            'Families relocating to the UAE for school, lifestyle or tax reasons',
            'Investors wanting to sponsor dependents or domestic staff under their visa'
        ],
        risks: [
            'Visa is tied to ownership — selling the property typically ends the visa',
            'Mortgage-financed portion of value may not count fully toward the threshold'
        ],
        strategy: [
            'Buy completed inventory rather than off-plan to qualify on issued title — see [[slug:foreign-ownership|foreign ownership basics]]',
            'Aggregate 2–3 yielding units to reach AED 2M+ (see [[slug:minimum-investment|minimum investment thresholds]]) if a single trophy unit is too rich'
        ],
        faq: [
            { q: 'Is off-plan eligible?', a: 'Generally no — the Golden Visa requires an issued title deed. Off-plan units only qualify once handover completes and DLD issues the title, although some recent rule changes allow off-plan with developer NOC in specific circumstances.' }
        ,
            { q: 'How long does the application take?', a: 'After purchase and title issuance, the Golden Visa application typically takes 2–4 weeks via ICA or GDRFA Dubai. Pre-approval can sometimes be obtained before completion to coordinate residency with closing.' },
            { q: 'Can I keep the visa if I sell?', a: 'No — the Golden Visa is tied to the qualifying property. Selling the asset typically ends the visa. Some buyers therefore aggregate 2–3 properties so they can rotate one out without losing the AED 2M aggregate threshold.' }
        ]
    },
    {
        slug: 'costs',
        category: 'legal',
        question: 'What Are the Total Costs?',
        shortAnswer: 'Plan for 7–10% on top of the headline price for a Dubai property purchase: DLD transfer fee 4%, agency commission 2% + VAT, plus developer NOC, trustee/registration, conveyancer and (if applicable) mortgage processing fees of around 1%.',
        keyData: { yield: '5–9%', tax: '0%', entry: '+7–10% fees', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'All transaction costs are transparent and one-off — no annual property tax',
            'No tiered stamp-duty escalator like the UK SDLT regime',
            'No inheritance tax on UAE-situated assets for individual owners'
        ],
        comparison: {
            headers: ['Cost', 'Amount', 'Notes'],
            rows: [
                ['DLD transfer fee', '4% of price', 'Paid by buyer typically'],
                ['Agency fee', '2% + VAT', 'Negotiable on multi-unit'],
                ['NOC (developer)', 'AED 500–5,000', 'For resale clearance'],
                ['Trustee / registration', 'AED 4,000', 'Standard'],
                ['Conveyancer', 'AED 5,000–10,000', 'Optional but recommended'],
                ['[[slug:mortgage-for-foreigners|Mortgage processing]]', '~1% of loan', 'If financing']
            ]
        },
        whoShouldInvest: [
            'Buyers budgeting net of all transaction and ongoing costs',
            'Cash buyers benefiting from lower friction and faster closing'
        ],
        risks: [
            'Underbudgeting fees compresses early-year returns by 2–3%',
            'Service charges are recurring and can rise — verify Mollak history annually'
        ],
        strategy: [
            'Budget 10% on top of the price for a comfortable buffer on closing day',
            'Negotiate agency fees on multi-unit deals — 2% is a starting point, not a floor'
        ],
        faq: [
            { q: 'Any annual property tax?', a: 'No personal property tax in Dubai. Annual costs are limited to [[slug:service-charges|service charges]] (typically AED 10–25 per square foot for apartments, lower for villas), municipality fees on rentals (5% of annual rent paid via DEWA), and any mortgage interest.' }
        ,
            { q: 'Are any costs negotiable?', a: 'Yes. Agency fees (2%) are often negotiable on multi-unit deals or off-plan brokerage. Some developers absorb DLD fees as a marketing incentive on launches. Conveyancer fees are negotiable on portfolio transactions.' },
            { q: 'What is the cost of holding annually?', a: 'Annual holding costs are limited to service charges (AED 10–25/sqft for apartments), 5% municipality fee on rent (only if rented), DEWA, district cooling consumption, and any mortgage interest. There is no annual property tax.' }
        ]
    },
    {
        slug: 'mortgage-for-foreigners',
        category: 'legal',
        question: 'Can Foreigners Get a Mortgage?',
        shortAnswer: 'Yes — UAE banks lend to non-residents with 50–60% loan-to-value, while UAE residents access up to 80% LTV on first homes; rates typically sit in the 4–6% range, with terms up to 25 years and competitive products for HNW clients.',
        keyData: { yield: '5–9%', tax: '0%', entry: '20–50% down', holding: '3–7 yrs' },
        whyDubaiWorks: [
            'UAE banks lend to non-residents — Emirates NBD, ADCB, Mashreq, HSBC, Standard Chartered',
            'Competitive rates for HNW segments and salaried professionals',
            'Terms of up to 25 years with both fixed and variable products available',
            'Pre-approval letters strengthen negotiation on price'
        ],
        comparison: {
            headers: ['Buyer Type', 'Max LTV', 'Min Down', 'Notes'],
            rows: [
                ['UAE resident (1st home, <AED 5M)', '80%', '20%', 'Standard'],
                ['UAE resident (1st home, ≥AED 5M)', '70%', '30%', 'High-value cap'],
                ['UAE resident (2nd+ home)', '65%', '35%', 'Investment property'],
                ['Non-resident', '50–60%', '40–50%', 'Stricter underwriting']
            ]
        },
        whoShouldInvest: [
            'Buyers wanting to leverage returns when net yield exceeds borrowing cost',
            'Salaried professionals using AED-denominated income to service the loan (see [[slug:minimum-investment|minimum entry by unit type]])'
        ],
        risks: [
            'Rate sensitivity — variable products from some banks reset every 1–3 years',
            'Fees: 1% processing, valuation AED 2,500–3,500, life insurance, property insurance'
        ],
        strategy: [
            'Get pre-approval before negotiating to demonstrate funding capacity',
            'Compare 3–4 lenders — pricing differs 50–80 bps on otherwise similar products'
        ],
        faq: [
            { q: 'Off-plan mortgage?', a: 'Possible but typically only at handover stage. A few banks offer off-plan financing for pre-approved tier-1 projects, but most non-residents finance off-plan via developer payment plans then mortgage at handover.' }
        ,
            { q: 'How long does mortgage approval take?', a: 'Pre-approval typically takes 3–7 working days. See [[slug:costs|all-in transaction costs]] for budgeting. for salaried UAE residents and 1–2 weeks for non-residents or self-employed. Final approval and disbursement aligns with property valuation and DLD transfer, usually 4–6 weeks total.' },
            { q: 'Can I take a mortgage in my home country instead?', a: 'Some lenders abroad offer cross-border mortgages on Dubai property, but they are limited and usually pricier. Most foreign buyers find UAE bank mortgages competitive once they compare rates and processing fees.' }
        ]
    },
    {
        slug: 'service-charges',
        category: 'legal',
        question: 'How Much Are Service Charges?',
        shortAnswer: 'Dubai service charges typically run AED 10–25 per square foot annually for apartments, AED 4–10 per square foot for townhouses and villas, and AED 25–40 per square foot for branded residences — always verify the building\'s 3-year Mollak history before purchase.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 10–25/sqft', holding: 'Annual' },
        whyDubaiWorks: [
            'Charges regulated by RERA via the Mollak system, audited annually',
            'Transparent budget vote process with owners committee oversight',
            'Cover security, district cooling, utilities, amenities, maintenance and reserve fund'
        ],
        comparison: {
            headers: ['Community Type', 'AED/sqft Range', 'What\'s Included'],
            rows: [
                ['Mid-tier apartments', '10–15', 'Standard amenities'],
                ['Premium apartments', '15–25', 'Pool, gym, concierge'],
                ['Branded residences', '25–40', 'Hotel-grade services'],
                ['Townhouses / villas', '4–10', 'Community amenities only'],
                ['District cooling (extra)', 'AED 0.5–1.5/RTH', 'Variable']
            ]
        },
        whoShouldInvest: [
            'Investors who underwrite net of all annual charges, not gross yield',
            'Buyers verifying 3-year charge history before signing the LOI'
        ],
        risks: [
            'Year-on-year increases possible, subject to RERA approval and budget vote — factor into [[slug:costs|all-in cost planning]]',
            'Older buildings can have higher charges due to deferred maintenance catch-up'
        ],
        strategy: [
            'Always pull the last 3 years of service charges from RERA Mollak before purchase',
            'Net yield should remain above 5% after charges, agency, vacancy and management'
        ],
        faq: [
            { q: 'Can charges go up?', a: 'Yes — service charges can increase year-on-year, but only after RERA approval of the new budget and an owners-committee vote. Steep one-off jumps usually reflect deferred maintenance, reserve-fund top-ups or major equipment replacement.' }
        ,
            { q: 'How can I check charges before buying?', a: 'Request the building last 3 years of service-charge invoices from the seller or owners association, and cross-check via the RERA Mollak portal which records approved budgets and any disputes.' },
            { q: 'Are villas cheaper to maintain than apartments?', a: 'Community service charges per sqft are lower for villas (see [[slug:property-types|property type comparison]]) (AED 4–10), but villas have additional private maintenance — gardening, pool service, AC servicing — that adds AED 15–40K annually for a typical 4–5BR villa.' }
        ]
    },
    {
        slug: 'exit-strategy',
        category: 'legal',
        question: 'What Are My Exit Options?',
        shortAnswer: 'You can sell a Dubai property at any time with no holding period and no capital gains tax — the most common exit strategies are hold-and-let, flip at handover, refinance-and-hold to release equity, and trade up into larger or higher-quality stock.',
        keyData: { yield: '5–9%', tax: '0%', entry: 'AED 750K+', holding: '3–10 yrs' },
        whyDubaiWorks: [
            'Liquid resale market in tier-1 areas with active buyer demand',
            'No capital gains tax on resale profit, regardless of holding period',
            'Resale transaction fees lower than acquisition fees on the seller side'
        ],
        comparison: {
            headers: ['Strategy', 'Horizon', 'Best For', 'Outcome'],
            rows: [
                ['Flip at handover', '2–4 yrs', 'Off-plan investors', 'Capital gain, no rent'],
                ['Hold-and-let', '5–10 yrs', 'Yield + appreciation', 'Cash flow + capital'],
                ['Refinance-and-hold', '3+ yrs', 'Capital recycling', 'Equity release'],
                ['Trade up', '5+ yrs', 'Capital growth roll-up', 'Larger / better unit']
            ]
        },
        whoShouldInvest: [
            'Investors who define their exit horizon before any acquisition',
            'Recyclers building a 3–5 unit portfolio over 8–10 years'
        ],
        risks: [
            'Soft cycles compress resale liquidity — exits can take 3–6 months in slower markets',
            'Off-plan flip strategies depend heavily on handover-period demand and sentiment'
        ],
        strategy: [
            'Decide your exit horizon before purchase — it shapes type, area and unit choice',
            'Refinance after 3+ years to release equity for the next acquisition rather than selling'
        ],
        faq: [
            { q: 'Are there penalties to exit early?', a: 'No regulatory penalty or capital gains tax on early exit. See [[slug:capital-appreciation|long-term appreciation drivers]] and [[slug:costs|exit-side costs]]. Costs are limited to seller-side agency fees (~2%) and DLD admin charges. Off-plan resales before handover may require developer NOC and a small admin fee.' }
        ,
            { q: 'How long does a resale take?', a: 'In tier-1 communities with normal demand, a well-priced resale closes in 30–60 days from listing. In slower cycles or off-prime areas, expect 60–120 days. Off-plan resales require developer NOC which adds 1–3 weeks.' },
            { q: 'When should I refinance instead of sell?', a: 'Refinance once equity has built to 30–40%+ and the property still meets your yield mandate. This frees capital for the next acquisition while keeping the income asset in your portfolio — a common multi-unit recycling strategy.' }
        ]
    }
];

// 6 cards highlighted on the homepage.
window.HomepageInsightSlugs = [
    'is-dubai-good-investment',
    'what-roi-expect',
    'where-invest-200k',
    'dubai-vs-uk',
    'best-areas',
    'is-now-right-time'
];
