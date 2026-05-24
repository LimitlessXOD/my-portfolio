import { useEffect, useCallback } from 'react';

export default function useReveal(ready = true) {
  const observe = useCallback(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return obs;
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      const obs = observe();
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [ready, observe]);
}
