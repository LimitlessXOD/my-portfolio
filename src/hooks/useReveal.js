import { useEffect } from 'react';

/**
 * @param {boolean} ready     - wait for loader to finish before running
 * @param {string}  routeKey  - re-run when route changes
 * @param {boolean} isPop     - true when navigating back/forward
 */
export default function useReveal(ready = true, routeKey = '', isPop = false) {
  useEffect(() => {
    if (!ready) return;

    if (isPop) {
      // Back/forward navigation: wait for the 0.38s PageTransition slide animation
      // to finish AND for scroll restoration (double-rAF) to settle before revealing.
      // Querying the DOM inside the timeout ensures we hit fully-painted, correctly
      // positioned elements — not mid-animation, pre-scroll-restore ones.
      const timer = setTimeout(() => {
        const all = document.querySelectorAll('.reveal');
        all.forEach(el => {
          el.style.transition = 'none';
          el.classList.add('visible');
        });
        requestAnimationFrame(() => {
          all.forEach(el => { el.style.transition = ''; });
        });
      }, 400); // 400ms > 380ms animation duration — gives layout time to fully settle
      return () => clearTimeout(timer);
    }

    // Forward navigation: reset → observe → reveal on scroll
    const all = document.querySelectorAll('.reveal');

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
