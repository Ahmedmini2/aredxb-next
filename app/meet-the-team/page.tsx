import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { getTeam, slugify } from '@/lib/sheets';

export const metadata: Metadata = {
  title: 'Meet the Team — Allegiance Real Estate',
  description: 'Meet the exceptional team at Allegiance Real Estate — Dubai property advisors with deep market expertise across buying, selling, leasing and investment.',
};

export default async function MeetTheTeamPage() {
  const team = await getTeam();

  return (
    <>
      <HeroInner
        eyebrow="// The People"
        title="Meet the"
        titleAccent="team"
        titleAfter="."
        sub="An exceptional team of property experts at Allegiance Real Estate. Decades of combined experience in the Dubai property market — ready to deliver unparalleled service to our clients."
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Founder & CEO" title="Amr Bs" titleAccent="Aboushaban" titleAfter="." sub="Visionary founder and Chief Executive Officer of Allegiance Real Estate, bringing over 17 years of experience in the financial industry to his leadership role." />
          <div className="ceo-spotlight">
            <div className="ceo-photo" style={{ backgroundImage: "url('/images/team/amr-bs-aboushaban.webp')" }} />
            <div className="ceo-bio">
              <p className="long-copy">Before founding Allegiance, Amr spent over a decade in London, where he held senior positions at <strong>Merrill Lynch</strong> and <strong>Renaissance Capital</strong>. During this time, he honed his investment approach and developed a deep understanding of the global financial landscape.</p>
              <p className="long-copy">Amr&rsquo;s impressive track record also includes his role as Chief Investor Relations Officer at <strong>Damac</strong>, where he successfully raised $900 million and was recognised by Institutional Investor as the Best IRT professional in 2018.</p>
              <p className="long-copy">A unique blend of skills and knowledge — with a master&rsquo;s degree in finance and investment and a bachelor&rsquo;s degree in digital communication — enables Amr to approach real estate investment with a holistic perspective.</p>
              <div className="ceo-cta">
                <a href="tel:971564144147" className="btn btn-primary"><i className="fa fa-phone" /> Call</a>
                <a href="https://api.whatsapp.com/send?phone=971564144147" target="_blank" rel="noopener noreferrer" className="btn btn-line"><i className="fa fa-whatsapp" /> WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Our advisors" title="The" titleAccent="full team" titleAfter="." sub="Reach the right advisor for your needs." />
          <div className="team-grid">
            {team.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>// Loading team…</div>
            )}
            {team.map((m, i) => {
              const slug = slugify(m.name);
              const phone = (m.phone || '').replace(/\s+/g, '');
              return (
                <div className="team-card" key={i}>
                  <div className="avatar" style={{ backgroundImage: `url('/images/team/${slug}.webp')` }} />
                  <h4>{m.name}</h4>
                  <div className="role">{m.position}</div>
                  <div className="bio">{m.language}</div>
                  <div className="icons">
                    {phone && <a href={`tel:${phone}`} aria-label="Call"><i className="fa fa-mobile" /></a>}
                    {m.email && <a href={`mailto:${m.email}`} aria-label="Email"><i className="fa fa-envelope-o" /></a>}
                    {phone && <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fa fa-whatsapp" /></a>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA title="Talk to" titleAccent="your advisor" description="Reach the team directly or send a message and we&rsquo;ll be in touch within the hour." ctaHref="/contact" ctaLabel="Contact Us" />

      <style>{`
        .ceo-spotlight { display: grid; grid-template-columns: 380px 1fr; gap: 48px; align-items: start; }
        .ceo-photo { aspect-ratio: 4/5; border-radius: 16px; background: #1a1a1f center/cover no-repeat; border: 1px solid var(--line); }
        .ceo-bio { display: flex; flex-direction: column; gap: 14px; }
        .ceo-cta { display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .ceo-spotlight { grid-template-columns: 1fr; gap: 32px; }
          .ceo-photo { max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </>
  );
}
