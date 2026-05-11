import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroInner } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'List Your Property — Allegiance Real Estate',
  description: "List your Dubai property with the UAE's #1 ranked agency. AED 10B in transactions, 200+ international roadshows, professional marketing, and direct buyers.",
};

export default function ListYourPropertyPage() {
  return (
    <>
      <HeroInner eyebrow="// Sell · List Property" title="List your property" titleAfter="with the " sub="We've sold, rented and managed thousands of mixed-use properties worth several billions of dirhams. Get the right consultation in minutes — we'll connect you to the right buyers." />

      <section className="block">
        <div className="container">
          <div className="lead-capture-grid">
            <div>
              <div className="eyebrow">// What we bring</div>
              <h2 className="section-h">A buyer pipeline, not <em>just a portal listing</em>.</h2>
              <p className="section-sub">Allegiance markets your property to a global pool of investors via 200+ international roadshows, direct buyer networks, professional video and photography, and premium portal placement.</p>
              <ul className="benefit-list">
                <li>Pricing strategy backed by DLD transaction data</li>
                <li>Professional photography &amp; video included</li>
                <li>Listed on Bayut, Property Finder, Dubizzle, plus our own buyer pool</li>
                <li>Negotiation, paperwork, NOC, transfer — all handled</li>
              </ul>
              <div className="contact-info" style={{ marginTop: 36 }}>
                <div className="contact-row"><span className="lbl">Phone</span><a href="tel:+971564144147">+971-56-414-4147</a></div>
                <div className="contact-row"><span className="lbl">WhatsApp</span><a href="https://api.whatsapp.com/send?phone=971564144147" target="_blank" rel="noopener noreferrer">Click to WhatsApp</a></div>
                <div className="contact-row"><span className="lbl">Email</span><a href="mailto:marketing@allegiance.ae">marketing@allegiance.ae</a></div>
                <div className="contact-row"><span className="lbl">Office</span><a href="https://maps.app.goo.gl/F3psD92zy6zWACZa6" target="_blank" rel="noopener noreferrer">Suite 2804, Floor 28th, Control Tower, Motor City, Dubai, UAE</a></div>
              </div>
            </div>

            <form className="callback-form" action="https://aredxb.com/public/php/submit_form.php" method="post">
              <input type="hidden" name="formTitle" value="List Your Property" />
              <h3 className="form-h">List your property</h3>
              <p className="form-sub">Send us the basics — an advisor will reach out within the hour.</p>
              <div className="form-row">
                <input type="text" name="firstName" placeholder="First name" required />
                <input type="text" name="lastName" placeholder="Last name" required />
              </div>
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone" required />
              <input type="text" name="propertyAddress" placeholder="Property address or community" required />
              <div className="form-row">
                <select name="propertyType">
                  <option value="">Property type</option>
                  <option>Apartment</option><option>Townhouse</option><option>Villa</option>
                  <option>Penthouse</option><option>Studio</option><option>Plot / Land</option>
                </select>
                <select name="purpose">
                  <option value="">Purpose</option><option>Sale</option><option>Rent</option><option>Both</option>
                </select>
              </div>
              <textarea name="message" rows={3} placeholder="Tell us about your property"></textarea>
              <button type="submit" className="btn btn-primary btn-lg">Request listing</button>
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
