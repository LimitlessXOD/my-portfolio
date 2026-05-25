export const config = { runtime: 'edge' };

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

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { messages } = await req.json();

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
      messages,
    }),
  });

  // If Anthropic returns an error, forward it so the client can show it
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
