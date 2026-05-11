import Link from 'next/link';

type ToolMini = { row: [string, string][] };

export function ToolCard({
  num,
  title,
  body,
  mini,
}: {
  num: string;
  title: string;
  body: string;
  mini?: ToolMini;
}) {
  return (
    <div className="tool-card">
      <div className="tool-num">{num}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      {mini && (
        <div className="tool-mini">
          {mini.row.map(([k, v], i) => (
            <div className="row" key={i}>
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CompareGrid({ bad, good }: { bad: { title: string; tag: string; items: string[] }; good: { title: string; tag: string; items: string[] } }) {
  return (
    <div className="compare">
      <div className="compare-col bad">
        <h3>
          {bad.title} <span className="tag">{bad.tag}</span>
        </h3>
        <ul>
          {bad.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </div>
      <div className="compare-col good">
        <h3>
          {good.title} <span className="tag">{good.tag}</span>
        </h3>
        <ul>
          {good.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AdvisorCard({ ctaEyebrow = 'Want to invest in Dubai?', heading = 'Talk to an Allegiance advisor.', body = '200+ international roadshows. AED 10B in transactions. The UAE’s #1 real estate advisory.' }: { ctaEyebrow?: string; heading?: string; body?: string }) {
  return (
    <div className="advisor-card">
      <div className="a-eyebrow">{ctaEyebrow}</div>
      <h4>{heading}</h4>
      <p>{body}</p>
      <div className="ac-cta">
        <a href="tel:+971564144147" className="btn btn-primary"><i className="fa fa-phone" /> Call</a>
        <a href="https://api.whatsapp.com/send?phone=971564144147" target="_blank" rel="noopener noreferrer" className="btn btn-line"><i className="fa fa-whatsapp" /> WhatsApp</a>
      </div>
      <div className="ac-divider" />
      <div className="ac-person">
        <div className="ac-avatar" style={{ backgroundImage: "url('/images/team/hanna-lazarenko.webp')" }} />
        <div>
          <div className="ac-name">Hanna Lazarenko</div>
          <div className="ac-role">Business Development Manager</div>
          <div className="ac-langs">English, Russian, Turkish</div>
        </div>
      </div>
    </div>
  );
}

export function GuideStep({ num, title, children }: { num: number | string; title: string; children: React.ReactNode }) {
  return (
    <div className="guide-step">
      <div className="step-num">{num}</div>
      <div className="step-body">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function CallbackBlock({ formTitle, eyebrow = '// Request a callback', heading, headingAccent, sub, benefits, formAction = 'https://aredxb.com/public/php/submit_form.php', extraFields, submitLabel = 'Request callback' }: {
  formTitle: string;
  eyebrow?: string;
  heading: string;
  headingAccent?: string;
  sub?: string;
  benefits?: string[];
  formAction?: string;
  extraFields?: React.ReactNode;
  submitLabel?: string;
}) {
  return (
    <section className="block">
      <div className="container">
        <div className="callback-grid">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="section-h">
              {heading} {headingAccent && <em>{headingAccent}</em>}.
            </h2>
            {sub && <p className="section-sub">{sub}</p>}
            {benefits && (
              <ul className="benefit-list">
                {benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
          <form className="callback-form" action={formAction} method="post">
            <input type="hidden" name="formTitle" value={formTitle} />
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First name" required />
              <input type="text" name="lastName" placeholder="Last name" required />
            </div>
            <input type="email" name="email" placeholder="Email" required />
            <input type="tel" name="phone" placeholder="Phone" required />
            {extraFields}
            <textarea name="message" rows={3} placeholder="Tell us what you&rsquo;re looking for"></textarea>
            <button type="submit" className="btn btn-primary btn-lg">{submitLabel}</button>
            <p className="form-disclaimer">
              By submitting the form, you agree to our <Link href="/about/terms-and-conditions">Terms &amp; Conditions</Link> and <Link href="/about/privacy-policy">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
