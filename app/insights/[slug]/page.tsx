import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInsight, getInsights, getRelated, linkifyInsight } from '@/lib/insights';

const WHATSAPP = 'https://wa.me/971800273392?text=' + encodeURIComponent('Hi, I would like to speak with an Investment Advisor.');

export async function generateStaticParams() {
  return getInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getInsight(slug);
  if (!i) return { title: 'Insight not found | Allegiance Real Estate' };
  const desc = i.shortAnswer.replace(/\[\[slug:[a-z0-9-]+\|([^\]]+)\]\]/g, '$1');
  return {
    title: `${i.question} | Allegiance Investment Insights`,
    description: desc.length > 160 ? desc.slice(0, 157) + '…' : desc,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return notFound();

  const related = getRelated(slug, 3);
  const cat = (await import('@/lib/insights')).getCategories().find((c) => c.slug === insight.category);

  return (
    <>
      <header className="hero hero-inner-page insight-hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="container hero-inner">
          <div className="insight-cat-badge">{cat ? cat.name : 'Investment Insight'}</div>
          <h1 className="hero-title">{insight.question}</h1>
        </div>
      </header>

      <div>
        <section style={{ padding: '50px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="container">
            <div className="insight-answer-card">
              <p className="insight-body-answer" dangerouslySetInnerHTML={{ __html: linkifyInsight(insight.shortAnswer) }} />
            </div>
            <div className="insight-cta-row">
              <Link href="/properties?purpose=sale" className="cta-button primary">Explore Properties</Link>
              <a className="cta-button green" target="_blank" rel="noopener" href={WHATSAPP}>
                <i className="fa fa-whatsapp" /> WhatsApp Advisor
              </a>
            </div>
          </div>
        </section>

        <section id="insight-keydata-section">
          <div className="container">
            <h2 className="insight-section-heading">Key <em>investment metrics</em></h2>
            <p className="insight-section-sub">The numbers that matter most for this question — at a glance.</p>
            <div className="insight-keydata-grid">
              <div className="insight-keydata"><span className="label">Yield</span><span className="value">{insight.keyData.yield}</span></div>
              <div className="insight-keydata"><span className="label">Property Tax</span><span className="value">{insight.keyData.tax}</span></div>
              <div className="insight-keydata"><span className="label">Entry Budget</span><span className="value">{insight.keyData.entry}</span></div>
              <div className="insight-keydata"><span className="label">Holding Period</span><span className="value">{insight.keyData.holding}</span></div>
            </div>
          </div>
        </section>

        <section id="insight-content-section">
          <div className="container">
            <div className="insight-block">
              <h2>Why Dubai Works</h2>
              <ul className="insight-bullets">
                {insight.whyDubaiWorks.map((b, i) => (
                  <li key={i}><i className="fa fa-check-circle" /> <span dangerouslySetInnerHTML={{ __html: linkifyInsight(b) }} /></li>
                ))}
              </ul>
            </div>

            {insight.comparison?.headers?.length > 0 && (
              <div className="insight-block">
                <h2>Comparison</h2>
                <div className="insight-table-wrapper">
                  <table className="insight-table">
                    <thead>
                      <tr>{insight.comparison.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {insight.comparison.rows.map((r, i) => (
                        <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="insight-block">
              <h2>Who Should Invest</h2>
              <ul className="insight-bullets plain">
                {insight.whoShouldInvest.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>

            <div className="insight-block">
              <h2>Risks to Watch</h2>
              <ul className="insight-bullets risks">
                {insight.risks.map((b, i) => (
                  <li key={i}><i className="fa fa-exclamation-triangle" /> {b}</li>
                ))}
              </ul>
            </div>

            <div className="insight-block">
              <h2>Strategy</h2>
              <ul className="insight-bullets strategy">
                {insight.strategy.map((b, i) => (
                  <li key={i}><i className="fa fa-arrow-right" /> <span dangerouslySetInnerHTML={{ __html: linkifyInsight(b) }} /></li>
                ))}
              </ul>
            </div>

            <div className="insight-block">
              <h2>FAQ</h2>
              <div className="faq">
                {insight.faq.map((f, i) => (
                  <details key={i} className="insight-faq-item">
                    <summary>{f.q}</summary>
                    <p dangerouslySetInnerHTML={{ __html: linkifyInsight(f.a) }} />
                  </details>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="insight-block">
                <h2>Related Insights</h2>
                <p className="insight-section-sub">Continue exploring with three more answers from our knowledge base.</p>
                <div className="insight-cards-grid">
                  {related.map((r) => (
                    <Link key={r.slug} className="insight-card" href={`/insights/${r.slug}`}>
                      <h3 className="insight-card-title">{r.question}</h3>
                      <p className="insight-card-answer">{r.shortAnswer.replace(/\[\[slug:[a-z0-9-]+\|([^\]]+)\]\]/g, '$1')}</p>
                      <span className="insight-card-cta">Read insight <i className="fa fa-angle-right" /></span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="insight-bottom-cta">
          <div className="container">
            <div className="insight-cta-card">
              <h2>Ready to take the <em>next step</em>?</h2>
              <div className="insight-cta-row centered">
                <Link href="/investment-insights" className="cta-button white">All Investment Insights</Link>
                <Link href="/properties?purpose=sale" className="cta-button primary">View Properties</Link>
                <a className="cta-button green" target="_blank" rel="noopener" href={WHATSAPP}>
                  <i className="fa fa-whatsapp" /> Talk to Advisor
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
