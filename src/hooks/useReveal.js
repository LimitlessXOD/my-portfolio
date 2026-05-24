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

    // Temporarily suppress transition during reset to avoid flash
    const allReveal = document.querySelectorAll('.reveal');
    allReveal.forEach(el => {
      el.style.transition = 'none';
      el.classList.remove('visible');
    });

    // Force a reflow so the removal takes effect without animating
    void document.body.offsetHeight;

    requestAnimationFrame(() => {
      // Re-enable transitions
      allReveal.forEach(el => {
        el.style.transition = '';
      });

      // Now check each element
      allReveal.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        } else {
          obs.observe(el);
        }
      });
    });

    return () => obs.disconnect();
  }, [ready, routeKey]);
}
