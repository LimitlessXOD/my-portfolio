import { useEffect } from 'react';

/**
 * @param {boolean} ready     - wait for loader to finish before running
 * @param {string}  routeKey  - re-run when route changes
 * @param {boolean} isPop     - true when navigating back/forward
 */
export default function useReveal(ready = true, routeKey = '', isPop = false) {
  useEffect(() => {
    if (!ready) return;

    const all = document.querySelectorAll('.reveal');

    if (isPop) {
      // Back navigation: reveal everything instantly — no animation reset needed.
      // The PageTransition wrapper already handles the visual "entering" feel.
      all.forEach(el => {
        el.style.transition = 'none';
        el.classList.add('visible');
      });
      // Re-enable transitions after paint so future interactions still animate
      requestAnimationFrame(() => {
        all.forEach(el => { el.style.transition = ''; });
      });
      return;
    }

    // Forward navigation: reset → observe → reveal on scroll
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Suppress transitions during reset to avoid flash
    all.forEach(el => {
      el.style.transition = 'none';
      el.classList.remove('visible');
    });

    // Force reflow so removal takes effect
    void document.body.offsetHeight;

    requestAnimationFrame(() => {
      all.forEach(el => { el.style.transition = ''; });
      all.forEach(el => {
        const { top } = el.getBoundingClientRect();
        if (top < window.innerHeight) {
          el.classList.add('visible');
        } else {
          obs.observe(el);
        }
      });
    });

    return () => obs.disconnect();
  }, [ready, routeKey, isPop]);
}
