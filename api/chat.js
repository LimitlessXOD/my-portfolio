export const config = { runtime: 'edge' };

// ─── Rate Limiter ────────────────────────────────────────────────────────────
// In-memory store: { ip -> { count, windowStart } }
// Edge functions share memory within a single instance, so this is best-effort
// but stops casual abuse and runaway loops effectively.
const RATE_LIMIT_REQUESTS = 20;   // max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_MESSAGES = 20;           // max messages in a single conversation payload

const ipStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    ipStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// ─── System Prompt ───────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded in Erastus (Leroy) Shalimba's developer portfolio — MugenSoft. Answer questions from visitors about his work, skills, and services. Be concise, friendly, and honest. If something isn't covered below, say you don't have that info and suggest they contact Erastus directly.

## About
Full-stack developer based in Windhoek, Namibia. CS student at NUST (Cyber Security, graduating 2028). Founded MugenSoft in 2026. Open to freelance worldwide.
Contact: erastussane618@gmail.com | WhatsApp: +264 81 259 0824

## Projects
1. Ultimate Chess Showdown (Live)
   Stack: React, Node.js, Socket.io, WebSockets, deployed on Render
   Features: Real-time multiplayer, full chess rules (castling, en passant, promotion), match history, local sandbox mode
   Demo: https://chess-project-1-y6c5.onrender.com

2. MUGEN Desktop Media App (Personal)
   Stack: JavaScript, yt-dlp, desktop app
   Features: YouTube & TikTok downloader, built-in video player, analytics dashboard, library management (1.37GB tracked)

3. MugenSoft Portfolio (Live)
   Stack: React, Vite, Supabase, Tailwind CSS, Vercel
   Features: Supabase guestbook & contact form, dark/light mode, scroll reveal, analytics
   Demo: https://mugensoft-dev.vercel.app

## Skills
Frontend: React.js (85%), JavaScript (80%), HTML/CSS (90%), Tailwind CSS (80%)
Backend: Node.js (75%), Express (72%), REST APIs (78%), Supabase (70%)
Tools: Git/GitHub (85%), Render/Vercel (80%), Vite (75%), CLI & Bash (65%)
Exploring: AI Engineering (55%), Python (50%), PostgreSQL (45%), Desktop Apps (65%)

## Services & Pricing
- Web App Development: from N$100
- AI-Powered Tools: from N$400
- Landing Pages: from N$100
- Desktop Applications: from N$300
- Deploy & Setup: from N$100

## Currently Building
- AI productivity dashboard (In Progress)
- Chess Platform v2 with ELO rating (Planning)
- SaaS landing page templates pack (Ideation)
- Open source React component library (Ideation)`;

// ─── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // ── Rate limiting ──
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in an hour.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '3600',
        },
      }
    );
  }

  // ── Parse & validate body ──
  let messages;
  try {
    const body = await req.json();
    messages = body.messages;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Clamp conversation length — prevents context-stuffing attacks
  const safeMessages = messages.slice(-MAX_MESSAGES);

  // ── Call Anthropic ──
  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      stream: true,
      messages: safeMessages,
    }),
  });

  if (!upstream.ok) {
    const errorText = await upstream.text();
    console.error('Anthropic error:', upstream.status, errorText);
    return new Response(errorText, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
