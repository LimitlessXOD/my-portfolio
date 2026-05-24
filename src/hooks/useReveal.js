import { useEffect } from 'react';

export default function useReveal(ready = true, routeKey = '') {
  useEffect(() => {
    if (!ready) return;

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        // Instantly show anything already in or above the viewport
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        } else {
          obs.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  // Re-run when route changes so back-navigation works
  }, [ready, routeKey]);
}
