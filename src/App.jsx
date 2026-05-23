import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// ── Supabase (real project) ───────────────────────────────────
const SUPABASE_URL = 'https://hsqnrqoqytqswvbmzjro.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcW5ycW9xeXRxc3d2Ym16anJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NTQ5OTIsImV4cCI6MjA5NTEzMDk5Mn0.K3gctbAmsPrI1w24s8z2_ZUDMUpj4rbntwp9mKtjoIQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Scroll Reveal Hook ────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Typing Animation ──────────────────────────────────────────
function useTyping(words) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? 60 : charIdx === word.length ? 1800 : 90;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplay(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words]);

  return display;
}

// ── Nav ───────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['About', 'Skills', 'Projects', 'Services', 'Now', 'Guestbook', 'Contact'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '16px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,12,18,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,229,204,0.08)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <a href="#top" style={{ fontFamily: 'Space Mono', color: 'var(--cyan)', fontWeight: 700, fontSize: 15, textDecoration: 'none', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--muted)' }}>&lt;</span>MugenSoft<span style={{ color: 'var(--muted)' }}>/&gt;</span>
      </a>
      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 32 }} className="hidden-mobile">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ textDecoration: 'none' }}>
            {l}
          </a>
        ))}
      </div>
      {/* Hamburger for mobile */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="show-mobile"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyan)', fontSize: 20, padding: 4 }}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      <a href="https://wa.me/264812590824?text=Hi%20Erastus%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="btn-primary hidden-mobile" style={{ fontSize: 12, padding: '8px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(8,12,18,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,229,204,0.1)',
          padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="nav-link" style={{ textDecoration: 'none', fontSize: 16 }}>
              {l}
            </a>
          ))}
          <a href="https://wa.me/264812590824?text=Hi%20Erastus%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Me
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  const role = useTyping(['Full-Stack Developer', 'AI App Builder', 'Chess Platform Creator', 'Freelance Dev', 'CS Student @ NUST']);

  return (
    <section id="top" className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
      <div className="orb1" style={{ position: 'absolute', top: '15%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,204,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="orb2" style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <p className="mono reveal visible" style={{ color: 'var(--cyan)', fontSize: 13, letterSpacing: 3, marginBottom: 20, opacity: 1 }}>
          // Hello, World 👋
        </p>
        <h1 className="reveal visible" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24, opacity: 1 }}>
          I Build Useful<br />
          <span className="grad-text">Software</span><br />
          <span style={{ color: 'var(--muted)', fontWeight: 300 }}>& Ship Things</span>
        </h1>
        <p className="mono reveal visible" style={{ fontSize: 18, marginBottom: 12, opacity: 1 }}>
          <span style={{ color: 'var(--muted)' }}>$ whoami → </span>
          <span style={{ color: 'var(--cyan)' }} className="cursor">{role}</span>
        </p>
        <p className="reveal visible" style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 520, lineHeight: 1.7, marginBottom: 40, opacity: 1 }}>
          Full-stack developer building web apps, AI-powered tools, and desktop software. Based in Windhoek, Namibia — working with clients worldwide. Available for freelance.
        </p>
        <div className="reveal visible" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: 1 }}>
          <a href="#projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>View Projects →</a>
          <a href="#services" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Hire Me</a>
          <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>GitHub ↗</a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, marginTop: 64, flexWrap: 'wrap' }}>
          {[['3+', 'Projects Shipped'], ['2', 'Live Products'], ['∞', 'Coffee Consumed']].map(([n, l]) => (
            <div key={l} className="reveal visible" style={{ opacity: 1 }}>
              <div className="grad-text" style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{n}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4, fontFamily: 'Space Mono' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--muted)', fontFamily: 'Space Mono', fontSize: 10, letterSpacing: 2 }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--cyan), transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ maxWidth: 900, margin: '0 auto', padding: '100px 32px' }}>
      <p className="section-label reveal">01. About</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
            The Dev Behind<br /><span className="grad-text">MugenSoft</span>
          </h2>
          <p className="reveal delay-1" style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
            I'm Erastus (Leroy) Shalimba — a Computer Science (Cyber Security) student at NUST Namibia, enrolled since 2025. I build real software products and ship things that actually work.
          </p>
          <p className="reveal delay-2" style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
            I've shipped a multiplayer chess platform, a desktop media tool, and full-stack web apps. My focus is on writing software that solves real problems — not just demo projects.
          </p>
          <p className="reveal delay-3" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Currently exploring AI integrations, scalable SaaS products, and open to freelance work, collaborations, and internship opportunities.
          </p>
          <div className="reveal delay-3" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', fontSize: 12, padding: '8px 20px' }}>GitHub ↗</a>
            <a href="https://www.linkedin.com/in/erastus-shalimba" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 12, padding: '8px 20px' }}>LinkedIn ↗</a>
          </div>
        </div>
        <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { year: '2025', label: 'Started BCS @ NUST Namibia', desc: 'Bachelor of Computer Science (Cyber Security) at Namibia University of Science & Technology — graduating 2028' },
            { year: '2025', label: 'Launched Chess Platform', desc: 'Built & deployed multiplayer chess platform on Render — React & Node.js with WebSockets' },
            { year: '2025', label: 'Built SnabTube Desktop App', desc: 'Created a personal desktop media app with custom UI and local storage' },
            { year: '2025', label: 'Founded MugenSoft', desc: 'Building web apps, AI tools, and SaaS products. Open for freelance worldwide' },
          ].map((item, i) => (
            <div key={i} className={`timeline-item reveal delay-${i + 1}`}>
              <div className="timeline-dot" />
              <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--cyan)', marginBottom: 4 }}>{item.year}</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{item.label}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────
function Skills() {
  const skills = [
    { cat: 'Frontend', items: ['React.js', 'HTML/CSS', 'Tailwind CSS', 'JavaScript'] },
    { cat: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Supabase'] },
    { cat: 'Tools & Deploy', items: ['Git', 'GitHub', 'Render', 'Vercel', 'Vite'] },
    { cat: 'Exploring', items: ['AI Engineering', 'Desktop Apps', 'Python', 'PostgreSQL'] },
  ];

  return (
    <section id="skills" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <p className="section-label reveal">02. Skills</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 12 }}>
          Tech Stack
        </h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>Tools and technologies I work with every day</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {skills.map((group, i) => (
            <div key={group.cat} className={`card reveal delay-${i + 1}`} style={{ padding: 24 }}>
              <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: 2, marginBottom: 16 }}>{group.cat.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.items.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--cyan)', fontSize: 10 }}>▸</span>
                    <span style={{ fontSize: 14 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────
function Projects() {

  const projects = [
    {
      num: '01',
      title: 'Ultimate Chess Showdown',
      desc: 'A fully functional real-time multiplayer chess platform. Features room creation/joining, full chess rules (castling, en passant, promotion), match history with W/L/D tracking, local sandbox mode, and auto-flip POV. Built from scratch and deployed live on Render.',
      tags: ['React', 'Node.js', 'WebSockets', 'Socket.io', 'Render'],
      status: 'Live',
      color: '#c9a84c',
      github: 'https://github.com/LimitlessXOD',
      demo: 'https://chess-project-1-y6c5.onrender.com',
      screenshots: [
        { label: 'Home', url: 'https://chess-project-1-y6c5.onrender.com', preview: 'lobby' },
        { label: 'Match History', url: 'https://chess-project-1-y6c5.onrender.com', preview: 'history' },
        { label: 'Live Game', url: 'https://chess-project-1-y6c5.onrender.com', preview: 'game' },
      ],
      highlights: ['Real-Time Multiplayer via WebSockets', 'Full Chess Rules — castling, en passant, promotion', 'Match History with W/L/D per room', 'Local Sandbox mode for testing'],
    },
    {
      num: '02',
      title: 'MUGEN — Desktop Media App',
      desc: 'A full-featured desktop media application built from scratch. Search & download from YouTube and TikTok, built-in video player, analytics dashboard, personal library, activity log, and full settings panel. Named MUGEN — clean light/dark UI with accent colour customisation.',
      tags: ['Desktop App', 'Electron / Tauri', 'yt-dlp', 'Media Player', 'Analytics'],
      status: 'Personal',
      color: '#6366f1',
      github: 'https://github.com/LimitlessXOD',
      demo: null,
      highlights: ['YouTube & TikTok downloader (yt-dlp)', 'Built-in video player with speed controls', 'Analytics dashboard — downloads, formats, platforms', 'Library management with 1.37 GB tracked'],
    },
    {
      num: '03',
      title: 'MugenSoft Portfolio',
      desc: 'This portfolio — a full-stack developer showcase with Supabase-powered guestbook & contact form, animated scroll reveals, typing effects, mobile-responsive design, and a "Now Building" live status tracker.',
      tags: ['React', 'Vite', 'Supabase', 'Tailwind CSS'],
      status: 'Live',
      color: '#10b981',
      github: 'https://github.com/LimitlessXOD',
      demo: '#top',
      highlights: ['Supabase guestbook + contact form', 'Scroll reveal animations', 'Mobile-first responsive design', 'Live "Now Building" tracker'],
    },
  ];

  return (
    <section id="projects" style={{ maxWidth: 960, margin: '0 auto', padding: '100px 32px' }}>
      <p className="section-label reveal">03. Projects</p>
      <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 8 }}>
        Things I've Built
      </h2>
      <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>Real products, real deployments, real code</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {projects.map((p, i) => (
          <div key={p.num} className={`card reveal delay-${i + 1}`} style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

            <div style={{ padding: '32px 32px 0' }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: p.color, opacity: 0.5 }}>{p.num}</span>
                    <h3 style={{ fontSize: 22, fontWeight: 700 }}>{p.title}</h3>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 10px', borderRadius: 99, border: `1px solid ${p.color}50`, color: p.color, letterSpacing: 1 }}>{p.status}</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 620 }}>{p.desc}</p>
                </div>
              </div>

              {/* Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, marginBottom: 20 }}>
                {p.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: p.color, fontSize: 10, flexShrink: 0 }}>✦</span>
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {p.tags.map(t => (
                  <span key={t} className="mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: 4, fontSize: 11, color: 'var(--muted)' }}>{t}</span>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 18px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--muted)'; }}>
                  ⚙ GitHub
                </a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer"
                    style={{ fontFamily: 'Space Mono', fontSize: 11, padding: '7px 18px', borderRadius: 6, border: `1px solid ${p.color}60`, color: p.color, textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${p.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    ↗ Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Screenshot preview strip for chess */}
            {p.num === '01' && (
              <div style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '0' }}>
                {/* Chess site iframe preview */}
                <div style={{ position: 'relative', width: '100%', paddingBottom: '42%', overflow: 'hidden', background: '#1a1108' }}>
                  <iframe
                    src="https://chess-project-1-y6c5.onrender.com"
                    title="Ultimate Chess Showdown"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none', transform: 'scale(1)', transformOrigin: 'top left' }}
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>↑ Live preview — chess-project-1-y6c5.onrender.com</span>
                    <a href="https://chess-project-1-y6c5.onrender.com" target="_blank" rel="noreferrer"
                      style={{ fontFamily: 'Space Mono', fontSize: 10, color: '#c9a84c', textDecoration: 'none', border: '1px solid #c9a84c50', padding: '4px 10px', borderRadius: 4 }}>
                      Open ↗
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* MUGEN app feature grid */}
            {p.num === '02' && (
              <div style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                  {[
                    { icon: '🔍', label: 'YouTube & TikTok Search' },
                    { icon: '▶️', label: 'Built-in Video Player' },
                    { icon: '📊', label: 'Analytics Dashboard' },
                    { icon: '📚', label: 'Personal Media Library' },
                    { icon: '⚙️', label: 'Theme & Accent Settings' },
                    { icon: '📈', label: '88% Download Success Rate' },
                  ].map(f => (
                    <div key={f.label} style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{f.icon}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────
function Services() {
  const WA = (service) =>
    `https://wa.me/264812590824?text=Hi%20Erastus!%20I'm%20interested%20in%20your%20*${encodeURIComponent(service)}*%20service.%20Here%20are%20my%20project%20details%3A%20`;

  const services = [
    { icon: '🌐', title: 'Web App Development', desc: 'Custom full-stack web apps built with React & Node.js. From landing pages to complete platforms with databases and auth.', price: 'From N$100' },
    { icon: '🤖', title: 'AI-Powered Tools', desc: 'Apps that use AI APIs (Claude, OpenAI) to automate tasks, generate content, or analyze data for your business.', price: 'From N$400' },
    { icon: '🎨', title: 'Landing Pages', desc: 'Clean, modern, responsive landing pages optimized for conversion. Quick turnaround, mobile-first.', price: 'From N$100' },
    { icon: '🖥️', title: 'Desktop Applications', desc: 'Custom desktop software for Windows/Mac. Offline-first tools, media apps, productivity software.', price: 'From N$300' },
    { icon: '🚀', title: 'Deploy & Setup', desc: 'Get your project live. GitHub setup, Render/Vercel deployment, domain config, CI/CD pipeline.', price: 'From N$100' },
  ];

  return (
    <section id="services" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <p className="section-label reveal">04. Services</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 12 }}>
          What MugenSoft Builds
        </h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>Available for freelance work. Let's build something useful together.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={s.title} className={`card reveal delay-${(i % 4) + 1}`} style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div className="service-icon">{s.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 'auto' }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--cyan)' }}>{s.price}</div>
                <a
                  href={WA(s.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Space Mono', fontSize: 11, fontWeight: 600,
                    color: '#111', background: '#25D366',
                    padding: '6px 14px', borderRadius: 8,
                    textDecoration: 'none', letterSpacing: 0.3,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 40px', fontSize: 14 }}>
            Let's Work Together →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Now Building ──────────────────────────────────────────────
function NowBuilding() {
  const items = [
    { label: 'AI productivity dashboard', status: 'In Progress', color: '#00e5cc' },
    { label: 'Chess platform v2 — better matchmaking + ELO rating', status: 'Planning', color: '#4f46e5' },
    { label: 'SaaS landing page templates pack', status: 'Ideation', color: '#10b981' },
    { label: 'Open source React component library', status: 'Ideation', color: '#f59e0b' },
  ];

  return (
    <section id="now" style={{ maxWidth: 900, margin: '0 auto', padding: '100px 32px' }}>
      <p className="section-label reveal">05. Now</p>
      <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 8 }}>
        Currently Building
      </h2>
      <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>
        What I'm actively working on right now — updated regularly.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => (
          <div key={i} className={`card reveal delay-${i + 1}`} style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}80`, flexShrink: 0, animation: item.status === 'In Progress' ? 'pulse 2s ease-in-out infinite' : 'none' }} />
              <span style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</span>
            </div>
            <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 12px', borderRadius: 99, border: `1px solid ${item.color}40`, color: item.color, letterSpacing: 1, flexShrink: 0 }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Guestbook (Supabase-powered) ──────────────────────────────
function Guestbook() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { fetchComments(); }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !commentText) return;
    setLoading(true);
    const { error } = await supabase.from('comments').insert([{ name, text: commentText }]);
    if (!error) { setName(''); setCommentText(''); setSubmitted(true); fetchComments(); }
    setLoading(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '100px 32px' }}>
      <p className="section-label reveal">06. Guestbook</p>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, marginBottom: 8 }}>Leave a Note</h2>
      <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 40 }}>Say hi, drop feedback, or just leave your mark!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'start' }}>
        <div className="card reveal" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input className="input-field" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
            <textarea className="input-field" placeholder="Your message..." rows={4} value={commentText} onChange={e => setCommentText(e.target.value)} style={{ resize: 'none' }} required />
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '12px 24px', fontSize: 14 }}>
              {loading ? 'Sending...' : submitted ? '✓ Sent!' : 'Submit →'}
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
          {comments.length === 0 ? (
            <div style={{ color: 'var(--muted)', fontFamily: 'Space Mono', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
              // No messages yet. Be the first!
            </div>
          ) : comments.map(c => (
            <div key={c.id} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--cyan)' }}>{c.name}</span>
                <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted)' }}>{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact (Supabase-powered) ────────────────────────────────
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message }]);
      if (error) throw error;
      // Trigger email notification via Supabase Edge Function
      try {
        await supabase.functions.invoke('notify-contact', {
          body: { name, email, message }
        });
      } catch (_) { /* silent — notification is best-effort */ }
      setStatus('success');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <p className="section-label reveal" style={{ textAlign: 'center' }}>07. Contact</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16, textAlign: 'center' }}>
          Let's Build Something<br /><span className="grad-text">Together</span>
        </h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', maxWidth: 480, margin: '0 auto 60px', lineHeight: 1.7, textAlign: 'center' }}>
          Open for freelance projects, collaborations, and internships. Based in Windhoek, Namibia — working with clients worldwide. I respond fast.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'start' }}>
          {/* Contact Form */}
          <div className="card reveal" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, fontFamily: 'Space Mono', color: 'var(--cyan)' }}>// Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input className="input-field" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
              <input className="input-field" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
              <textarea className="input-field" placeholder="Tell me about your project..." rows={5} value={message} onChange={e => setMessage(e.target.value)} style={{ resize: 'vertical' }} required />
              <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ padding: '12px 24px', fontSize: 14 }}>
                {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? '✗ Try Again' : 'Send Message →'}
              </button>
              {status === 'success' && (
                <p style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--cyan)', textAlign: 'center' }}>
                  I'll get back to you within 24hrs!
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, fontFamily: 'Space Mono', color: 'var(--cyan)' }}>// Reach Out Directly</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📧', label: 'erastussane618@gmail.com', href: 'mailto:erastussane618@gmail.com' },
                  { icon: '📱', label: '+264 81 259 0824', href: 'tel:+264812590824' },
                  { icon: '💬', label: 'Chat on WhatsApp', href: 'https://wa.me/264812590824?text=Hi%20Erastus%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.', whatsapp: true },
                  { icon: '📍', label: 'Windhoek, Namibia', href: null },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    {item.href
                      ? <a href={item.href} style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                          onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{item.label}</a>
                      : <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>{item.label}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: 'Space Mono', color: 'var(--muted)' }}>// Find me online</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/LimitlessXOD' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/erastus-shalimba' },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                    className="btn-secondary" style={{ textDecoration: 'none', fontSize: 12, padding: '8px 20px' }}>
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div style={{ background: 'rgba(0,229,204,0.06)', border: '1px solid rgba(0,229,204,0.2)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5cc', boxShadow: '0 0 10px rgba(0,229,204,0.8)', animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: 1 }}>AVAILABLE FOR WORK</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Open to freelance & collaborations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '28px 32px', borderTop: '1px solid rgba(0,229,204,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>
        <span style={{ color: 'var(--cyan)' }}>&lt;MugenSoft/&gt;</span> — Erastus (Leroy) Shalimba · Built with React + Vite
      </span>
      <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>© {new Date().getFullYear()}</span>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <NowBuilding />
      <Guestbook />
      <Contact />
      <Footer />
    </div>
  );
}
