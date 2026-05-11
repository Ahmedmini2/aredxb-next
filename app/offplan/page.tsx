import type { Metadata } from 'next';
import { HeroInner, SectionHead, FinalCTA } from '@/components/Hero';
import { ToolCard } from '@/components/Cards';
import OffplanGrid from '@/components/OffplanGrid';
import { getProjectsSummary } from '@/lib/offplan';

export const metadata: Metadata = {
  title: 'Off-Plan Projects in Dubai — Allegiance Real Estate',
  description: 'Browse every Dubai off-plan project. Filter by developer, community, handover and price range. Direct developer inventory from Allegiance — UAE’s #1 ranked agency.',
};

export const revalidate = 600; // 10 min server cache

export default async function OffplanListingPage() {
  const projects = await getProjectsSummary();
  const developerCount = new Set(projects.map((p) => p.developer).filter(Boolean)).size;

  return (
    <>
      <HeroInner
        eyebrow="// Off-Plan"
        title="Dubai&rsquo;s best"
        titleAccent="off-plan projects"
        titleAfter="."
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Browse all" title="Every" titleAccent="active project" titleAfter="." sub="Filter by developer, community, handover, property type or price band — or click any card for the full project file." />
          <OffplanGrid projects={projects} />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Why off-plan" title="Why investors" titleAccent="buy off-plan" titleAfter="." />
          <div className="tools-grid">
            <ToolCard num="01" title="Lower Entry Cost" body="10–20% down at booking. The rest spread over construction with payment plans negotiated by the developer — so you control more property with less capital." />
            <ToolCard num="02" title="Capital Appreciation" body="Off-plan units typically appreciate 8–15% from launch to handover, especially in scarcity-driven locations and from tier-1 developers." />
            <ToolCard num="03" title="Pick Your Floor" body="Buy at launch and you choose the floor, the layout, and the view. By handover, the best units are already gone." />
            <ToolCard num="04" title="Direct from Developer" body="Allegiance's direct allocations mean better pricing and units you can't get from a portal listing — including pre-launch EOIs." />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// At a glance" title="The off-plan" titleAccent="opportunity" titleAfter="." sub="Direct developer inventory. Pre-launch and EOI access. Negotiated payment plans. Browse every off-plan project we represent — from tier-1 developers Emaar, Damac, Sobha, Aldar and more." />
          <div className="stat-row stat-row-end">
            <div className="stat"><div className="stat-num">{String(projects.length || '—')}</div><div className="stat-lbl">Active Projects</div></div>
            <div className="stat"><div className="stat-num">{String(developerCount || '—')}</div><div className="stat-lbl">Developer Partners</div></div>
            <div className="stat"><div className="stat-num" dangerouslySetInnerHTML={{ __html: '10&ndash;20%' }} /><div className="stat-lbl">Down Payment</div></div>
            <div className="stat"><div className="stat-num" dangerouslySetInnerHTML={{ __html: '5&ndash;9%' }} /><div className="stat-lbl">Net Yield (post-handover)</div></div>
          </div>
        </div>
      </section>

      <FinalCTA title="Talk to an" titleAccent="off-plan advisor" description="Tell us your budget and goals — we'll match you to the right project, often before it's public." ctaHref="/contact" ctaLabel="Contact Us" />
    </>
  );
}
