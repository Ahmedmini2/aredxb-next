import Link from 'next/link';

type Stat = { num: string; label: string };
type CTA = { href: string; label: string; variant?: 'primary' | 'line' };

export function HeroInner({
  eyebrow,
  title,
  titleAccent,
  titleAfter,
  sub,
  ctas,
  stats,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  titleAfter?: string;
  sub?: string;
  ctas?: CTA[];
  stats?: Stat[];
}) {
  return (
    <header className="hero hero-inner-page">
      <div className="hero-bg" />
      <div className="hero-dots" />
      <div className="container hero-inner">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="hero-title">
          {title}
          {titleAccent && (
            <>
              {' '}
              <em>{titleAccent}</em>
            </>
          )}
          {titleAfter && (
            <>
              <br />
              {titleAfter}
            </>
          )}
        </h1>
        {sub && <p className="hero-sub">{sub}</p>}
        {ctas && ctas.length > 0 && (
          <div className="hero-cta-row">
            {ctas.map((c) => (
              <Link
                key={c.href + c.label}
                href={c.href}
                className={`btn ${c.variant === 'line' ? 'btn-line' : 'btn-primary'} btn-lg`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}
        {stats && stats.length > 0 && (
          <div className="stat-row">
            {stats.map((s, i) => (
              <div key={i} className="stat">
                <div
                  className="stat-num"
                  dangerouslySetInnerHTML={{ __html: s.num }}
                />
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function SectionHead({
  eyebrow,
  title,
  titleAccent,
  titleAfter,
  sub,
  centered,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  titleAfter?: string;
  sub?: string;
  centered?: boolean;
}) {
  const style = centered ? { textAlign: 'center' as const, margin: '0 auto 36px', maxWidth: 720 } : undefined;
  return (
    <div className="section-head" style={style}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-h" style={centered ? { margin: '0 auto 14px' } : undefined}>
        {title}
        {titleAccent && (
          <>
            {' '}
            <em>{titleAccent}</em>
          </>
        )}
        {titleAfter && (
          <>
            <br />
            {titleAfter}
          </>
        )}
      </h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}

export function FinalCTA({
  title,
  titleAccent,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  titleAccent?: string;
  description?: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section className="final-cta">
      <div className="container">
        <h2>
          {title}
          {titleAccent && (
            <>
              {' '}
              <em>{titleAccent}</em>
            </>
          )}
          .
        </h2>
        {description && <p>{description}</p>}
        <Link className="btn btn-primary btn-lg" href={ctaHref}>
          {ctaLabel} &rarr;
        </Link>
      </div>
    </section>
  );
}
