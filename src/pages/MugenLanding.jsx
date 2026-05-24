import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const color = '#6366f1';

const FEATURES = [
  { icon: '⬇', title: 'YouTube & TikTok Downloader', desc: 'Search and download any video via yt-dlp integration. Supports multiple qualities and formats.' },
  { icon: '▶', title: 'Built-in Video Player', desc: 'Full-featured player with speed controls (0.5× to 2×), scrubbing, and playback state memory.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'See your watch patterns, most-played content, total library usage, and screen time data.' },
  { icon: '📚', title: 'Library Management', desc: 'Organize 1.37 GB+ of media with metadata tagging, search, and custom collections.' },
  { icon: '🎨', title: 'Theme Customization', desc: 'Multiple color schemes. The app adapts to your preference, not the other way around.' },
  { icon: '🔌', title: 'Offline First', desc: 'Everything stored locally. No internet needed to play what you\'ve downloaded.' },
];

const STATS = [
  { value: '1.37 GB', label: 'Media Tracked' },
  { value: '100%', label: 'Offline Capable' },
  { value: '6+', label: 'Core Modules' },
  { value: '0', label: 'External APIs Needed' },
];

const STACK = [
  { layer: 'App Core', items: ['Desktop App Runtime', 'JavaScript', 'Node.js'] },
  { layer: 'Media', items: ['yt-dlp (Python CLI)', 'Child Process Streams', 'Built-in Video Player'] },
  { layer: 'Storage', items: ['SQLite', 'Local File System', 'Metadata Engine'] },
];

const TABS = ['Downloader', 'Library', 'Analytics', 'Player'];

export default function MugenLanding() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = TABS;
  const tabDesc = [
    'Search any YouTube or TikTok URL. Select quality, format, and destination. Download progress streams in real time via yt-dlp stdout.',
    'Your entire media collection in one place. Sort by date, duration, or tag. Full-text search across titles and metadata.',
    'See exactly how you use the app — total watch time, most-played videos, download frequency, and library growth over time.',
    'Play anything in your library instantly. Speed controls, progress memory, and keyboard shortcuts for power users.',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setInterval(() => setActiveTab(n => (n + 1) % tabs.length), 3000);
    return () => clearInterval(t);
  }, [tabs.length]);

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
          <div style={{ position: 'absolute', top: '20%', right: '0%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,204,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <Link to="/" style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, letterSpacing: 2 }}
                onMouseEnter={e => e.currentTarget.style.color = color}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >← MUGENSOFT PORTFOLIO</Link>
              <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 16, opacity: 0.8 }}>02 / DESKTOP APP</div>
              <h1 style={{ fontSize: 'clamp(48px,7vw,80px)', fontWeight: 900, lineHeight: 0.95, marginBottom: 24, letterSpacing: -3 }}>
                <span style={{ color }}>MUGEN</span>
              </h1>
              <p style={{ fontFamily: 'Space Mono', fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.6 }}>
                Your media. Your rules.<br />Download, organize, and play — offline first.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>
                A full-featured desktop media app built for power users. YouTube & TikTok downloader, built-in player, personal analytics, and library management — all in one.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer"
                  style={{ fontFamily: 'Space Mono', fontSize: 13, padding: '14px 32px', borderRadius: 8, background: color, color: '#fff', textDecoration: 'none', fontWeight: 700, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >⚙ View on GitHub</a>
                <Link to="/projects/mugen-desktop-app" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '14px 32px' }}>Case Study →</Link>
              </div>
            </div>

            {/* Right: App UI mockup */}
            <div style={{ background: 'var(--bg2)', borderRadius: 16, border: `1px solid ${color}30`, overflow: 'hidden', boxShadow: `0 32px 80px rgba(99,102,241,0.2)` }}>
              {/* Title bar */}
              <div style={{ background: 'var(--bg3)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${color}20` }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)' }}>MUGEN — Media Manager</div>
              </div>
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${color}20` }}>
                {tabs.map((tab, i) => (
                  <button key={tab} onClick={() => setActiveTab(i)}
                    style={{ flex: 1, padding: '10px 8px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: 10, color: activeTab === i ? color : 'var(--muted)', borderBottom: activeTab === i ? `2px solid ${color}` : '2px solid transparent', transition: 'color 0.2s' }}
                  >{tab}</button>
                ))}
              </div>
              {/* Tab content */}
              <div style={{ padding: 24, minHeight: 200 }}>
                <p style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{tabDesc[activeTab]}</p>
                {/* Fake UI elements */}
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[0.8, 0.6, 0.9, 0.5].map((w, i) => (
                    <div key={i} style={{ height: 10, borderRadius: 4, background: `${color}${i === 0 ? '40' : '15'}`, width: `${w * 100}%` }} />
                  ))}
                </div>
              </div>
              {/* Stats bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: `1px solid ${color}20` }}>
                {STATS.slice(0, 2).map((s, i) => (
                  <div key={i} style={{ padding: '16px 20px', borderRight: i === 0 ? `1px solid ${color}20` : 'none' }}>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700, color }}>{s.value}</div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--muted)', fontFamily: 'Space Mono', fontSize: 10, letterSpacing: 2 }}>SCROLL</span>
            <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${color}, transparent)` }} />
          </div>
        </section>

        {/* ── SCREENSHOT ── */}
        <section style={{ background: 'var(--bg2)', padding: '80px 0', borderTop: `1px solid ${color}20`, borderBottom: `1px solid ${color}20` }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${color}30`, position: 'relative', boxShadow: `0 32px 80px rgba(0,0,0,0.4)` }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, #00e5cc, transparent)` }} />
              <div style={{ background: 'var(--bg3)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
                </div>
                <div style={{ flex: 1, background: 'var(--bg2)', borderRadius: 4, padding: '4px 12px', fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
                  MUGEN — Desktop App
                </div>
              </div>
              <img src="/screenshot-mugen.png" alt="MUGEN Desktop App screenshot" loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: 'var(--bg2)', padding: '40px 32px', textAlign: 'center', border: '1px solid var(--border)', borderRadius: i === 0 ? '16px 0 0 16px' : i === STATS.length - 1 ? '0 16px 16px 0' : 0 }}>
                  <div style={{ fontFamily: 'Space Mono', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: 'var(--bg2)', padding: '100px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 12 }}>// FEATURES</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 60, letterSpacing: -1 }}>Everything In One App</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ background: 'var(--bg)', border: `1px solid var(--border)`, borderRadius: 16, padding: 28, transition: 'border-color 0.3s, transform 0.3s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, fontFamily: 'Space Mono' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 12 }}>// TECH STACK</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 60, letterSpacing: -1 }}>Built With</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              {STACK.map((s, i) => (
                <div key={i} style={{ background: 'var(--bg2)', border: `1px solid var(--border)`, borderRadius: 16, padding: 28, borderTop: `3px solid ${color}` }}>
                  <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 2, marginBottom: 20 }}>{s.layer.toUpperCase()}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {s.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, fontFamily: 'Space Mono' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: 'var(--bg2)', padding: '100px 0', borderTop: `1px solid ${color}20` }}>
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 20 }}>// SOURCE CODE</div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, marginBottom: 20, letterSpacing: -1 }}>Explore the Code</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 48 }}>
              MUGEN is a personal project. Browse the source, check the architecture, or reach out to collaborate.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer"
                style={{ fontFamily: 'Space Mono', fontSize: 14, padding: '16px 40px', borderRadius: 8, background: color, color: '#fff', textDecoration: 'none', fontWeight: 700, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >⚙ GitHub Repository</a>
              <Link to="/projects/mugen-desktop-app" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 14, padding: '16px 40px' }}>Read Case Study →</Link>
            </div>
          </div>
        </section>

        {/* ── PROJECT NAV ── */}
        <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1000, margin: '0 auto', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/products/chess" style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = color}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >← Chess Platform</Link>
          <Link to="/" style={{ fontFamily: 'Space Mono', fontSize: 12, color: '#10b981', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: 2 }}>NEXT</span>
            <span>Back to Portfolio →</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
