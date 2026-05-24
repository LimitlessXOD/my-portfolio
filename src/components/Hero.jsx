import { useEffect, useRef, useState } from 'react';
import useTyping from '../hooks/useTyping';

/* Floating particle canvas */
function ParticleCanvas() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const make = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.5 + 0.1,
      cyan: Math.random() > 0.5,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: 80 }, make);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan
          ? `rgba(0,229,204,${p.o})`
          : `rgba(99,102,241,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

/* Animated "Build. Deploy. Iterate." word cycle */
function WordCycle() {
  const words = ['Build.', 'Deploy.', 'Iterate.'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="word-cycle" key={idx} style={{ color: 'var(--cyan)', display: 'inline-block' }}>
      {words[idx]}
    </span>
  );
}

export default function Hero() {
  const role = useTyping([
    'Full-Stack Developer',
    'AI App Builder',
    'Chess Platform Creator',
    'Freelance Dev',
    'CS Student @ NUST',
  ]);

  const stats = [
    { n: '3+', l: 'Projects Shipped' },
    { n: '2',  l: 'Live Products' },
    { n: '5+', l: 'Technologies' },
    { n: '∞',  l: 'Coffee Consumed' },
  ];

  return (
    <section
      id="top"
      className="grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
        background: 'var(--bg)',
      }}
    >
      <ParticleCanvas />

      {/* Orbs */}
      <div className="orb1" style={{
        position: 'absolute', top: '12%', right: '8%',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,229,204,0.10) 0%,transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="orb2" style={{
        position: 'absolute', bottom: '8%', left: '3%',
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(99,102,241,0.13) 0%,transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '60%',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,229,204,0.06) 0%,transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '0 32px',
        width: '100%', position: 'relative', zIndex: 1,
      }}>

        {/* Top badge row */}
        <div className="reveal visible" style={{
          display: 'flex', alignItems: 'center', gap: 16,
          marginBottom: 36, flexWrap: 'wrap',
        }}>
          {/* Logo badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,229,204,0.06)',
            border: '1px solid rgba(0,229,204,0.2)',
            borderRadius: 40, padding: '6px 16px 6px 8px',
          }}>
            <img
              src="/mugensoft-logo.png"
              alt="MugenSoft"
              style={{ height: 28, width: 28, objectFit: 'contain', borderRadius: '50%' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: 11,
              color: 'var(--cyan)', letterSpacing: 2,
            }}>MUGENSOFT</span>
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: 9,
              color: 'var(--muted)', letterSpacing: 1,
            }}>· DEVELOPER STUDIO</span>
          </div>

          {/* Status dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px rgba(34,197,94,0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: 10,
              color: 'var(--muted)', letterSpacing: 1,
            }}>AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="reveal visible" style={{ marginBottom: 8 }}>
          <p className="mono" style={{
            color: 'var(--cyan)', fontSize: 12, letterSpacing: 4,
            marginBottom: 18, opacity: 0.7,
          }}>// Hello, World 👋 — I'm Erastus (Leroy) Shalimba</p>

          <h1 style={{
            fontSize: 'clamp(44px,7.5vw,88px)',
            fontWeight: 900, lineHeight: 1.0,
            marginBottom: 0, letterSpacing: '-2px',
          }}>
            <span style={{ display: 'block' }}>
              <WordCycle />
            </span>


          </h1>
        </div>

        {/* Typing role */}
        <div className="reveal visible" style={{ marginBottom: 24, marginTop: 28 }}>
          <p className="mono" style={{ fontSize: 17 }}>
            <span style={{ color: 'var(--muted)' }}>$ whoami → </span>
            <span style={{ color: 'var(--cyan)' }} className="cursor">{role}</span>
          </p>
        </div>

        {/* Description */}
        <p className="reveal visible" style={{
          color: 'var(--muted)', fontSize: 17,
          maxWidth: 540, lineHeight: 1.8, marginBottom: 40,
        }}>
          Full-stack developer building web apps, AI-powered tools, and desktop software.
          Based in <span style={{ color: 'var(--text)' }}>Windhoek, Namibia</span> — working with clients worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="reveal visible" style={{
          display: 'flex', gap: 12, flexWrap: 'wrap',
          marginBottom: 72,
        }}>
          <a href="#projects" className="btn-hero-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            View Projects
            <span style={{ fontSize: 16 }}>→</span>
          </a>
          <a href="#services" className="btn-hero-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Hire Me
          </a>
          <a
            href="https://wa.me/264812590824?text=Hi%20Erastus%2C%20I%20found%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank" rel="noreferrer"
            className="btn-hero-wa"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a href="/mugensoft-cv.pdf" download="Erastus_Shalimba_CV.pdf" className="btn-hero-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            ↓ CV
          </a>
          <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-hero-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            GitHub ↗
          </a>
        </div>

        {/* Stats bar */}
        <div className="reveal visible" style={{
          display: 'flex', gap: 0, flexWrap: 'wrap',
          borderTop: '1px solid var(--border)',
          paddingTop: 32,
        }}>
          {stats.map(({ n, l }, i) => (
            <div key={l} style={{
              flex: '1 1 100px',
              padding: '0 32px 0 0',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              marginRight: i < stats.length - 1 ? 32 : 0,
            }}>
              <div className="grad-text" style={{
                fontSize: 'clamp(28px,3.5vw,40px)',
                fontWeight: 900, lineHeight: 1, marginBottom: 4,
              }}>{n}</div>
              <div style={{
                color: 'var(--muted)', fontSize: 11,
                fontFamily: 'Space Mono, monospace', letterSpacing: 1,
              }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8, zIndex: 1,
      }}>
        <span style={{
          color: 'var(--muted)', fontFamily: 'Space Mono, monospace',
          fontSize: 9, letterSpacing: 3,
        }}>SCROLL</span>
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom,var(--cyan),transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
