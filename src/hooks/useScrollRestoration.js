import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const STORAGE_KEY = 'mugensoft-scroll';

/**
 * Saves scroll position per-route to sessionStorage.
 * On POP navigation (back/forward), restores the saved position.
 * On PUSH (clicking a link), saves current position then scrolls new page to top.
 */
export default function useScrollRestoration() {
  const location = useLocation();
  const navType = useNavigationType(); // 'PUSH' | 'POP' | 'REPLACE'
  const scrollRef = useRef(0);

  // Track scroll position continuously so we can save it on navigate
  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (navType === 'POP') {
      // Going back/forward — restore saved position
      const saved = sessionStorage.getItem(`${STORAGE_KEY}:${location.key}`);
      const y = saved ? parseInt(saved, 10) : 0;
      // Small delay to let the page render before jumping
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: 'instant' });
        });
      });
    } else {
      // New navigation — save where we are, scroll new page to top
      sessionStorage.setItem(`${STORAGE_KEY}:${location.key}`, scrollRef.current);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.key, navType]);
}
