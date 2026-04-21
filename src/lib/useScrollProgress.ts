import { useEffect, useState } from 'react';

/**
 * Returns 0..1 based on how far through the document we've scrolled.
 * Throttled with rAF.
 */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = (doc.scrollHeight || 0) - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0);
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return p;
}
