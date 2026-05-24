import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const slugMap = { '01': 'chess-platform', '02': 'mugen-desktop-app', '03': 'mugensoft-portfolio' };
const productMap = { '01': '/products/chess', '02': '/products/mugen' };

const allProjects = [
  {
    num: '01',
    title: 'Ultimate Chess Showdown',
    status: 'Live',
    color: '#c9a84c',
    category: 'Web',
    desc: 'Real-time multiplayer chess platform with WebSockets, full chess rules, match history, and local sandbox mode.',
    tags: ['React', 'Node.js', 'Socket.io', 'WebSockets', 'Render'],
    screenshot: '/screenshot-chess.png',
    github: 'https://github.com/LimitlessXOD',
    demo: 'https://chess-project-1-y6c5.onrender.com',
    year: '2025',
  },
  {
    num: '02',
    title: 'MUGEN — Desktop Media App',
    status: 'Personal',
    color: '#6366f1',
    category: 'Desktop',
    desc: 'Full-featured desktop media app — YouTube & TikTok download, built-in player, analytics dashboard, library management.',
    tags: ['Desktop', 'yt-dlp', 'Media Player', 'Analytics'],
    screenshot: '/screenshot-mugen.png',
    github: 'https://github.com/LimitlessXOD',
    demo: null,
    year: '2025',
  },
  {
    num: '03',
    title: 'MugenSoft Portfolio',
    status: 'Live',
    color: '#10b981',
    category: 'Web',
    desc: 'Full-stack developer portfolio with Supabase guestbook, contact form, dark/light mode, and animated interactions.',
    tags: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Vercel'],
    screenshot: '/screenshot-portfolio.png',
    github: 'https://github.com/LimitlessXOD',
    demo: 'https://mugensoft-dev.vercel.app',
    year: '2025',
  },
];

const FILTERS = ['All', 'Web', 'Desktop', 'AI', 'Games'];

export default function ProjectsHub() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return allProjects.filter(p => {
      const matchCat = active === 'All' || p.category === active;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [active, search]);

  useEffect(() => {
    document.title = 'Projects — MugenSoft';
  }, []);

  return (
    <>
      <Nav />
      <main className="page-enter" style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

        {/* Header */}
        <section style={{ background: 'var(--bg2)', paddingTop: 120, paddingBottom: 64, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
            <Link to="/" style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              ← Back Home
            </Link>
            <p className="section-label">Projects Hub</p>
            <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>
              Things I've <span className="grad-text">Built</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
              Real products, real deployments, real code. Each project is something I built to solve an actual problem.
            </p>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 400, marginBottom: 28 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14, pointerEvents: 'none' }}>⌕</span>
              <input
                className="input-field"
                placeholder="Search projects, tags, tech..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 38, fontSize: 14 }}
              />
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  style={{
                    fontFamily: 'Space Mono, monospace', fontSize: 11,
                    padding: '6px 18px', borderRadius: 99, border: 'none',
                    cursor: 'pointer', letterSpacing: 1,
                    transition: 'all 0.2s',
                    background: active === f ? 'var(--cyan)' : 'var(--bg3)',
                    color: active === f ? '#080c12' : 'var(--muted)',
                    boxShadow: active === f ? '0 0 16px rgba(0,229,204,0.3)' : 'none',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: '64px 0 100px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>

            {/* Count */}
            <p style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', marginBottom: 32, letterSpacing: 1 }}>
              // {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
              {search && ` for "${search}"`}
            </p>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ fontFamily: 'Space Mono', color: 'var(--muted)', fontSize: 14 }}>
                  // No projects match "{search}"
                </p>
                <button
                  onClick={() => { setSearch(''); setActive('All'); }}
                  className="btn-primary"
                  style={{ marginTop: 20 }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {filtered.map((p, i) => (
                  <ProjectCard key={p.num} p={p} i={i} />
                ))}
              </div>
            )}

            {/* Coming soon */}
            <div style={{
              marginTop: 48, padding: '32px',
              border: '1px dashed var(--border)',
              borderRadius: 16, textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
                // More projects in progress
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
                {[
                  { label: 'AI Productivity Dashboard', color: '#00e5cc', status: 'In Progress' },
                  { label: 'Chess Platform v2', color: '#6366f1', status: 'Planning' },
                  { label: 'SaaS Templates Pack', color: '#10b981', status: 'Ideation' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 16px', borderRadius: 99,
                    background: `${item.color}10`, border: `1px solid ${item.color}30`,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: item.color }}>{item.label}</span>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--muted)' }}>· {item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="card"
      style={{ overflow: 'hidden', position: 'relative', animationDelay: `${i * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top color bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},transparent)` }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0 }}>
        {/* Info side */}
        <div style={{ padding: '32px 32px 28px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: p.color, opacity: 0.5 }}>{p.num}</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, padding: '2px 10px', borderRadius: 99, border: `1px solid ${p.color}50`, color: p.color, letterSpacing: 1 }}>{p.status}</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, padding: '2px 10px', borderRadius: 99, background: 'var(--bg3)', color: 'var(--muted)', letterSpacing: 1 }}>{p.category}</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--muted)', marginLeft: 'auto' }}>{p.year}</span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, lineHeight: 1.2 }}>{p.title}</h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {p.tags.map(t => (
              <span key={t} style={{ fontFamily: 'Space Mono', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 4, fontSize: 10, color: 'var(--muted)' }}>{t}</span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href={p.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11, padding: '7px 16px' }}>⚙ GitHub</a>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer"
                style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 16px', borderRadius: 6, border: `1px solid ${p.color}60`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                ↗ Live Demo
              </a>
            )}
            <Link
              to={`/projects/${slugMap[p.num]}`}
              style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 16px', borderRadius: 6, background: `${p.color}15`, border: `1px solid ${p.color}40`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              Case Study →
            </Link>
            {productMap[p.num] && (
              <Link
                to={productMap[p.num]}
                style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 16px', borderRadius: 6, border: `1px solid ${p.color}40`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                ↗ Product Page
              </Link>
            )}
          </div>
        </div>

        {/* Screenshot side */}
        <div style={{ overflow: 'hidden', borderLeft: '1px solid var(--border)', minHeight: 220, position: 'relative' }}>
          <img
            src={p.screenshot}
            alt={p.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            loading="lazy"
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.color}10, transparent)`, pointerEvents: 'none' }} />
        </div>
      </div>
    </div>
  );
}
