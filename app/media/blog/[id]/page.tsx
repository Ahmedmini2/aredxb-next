import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlog } from '@/lib/sheets';
import { FinalCTA } from '@/components/Hero';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const b = await getBlog(id);
  return b
    ? { title: `${b.title} | Allegiance Real Estate`, description: 'Allegiance Real Estate Media — Dubai real estate news and insights.' }
    : { title: 'Article | Allegiance Real Estate Media' };
}

export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await getBlog(id);
  if (!b) return notFound();

  const cover = `/images/media/${b.link}.webp`;

  return (
    <>
      <header className="hero blog-hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="container">
          <Link href="/media" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Geist Mono', monospace", fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 22 }}>
            <i className="fa fa-angle-left" /> Back to Media
          </Link>
          <h1 className="hero-title" style={{ textAlign: 'left', maxWidth: 920 }}>{b.title}</h1>
          <div className="blog-meta-row">
            {b.category && <span className="blog-meta-pill cat">{b.category}</span>}
            {b.createdate && <span className="blog-meta-pill">{b.createdate}</span>}
          </div>
        </div>
      </header>

      <section>
        <div className="container">
          <div className="blog-grid">
            <article className="blog-article">
              <img className="blog-cover" src={cover} alt={b.title} />
              <div dangerouslySetInnerHTML={{ __html: b.body || '' }} />
            </article>
            <aside className="blog-aside">
              <div className="blog-newsletter">
                <div className="a-eyebrow">Newsletter</div>
                <h4>Stay informed.</h4>
                <p>Subscribe for the latest Dubai real estate insights — market updates, area guides and investor briefings.</p>
                <form action="https://aredxb.com/public/php/submit_form.php" method="post">
                  <input type="hidden" name="formTitle" value="Newsletter Signup" />
                  <input type="text" name="firstName" placeholder="First name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                  <p className="form-disclaimer" style={{ marginTop: 10, fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
                    By submitting, you agree to our <Link href="/about/terms-and-conditions" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Terms</Link> and <Link href="/about/privacy-policy" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA title="Talk to an" titleAccent="advisor" description="Have questions about anything you read here? Reach out and we&rsquo;ll get back to you within the hour." ctaHref="/contact" ctaLabel="Contact Us" />
    </>
  );
}
