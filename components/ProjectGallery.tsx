'use client';

import { useEffect, useState } from 'react';

export default function ProjectGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length);
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, images.length]);

  const first5 = images.slice(0, 5);

  return (
    <>
      <div className="gallery-grid">
        {first5.map((src, i) => (
          <div
            key={i}
            className="gal-img"
            style={{ backgroundImage: `url('${src.replace(/'/g, '%27')}')` }}
            onClick={() => { setIdx(i); setOpen(true); }}
          />
        ))}
      </div>
      {images.length > 5 && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-line gallery-more-btn" onClick={() => { setIdx(0); setOpen(true); }}>
            View all {images.length} photos
          </button>
        </div>
      )}

      {open && (
        <div className="gallery-modal open" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <button className="gm-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
          <button className="gm-prev" aria-label="Previous" onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}>
            <i className="fa fa-angle-left" />
          </button>
          <img src={images[idx]} alt="" />
          <button className="gm-next" aria-label="Next" onClick={() => setIdx((i) => (i + 1) % images.length)}>
            <i className="fa fa-angle-right" />
          </button>
        </div>
      )}
    </>
  );
}
