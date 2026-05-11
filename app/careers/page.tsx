import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner, SectionHead } from '@/components/Hero';
import { ToolCard } from '@/components/Cards';

export const metadata: Metadata = {
  title: "Careers at Allegiance Real Estate — Join the UAE's #1 Agency",
  description: "Build your career at Allegiance Real Estate — the UAE's #1 ranked agency. View open positions, perks, and apply with your CV today.",
};

export default function CareersPage() {
  return (
    <>
      <HeroInner
        eyebrow="// Careers"
        title="Build a career"
        titleAfter="with the "
        sub="The Allegiance team is our most valuable asset. We look for individuals who can handle challenging circumstances with perseverance & willpower — people who are driven and enjoy a fast-paced, dynamic environment."
        ctas={[
          { href: '#openings', label: 'View Job Openings' },
          { href: '#send-cv', label: 'Send us your CV', variant: 'line' },
        ]}
        stats={[
          { num: 'AED 20B', label: 'Transactions' },
          { num: '4.9/5', label: 'Client Rating' },
          { num: '20+', label: 'Languages' },
          { num: '5,000+', label: 'Properties Sold' },
        ]}
      />

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Why join us" title="A global advisory," titleAccent="headquartered in Dubai" titleAfter="." sub="The Allegiance team is the most valuable asset we have. If you want to join our team, you have to be driven and enjoy the fast-paced, dynamic environment we operate in." />
          <p className="long-copy">We&rsquo;re partnered with some of the best developers in the UAE and have earned prestigious industry awards and formal certificates of praise and appreciation for our innovative services.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Perks & Benefits" title="What you get when you" titleAccent="join" titleAfter="." />
          <div className="tools-grid">
            <ToolCard num="01" title="Experienced Foundation" body="Allegiance Real Estate has sold, rented and managed thousands of mixed-use properties worth several billions of dirhams. Stand on the shoulders of a proven team." />
            <ToolCard num="02" title="Tech-Driven Platform" body="Unlike traditional agencies, we've built a framework to improve client experiences and provide proper tools, unbiased counsel, and required knowledge for each location." />
            <ToolCard num="03" title="Globally Present" body="Our offices in Riyadh, Paris, Venice and Limassol are part of our strategy to broaden our horizons. International exposure comes with the territory." />
            <ToolCard num="04" title="Lead Generation" body="Roadshows, high-quality leads, exhibition stands across Dubai. You're not cold-calling — you're working warm pipeline." />
            <ToolCard num="05" title="Full Support" body="Dedicated administrator for listings. Videographers and graphic designers in-house. Training and continuous support for every advisor." />
            <ToolCard num="06" title="Attractive Commissions" body="Competitive commission structure designed to reward top performers. Your effort translates directly to your earnings." />
          </div>
        </div>
      </section>

      <section className="block" id="openings">
        <div className="container">
          <SectionHead eyebrow="// Job openings" title="Open" titleAccent="positions" titleAfter="." sub="Interested in becoming part of the team? Check out our current job openings below." />

          <div className="jobs-list">
            <div className="job-row">
              <div>
                <h4>Senior Investment Advisor</h4>
                <div className="job-meta"><span>Sales</span><span>Dubai HQ</span><span>Full-time</span></div>
              </div>
              <a href="#senior-investment-advisor" className="btn btn-primary">View Details</a>
            </div>
          </div>

          <div id="senior-investment-advisor" className="job-detail">
            <h3 className="job-detail-h">Senior Investment Advisor</h3>
            <p className="long-copy">At Allegiance, we pride ourselves on our ability to stay ahead of the curve and keep up with the latest trends in the Real Estate market. Whether you are looking to buy or rent a property, or to sell or lease your property, we&rsquo;re here to help you achieve your goals.</p>
            <p className="long-copy">The ideal candidate will be responsible for building and maintaining a strong sales pipeline. You&rsquo;ll do so by identifying key business opportunities and segmented prospects.</p>
            <div className="job-detail-grid">
              <div className="job-detail-card">
                <h4>Benefits</h4>
                <ul className="bullet-list">
                  <li>Roadshows, high-quality leads and stands in Dubai</li>
                  <li>Dedicated administrator to look after listings</li>
                  <li>Videographers and graphic designers in-house</li>
                  <li>Training and continuous support</li>
                  <li>Attractive commissions</li>
                </ul>
              </div>
              <div className="job-detail-card">
                <h4>Requirements</h4>
                <ul className="bullet-list">
                  <li>Minimum 1 year of real estate experience</li>
                  <li>Ability to negotiate and communicate effectively</li>
                  <li>Ability to work independently and target-oriented</li>
                  <li>Honest, enthusiastic and well organised</li>
                </ul>
              </div>
              <div className="job-detail-card">
                <h4>Responsibilities</h4>
                <ul className="bullet-list">
                  <li>Build pipeline and maintain long-term relationships with prospects</li>
                  <li>Identify new business opportunities</li>
                  <li>Develop annual sales strategy and goals</li>
                  <li>Leverage sales tools and resources to identify new sales leads</li>
                  <li>Collaborate with sales leaders</li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <a href="#send-cv" className="btn btn-primary btn-lg">Apply for this position</a>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Working at Allegiance" title="What makes us" titleAccent="different" titleAfter="." sub="A culture built on exceptional service and personalised relationships — with each client and each team member." />
          <div className="tools-grid">
            <ToolCard num="A" title="Specialists in Dubai" body="Our team has in-depth knowledge of every developer and product in the Dubai market — expertise to guide customers through complex decisions and ensure they make informed choices." />
            <ToolCard num="B" title="Unparalleled Experience" body="Combined experience spanning multiple industries and market segments. We leverage this to stay ahead of trends, identify opportunities, and provide customised solutions." />
            <ToolCard num="C" title="24/7 Availability" body="Our specialists are available 24x7 to provide marketing support and accurate market information. We work across time zones — serving clients all day, every day." />
          </div>
        </div>
      </section>

      <section className="block" id="send-cv">
        <div className="container">
          <div className="callback-grid">
            <div>
              <div className="eyebrow">// Send us your CV</div>
              <h2 className="section-h">Your next career move <em>starts here</em>.</h2>
              <p className="section-sub">Send us your CV and let&rsquo;s build success together.</p>
              <div className="contact-info" style={{ marginTop: 36 }}>
                <div className="contact-row"><span className="lbl">Phone</span><a href="tel:+971501440524">+971-50-144-0524</a></div>
                <div className="contact-row"><span className="lbl">WhatsApp</span><a href="https://api.whatsapp.com/send?phone=971501440524" target="_blank" rel="noopener noreferrer">Click to WhatsApp</a></div>
                <div className="contact-row"><span className="lbl">Email</span><a href="mailto:hr.support@allegiance.ae">hr.support@allegiance.ae</a></div>
                <div className="contact-row"><span className="lbl">Office</span><a href="https://maps.app.goo.gl/F3psD92zy6zWACZa6" target="_blank" rel="noopener noreferrer">Suite 2804, Floor 28th, Control Tower, Motor City, Dubai, United Arab Emirates</a></div>
              </div>
            </div>
            <form className="callback-form" action="https://aredxb.com/public/php/submit_form.php" method="post" encType="multipart/form-data">
              <input type="hidden" name="formTitle" value="CV Uploading Form" />
              <div className="form-row">
                <input type="text" name="firstName" placeholder="First name" required />
                <input type="text" name="lastName" placeholder="Last name" required />
              </div>
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone" required />
              <input type="text" name="jobTitle" placeholder="Job title (e.g. Senior Investment Advisor)" />
              <textarea name="message" rows={3} placeholder="Tell us why you'd be a great fit"></textarea>
              <label className="cv-upload">
                <span>CV Upload (PDF / DOC)</span>
                <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
              </label>
              <button type="submit" className="btn btn-primary btn-lg"><i className="fa fa-paper-plane-o" /> Submit Application</button>
              <p className="form-disclaimer">
                By submitting the form, you agree to our <Link href="/about/terms-and-conditions">Terms &amp; Conditions</Link> and <Link href="/about/privacy-policy">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .job-detail { margin-top: 56px; padding: 36px; background: var(--bg-2); border: 1px solid var(--line); border-radius: 16px; }
        body.light .job-detail { background: #fff; }
        .job-detail-h { font-family: 'Instrument Serif', serif; font-size: 38px; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 18px; color: var(--text); }
        .job-detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
        .job-detail-card { background: var(--bg-3); border: 1px solid var(--line); border-radius: 12px; padding: 22px; }
        body.light .job-detail-card { background: #fafafa; }
        .job-detail-card h4 { font-size: 13px; color: var(--accent); font-family: 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; }
        .bullet-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .bullet-list li { font-size: 14px; color: var(--text-2); line-height: 1.5; padding-left: 18px; position: relative; }
        .bullet-list li::before { content: ''; position: absolute; left: 0; top: 9px; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
        .cv-upload { display: flex; flex-direction: column; gap: 6px; }
        .cv-upload > span { font-size: 12px; color: var(--text-3); font-family: 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; }
        .cv-upload input[type="file"] { background: var(--bg-3); border: 1px dashed var(--line-2); border-radius: 8px; padding: 12px; color: var(--text-2); font-family: inherit; font-size: 13px; cursor: pointer; }
        body.light .cv-upload input[type="file"] { background: #fafafa; }
        @media (max-width: 900px) { .job-detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
