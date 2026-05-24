import { useNavigate } from 'react-router-dom';
import { markScrollRestore } from './useScrollRestoration';

/**
 * Prefer browser history back (keeps scroll). Falls back to `to` and restores saved scroll.
 */
export function useNavigateBack(fallback = '/') {
  const navigate = useNavigate();

  return (event) => {
    event?.preventDefault?.();
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    const hashIndex = fallback.indexOf('#');
    if (hashIndex !== -1) {
      const pathname = fallback.slice(0, hashIndex) || '/';
      const hash = fallback.slice(hashIndex);
      markScrollRestore(pathname);
      navigate({ pathname, hash });
    } else {
      markScrollRestore(fallback);
      navigate(fallback);
    }
  };
}
