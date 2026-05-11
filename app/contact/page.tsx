import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner, SectionHead } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Contact Allegiance Real Estate — Get in Touch',
  description: 'Contact Allegiance Real Estate — the UAE’s #1 ranked agency. Phone, WhatsApp, email and our Motor City HQ. A team member will be in touch within the hour.',
};

export default function ContactPage() {
  return (
    <>
      <HeroInner eyebrow="// Contact" title="Get in" titleAccent="touch" titleAfter="." sub="Our team of experts will get you the right information about prices and properties in Dubai. We're a global real estate advisory helping customers connect with the right opportunities." />

      <section className="block">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">// Reach us</div>
              <h2 className="section-h">A member of our team will be in touch within <em>1 hour</em>.</h2>
              <p className="section-sub">Or reach us directly through any of the channels below — whichever works best for you.</p>

              <div className="contact-info">
                <div className="contact-row"><span className="lbl">Phone</span><a href="tel:971800273392">+971 800 273 392</a></div>
                <div className="contact-row"><span className="lbl">WhatsApp</span><a href="https://api.whatsapp.com/send?phone=971800273392" target="_blank" rel="noopener noreferrer">Click to WhatsApp</a></div>
                <div className="contact-row"><span className="lbl">Email</span><a href="mailto:marketing@allegiance.ae">marketing@allegiance.ae</a></div>
                <div className="contact-row"><span className="lbl">Office</span><a href="https://maps.app.goo.gl/F3psD92zy6zWACZa6" target="_blank" rel="noopener noreferrer">Suite 2804, Floor 28th, Control Tower, Motor City, Dubai, United Arab Emirates</a></div>
                <div className="contact-row"><span className="lbl">Hours</span><span className="val">24/7 cover across time zones · 20+ languages spoken</span></div>
              </div>
            </div>

            <form className="callback-form" action="https://aredxb.com/public/php/submit_form.php" method="post">
              <input type="hidden" name="formTitle" value="Contact Form" />
              <h3 className="form-h">Send us a message</h3>
              <p className="form-sub">A member of our team will respond within an hour.</p>
              <div className="form-row">
                <input type="text" name="firstName" placeholder="First name" required />
                <input type="text" name="lastName" placeholder="Last name" required />
              </div>
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone" required />
              <select name="topic">
                <option value="">What can we help with?</option>
                <option>I want to buy a property</option>
                <option>I want to sell a property</option>
                <option>I want to rent a property</option>
                <option>Investment advisory</option>
                <option>Career enquiry</option>
                <option>Other</option>
              </select>
              <textarea name="message" rows={4} placeholder="Tell us a bit more"></textarea>
              <button type="submit" className="btn btn-primary btn-lg">Send message</button>
              <p className="form-disclaimer">
                By submitting the form, you agree to our <Link href="/about/terms-and-conditions">Terms &amp; Conditions</Link> and <Link href="/about/privacy-policy">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <SectionHead eyebrow="// Global offices" title="Find us" titleAccent="worldwide" titleAfter="." sub="Headquartered in Dubai with offices supporting clients across the GCC, Europe and beyond." />
          <div className="offices-grid">
            <a className="office-card" href="https://maps.app.goo.gl/F3psD92zy6zWACZa6" target="_blank" rel="noopener noreferrer">
              <div className="office-flag">UAE</div>
              <h4>Dubai &mdash; HQ</h4>
              <p>Suite 2804, Control Tower<br />Motor City, Dubai</p>
            </a>
            <a className="office-card" href="https://maps.app.goo.gl/ZUtniRqd2tALXeP79" target="_blank" rel="noopener noreferrer">
              <div className="office-flag">KSA</div>
              <h4>Riyadh</h4>
              <p>Allegiance Real Estate<br />Riyadh, Saudi Arabia</p>
            </a>
            <a className="office-card" href="https://maps.app.goo.gl/cn4cqT3vnCtJWPAW9" target="_blank" rel="noopener noreferrer">
              <div className="office-flag">FR</div>
              <h4>Paris</h4>
              <p>Allegiance Real Estate<br />Paris, France</p>
            </a>
            <a className="office-card" href="https://maps.app.goo.gl/xd79GoW1c3dobba98" target="_blank" rel="noopener noreferrer">
              <div className="office-flag">AU</div>
              <h4>Sydney</h4>
              <p>Allegiance Real Estate<br />Sydney, Australia</p>
            </a>
            <a className="office-card" href="https://maps.app.goo.gl/1iqSuVjnE9Sk2E8y8" target="_blank" rel="noopener noreferrer">
              <div className="office-flag">SI</div>
              <h4>Ljubljana</h4>
              <p>Allegiance Real Estate<br />Ljubljana, Slovenia</p>
            </a>
            <div className="office-card office-soft">
              <div className="office-flag">+</div>
              <h4>Beirut, Tokyo, Venice, Limassol</h4>
              <p>Representative coverage across additional markets.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .form-h { font-family: 'Instrument Serif', serif; font-size: 28px; line-height: 1.05; letter-spacing: -0.01em; margin-bottom: 4px; color: var(--text); }
        .form-sub { font-size: 14px; color: var(--text-3); margin-bottom: 14px; }
        .offices-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .office-card { background: var(--bg-2); border: 1px solid var(--line); border-radius: 14px; padding: 28px; transition: border-color 0.2s, transform 0.2s; display: block; }
        body.light .office-card { background: #fff; }
        .office-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .office-card.office-soft { background: transparent; border-style: dashed; cursor: default; }
        .office-card.office-soft:hover { border-color: var(--line); transform: none; }
        .office-flag { display: inline-block; padding: 4px 8px; border-radius: 4px; background: var(--accent-soft); color: var(--accent); font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.08em; margin-bottom: 14px; }
        .office-card h4 { font-size: 18px; font-weight: 500; letter-spacing: -0.01em; margin-bottom: 6px; color: var(--text); }
        .office-card p { font-size: 13px; color: var(--text-2); line-height: 1.5; }
        @media (max-width: 900px) { .offices-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
