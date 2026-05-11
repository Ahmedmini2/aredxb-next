import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectDetail } from '@/lib/offplan';
import ProjectGallery from '@/components/ProjectGallery';
import { FinalCTA, SectionHead } from '@/components/Hero';

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getProjectDetail(id);
  return p
    ? { title: `${p.name} | Allegiance Off-Plan`, description: (p.description || p.shortDescription || '').slice(0, 160) }
    : { title: 'Project | Allegiance Real Estate' };
}

export default async function OffplanProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProjectDetail(id);
  if (!p) return notFound();

  // Render description with paragraphs
  let bodyHtml = '';
  const desc = (p.description || '').trim();
  if (desc) {
    if (desc.indexOf('<') === 0) bodyHtml = desc;
    else bodyHtml = desc.split(/\n\s*\n/).map((para) => '<p>' + para.replace(/\n/g, '<br/>') + '</p>').join('');
  }

  const ICONS: Record<string, string> = {
    pool: 'tint', swimming: 'tint', gym: 'heartbeat', fitness: 'heartbeat',
    spa: 'spa', concierge: 'bell-o', security: 'shield', parking: 'car',
    beach: 'umbrella', kids: 'child', children: 'child', retail: 'shopping-bag',
    shopping: 'shopping-bag', restaurant: 'cutlery', dining: 'cutlery',
    park: 'tree', cinema: 'film',
  };
  function pickIcon(name: string) {
    const n = (name || '').toLowerCase();
    for (const k in ICONS) if (n.indexOf(k) !== -1) return ICONS[k];
    return 'check-circle';
  }

  const address = [p.subCommunity, p.community, p.city, p.country].filter(Boolean).join(', ') || p.name || 'Dubai';
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address + ', UAE')}&output=embed`;
  const aiQs = `?project=${encodeURIComponent(String(p.id))}&name=${encodeURIComponent(p.name || '')}`;

  return (
    <>
      <header className="project-hero">
        <div className="ph-bg" style={p.image ? { backgroundImage: `url('${p.image.replace(/'/g, '%27')}')` } : undefined} />
        <div className="container">
          <Link href="/offplan" className="ph-back"><i className="fa fa-angle-left" /> All off-plan projects</Link>
          {p.developer && <div className="ph-developer">{p.developer}</div>}
          <h1>{p.name}</h1>
          <p className="ph-location">{[p.subCommunity, p.community, p.city].filter(Boolean).join(', ')}</p>
        </div>
      </header>

      <section className="project-facts">
        <div className="container">
          <div className="project-facts-grid">
            <div className="project-fact"><div className="pf-lbl">Handover</div><div className="pf-val">{p.handover || '—'}</div></div>
            <div className="project-fact"><div className="pf-lbl">Bedrooms</div><div className="pf-val">{p.bedrooms || '—'}</div></div>
            <div className="project-fact"><div className="pf-lbl">Property Type</div><div className="pf-val">{p.propertyTypes || '—'}</div></div>
            <div className="project-fact"><div className="pf-lbl">Payment Plan</div><div className="pf-val">{p.paymentPlan || '—'}</div></div>
            <div className="project-fact"><div className="pf-lbl">Starting From</div><div className="pf-val price">{p.priceFrom || 'On request'}</div></div>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="container">
          <SectionHead eyebrow="// About" title="About this" titleAccent="project" titleAfter="." />
          <div className="project-about">
            <div className="project-about-body" dangerouslySetInnerHTML={{ __html: bodyHtml || '<p>Detailed project description will be shared on request. Speak to one of our off-plan advisors for the full briefing pack.</p>' }} />
            <aside className="project-about-side">
              <h4>Get the brochure &amp; pricing</h4>
              <p>Speak to an Allegiance off-plan advisor for the full pricing matrix, payment plans, and current availability.</p>
              <a href="tel:+971564144147" className="btn btn-primary"><i className="fa fa-phone" /> Call advisor</a>
              <a href="https://api.whatsapp.com/send?phone=971564144147" target="_blank" rel="noopener noreferrer" className="btn btn-line"><i className="fa fa-whatsapp" /> WhatsApp</a>
              <Link href="/contact" className="btn btn-line"><i className="fa fa-envelope-o" /> Email enquiry</Link>
            </aside>
          </div>
        </div>
      </section>

      {p.amenities && p.amenities.length > 0 && (
        <section className="project-section">
          <div className="container">
            <SectionHead eyebrow="// What's inside" title="Project" titleAccent="amenities" titleAfter="." />
            <div className="amenity-grid">
              {p.amenities.map((a, i) => (
                <div className="amenity-tile" key={i}>
                  <div className="at-ic"><i className={`fa fa-${pickIcon(a)}`} /></div>
                  <div className="at-name">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="project-section">
        <div className="container">
          <SectionHead eyebrow="// Location" title="Where it" titleAccent="sits" titleAfter="." sub={address} />
          <div className="project-map">
            <iframe loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapSrc} title="Project location" />
          </div>
        </div>
      </section>

      {p.floorPlans && p.floorPlans.length > 0 && (
        <section className="project-section">
          <div className="container">
            <SectionHead eyebrow="// Floor Plans" title="Layouts" titleAccent="at a glance" titleAfter="." />
            <div className="floorplan-grid">
              {p.floorPlans.map((f, i) => (
                <div className="floorplan-card" key={i}>
                  <div className="fp-img" style={{ backgroundImage: `url('${f.url.replace(/'/g, '%27')}')` }} />
                  <div className="fp-body">
                    <h4>{f.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.gallery && p.gallery.length > 0 && (
        <section className="project-section">
          <div className="container">
            <SectionHead eyebrow="// Gallery" title="Project" titleAccent="gallery" titleAfter="." />
            <ProjectGallery images={p.gallery} />
          </div>
        </section>
      )}

      {p.units && p.units.length > 0 && (
        <section className="project-section">
          <div className="container">
            <SectionHead eyebrow="// Inventory" title="Available" titleAccent="units" titleAfter="." sub="Live availability from our developer allocation. Talk to an advisor for the latest pricing and reservations." />
            <div className="units-table-wrap">
              <table className="units-table">
                <thead>
                  <tr>
                    <th>Type</th><th>Bedrooms</th><th>Size</th><th>Price</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {p.units.slice(0, 50).map((u, i) => (
                    <tr key={i}>
                      <td>{u.type || '—'}</td>
                      <td>{u.bedrooms ?? '—'}</td>
                      <td>{u.size || '—'}</td>
                      <td className="unit-price">{u.price || 'On request'}</td>
                      <td>
                        <Link href={`/contact?subject=${encodeURIComponent('Enquiry: ' + p.name + ' — ' + (u.bedrooms || '') + 'BR ' + (u.type || ''))}`} className="btn btn-line" style={{ padding: '8px 14px', fontSize: 12 }}>Enquire</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="project-section">
        <div className="container">
          <SectionHead eyebrow="// AI tools" title="Run" titleAccent="Alpha" titleAfter=" on this project." sub="Use our AI tools to underwrite this project against your goals." />
          <div className="ai-tools-grid">
            <Link className="ai-tool-card" href={`/insights/capital-appreciation${aiQs}`}>
              <div className="ait-eyebrow">// Capital Appreciation</div><h4>How much will it grow?</h4>
              <p>Project capital appreciation against comparable Dubai launches over a 3- and 5-year horizon.</p>
              <span className="ait-cta">Run analysis <i className="fa fa-angle-right" /></span>
            </Link>
            <Link className="ai-tool-card" href={`/insights/exit-strategy${aiQs}`}>
              <div className="ait-eyebrow">// Exit Strategy</div><h4>Plan your exit.</h4>
              <p>Hold-and-let, flip at handover, refinance-and-hold, or trade-up — we model each path for this unit.</p>
              <span className="ait-cta">Run analysis <i className="fa fa-angle-right" /></span>
            </Link>
            <Link className="ai-tool-card" href={`/insights/off-plan-vs-ready${aiQs}`}>
              <div className="ait-eyebrow">// Off-Plan vs Ready</div><h4>Is off-plan right for you?</h4>
              <p>Score this project against your investor profile — budget, risk, hold period, yield vs. growth weighting.</p>
              <span className="ait-cta">Run analysis <i className="fa fa-angle-right" /></span>
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA title="Reserve a unit in" titleAccent={p.name} description="Direct from developer allocations. Pre-launch and EOI pricing." ctaHref="/contact" ctaLabel="Talk to an advisor" />
    </>
  );
}
