import { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';

/** Scroll to top only on forward navigation (not browser back). */
export default function useScrollToTopOnEnter(deps = []) {
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [navType, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
}
