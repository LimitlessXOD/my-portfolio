import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export default function usePageAnalytics() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    trackPageView(pathname + hash);
  }, [pathname, hash]);
}
