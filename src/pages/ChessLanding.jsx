import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const FEATURES = [
  { icon: '⚡', title: 'Real-Time Multiplayer', desc: 'WebSocket-powered gameplay with zero perceptible lag. Moves sync instantly across the globe.' },
  { icon: '♟', title: 'Full Rules Engine', desc: 'Castling, en passant, pawn promotion, check, checkmate, and draw detection — all enforced server-side.' },
  { icon: '🏆', title: 'Match History', desc: 'Track your W/L/D record per room. Every game is logged so you can review your performance.' },
  { icon: '🔗', title: 'Instant Rooms', desc: 'Share a link and your opponent joins. No account needed — play in seconds.' },
  { icon: '🧪', title: 'Sandbox Mode', desc: 'Practice openings, test tactics, or explore positions alone with the local sandbox.' },
  { icon: '📱', title: 'Responsive Board', desc: 'Fully playable on any screen. The board adapts to mobile, tablet, and desktop.' },
];

const STACK = [
  { layer: 'Frontend', items: ['React', 'Vite', 'Custom CSS', 'WebSocket Client'] },
  { layer: 'Backend', items: ['Node.js', 'Express', 'Socket.io', 'Game State Engine'] },
  { layer: 'Deploy', items: ['Render', 'GitHub', 'Free Tier CI'] },
];

const TIMELINE = [
  { step: '01', title: 'Board & Pieces', desc: 'Built the interactive chess board with drag-and-drop piece movement and visual highlighting.' },
  { step: '02', title: 'Rules Engine', desc: 'Wrote the move validator from scratch — 600+ lines covering every chess rule including edge cases.' },
  { step: '03', title: 'WebSocket Layer', desc: 'Added real-time sync via Socket.io rooms. Server became the single source of truth to prevent race conditions.' },
  { step: '04', title: 'Match System', desc: 'Built room creation, player pairing, turn enforcement, and persistent match history tracking.' },
  { step: '05', title: 'Deploy', desc: 'Shipped to Render free tier. Both client and server live, globally accessible.' },
];

export default function ChessLanding() {
  const [moveCount, setMoveCount] = useState(0);
  const color = '#c9a84c';

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setInterval(() => setMoveCount(n => n + 1), 1800);
    return () => clearInterval(t);
  }, []);

  const moves = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7'];
  const currentMove = moves[moveCount % moves.length];

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
          {/* Background grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
          {/* Glow orbs */}
          <div style={{ position: 'absolute', top: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '0%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {/* Left: text */}
            <div>
              <Link to="/" style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, letterSpacing: 2 }}
                onMouseEnter={e => e.currentTarget.style.color = color}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >← MUGENSOFT PORTFOLIO</Link>
              <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 16, opacity: 0.8 }}>01 / CHESS PLATFORM</div>
              <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, lineHeight: 1.0, marginBottom: 24, letterSpacing: -2 }}>
                Ultimate<br />
                <span style={{ color }}>Chess</span><br />
                Showdown
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, maxWidth: 440, marginBottom: 40 }}>
                Real-time multiplayer chess platform. Play anyone, anywhere — instantly. Built with React, Node.js, and Socket.io.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://chess-project-1-y6c5.onrender.com" target="_blank" rel="noreferrer"
                  style={{ fontFamily: 'Space Mono', fontSize: 13, padding: '14px 32px', borderRadius: 8, background: color, color: '#000', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >↗ Play Now</a>
                <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '14px 32px' }}>⚙ GitHub</a>
                <Link to="/projects/chess-platform" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '14px 32px' }}>Case Study →</Link>
              </div>
            </div>

            {/* Right: live chess board animation */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              {/* Mini chess board */}
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `2px solid ${color}40`, boxShadow: `0 0 60px ${color}20` }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 48px)', gridTemplateRows: 'repeat(8, 48px)' }}>
                  {Array.from({ length: 64 }, (_, i) => {
                    const row = Math.floor(i / 8), col = i % 8;
                    const isLight = (row + col) % 2 === 0;
                    const pieces = {
                      0: ['♜','♞','♝','♛','♚','♝','♞','♜'],
                      1: ['♟','♟','♟','♟','♟','♟','♟','♟'],
                      6: ['♙','♙','♙','♙','♙','♙','♙','♙'],
                      7: ['♖','♘','♗','♕','♔','♗','♘','♖'],
                    };
                    const piece = pieces[row]?.[col] || '';
                    const isBlackPiece = row <= 1;
                    return (
                      <div key={i} style={{
                        width: 48, height: 48,
                        background: isLight ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 26,
                        color: isBlackPiece ? color : 'var(--text)',
                        textShadow: piece ? `0 0 8px ${color}60` : 'none',
                      }}>
                        {piece}
                      </div>
                    );
                  })}
                </div>
                {/* Overlay pulse on active square */}
                <div style={{ position: 'absolute', top: 48 * 4, left: 48 * 4, width: 48, height: 48, background: `${color}30`, border: `2px solid ${color}`, animation: 'pulse 2s ease-in-out infinite', pointerEvents: 'none' }} />
              </div>
              {/* Live move ticker */}
              <div style={{ fontFamily: 'Space Mono', fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
                Live move: <span style={{ color, fontWeight: 700 }}>{currentMove}</span>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--muted)', fontFamily: 'Space Mono', fontSize: 10, letterSpacing: 2 }}>SCROLL</span>
            <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${color}, transparent)` }} />
          </div>
        </section>

        {/* ── SCREENSHOT ── */}
        <section style={{ background: 'var(--bg2)', padding: '80px 0', borderTop: `1px solid ${color}20`, borderBottom: `1px solid ${color}20` }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${color}30`, position: 'relative', boxShadow: `0 32px 80px rgba(0,0,0,0.4)` }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, #6366f1, transparent)` }} />
              {/* Browser chrome */}
              <div style={{ background: 'var(--bg3)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
                </div>
                <div style={{ flex: 1, background: 'var(--bg2)', borderRadius: 4, padding: '4px 12px', fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
                  chess-project-1-y6c5.onrender.com
                </div>
              </div>
              <img src="/screenshot-chess.png" alt="Chess Platform screenshot" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 12 }}>// FEATURES</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 60, letterSpacing: -1 }}>What It Does</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ background: 'var(--bg2)', border: `1px solid var(--border)`, borderRadius: 16, padding: 28, transition: 'border-color 0.3s, transform 0.3s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, fontFamily: 'Space Mono' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WAS BUILT ── */}
        <section style={{ background: 'var(--bg2)', padding: '100px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 12 }}>// BUILD PROCESS</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 60, letterSpacing: -1 }}>How It Was Built</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 32, paddingBottom: i < TIMELINE.length - 1 ? 40 : 0, position: 'relative' }}>
                  {/* Line */}
                  {i < TIMELINE.length - 1 && <div style={{ position: 'absolute', left: 19, top: 40, width: 2, height: 'calc(100% - 8px)', background: `linear-gradient(to bottom, ${color}40, transparent)` }} />}
                  <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Mono', fontSize: 11, color, marginTop: 4 }}>{t.step}</div>
                  <div style={{ paddingTop: 8 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{t.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 12 }}>// TECH STACK</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 60, letterSpacing: -1 }}>Under The Hood</h2>
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
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color, letterSpacing: 3, marginBottom: 20 }}>// PLAY NOW</div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, marginBottom: 20, letterSpacing: -1 }}>Ready to Play?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 48 }}>
              Challenge a friend or explore the board solo. No account needed — just open and play.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://chess-project-1-y6c5.onrender.com" target="_blank" rel="noreferrer"
                style={{ fontFamily: 'Space Mono', fontSize: 14, padding: '16px 40px', borderRadius: 8, background: color, color: '#000', textDecoration: 'none', fontWeight: 700, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >↗ Open Live Demo</a>
              <Link to="/projects/chess-platform" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 14, padding: '16px 40px' }}>Read Case Study →</Link>
            </div>
          </div>
        </section>

        {/* ── NAV BETWEEN PROJECTS ── */}
        <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1000, margin: '0 auto', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/" style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = color}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >← All Projects</Link>
          <Link to="/products/mugen" style={{ fontFamily: 'Space Mono', fontSize: 12, color: '#6366f1', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: 2 }}>NEXT PROJECT</span>
            <span>MUGEN Desktop App →</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
