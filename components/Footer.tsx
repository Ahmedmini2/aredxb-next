import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="ftr-cta-row">
          <h2>Start your journey with <em>Allegiance</em>.</h2>
          <Link href="/properties?purpose=sale" className="btn btn-primary btn-lg">Find Property</Link>
        </div>
        <div className="ftr-cols">
          <div>
            <Link href="/" className="logo">
              <img src="/images/allegiance-logo-light.svg" alt="Allegiance Real Estate" className="logo-fallback" />
            </Link>
            <p className="brand-blurb">
              Allegiance Real Estate is a leading integrated real estate service provider headquartered in the UAE &mdash; consistently ranked as the country&rsquo;s number one real estate agency. Alpha is our AI research agent, unifying 300+ Dubai market signals into one conversation.
            </p>
          </div>
          <div>
            <h4>Buy Property</h4>
            <ul>
              <li><Link href="/properties?purpose=sale">Properties for sale</Link></li>
              <li><Link href="/buy/buying-with-allegiance">Buying with Allegiance</Link></li>
              <li><Link href="/buy/buyers-guide">Buyer&rsquo;s Guide</Link></li>
              <li><Link href="/buy/dubai-communities">Dubai communities</Link></li>
            </ul>
          </div>
          <div>
            <h4>Sell Property</h4>
            <ul>
              <li><Link href="/sell/book-valuation">Book a valuation</Link></li>
              <li><Link href="/sell/list-your-property">List your property</Link></li>
              <li><Link href="/sell/selling-with-allegiance">Sell with Allegiance</Link></li>
              <li><Link href="/sell/sellers-guide">Seller&rsquo;s Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4>Rent Property</h4>
            <ul>
              <li><Link href="/properties?purpose=rent">Properties for rent</Link></li>
              <li><Link href="/rent/why-rent-with-allegiance">Why rent with us</Link></li>
              <li><Link href="/rent/tenants-guide">Tenant&rsquo;s Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link href="/about-allegiance-real-estate">Why Allegiance?</Link></li>
              <li><Link href="/meet-the-team">Meet the team</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/our-partners">Our Partners</Link></li>
              <li><Link href="/media">Media</Link></li>
              <li><Link href="/investment-insights">Investment Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="ftr-cities">
          <a href="https://maps.app.goo.gl/Aecw8NzbR6JFzNiz7" target="_blank" rel="noopener noreferrer">Dubai</a>
          <a href="https://maps.app.goo.gl/ZUtniRqd2tALXeP79" target="_blank" rel="noopener noreferrer">Riyadh</a>
          <span>Beirut</span>
          <span>Tokyo</span>
          <a href="https://maps.app.goo.gl/cn4cqT3vnCtJWPAW9" target="_blank" rel="noopener noreferrer">Paris</a>
          <a href="https://maps.app.goo.gl/xd79GoW1c3dobba98" target="_blank" rel="noopener noreferrer">Sydney</a>
          <a href="https://maps.app.goo.gl/1iqSuVjnE9Sk2E8y8" target="_blank" rel="noopener noreferrer">Ljubljana</a>
        </div>

        <div className="bottom">
          <span>&copy; {new Date().getFullYear()} Allegiance Real Estate. All Rights Reserved. &middot; <Link href="/about/terms-and-conditions">Terms</Link> &middot; <Link href="/about/privacy-policy">Privacy</Link> &middot; <Link href="/about/cookie-policy">Cookies</Link></span>
          <div className="socials">
            <a target="_blank" rel="noopener" href="https://www.facebook.com/allegiance.ae" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9V14.9H7.9v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v6.9C18.3 21.1 22 17 22 12z"/></svg></a>
            <a target="_blank" rel="noopener" href="https://www.instagram.com/allegiance.ae/" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
            <a target="_blank" rel="noopener" href="https://www.linkedin.com/company/allegiance-real-estate/" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18H5.7V9.7h2.6V18zM7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM18.3 18h-2.6v-4.5c0-1.1-.4-1.8-1.4-1.8s-1.5.6-1.8 1.3c-.1.2-.1.5-.1.8V18H9.8V9.7h2.6v1.1c.3-.5 1-1.3 2.3-1.3 1.7 0 3.6 1.1 3.6 4V18z"/></svg></a>
            <a target="_blank" rel="noopener" href="https://www.youtube.com/channel/UCluQT0ROUpAHg0IA0473kGw" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
