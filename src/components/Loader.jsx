import { useState, useEffect } from 'react';

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [15, 35, 55, 72, 88, 100];
    let i = 0;
    const t = setInterval(() => {
      if (i < steps.length) {
        setPct(steps[i++]);
      } else {
        clearInterval(t);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 400);
        }, 200);
      }
    }, 120);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: done ? 'opacity 0.4s, transform 0.4s' : 'none',
        opacity: done ? 0 : 1,
        transform: done ? 'translateY(-20px)' : 'translateY(0)',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <img
        src="/mugensoft-logo.png"
        alt="MugenSoft"
        style={{
          width: 80,
          height: 80,
          objectFit: 'contain',
          marginBottom: 24,
          animation: 'float 2s ease-in-out infinite',
        }}
      />
      <div style={{ fontFamily: 'Space Mono', fontSize: 13, color: 'var(--cyan)', marginBottom: 20, letterSpacing: 2 }}>
        MUGENSOFT
      </div>
      <div style={{ width: 200, height: 2, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg,var(--cyan),#6366f1)',
            width: `${pct}%`,
            transition: 'width 0.15s ease',
            borderRadius: 2,
          }}
        />
      </div>
      <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)' }}>{pct}%</div>
    </div>
  );
}
