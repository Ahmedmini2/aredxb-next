'use client';

import { useEffect, useState } from 'react';

export default function IntroSplash() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('splash-active');
    const t = setTimeout(() => setHidden(true), 3000);
    const t2 = setTimeout(() => {
      setRemoved(true);
      document.documentElement.classList.remove('splash-active');
    }, 3500);
    return () => { clearTimeout(t); clearTimeout(t2); document.documentElement.classList.remove('splash-active'); };
  }, []);

  if (removed) return null;

  return (
    <div id="intro-splash" aria-hidden="true" className={hidden ? 'hide' : ''}>
      <img src="/images/span-img.gif" alt="" />
    </div>
  );
}
