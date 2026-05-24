import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to section hash when landing on home from another route (e.g. /#contact). */
export default function useHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== '/' || !hash) return;
    const id = hash.slice(1);
    const t = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(t);
  }, [pathname, hash]);
}
