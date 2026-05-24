import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BackLink from '../components/BackLink';
import useScrollToTopOnEnter from '../hooks/useScrollToTopOnEnter';

const projectDetails = {
  'chess-platform': {
    num: '01',
    title: 'Ultimate Chess Showdown',
    tagline: 'Real-time multiplayer chess platform built with React & WebSockets.',
    status: 'Live',
    color: '#c9a84c',
    screenshot: '/screenshot-chess.png',
    github: 'https://github.com/LimitlessXOD',
    demo: 'https://chess-project-1-y6c5.onrender.com',
    overview: `Ultimate Chess Showdown is a real-time multiplayer chess platform that lets two players compete across the internet. 
    I built it because I wanted to go beyond simple local-state games and tackle the real engineering challenge of synchronizing game state across clients in real time.
    The goal was a fully rules-compliant chess engine — not just a board that moves pieces, but one that enforces castling, en passant, pawn promotion, check/checkmate detection, and draw conditions.`,
    techStack: {
      Frontend: ['React', 'Custom CSS', 'Vite'],
      Backend: ['Node.js', 'Express', 'Socket.io'],
      Deployment: ['Render (free tier)', 'GitHub'],
    },
    features: [
      'Real-time multiplayer via WebSockets — zero lag gameplay',
      'Full chess rule enforcement: castling, en passant, pawn promotion',
      'Check and checkmate detection with game-end state',
      'Match history with W/L/D tracking per room',
      'Local sandbox mode for practicing alone',
      'Clean board UI with piece highlighting',
      'Room-based system — share a link, play instantly',
    ],
    challenges: `The hardest problem was keeping board state perfectly synchronized between two browsers. 
    A player's move has to instantly reach the opponent via WebSocket, update their board atomically, and never cause a state mismatch. 
    Early versions had race conditions where moves could be applied twice or in the wrong order. I solved this by having the server be the single source of truth — clients send proposed moves, the server validates them, and broadcasts the authoritative new state to both players. 
    Implementing en passant was also surprisingly tricky because it requires tracking the previous move, not just the current board.`,
    learned: [
      'Real-time communication architecture with Socket.io rooms',
      'State machine design for turn-based game logic',
      'How to deploy Node.js WebSocket servers on Render free tier',
      'Debugging synchronization bugs across distributed clients',
      'Writing a chess move validator from scratch',
    ],
    nextSlug: 'mugen-desktop-app',
    nextTitle: 'MUGEN Desktop App',
  },
  'mugen-desktop-app': {
    num: '02',
    title: 'MUGEN — Desktop Media App',
    tagline: 'A full-featured desktop media app with downloader, player, analytics, and library management.',
    status: 'Personal',
    color: '#6366f1',
    screenshot: '/screenshot-mugen.png',
    github: 'https://github.com/LimitlessXOD',
    demo: null,
    overview: `MUGEN is a desktop application I built for personal media management. 
    The problem it solves: I wanted a single app that could search, download, organize, and play YouTube and TikTok content offline — without juggling 5 different tools.
    It features a built-in video player, a personal library that currently tracks 1.37 GB of media, an analytics dashboard showing watch patterns, and full theme customization.`,
    techStack: {
      'Core': ['Desktop App (Electron-style)', 'JavaScript'],
      'Media': ['yt-dlp', 'Built-in video player'],
      'Storage': ['Local file system', 'SQLite (library DB)'],
      'UI': ['Custom CSS', 'Analytics charts'],
    },
    features: [
      'YouTube & TikTok search and download via yt-dlp',
      'Built-in video player with speed controls (0.5× – 2×)',
      'Personal library management — 1.37 GB tracked',
      'Analytics dashboard showing usage and watch patterns',
      'Theme customisation with multiple color schemes',
      'Offline-first — all media stored locally',
      'Metadata tagging and search across library',
    ],
    challenges: `The biggest challenge was integrating yt-dlp — a Python-based CLI tool — cleanly into a JavaScript desktop app. 
    I had to spawn child processes, stream stdout in real-time to show download progress, and handle errors gracefully for geo-blocked or age-restricted content. 
    Building the analytics dashboard also taught me a lot about efficiently querying and aggregating local data without a backend.`,
    learned: [
      'Child process management and stdout streaming in Node.js',
      'Local database design with SQLite',
      'Building desktop UIs without a browser context',
      'Handling real-world media edge cases (DRM, geo-blocks)',
      'Performance optimization for large local libraries',
    ],
    nextSlug: 'mugensoft-portfolio',
    nextTitle: 'MugenSoft Portfolio',
  },
  'mugensoft-portfolio': {
    num: '03',
    title: 'MugenSoft Portfolio',
    tagline: 'Full-stack developer portfolio with Supabase backend, dark/light mode, and animated interactions.',
    status: 'Live',
    color: '#10b981',
    screenshot: '/screenshot-portfolio.png',
    github: 'https://github.com/LimitlessXOD',
    demo: 'https://mugensoft-dev.vercel.app',
    overview: `This portfolio is itself a full-stack product — not just a static site. 
    It features a live Supabase-powered guestbook where visitors leave real messages, a contact form that saves to a database and triggers a serverless email notification, animated scroll reveals, a typing effect hero, and full dark/light mode support.
    The goal was to build something that feels like a real product — not a template — and demonstrates full-stack thinking even on a personal site.`,
    techStack: {
      Frontend: ['React', 'Vite', 'CSS Variables', 'React Router'],
      Backend: ['Supabase (PostgreSQL)', 'Supabase Edge Functions'],
      Deployment: ['Vercel', 'GitHub Actions'],
      Design: ['Custom design system', 'Space Mono + Outfit fonts'],
    },
    features: [
      'Supabase-powered live guestbook — real visitor messages',
      'Contact form with database storage + email notifications',
      'Dark/light mode with localStorage persistence',
      'Scroll reveal animations with IntersectionObserver',
      'Animated typing effect in the hero section',
      'Individual project case study pages with React Router',
      'Mobile-first responsive design',
      'Custom CSS design system with CSS variables',
    ],
    challenges: `The trickiest part was making dark mode work globally — not just for the main content, but also for the mobile navigation menu, modals, and dynamically rendered components. 
    Early versions had the mobile menu hardcoded with dark colors that didn't respect the theme. I solved this by ensuring every background and color reference uses CSS variables scoped to [data-theme], so switching themes rewrites all colors in a single paint.
    Setting up Supabase Edge Functions for the contact email notification was also a first for me — deploying serverless Deno functions with environment-variable-based email sending.`,
    learned: [
      'Building a CSS variable-based design system from scratch',
      'IntersectionObserver for performant scroll animations',
      'Supabase realtime and Edge Functions',
      'React Router v6 for SPA routing with dynamic segments',
      'Deploying Deno serverless functions on Supabase',
    ],
    nextSlug: 'chess-platform',
    nextTitle: 'Ultimate Chess Showdown',
  },
};

export default function ProjectPage() {
  const { slug } = useParams();
  const p = projectDetails[slug];

  useScrollToTopOnEnter([slug]);

  if (!p) {
    return (
      <>
        <Nav />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <h2 style={{ fontFamily: 'Space Mono', color: 'var(--cyan)' }}>// 404 — Project not found</h2>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>← Back Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="page-enter" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: 'var(--bg2)', paddingTop: 120, paddingBottom: 60, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
            <BackLink
              to="/projects"
              style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              ← Back to Projects
            </BackLink>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: p.color, opacity: 0.6 }}>{p.num}</span>
              <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 10px', borderRadius: 99, border: `1px solid ${p.color}50`, color: p.color, letterSpacing: 1 }}>{p.status}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>{p.title}</h1>
            <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 600, lineHeight: 1.7, marginBottom: 32 }}>{p.tagline}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 12 }}>⚙ GitHub</a>
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" style={{ fontFamily: 'Space Mono', fontSize: 12, padding: '10px 24px', borderRadius: 6, border: `1px solid ${p.color}60`, color: p.color, textDecoration: 'none' }}>↗ Live Demo</a>}
            </div>
          </div>
        </section>

        {/* Screenshot */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ margin: '48px 0', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
            <img src={p.screenshot} alt={`${p.title} screenshot`} loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, marginBottom: 64 }}>

            {/* Overview */}
            <div>
              <h2 style={{ fontFamily: 'Space Mono', fontSize: 13, color: p.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>// Overview</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 15, whiteSpace: 'pre-line' }}>{p.overview}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 style={{ fontFamily: 'Space Mono', fontSize: 13, color: p.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>// Tech Stack</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {Object.entries(p.techStack).map(([cat, items]) => (
                  <div key={cat}>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>{cat}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map(t => (
                        <span key={t} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontFamily: 'Space Mono', color: 'var(--text)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'Space Mono', fontSize: 13, color: p.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>// Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ color: p.color, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'Space Mono', fontSize: 13, color: p.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>// Challenges Faced</h2>
            <div style={{ background: 'var(--bg2)', border: `1px solid ${p.color}30`, borderLeft: `3px solid ${p.color}`, borderRadius: '0 12px 12px 0', padding: '24px 28px' }}>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 15, whiteSpace: 'pre-line' }}>{p.challenges}</p>
            </div>
          </div>

          {/* What I Learned */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontFamily: 'Space Mono', fontSize: 13, color: p.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>// What I Learned</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {p.learned.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: p.color, opacity: 0.6, flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Project */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <BackLink
              to="/projects"
              style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              ← All Projects
            </BackLink>
            <Link
              to={`/projects/${p.nextSlug}`}
              style={{ fontFamily: 'Space Mono', fontSize: 12, color: p.color, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}
            >
              <span style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: 2 }}>NEXT PROJECT</span>
              <span>{p.nextTitle} →</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
