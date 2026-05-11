import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { getInsights, getCategories } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Dubai Investment Insights — Allegiance Real Estate',
  description: 'Dubai Investment Insights — clear, data-backed answers to every question before you invest in Dubai real estate. Yields, taxes, ROI, communities, off-plan vs ready, mortgages, Golden Visa and more.',
};

export default function InsightsIndexPage() {
  const insights = getInsights();
  const categories = getCategories();

  return (
    <>
      <HeroInner
        eyebrow="// Investment Insights"
        title="Every"
        titleAccent="question"
        titleAfter="before you invest."
        sub="Clear, data-backed answers on yields, taxes, ROI, communities, off-plan vs ready, mortgages, Golden Visa and more — everything you need to know before putting capital into Dubai real estate."
        ctas={[
          { href: '/properties?purpose=sale', label: 'Browse Properties' },
          { href: '/contact', label: 'Talk to an advisor', variant: 'line' },
        ]}
        stats={[
          { num: '5&ndash;9%', label: 'Net Rental Yield' },
          { num: '0%', label: 'Capital Gains Tax' },
          { num: 'USD-pegged', label: 'Currency' },
          { num: '2&ndash;6 wks', label: 'Time to Close' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Knowledge base" title="Browse by" titleAccent="category" titleAfter="." sub="Twenty deep-dive answers, organised into five categories. Each one stands alone — or use them together to build the case for a Dubai allocation." />

          <div style={{ marginTop: 56 }}>
            {categories.map((cat) => {
              const items = insights.filter((i) => i.category === cat.slug);
              if (!items.length) return null;
              return (
                <div className="insight-category-block" key={cat.slug}>
                  <h2 className="insight-category-title">{cat.name}</h2>
                  <div className="insight-cards-grid">
                    {items.map((i) => (
                      <Link key={i.slug} href={`/insights/${i.slug}`} className="insight-card">
                        <h3 className="insight-card-title">{i.question}</h3>
                        <p className="insight-card-answer">{i.shortAnswer.replace(/\[\[slug:[a-z0-9-]+\|([^\]]+)\]\]/g, '$1')}</p>
                        <span className="insight-card-cta">Read insight <i className="fa fa-angle-right" /></span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA title="Still have" titleAccent="questions" description="Talk to an Allegiance advisor — we&rsquo;ll work through the numbers with you." ctaHref="/contact" ctaLabel="Contact Us" />
    </>
  );
}
