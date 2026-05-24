import { useEffect, useRef, useState } from 'react';

/**
 * Count up to `end` when element enters viewport.
 */
export default function useCountUp(end, { duration = 1200, suffix = '' } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) ** 3;
        setValue(String(Math.round(end * eased)) + (t >= 1 ? suffix : ''));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration, suffix]);

  return { ref, value };
}
