import { useEffect } from 'react';

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .reveal-group';

function showElement(el, observer) {
  if (el.classList.contains('reveal-group')) {
    el.classList.add('visible');
    el.querySelectorAll('.reveal-child').forEach((child, i) => {
      setTimeout(() => child.classList.add('visible'), i * 85);
    });
    observer.unobserve(el);
    return;
  }
  el.classList.add('visible');
  observer.unobserve(el);
}

function resetElements(all) {
  all.forEach(el => {
    el.style.transition = 'none';
    el.classList.remove('visible');
    el.querySelectorAll('.reveal-child').forEach(c => c.classList.remove('visible'));
  });
  void document.body.offsetHeight;
  all.forEach(el => { el.style.transition = ''; });
}

function revealAllImmediately(all) {
  all.forEach(el => {
    el.style.transition = 'none';
    el.classList.add('visible');
    el.querySelectorAll('.reveal-child').forEach(c => c.classList.add('visible'));
  });
  requestAnimationFrame(() => {
    all.forEach(el => { el.style.transition = ''; });
  });
}

/**
 * @param {boolean} ready     - wait for loader to finish before running
 * @param {string}  routeKey  - re-run when route changes
 * @param {boolean} isPop     - true when navigating back/forward
 */
export default function useReveal(ready = true, routeKey = '', isPop = false) {
  useEffect(() => {
    if (!ready) return;

    if (isPop) {
      const timer = setTimeout(() => {
        revealAllImmediately(document.querySelectorAll(REVEAL_SELECTOR));
      }, 400);
      return () => clearTimeout(timer);
    }

    const all = document.querySelectorAll(REVEAL_SELECTOR);

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) showElement(e.target, obs);
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    resetElements(all);

    requestAnimationFrame(() => {
      all.forEach(el => {
        const { top } = el.getBoundingClientRect();
        if (top < window.innerHeight) {
          if (el.classList.contains('reveal-group')) {
            showElement(el, obs);
          } else {
            el.classList.add('visible');
            obs.unobserve(el);
          }
        } else {
          obs.observe(el);
        }
      });
    });

    return () => obs.disconnect();
  }, [ready, routeKey, isPop]);
}
