import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const posts = {
  'building-chess-platform': {
    tag: 'Full Stack',
    color: '#c9a84c',
    title: 'How I Built a Multiplayer Chess Platform from Scratch',
    date: 'May 2025',
    mins: 6,
    tldr: 'I built a real-time multiplayer chess platform using React and Node.js with Socket.io. The biggest challenge was making server-authoritative game state work without race conditions. Here\'s every technical decision I made.',
    sections: [
      {
        heading: 'Why I Built It',
        body: `I wanted a project that forced me to learn WebSockets properly — not a tutorial chat app, but something with real state complexity. Chess seemed perfect: it has strict rules, two clients need to stay perfectly in sync, and one invalid move breaks everything.

I also just wanted to play chess with a friend online without using a corporate platform.`,
      },
      {
        heading: 'The Architecture',
        body: `The stack is React on the frontend and Node.js + Express + Socket.io on the backend, deployed on Render's free tier.

The most important architectural decision: the server is the single source of truth. Clients never update their own board directly. Here's the flow:

1. Player makes a move → emits socket event to server
2. Server validates the move against the authoritative board state
3. If valid, server updates its board and broadcasts the new state to both clients
4. Both clients re-render from the server state

This prevents any possibility of state divergence between the two browsers.`,
      },
      {
        heading: 'The Hardest Problem: Race Conditions',
        body: `Early versions had a subtle bug: if both players clicked at almost the same time, moves could be applied out of order or twice.

The fix was making every move handler on the server synchronous within a room. Each room processes one move event at a time. Since Node.js is single-threaded, this was simpler than it sounds — no mutexes needed. I just had to ensure I never awaited anything in the middle of a move validation.`,
      },
      {
        heading: 'Implementing En Passant',
        body: `En passant is the most annoying chess rule to implement because it depends on the previous move, not the current board position.

My board state object includes a field: enPassantTarget — the square that can be captured en passant this turn, or null. Every time a pawn moves two squares, I set this field. Every time any other move is made, I clear it.

The pawn move validator checks this field and adds en passant as a valid capture if applicable.`,
      },
      {
        heading: 'Deployment on Render Free Tier',
        body: `Render's free tier spins down after 15 minutes of inactivity. The first request after sleep takes ~30 seconds to respond — which kills a chess game if it happens mid-match.

My workaround: a simple ping endpoint that the frontend calls every 10 minutes while a game is active. Not elegant, but it works. The server never sleeps mid-game.`,
      },
      {
        heading: 'What I\'d Do Differently',
        body: `The chess engine is completely custom — I wrote every move validator from scratch. That was great for learning, but in production I'd use chess.js as the engine and focus my energy on the multiplayer layer instead.

I'd also add proper room expiry and cleanup. Right now old rooms just live in memory forever until the server restarts.`,
      },
    ],
    learned: ['Socket.io rooms and namespaces', 'Server-authoritative state for real-time games', 'Writing a chess move validator from scratch', 'Render free tier limitations and workarounds'],
    nextSlug: 'building-mugen-desktop-app',
    nextTitle: 'Building MUGEN Desktop App',
  },

  'building-mugen-desktop-app': {
    tag: 'Desktop Dev',
    color: '#6366f1',
    title: 'Building a Desktop Media App as a First-Year CS Student',
    date: 'June 2025',
    mins: 8,
    tldr: 'I built MUGEN because I was tired of juggling 5 different tools for media. It downloads, plays, and organizes YouTube and TikTok content with a built-in analytics dashboard. Here\'s what I learned building a real desktop app.',
    sections: [
      {
        heading: 'The Problem',
        body: `I watch a lot of programming tutorials and documentary content offline. My workflow before MUGEN was embarrassing: yt-dlp in a terminal, VLC for playback, a folder full of unorganized files, and no idea what I'd watched or for how long.

I wanted one app that handled the whole thing. So I built it.`,
      },
      {
        heading: 'Electron vs Tauri',
        body: `This was my first desktop app decision. The two main options for JavaScript developers are Electron and Tauri.

Electron bundles a full Chromium browser + Node.js runtime — it's heavy (often 100MB+) but extremely capable and well-documented. Tauri uses the OS webview and a Rust backend — much smaller binaries but requires learning Rust for anything non-trivial.

I chose Electron because I was already comfortable with Node.js and needed to move fast. The app size doesn't matter for a personal tool.`,
      },
      {
        heading: 'Integrating yt-dlp',
        body: `yt-dlp is a Python CLI tool. Calling it from Electron means spawning child processes from Node.js.

The tricky part was streaming stdout in real-time to show download progress. yt-dlp prints progress lines like "[download]  47.3% of 124.5MiB at 2.3MiB/s ETA 00:35" — I had to parse these with a regex and update a progress bar in the renderer process via IPC.

Error handling was also complex. yt-dlp exits with different codes for geo-blocked content, age restrictions, deleted videos, and network failures. I wrote a parser that maps these to human-readable error messages.`,
      },
      {
        heading: 'The Analytics Dashboard',
        body: `The analytics feature tracks: total watch time per day, most-watched content, download history, and library storage usage.

All of this lives in a local SQLite database. Every time a video is played, I log the start time and update the record when playback stops. The dashboard queries aggregate this data.

The hardest part was making queries fast enough to feel instant. I added indexes on created_at and media_type, which brought query times from ~200ms to under 5ms.`,
      },
      {
        heading: 'What 1.37 GB Looks Like',
        body: `The library currently holds 1.37 GB of video across 94 files. Most are programming tutorials between 15–45 minutes.

One thing I didn't anticipate: file naming collisions. If you download two videos with the same title, yt-dlp appends a random hash. I had to write a normalizer that strips these hashes for display purposes while keeping the actual filename for playback.`,
      },
      {
        heading: 'Lessons Learned',
        body: `The biggest lesson: desktop apps are different from web apps in ways that aren't obvious until you hit them. There's no back button. Window resize behavior is your problem. The app can be minimized, closed, or killed at any moment — you have to write state to disk constantly.

I also learned that "it works on my machine" is a real problem for desktop software. File paths, Python versions, and OS-level permissions behave differently everywhere.`,
      },
    ],
    learned: ['Child process management and stdout streaming in Node.js', 'SQLite performance optimization with indexes', 'Electron IPC between main and renderer processes', 'Handling real-world media edge cases (DRM, geo-blocks)'],
    nextSlug: 'freelancing-as-cs-student',
    nextTitle: 'Freelancing as a CS Student',
  },

  'freelancing-as-cs-student': {
    tag: 'Career',
    color: '#10b981',
    title: 'How to Start Freelancing as a CS Student with No Experience',
    date: 'July 2025',
    mins: 5,
    tldr: 'You don\'t need a job to get experience. You need a portfolio and a clear offer. Here\'s the exact approach I\'m using to land my first freelance clients as a first-year CS student in Namibia.',
    sections: [
      {
        heading: 'The Catch-22 of "No Experience"',
        body: `Everyone says the same thing: "You need experience to get clients, but you need clients to get experience."

The answer is to reframe what counts as experience. A deployed chess platform with real users is experience. A desktop app you built for yourself is experience. A portfolio site with a Supabase backend is experience. None of these required a client — just shipping.

Start by building two or three real things and deploying them. Not tutorials. Not todo apps. Things that actually work and have URLs.`,
      },
      {
        heading: 'The Offer: What Exactly Are You Selling?',
        body: `"I'm a developer" is not an offer. "I build React websites for small businesses in Namibia starting at N$500" is an offer.

Be specific about: what you build, who it's for, how much it costs, and how long it takes. Vague positioning attracts no one.

My current offer: landing pages and web apps for Namibian small businesses and startups. Fast turnaround, WhatsApp communication, Vercel deployment included.`,
      },
      {
        heading: 'Where to Find First Clients',
        body: `For local freelancing in Namibia:

Direct outreach works better than platforms. I identify small businesses with bad or no websites — restaurants, salons, shops — and send a simple WhatsApp message offering to build them something better. Most say no. Some say yes.

LinkedIn is worth the effort. Connecting with local business owners and posting about what you've built gets visibility. One post about my chess platform got 3 DMs asking about web development services.

Tell everyone you know. Friends, family, fellow students. Your first client is almost always someone who knows you or knows someone who knows you.`,
      },
      {
        heading: 'Pricing Without Confidence',
        body: `Underpricing is a trap. It attracts difficult clients who don't value your work, and it makes the work feel worthless.

My starting prices: N$100 for a basic static site, N$500 for a full landing page with contact form, N$1000+ for a web app with backend.

These feel high until you calculate the hours. A proper landing page takes 8–15 hours. At N$500 you're making N$33–62/hour. That's not much. Raise your prices as soon as you have a completed project to show.`,
      },
      {
        heading: 'The Portfolio as a Sales Tool',
        body: `Your portfolio is your most important sales asset. It should answer three questions instantly: what do you build, have you shipped real things, and how do I contact you?

The mistake most student portfolios make: showing projects that only exist as screenshots or GitHub repos. If the link doesn't work, the project doesn't exist in a client's mind.

Every project in my portfolio is either live with a working URL or has a detailed case study explaining exactly how it was built and why certain decisions were made. That case study approach signals professionalism that clients notice.`,
      },
      {
        heading: 'The Mindset Shift',
        body: `The most important thing I've learned: freelancing is a skill separate from coding. You have to learn how to scope a project, set expectations, handle revision requests, write a simple invoice, and follow up without being annoying.

None of this is taught in CS programs. You learn it by doing. Start small, deliver well, ask for a testimonial, repeat.`,
      },
    ],
    learned: ['How to position yourself with a clear offer', 'Where to find first clients locally', 'Pricing strategy for early freelancers', 'Building a portfolio that converts visitors to clients'],
    nextSlug: 'building-chess-platform',
    nextTitle: 'How I Built a Chess Platform',
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <>
        <Nav />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <h2 style={{ fontFamily: 'Space Mono', color: 'var(--cyan)' }}>// 404 — Post not found</h2>
          <Link to="/#blog" className="btn-primary" style={{ textDecoration: 'none' }}>← Back to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="page-enter" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

        {/* Reading progress bar */}
        <ReadingBar color={post.color} />

        {/* Hero */}
        <section style={{ background: 'var(--bg2)', paddingTop: 120, paddingBottom: 64, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 32px' }}>
            <Link to="/#blog" style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              ← Blog
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 12px', borderRadius: 99, border: `1px solid ${post.color}50`, color: post.color }}>{post.tag}</span>
              <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)' }}>{post.date} · {post.mins} min read</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px,4.5vw,48px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 24 }}>{post.title}</h1>

            {/* TL;DR */}
            <div style={{ background: `${post.color}0d`, border: `1px solid ${post.color}30`, borderLeft: `3px solid ${post.color}`, borderRadius: '0 12px 12px 0', padding: '16px 20px' }}>
              <p style={{ fontFamily: 'Space Mono', fontSize: 11, color: post.color, marginBottom: 6, letterSpacing: 1 }}>TL;DR</p>
              <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.7 }}>{post.tldr}</p>
            </div>
          </div>
        </section>

        {/* Body */}
        <div id="post-body" style={{ maxWidth: 740, margin: '0 auto', padding: '64px 32px 0' }}>
          {post.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 52 }}>
              <h2 style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: post.color, opacity: 0.6, flexShrink: 0 }}>0{i + 1}</span>
                {s.heading}
              </h2>
              {s.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: 16, marginBottom: 16 }}>{para.trim()}</p>
              ))}
            </div>
          ))}

          {/* What I Learned */}
          <div style={{ marginBottom: 64, padding: '28px 32px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <h2 style={{ fontFamily: 'Space Mono', fontSize: 12, color: post.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>// Key Takeaways</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {post.learned.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: post.color, fontSize: 10, flexShrink: 0 }}>✦</span>
                  <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Author */}
          <div style={{ marginBottom: 64, display: 'flex', alignItems: 'center', gap: 16, padding: '24px 28px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${post.color}20`, border: `2px solid ${post.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Mono', fontSize: 14, color: post.color, fontWeight: 700, flexShrink: 0 }}>ES</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Erastus (Leroy) Shalimba</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'Space Mono' }}>CS Student @ NUST · Founder of MugenSoft</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11, padding: '6px 14px' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/erastus-shalimba" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11, padding: '6px 14px' }}>LinkedIn</a>
            </div>
          </div>

          {/* Next post */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48, paddingBottom: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/#blog" style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              ← All Posts
            </Link>
            <Link
              to={`/blog/${post.nextSlug}`}
              style={{ fontFamily: 'Space Mono', fontSize: 12, color: post.color, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}
            >
              <span style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: 2 }}>NEXT POST</span>
              <span>{post.nextTitle} →</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ReadingBar({ color }) {
  const [pct, setPct] = React.useState(0);
  useEffect(() => {
    const onScroll = () => {
      const body = document.getElementById('post-body');
      if (!body) return;
      const { top, height } = body.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      setPct(Math.min(100, (scrolled / (height - window.innerHeight + 200)) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 999, background: 'var(--border)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, transition: 'width 0.1s linear' }} />
    </div>
  );
}
