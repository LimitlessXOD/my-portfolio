import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://placeholder-url.supabase.co';
const SUPABASE_ANON_KEY = 'placeholder-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Scroll Reveal Hook ────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
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

  const links = ['About', 'Skills', 'Projects', 'Services', 'Contact'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '16px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,12,18,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,229,204,0.08)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img
          src="/mugensoft-logo.png"
          alt="MugenSoft"
          style={{ height: 36, width: 'auto', objectFit: 'contain' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <span style={{ fontFamily: 'Space Mono', color: 'var(--cyan)', fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>MugenSoft</span>
      </a>
      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 32 }} className="hidden-mobile">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ textDecoration: 'none' }}>
            {l}
          </a>
        ))}
      </div>
      <a href="mailto:erastussane618@gmail.com" className="btn-primary" style={{ fontSize: 12, padding: '8px 20px', textDecoration: 'none' }}>
        Hire Me
      </a>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  const role = useTyping(['Full Stack Developer', 'AI App Builder', 'CS Student', 'Chess Site Creator']);

  return (
    <section id="top" className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
      {/* Orbs */}
      <div className="orb1" style={{ position: 'absolute', top: '15%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,204,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="orb2" style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <p className="mono reveal visible" style={{ color: 'var(--cyan)', fontSize: 13, letterSpacing: 3, marginBottom: 20, opacity: 1 }}>
          // Hello, World 👋
        </p>
        <h1 className="reveal visible" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24, opacity: 1 }}>
          I Build Things<br />
          <span className="grad-text">for the Web</span><br />
          <span style={{ color: 'var(--muted)', fontWeight: 300 }}>& Beyond</span>
        </h1>
        <p className="mono reveal visible" style={{ fontSize: 18, marginBottom: 12, opacity: 1 }}>
          <span style={{ color: 'var(--muted)' }}>$ whoami → </span>
          <span style={{ color: 'var(--cyan)' }} className="cursor">{role}</span>
        </p>
        <p className="reveal visible" style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 520, lineHeight: 1.7, marginBottom: 40, opacity: 1 }}>
          CS Student at NUST Namibia, Windhoek — building full-stack web apps, AI-powered tools, and desktop software. Available for freelance projects.
        </p>
        <div className="reveal visible" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: 1 }}>
          <a href="#projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>View Projects →</a>
          <a href="#services" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Hire Me</a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, marginTop: 64, flexWrap: 'wrap' }}>
          {[['2+', 'Projects Shipped'], ['1', 'Live Website'], ['∞', 'Coffee Consumed']].map(([n, l]) => (
            <div key={l} className="reveal visible" style={{ opacity: 1 }}>
              <div className="grad-text" style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{n}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4, fontFamily: 'Space Mono' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
            The Dev Behind<br /><span className="grad-text">the Code</span>
          </h2>
          <p className="reveal delay-1" style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
            I'm Erastus (Leroy) Shalimba — a Computer Science student at NUST Namibia, passionate about building real software products and solving practical problems through code.
          </p>
          <p className="reveal delay-2" style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
            I've shipped a multiplayer chess platform, a desktop media tool, and full-stack web apps using modern deployment workflows. I don't just write code — I ship things that work.
          </p>
          <p className="reveal delay-3" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Currently focused on AI integrations, scalable web apps, and SaaS products. Open to freelance work, collaborations, and internship opportunities.
          </p>
        </div>
        <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { year: '2024', label: 'Started CS @ NUST Namibia', desc: 'Enrolled in Computer Science at Namibia University of Science & Technology, Windhoek' },
            { year: '2024', label: 'Launched Chess Website', desc: 'Built & deployed multiplayer chess platform on Render using React & Node.js' },
            { year: '2025', label: 'Built SnabTube Desktop App', desc: 'Created a personal desktop media/downloader application from scratch' },
            { year: '2025', label: 'Open for Freelance', desc: 'Available for web apps, AI tools, landing pages & more' },
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
    { cat: 'Tools & Deploy', items: ['Git', 'GitHub', 'Render', 'Vite'] },
    { cat: 'Exploring', items: ['AI Engineering', 'Desktop Apps', 'Python', 'PostgreSQL'] },
  ];

  return (
    <section id="skills" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <p className="section-label reveal">02. Skills</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 12 }}>
          Tech Stack
        </h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>Tools and technologies I work with</p>
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
      title: 'Custom Chess Website',
      desc: 'A fully functional multiplayer chess platform with real-time matchmaking, move validation, and live game state. Built from scratch and deployed on Render.',
      tags: ['React', 'Node.js', 'WebSockets', 'Render'],
      status: 'Live',
      color: '#00e5cc',
    },
    {
      num: '02',
      title: 'SnabTube Desktop App',
      desc: 'A native desktop media application for downloading and organizing video and audio files locally. Personal alternative to SnapTube with a clean UI.',
      tags: ['Desktop', 'Local Storage', 'API Integration'],
      status: 'Personal',
      color: '#4f46e5',
    },
    {
      num: '03',
      title: 'This Portfolio',
      desc: 'Personal developer portfolio with Supabase-powered guestbook, animated UI, and responsive design. Built with React, Vite, and Tailwind CSS.',
      tags: ['React', 'Vite', 'Supabase', 'Tailwind'],
      status: 'Live',
      color: '#10b981',
    },
  ];

  return (
    <section id="projects" style={{ maxWidth: 900, margin: '0 auto', padding: '100px 32px' }}>
      <p className="section-label reveal">03. Projects</p>
      <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 48 }}>
        Things I've Built
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map((p, i) => (
          <div key={p.num} className={`card reveal delay-${i + 1}`} style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'start', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
            {/* Accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: p.color, borderRadius: '16px 0 0 16px' }} />
            <div style={{ fontFamily: 'Space Mono', fontSize: 48, fontWeight: 700, color: p.color, opacity: 0.15, lineHeight: 1 }}>{p.num}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{p.title}</h3>
                <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 10px', borderRadius: 99, border: `1px solid ${p.color}40`, color: p.color, letterSpacing: 1 }}>{p.status}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.tags.map(t => (
                  <span key={t} className="mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: 4, fontSize: 12, color: 'var(--muted)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: '🌐', title: 'Web App Development', desc: 'Custom full-stack web apps built with React & Node.js. From landing pages to complete platforms.', price: 'From $50' },
    { icon: '🤖', title: 'AI-Powered Tools', desc: 'Apps that use AI APIs (Claude, OpenAI) to automate tasks, generate content, or analyze data.', price: 'From $80' },
    { icon: '🎨', title: 'Landing Pages', desc: 'Clean, modern, and responsive landing pages optimized for conversion. Quick turnaround.', price: 'From $30' },
    { icon: '🚀', title: 'Deploy & Setup', desc: 'Get your existing project live. GitHub setup, Render/Vercel deployment, domain configuration.', price: 'From $20' },
    { icon: '🛠️', title: 'Bug Fixes', desc: 'Having issues with your web app? I\'ll diagnose and fix bugs in your React or Node.js codebase.', price: 'From $15' },
    { icon: '💬', title: 'Tech Consulting', desc: 'Not sure what stack to use or how to approach your project? Let\'s talk through it.', price: 'Free intro call' },
  ];

  return (
    <section id="services" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <p className="section-label reveal">04. Services</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 12 }}>
          What I Can Do For You
        </h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>Available for freelance work. Let's build something together.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={s.title} className={`card reveal delay-${(i % 4) + 1}`} style={{ padding: 28 }}>
              <div className="service-icon">{s.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
              <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--cyan)' }}>{s.price}</div>
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

// ── Guestbook ─────────────────────────────────────────────────
function Guestbook() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { fetchComments(); }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
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
      <p className="section-label reveal">05. Guestbook</p>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, marginBottom: 8 }}>Leave a Note</h2>
      <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 40 }}>Say hi, drop feedback, or just leave your mark!</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div className="card reveal" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input className="input-field" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
            <textarea className="input-field" placeholder="Your message..." rows={4} value={commentText} onChange={e => setCommentText(e.target.value)} style={{ resize: 'none' }} />
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

// ── Contact ───────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <p className="section-label reveal" style={{ textAlign: 'center' }}>06. Contact</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
          Let's Build Something<br /><span className="grad-text">Together</span>
        </h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Open for freelance projects, collaborations, and internships. Based in Windhoek, Namibia — working with clients worldwide. I respond fast.
        </p>
        <div className="reveal delay-2" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <a href="mailto:erastussane618@gmail.com" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 36px', fontSize: 15 }}>
            Send Email →
          </a>
          <a href="https://www.linkedin.com/in/Vanity" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 36px', fontSize: 15 }}>
            LinkedIn
          </a>
        </div>
        {/* Contact details */}
        <div className="reveal delay-2" style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 40 }}>
          {[
            { icon: '📧', label: 'erastussane618@gmail.com', href: 'mailto:erastussane618@gmail.com' },
            { icon: '📱', label: '+264 81 259 0824', href: 'tel:+264812590824' },
            { icon: '📍', label: 'Windhoek, Namibia', href: null },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{item.icon}</span>
              {item.href
                ? <a href={item.href} style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{item.label}</a>
                : <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>{item.label}</span>
              }
            </div>
          ))}
        </div>

        <div className="reveal delay-3" style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          {[
            { label: 'GitHub', href: 'https://github.com/LimitlessXOD' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/Vanity' },
            { label: 'Email', href: 'mailto:erastussane618@gmail.com' },
            { label: 'Call', href: 'tel:+264812590824' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
              style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none', letterSpacing: 1, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '24px 32px', borderTop: '1px solid rgba(0,229,204,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/mugensoft-logo.png" alt="MugenSoft" style={{ height: 24, width: 'auto', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
        <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>MugenSoft — Built with React + Vite + Supabase</span>
      </div>
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
      <Guestbook />
      <Contact />
      <Footer />
    </div>
  );
}
