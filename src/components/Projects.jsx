import React from 'react';
import { Link } from 'react-router-dom';
import { projectsList } from '../data/portfolioData';

const slugMap = {
  '01': 'chess-platform',
  '02': 'mugen-desktop-app',
  '03': 'mugensoft-portfolio',
};

const productMap = {
  '01': '/products/chess',
  '02': '/products/mugen',
};

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="section-label reveal">03. Projects</p>
            <h2 className="reveal" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, marginBottom: 8 }}>Things I've Built</h2>
            <p className="reveal delay-1" style={{ color: 'var(--muted)' }}>Real products, real deployments, real code</p>
          </div>
          <Link
            to="/projects"
            className="reveal"
            style={{
              fontFamily: 'Space Mono', fontSize: 12,
              color: 'var(--cyan)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--border)',
              padding: '8px 20px', borderRadius: 8,
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.background = 'rgba(0,229,204,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}
          >
            View All Projects →
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {projectsList.map((p, i) => (
            <div key={p.num} className={`card reveal delay-${i + 1}`} style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},transparent)` }} />
              <div style={{ padding: '32px 32px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: p.color, opacity: 0.5 }}>{p.num}</span>
                  <h3 style={{ fontSize: 22, fontWeight: 700 }}>{p.title}</h3>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 10px', borderRadius: 99, border: `1px solid ${p.color}50`, color: p.color, letterSpacing: 1 }}>{p.status}</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 620, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 8, marginBottom: 20 }}>
                  {p.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: p.color, fontSize: 10, flexShrink: 0 }}>✦</span>
                      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{h}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {p.tags.map(t => (
                    <span key={t} className="mono" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 4, fontSize: 11, color: 'var(--muted)' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11, padding: '7px 18px' }}>⚙ GitHub</a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer"
                      style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 18px', borderRadius: 6, border: `1px solid ${p.color}60`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      ↗ Live Demo
                    </a>
                  )}
                  <Link
                    to={`/projects/${slugMap[p.num]}`}
                    style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 18px', borderRadius: 6, background: `${p.color}15`, border: `1px solid ${p.color}40`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = `${p.color}25`}
                    onMouseLeave={e => e.currentTarget.style.background = `${p.color}15`}
                  >
                    Case Study →
                  </Link>
                  {productMap[p.num] && (
                    <Link
                      to={productMap[p.num]}
                      style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 18px', borderRadius: 6, background: 'transparent', border: `1px solid ${p.color}60`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${p.color}15`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      ↗ Product Page
                    </Link>
                  )}
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={p.screenshot}
                  alt={`${p.title} screenshot`}
                  style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  loading="lazy"
                />
                <Link
                  to={`/projects/${slugMap[p.num]}`}
                  style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: 'Space Mono', fontSize: 10, color: p.color, textDecoration: 'none', border: `1px solid ${p.color}50`, padding: '4px 10px', borderRadius: 4, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                >
                  Read Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 40px', fontSize: 14 }}>
            Browse All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
