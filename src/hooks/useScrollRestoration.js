import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const KEY = 'mugensoft-scroll';
const RESTORE_FLAG = 'mugensoft-scroll-restore';

/** Call before navigate(fallback) when history back is unavailable. */
export function markScrollRestore(path) {
  const pathname = path.split('#')[0] || '/';
  sessionStorage.setItem(RESTORE_FLAG, pathname);
}

function getSavedScroll(pathname, locationKey) {
  const byKey = sessionStorage.getItem(`${KEY}:key:${locationKey}`);
  if (byKey != null) return parseInt(byKey, 10);
  const byPath = sessionStorage.getItem(`${KEY}:path:${pathname}`);
  if (byPath != null) return parseInt(byPath, 10);
  return 0;
}

function saveScroll(pathname, locationKey, y) {
  sessionStorage.setItem(`${KEY}:key:${locationKey}`, String(y));
  sessionStorage.setItem(`${KEY}:path:${pathname}`, String(y));
}

function applyScroll(y) {
  window.scrollTo({ top: y, behavior: 'instant' });
}

/** Retry restore while lazy routes expand the document (Suspense / code-split). */
function restoreScrollWithRetries(pathname, locationKey) {
  const y = getSavedScroll(pathname, locationKey);
  const delays = [0, 50, 150, 400];
  const timers = delays.map(delay =>
    setTimeout(() => {
      requestAnimationFrame(() => applyScroll(y));
    }, delay)
  );
  return () => timers.forEach(clearTimeout);
}

export default function useScrollRestoration() {
  const location = useLocation();
  const navType = useNavigationType();
  const scrollRef = useRef(0);

  useEffect(() => {
    const fn = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const { pathname, key } = location;

  useEffect(() => {
    return () => saveScroll(pathname, key, scrollRef.current);
  }, [pathname, key]);

  useEffect(() => {
    const pendingRestore = sessionStorage.getItem(RESTORE_FLAG);

    if (navType === 'POP') {
      return restoreScrollWithRetries(pathname, key);
    }

    if (pendingRestore === pathname) {
      sessionStorage.removeItem(RESTORE_FLAG);
      return restoreScrollWithRetries(pathname, key);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, key, navType]);
}
