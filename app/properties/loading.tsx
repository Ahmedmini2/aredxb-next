export default function Loading() {
  return (
    <>
      <header className="hero props-hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="container hero-inner" style={{ textAlign: 'left' }}>
          <div className="crumbs"><span>Loading…</span></div>
          <h1>Properties<em>.</em></h1>
          <p style={{ opacity: 0.7 }}>Fetching live inventory…</p>
        </div>
      </header>
      <section className="listing-shell">
        <div className="container">
          <div className="listing-grid">
            <div>
              <div className="listing-list">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="property-card" style={{ pointerEvents: 'none' }}>
                    <div className="pc-img" style={{ background: 'var(--bg-3)' }} />
                    <div className="pc-body">
                      <div className="pc-title" style={{ background: 'var(--bg-3)', height: 14, width: '70%', borderRadius: 4 }} />
                      <div className="pc-loc" style={{ background: 'var(--bg-3)', height: 10, width: '50%', borderRadius: 4, marginTop: 8 }} />
                      <div className="pc-meta" style={{ marginTop: 12 }}>
                        <span className="pcm" style={{ background: 'var(--bg-3)', height: 10, width: 40, borderRadius: 4 }} />
                        <span className="pcm" style={{ background: 'var(--bg-3)', height: 10, width: 40, borderRadius: 4 }} />
                        <span className="pcm" style={{ background: 'var(--bg-3)', height: 10, width: 60, borderRadius: 4 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="listing-map-wrap" style={{ display: 'grid', placeItems: 'center', color: 'var(--text-3)' }}>
              Map loading…
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
