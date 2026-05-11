const DEVS = [
  'Emaar Properties', 'Damac Properties', 'Sobha Realty', 'Nakheel', 'Meraas',
  'Aldar Properties', 'Dubai Properties', 'Azizi Developments', 'Danube Properties',
  'Binghatti Developers', 'Select Group', 'Ellington Properties', 'Omniyat',
  'Deyaar', 'MAG Property Development', 'Tiger Group', 'Arada', 'Bloom Holding',
  'Reportage Properties', 'Dubai Holding', 'Wasl Asset Management', 'Eagle Hills',
  'Imkan Properties', 'Imtiaz Developments', 'Samana Developers', 'Object 1',
];

export default function DevelopersMarquee() {
  const set = DEVS.concat(DEVS);
  return (
    <section className="developers">
      <div className="container">
        <div className="developers-label">// Developers we work with</div>
      </div>
      <div className="dev-marquee-mask">
        <div className="dev-track">
          {set.map((d, i) => <span key={i} className="dev-name">{d}</span>)}
        </div>
      </div>
    </section>
  );
}
