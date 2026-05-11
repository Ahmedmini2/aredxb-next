const AWARDS = [
  { name: 'Damac Awards (Q4 Award 2024)', year: '2024', img: 'Damac Awards (Q4 Award 2024).webp' },
  { name: 'Damac Awards (Top 20 Agencies 2024)', year: '2024', img: 'Damac Awards (Top 20 Agencies 2024).webp' },
  { name: 'Sobha Top Performing Channel Partner 2024', year: '2024', img: 'Sobha Top Performing Channel Partner 2024.webp' },
  { name: 'Top Performer Partner Major Developers 2024', year: '2024', img: 'Top Performer Partner Major Developers 2024.webp' },
  { name: 'DAMAC Q3 2024 Top Broker', year: 'Q3 2024', img: 'DAMAC AWARD Q3 2024 TOP BROKER.webp' },
  { name: 'DAMAC Broker Doha Top Agency 2024', year: '2024', img: 'DAMAC BROKER DOHA TOP AGENCY 2024.webp' },
  { name: 'Damac Broker Awards H2 — Top Local Corporate Broker (1st)', year: 'H2 2024', img: 'Damac Broker Awards H2 Top Local Corporate Broker 1st place.webp' },
  { name: 'Emaar Award', year: '2024', img: 'Emaar Award.webp' },
  { name: 'Damac Broker Awards Q2 2024', year: 'Q2 2024', img: 'Damac Broker Awards Q2 2024.webp' },
  { name: 'Sobha Top Yearly Performing Channel Partner', year: '2024', img: 'Sobha Top Yearly Performing Channel Partner.png.webp' },
  { name: 'Damac Broker Awards Q1 2024 — Top UAE Corporate Broker (1st)', year: 'Q1 2024', img: 'Damac Broker Awards Q1 2024 Top UAE Corporate Broker 1st place.webp' },
  { name: 'Damac Top Agency 2023 (1st Place)', year: '2023', img: 'Damac Top Agency 2023 1st Place.webp' },
  { name: 'DAMAC Broker Award H1 2023', year: 'H1 2023', img: 'DAMAC BROKER AWARD H1 2023.webp' },
  { name: 'DAMAC Broker Award 2022', year: '2022', img: 'DAMAC BROKER AWARD 2022.webp' },
  { name: 'DAMAC Broker Award Q2 2022', year: 'Q2 2022', img: 'DAMAC BROKER AWARD Q2 2022.webp' },
  { name: 'DAMAC Broker Award Q1 2022', year: 'Q1 2022', img: 'DAMAC BROKER AWARD Q1 2022.webp' },
  { name: 'OXE The Best Partner 2022', year: '2022', img: 'OXE THE BEST PARTNER 2022.webp' },
  { name: 'DAMAC Broker Award 2021', year: '2021', img: 'DAMAC BROKER AWARD 2021.webp' },
  { name: 'DAMAC Broker Award Q4 2021', year: 'Q4 2021', img: 'DAMAC BROKER AWARD Q4 2021.webp' },
  { name: 'DAMAC Broker Award Q3 2021', year: 'Q3 2021', img: 'DAMAC BROKER AWARD Q3 2021.webp' },
  { name: 'DAMAC Broker Award Q2 2021', year: 'Q2 2021', img: 'DAMAC BROKER AWARD Q2 2021.webp' },
  { name: 'DAMAC Broker Award Q1 2021', year: 'Q1 2021', img: 'DAMAC BROKER AWARD Q1 2021.webp' },
];

export default function AwardsCarousel() {
  // Render the set twice — the keyframe animation translates by -50% for a seamless loop
  const set = AWARDS.concat(AWARDS);
  return (
    <div>
      <div className="awards-carousel-mask">
        <div className="awards-carousel-track">
          {set.map((a, i) => (
            <div key={i} className="award-card">
              <div className="ac-img" style={{ backgroundImage: `url('/images/awards/${a.img.replace(/'/g, '%27')}')` }} />
              <div className="ac-foot">
                <span className="ac-yr">{a.year}</span>
                <span className="ac-name">{a.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
