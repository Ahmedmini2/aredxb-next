'use client';

import { useEffect, useState } from 'react';

type Layout = 'default' | 'legacy';

export default function PropertyGallery({ images, title, layout = 'default' }: { images: string[]; title: string; layout?: Layout }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length);
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, images.length]);

  if (!images.length) {
    return <div className="pd-cover" style={{ background: 'var(--bg-3)' }} />;
  }

  // Legacy 5-image grid layout (matches public/property-detail.html)
  if (layout === 'legacy') {
    const five = images.slice(0, 5);
    const totalExtra = images.length - 5;
    return (
      <>
        <div className="pd-gallery-grid">
          {five.map((src, i) => (
            <a
              key={i}
              className="gal"
              onClick={(e) => { e.preventDefault(); setActive(i); setOpen(true); }}
              href="#"
            >
              <img src={src} alt={`${title} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
              {i === 4 && totalExtra > 0 && (
                <span className="pd-gallery-more">+{totalExtra} photos</span>
              )}
            </a>
          ))}
        </div>

        {open && (
          <div className="lightbox open" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
            <button className="lightbox-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
            <button className="lightbox-prev" aria-label="Previous" onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}>
              <i className="fa fa-angle-left" />
            </button>
            <img className="lightbox-img" src={images[active]} alt={title} />
            <button className="lightbox-next" aria-label="Next" onClick={() => setActive((i) => (i + 1) % images.length)}>
              <i className="fa fa-angle-right" />
            </button>
            <span className="lightbox-counter">{active + 1} / {images.length}</span>
          </div>
        )}
      </>
    );
  }

  // Default layout (used by /offplan/project/[id])
  return (
    <div className="pd-gallery">
      <div
        className="pd-cover"
        style={{ backgroundImage: `url('${images[active].replace(/'/g, '%27')}')` }}
        onClick={() => setOpen(true)}
      />
      {images.length > 1 && (
        <div className="pd-thumbs">
          {images.slice(0, 12).map((src, i) => (
            <div
              key={i}
              className={`pd-thumb ${i === active ? 'active' : ''}`}
              style={{ backgroundImage: `url('${src.replace(/'/g, '%27')}')` }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}

      {open && (
        <div className="gallery-modal open" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <button className="gm-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
          <button className="gm-prev" aria-label="Previous" onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}>
            <i className="fa fa-angle-left" />
          </button>
          <img src={images[active]} alt={title} />
          <button className="gm-next" aria-label="Next" onClick={() => setActive((i) => (i + 1) % images.length)}>
            <i className="fa fa-angle-right" />
          </button>
        </div>
      )}
    </div>
  );
}
