import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const KEY = 'mugensoft-scroll';

export default function useScrollRestoration() {
  const location  = useLocation();
  const navType   = useNavigationType();
  const scrollRef = useRef(0);

  // Track scroll continuously
  useEffect(() => {
    const fn = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Save position for THIS route when leaving it (cleanup runs on location.key change)
  useEffect(() => {
    return () => {
      sessionStorage.setItem(`${KEY}:${location.key}`, String(scrollRef.current));
    };
  }, [location.key]);

  // Restore or reset scroll when arriving at a new route
  useEffect(() => {
    if (navType === 'POP') {
      // Going back/forward — restore saved position
      const saved = sessionStorage.getItem(`${KEY}:${location.key}`);
      const y = saved ? parseInt(saved, 10) : 0;
      // Two rAF frames: first lets React paint the page, second restores scroll
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          window.scrollTo({ top: y, behavior: 'instant' })
        )
      );
    } else {
      // Fresh navigation — start at top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.key, navType]);
}
