'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useChat } from './ChatContext';

type FeaturedProject = {
  id: number | string;
  slug: string;
  name: string;
  developer: string;
  image: string;
  handover: string;
  priceFrom: string;
};

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featured, setFeatured] = useState<FeaturedProject[] | null>(null);
  const [featuredLoaded, setFeaturedLoaded] = useState(false);
  const { open: openChat } = useChat();

  // Lock scroll while drawer open + auto-close on resize past breakpoint
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function toggleTheme() {
    document.body.classList.toggle('light');
    try {
      localStorage.setItem('aa-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    } catch {}
  }

  async function loadFeatured() {
    if (featuredLoaded) return;
    setFeaturedLoaded(true);
    try {
      const res = await fetch('/api/offplan/projects/featured?limit=3', { cache: 'no-store' });
      const json = await res.json();
      setFeatured(Array.isArray(json.projects) ? json.projects : []);
    } catch {
      setFeatured([]);
    }
  }

  return (
    <>
      <nav className="top">
        <div className="container inner">
          <Link href="/" className="logo">
            <img src="/images/allegiance-logo-light.svg" alt="Allegiance Real Estate" className="logo-fallback" />
          </Link>
          <ul>
            <li className="has-drop has-drop-offplan" onMouseEnter={loadFeatured}>
              <Link className="nav-trigger" href="/offplan">
                Offplan <i className="fa fa-angle-down" />
              </Link>
              <div className="drop drop-offplan">
                <div className="drop-offplan-inner">
                  {featured === null && <div className="drop-offplan-loading">// Loading featured projects&hellip;</div>}
                  {featured && featured.length === 0 && <div className="drop-offplan-loading">No featured projects available.</div>}
                  {featured && featured.map((p) => (
                    <Link key={p.id} className="drop-offplan-card" href={`/offplan/project/${p.id}`}>
                      <div className="dop-img" style={{ backgroundImage: `url('${(p.image || '/images/offplan.webp').replace(/'/g, '%27')}')` }} />
                      <div className="dop-body">
                        <div className="dop-dev">{p.developer || ''}</div>
                        <div className="dop-name">{p.name || ''}</div>
                        <div className="dop-meta">
                          <span>{p.handover || 'Handover TBA'}</span>
                          <span className="dop-price">{p.priceFrom ? `from ${p.priceFrom}` : ''}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/offplan" className="drop-view-all"><strong>View all off-plan projects &rarr;</strong></Link>
              </div>
            </li>

            <li className="has-drop">
              <span className="nav-trigger">Buy <i className="fa fa-angle-down" /></span>
              <div className="drop">
                <Link href="/properties?purpose=sale">Properties for Sale</Link>
                <Link href="/buy/buying-with-allegiance">Buy with Allegiance</Link>
                <Link href="/buy/buyers-guide">Buyer Guides</Link>
                <Link href="/buy/dubai-communities">Dubai Communities</Link>
              </div>
            </li>

            <li className="has-drop">
              <span className="nav-trigger">Sell <i className="fa fa-angle-down" /></span>
              <div className="drop">
                <Link href="/sell/book-valuation">Book a Valuation</Link>
                <Link href="/sell/list-your-property">List Your Property</Link>
                <Link href="/sell/selling-with-allegiance">Sell with Allegiance</Link>
                <Link href="/sell/sellers-guide">Seller&rsquo;s Guide</Link>
              </div>
            </li>

            <li className="has-drop">
              <span className="nav-trigger">Rent <i className="fa fa-angle-down" /></span>
              <div className="drop">
                <Link href="/properties?purpose=rent">Properties for Rent</Link>
                <Link href="/rent/why-rent-with-allegiance">Why Rent with Us</Link>
                <Link href="/rent/tenants-guide">Tenants&rsquo; Guide</Link>
                <Link href="/rent/tenant-faq">Tenant FAQs</Link>
              </div>
            </li>

            <li className="has-drop">
              <span className="nav-trigger">Roadshows <i className="fa fa-angle-down" /></span>
              <div className="drop">
                <Link href="/roadshows/future-roadshows">Future Roadshows</Link>
                <Link href="/roadshows/previous-roadshows">Previous Roadshows</Link>
                <Link href="/roadshows/why-attend-allegiance-roadshows">Why Attend Allegiance Roadshows</Link>
              </div>
            </li>

            <li className="has-drop">
              <span className="nav-trigger">About <i className="fa fa-angle-down" /></span>
              <div className="drop">
                <Link href="/about-allegiance-real-estate">Why Allegiance</Link>
                <Link href="/meet-the-team">Meet the Team</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/our-partners">Our Partners</Link>
                <Link href="/media">Media</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </li>

            <li className="has-drop">
              <span className="nav-trigger">Investment Insights <i className="fa fa-angle-down" /></span>
              <div className="drop drop-wide">
                <Link href="/insights/is-dubai-good-investment">Is Dubai a Good Investment?</Link>
                <Link href="/insights/what-roi-expect">What ROI Can I Expect?</Link>
                <Link href="/insights/is-now-right-time">Is Now the Right Time?</Link>
                <Link href="/insights/capital-appreciation">Capital Appreciation</Link>
                <Link href="/insights/where-invest-200k">Where to Invest $200K?</Link>
                <Link href="/insights/minimum-investment">Minimum Investment</Link>
                <Link href="/insights/property-types">Property Types</Link>
                <Link href="/insights/best-areas">Best Areas in Dubai</Link>
                <Link href="/insights/dubai-vs-uk">Dubai vs UK</Link>
                <Link href="/insights/global-comparison">Global Comparison</Link>
                <Link href="/insights/off-plan-vs-ready">Off-Plan vs Ready</Link>
                <Link href="/insights/crisis-investing">Crisis Investing</Link>
                <Link href="/insights/market-cycles">Market Cycles</Link>
                <Link href="/insights/rental-yield-by-area">Rental Yield by Area</Link>
                <Link href="/insights/foreign-ownership">Foreign Ownership</Link>
                <Link href="/insights/golden-visa">Golden Visa</Link>
                <Link href="/insights/costs">Total Costs of Ownership</Link>
                <Link href="/insights/mortgage-for-foreigners">Mortgage for Foreigners</Link>
                <Link href="/insights/service-charges">Service Charges</Link>
                <Link href="/insights/exit-strategy">Exit Strategy</Link>
                <Link href="/investment-insights" className="drop-view-all"><strong>View All Insights &rarr;</strong></Link>
              </div>
            </li>
          </ul>
          <div className="actions">
            <button className="theme-toggle" aria-label="Toggle light/dark mode" type="button" onClick={toggleTheme}>
              <svg className="ic ic-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              <svg className="ic ic-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
            </button>
            <button type="button" className="btn btn-primary" onClick={() => openChat()}>Ask Alpha</button>
            <button className="nav-burger" aria-label="Open menu" type="button" onClick={() => setMenuOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mm-bar">
          <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
            <img src="/images/allegiance-logo-light.svg" alt="Allegiance" className="logo-fallback" />
          </Link>
          <button className="mm-close" aria-label="Close menu" type="button" onClick={() => setMenuOpen(false)}>×</button>
        </div>
        <div className="mm-content">
          <div className="mm-section">
            <h4>Off-Plan</h4>
            <Link href="/offplan" onClick={() => setMenuOpen(false)}>All Off-Plan Projects</Link>
          </div>
          <div className="mm-section">
            <h4>Buy</h4>
            <Link href="/properties?purpose=sale" onClick={() => setMenuOpen(false)}>Properties for Sale</Link>
            <Link href="/buy/buying-with-allegiance" onClick={() => setMenuOpen(false)}>Buy with Allegiance</Link>
            <Link href="/buy/buyers-guide" onClick={() => setMenuOpen(false)}>Buyer Guides</Link>
            <Link href="/buy/dubai-communities" onClick={() => setMenuOpen(false)}>Dubai Communities</Link>
          </div>
          <div className="mm-section">
            <h4>Sell</h4>
            <Link href="/sell/book-valuation" onClick={() => setMenuOpen(false)}>Book a Valuation</Link>
            <Link href="/sell/list-your-property" onClick={() => setMenuOpen(false)}>List Your Property</Link>
            <Link href="/sell/selling-with-allegiance" onClick={() => setMenuOpen(false)}>Sell with Allegiance</Link>
            <Link href="/sell/sellers-guide" onClick={() => setMenuOpen(false)}>Seller&rsquo;s Guide</Link>
          </div>
          <div className="mm-section">
            <h4>Rent</h4>
            <Link href="/properties?purpose=rent" onClick={() => setMenuOpen(false)}>Properties for Rent</Link>
            <Link href="/rent/why-rent-with-allegiance" onClick={() => setMenuOpen(false)}>Why Rent with Us</Link>
            <Link href="/rent/tenants-guide" onClick={() => setMenuOpen(false)}>Tenants&rsquo; Guide</Link>
          </div>
          <div className="mm-section">
            <h4>Roadshows</h4>
            <Link href="/roadshows/future-roadshows" onClick={() => setMenuOpen(false)}>Future Roadshows</Link>
            <Link href="/roadshows/previous-roadshows" onClick={() => setMenuOpen(false)}>Previous Roadshows</Link>
            <Link href="/roadshows/why-attend-allegiance-roadshows" onClick={() => setMenuOpen(false)}>Why Attend</Link>
          </div>
          <div className="mm-section">
            <h4>About</h4>
            <Link href="/about-allegiance-real-estate" onClick={() => setMenuOpen(false)}>Why Allegiance</Link>
            <Link href="/meet-the-team" onClick={() => setMenuOpen(false)}>Meet the Team</Link>
            <Link href="/careers" onClick={() => setMenuOpen(false)}>Careers</Link>
            <Link href="/our-partners" onClick={() => setMenuOpen(false)}>Our Partners</Link>
            <Link href="/media" onClick={() => setMenuOpen(false)}>Media</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
          <div className="mm-section">
            <h4>Investment Insights</h4>
            <Link href="/investment-insights" onClick={() => setMenuOpen(false)}>View All Insights</Link>
          </div>
        </div>
        <div className="mm-actions">
          <button className="theme-toggle" aria-label="Toggle light/dark mode" type="button" onClick={toggleTheme}>
            <svg className="ic ic-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg className="ic ic-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
          </button>
          <button type="button" className="btn btn-primary" onClick={() => { setMenuOpen(false); openChat(); }}>Ask Alpha</button>
        </div>
      </div>
    </>
  );
}
