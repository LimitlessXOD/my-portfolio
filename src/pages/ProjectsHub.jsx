import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {
  hubProjects,
  projectSlugMap,
  projectProductMap,
  projectCategories,
  allTechTags,
  sortOptions,
} from '../data/portfolioData';
import { trackDemoClick } from '../lib/analytics';

function sortProjects(list, sortId) {
  const copy = [...list];
  switch (sortId) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    case 'oldest':
      return copy.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    case 'name':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'popular':
    default:
      return copy.sort((a, b) => b.popularity - a.popularity);
  }
}

export default function ProjectsHub() {
  const [category, setCategory] = useState('All');
  const [techFilter, setTechFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState('popular');

  const toggleTech = (tag) => {
    setTechFilter(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = hubProjects.filter(p => {
      if (featuredOnly && !p.featured) return false;
      if (category !== 'All' && p.category !== category) return false;
      if (techFilter.length && !techFilter.every(t => p.tags.includes(t))) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    });
    return sortProjects(list, sort);
  }, [category, techFilter, search, featuredOnly, sort]);

  const clearAll = () => {
    setCategory('All');
    setTechFilter([]);
    setSearch('');
    setFeaturedOnly(false);
    setSort('popular');
  };

  const hasFilters = category !== 'All' || techFilter.length > 0 || search || featuredOnly || sort !== 'popular';

  return (
    <>
      <Nav />
      <main className="page-enter" style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

        <section style={{ background: 'var(--bg2)', paddingTop: 120, paddingBottom: 64, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
            <Link
              to="/"
              className="reveal"
              style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
            >
              ← Back Home
            </Link>
            <p className="section-label reveal">Projects Hub</p>
            <h1 className="reveal" style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>
              Things I've <span className="grad-text">Built</span>
            </h1>
            <p className="reveal delay-1" style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
              Filter by stack, category, or search — built to scale as you add more projects.
            </p>

            {/* Search + sort row */}
            <div className="reveal delay-2" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 420 }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14, pointerEvents: 'none' }}>⌕</span>
                <input
                  className="input-field"
                  placeholder="Search projects, tags, tech..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ paddingLeft: 38, fontSize: 14, width: '100%' }}
                />
              </div>
              <select
                className="input-field"
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{ fontFamily: 'Space Mono', fontSize: 12, width: 'auto', minWidth: 160, cursor: 'pointer' }}
                aria-label="Sort projects"
              >
                {sortOptions.map(o => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <label
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                  fontFamily: 'Space Mono', fontSize: 11, color: featuredOnly ? 'var(--cyan)' : 'var(--muted)',
                  padding: '10px 16px', borderRadius: 8, border: `1px solid ${featuredOnly ? 'var(--cyan)' : 'var(--border)'}`,
                  background: featuredOnly ? 'rgba(0,229,204,0.08)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={e => setFeaturedOnly(e.target.checked)}
                  style={{ accentColor: 'var(--cyan)' }}
                />
                Featured only
              </label>
            </div>

            {/* Category */}
            <div className="reveal delay-3" style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: 2, marginBottom: 10 }}>CATEGORY</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {projectCategories.map(f => (
                  <FilterPill key={f} active={category === f} onClick={() => setCategory(f)} label={f} />
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="reveal delay-4">
              <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: 2, marginBottom: 10 }}>
                TECH STACK {techFilter.length > 0 && `(${techFilter.length} selected)`}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {allTechTags.map(tag => (
                  <FilterPill
                    key={tag}
                    active={techFilter.includes(tag)}
                    onClick={() => toggleTech(tag)}
                    label={tag}
                    small
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 0 100px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
            <p style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', marginBottom: 32, letterSpacing: 1 }}>
              // {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              {featuredOnly ? ' · featured' : ''}
              {search ? ` · "${search}"` : ''}
            </p>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ fontFamily: 'Space Mono', color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
                  // No projects match your filters
                </p>
                {hasFilters && (
                  <button type="button" onClick={clearAll} className="btn-primary">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {filtered.map((p, i) => (
                  <ProjectCard key={p.slug} p={p} i={i} />
                ))}
              </div>
            )}

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

function FilterPill({ active, onClick, label, small }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: small ? 10 : 11,
        padding: small ? '5px 14px' : '6px 18px',
        borderRadius: 99,
        border: active ? 'none' : '1px solid var(--border)',
        cursor: 'pointer',
        letterSpacing: 0.5,
        transition: 'all 0.2s',
        background: active ? 'var(--cyan)' : 'var(--bg3)',
        color: active ? '#080c12' : 'var(--muted)',
        boxShadow: active ? '0 0 16px rgba(0,229,204,0.25)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card reveal-child"
      style={{ overflow: 'hidden', position: 'relative', animationDelay: `${i * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},transparent)` }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0 }}>
        <div style={{ padding: '32px 32px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: p.color, opacity: 0.5 }}>{p.num}</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, padding: '2px 10px', borderRadius: 99, border: `1px solid ${p.color}50`, color: p.color, letterSpacing: 1 }}>{p.status}</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, padding: '2px 10px', borderRadius: 99, background: 'var(--bg3)', color: 'var(--muted)', letterSpacing: 1 }}>{p.category}</span>
            {p.featured && (
              <span style={{ fontFamily: 'Space Mono', fontSize: 9, padding: '2px 10px', borderRadius: 99, background: 'rgba(0,229,204,0.12)', color: 'var(--cyan)', letterSpacing: 1 }}>★ Featured</span>
            )}
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--muted)', marginLeft: 'auto' }}>{p.year}</span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, lineHeight: 1.2 }}>{p.title}</h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {p.tags.map(t => (
              <span key={t} style={{ fontFamily: 'Space Mono', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 4, fontSize: 10, color: 'var(--muted)' }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href={p.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11, padding: '7px 16px' }}>⚙ GitHub</a>
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackDemoClick(p.slug, p.demo)}
                style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 16px', borderRadius: 6, border: `1px solid ${p.color}60`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                ↗ Live Demo
              </a>
            )}
            <Link
              to={`/projects/${projectSlugMap[p.num]}`}
              style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 16px', borderRadius: 6, background: `${p.color}15`, border: `1px solid ${p.color}40`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              Case Study →
            </Link>
            {projectProductMap[p.num] && (
              <Link
                to={projectProductMap[p.num]}
                style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 16px', borderRadius: 6, border: `1px solid ${p.color}40`, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                ↗ Product Page
              </Link>
            )}
          </div>
        </div>

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
