import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Book a Valuation — Allegiance Real Estate',
  description: 'Find out the current market value of your Dubai property. Allegiance Real Estate provides accurate, data-driven valuations and market insights.',
};

export default function BookValuationPage() {
  return (
    <>
      <HeroInner eyebrow="// Sell · Valuation" title="Find out what your" titleAfter={"property is "} sub="Get a fact-based valuation of your Dubai property. Our advisors combine on-site analysis with live transaction data, rental comps, and developer-level insight — so you list at the right price." />

      <section className="block">
        <div className="container">
          <div className="lead-capture-grid">
            <div>
              <div className="eyebrow">// Why book with us</div>
              <h2 className="section-h">An accurate price, <em>not a guess</em>.</h2>
              <p className="section-sub">Most online valuation tools give a rough range based on listings. We give you a price backed by actual closed transactions in your community, your tower, and your bedroom count.</p>
              <ul className="benefit-list">
                <li>On-site inspection by an experienced advisor</li>
                <li>Comparable closed transactions from DLD data</li>
                <li>Active rental and yield benchmarking</li>
                <li>Recommended listing strategy &amp; timing</li>
              </ul>
              <div className="contact-info" style={{ marginTop: 36 }}>
                <div className="contact-row"><span className="lbl">Phone</span><a href="tel:+971564144147">+971-56-414-4147</a></div>
                <div className="contact-row"><span className="lbl">WhatsApp</span><a href="https://api.whatsapp.com/send?phone=971564144147" target="_blank" rel="noopener noreferrer">Click to WhatsApp</a></div>
                <div className="contact-row"><span className="lbl">Email</span><a href="mailto:marketing@allegiance.ae">marketing@allegiance.ae</a></div>
                <div className="contact-row"><span className="lbl">Office</span><a href="https://maps.app.goo.gl/F3psD92zy6zWACZa6" target="_blank" rel="noopener noreferrer">Suite 2804, Floor 28th, Control Tower, Motor City, Dubai, UAE</a></div>
              </div>
            </div>

            <form className="callback-form" action="https://aredxb.com/public/php/submit_form.php" method="post">
              <input type="hidden" name="formTitle" value="Book a Valuation" />
              <h3 className="form-h">Book an appointment</h3>
              <p className="form-sub">Tell us about your property. An advisor will get back to you within the hour.</p>
              <div className="form-row">
                <input type="text" name="firstName" placeholder="First name" required />
                <input type="text" name="lastName" placeholder="Last name" required />
              </div>
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone" required />
              <input type="text" name="propertyAddress" placeholder="Property address or community" required />
              <select name="propertyType">
                <option value="">Property type</option>
                <option>Apartment</option><option>Townhouse</option><option>Villa</option>
                <option>Penthouse</option><option>Studio</option><option>Plot / Land</option><option>Other</option>
              </select>
              <textarea name="message" rows={3} placeholder="Anything else we should know? (e.g. mortgage status, urgency)"></textarea>
              <button type="submit" className="btn btn-primary btn-lg">Request valuation</button>
              <p className="form-disclaimer">
                By submitting the form, you agree to our <Link href="/about/terms-and-conditions">Terms &amp; Conditions</Link> and <Link href="/about/privacy-policy">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>

      <style>{`.form-h{font-family:'Instrument Serif',serif;font-size:28px;line-height:1.05;letter-spacing:-0.01em;margin-bottom:4px;color:var(--text)}.form-sub{font-size:14px;color:var(--text-3);margin-bottom:14px}`}</style>
    </>
  );
}
