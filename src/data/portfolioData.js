export const navLinks = ['About', 'Skills', 'Projects', 'Services', 'Now', 'Guestbook', 'Contact'];

export const timelineItems = [
  { year: '2025', label: 'Started BCS @ NUST Namibia', desc: 'Bachelor of Computer Science (Cyber Security) — graduating 2028' },
  { year: '2025', label: 'Launched Chess Platform', desc: 'Built & deployed multiplayer chess on Render — React & Node.js with WebSockets' },
  { year: '2025', label: 'Built MUGEN Desktop App', desc: 'Full-featured desktop media app with player, analytics & library' },
  { year: '2025', label: 'Founded MugenSoft', desc: 'Building web apps, AI tools, and SaaS. Open for freelance worldwide' }
];

export const skillGroups = [
  { cat: 'Frontend', color: '#00e5cc', skills: [{ n: 'React.js', p: 85 }, { n: 'JavaScript', p: 80 }, { n: 'HTML/CSS', p: 90 }, { n: 'Tailwind CSS', p: 80 }] },
  { cat: 'Backend', color: '#6366f1', skills: [{ n: 'Node.js', p: 75 }, { n: 'Express', p: 72 }, { n: 'REST APIs', p: 78 }, { n: 'Supabase', p: 70 }] },
  { cat: 'Tools & Deploy', color: '#10b981', skills: [{ n: 'Git/GitHub', p: 85 }, { n: 'Render/Vercel', p: 80 }, { n: 'Vite', p: 75 }, { n: 'CLI & Bash', p: 65 }] },
  { cat: 'Exploring', color: '#f59e0b', skills: [{ n: 'AI Engineering', p: 55 }, { n: 'Python', p: 50 }, { n: 'PostgreSQL', p: 45 }, { n: 'Desktop Apps', p: 65 }] }
];

export const projectsList = [
  {
    num: '01',
    title: 'Ultimate Chess Showdown',
    status: 'Live',
    color: '#c9a84c',
    desc: 'Real-time multiplayer chess platform with WebSockets, full chess rules (castling, en passant, promotion), match history, W/L/D tracking, and local sandbox mode.',
    tags: ['React', 'Node.js', 'Socket.io', 'WebSockets', 'Render'],
    highlights: ['Real-Time Multiplayer via WebSockets', 'Full Chess Rules — castling, en passant, promotion', 'Match History with W/L/D per room', 'Local Sandbox mode'],
    github: 'https://github.com/LimitlessXOD',
    demo: 'https://chess-project-1-y6c5.onrender.com',
    screenshot: '/screenshot-chess.png'
  },
  {
    num: '02',
    title: 'MUGEN — Desktop Media App',
    status: 'Personal',
    color: '#6366f1',
    desc: 'Full-featured desktop media app — YouTube & TikTok search/download, built-in video player, analytics dashboard, personal library (1.37 GB tracked), theme customisation.',
    tags: ['Desktop App', 'yt-dlp', 'Media Player', 'Analytics'],
    highlights: ['YouTube & TikTok downloader', 'Built-in video player with speed controls', 'Analytics dashboard', 'Library management — 1.37 GB tracked'],
    github: 'https://github.com/LimitlessXOD',
    demo: null,
    screenshot: '/screenshot-mugen.png'
  },
  {
    num: '03',
    title: 'MugenSoft Portfolio',
    status: 'Live',
    color: '#10b981',
    desc: 'Full-stack developer portfolio with Supabase-powered guestbook & contact form, animated scroll reveals, typing effects, dark/light mode, and mobile-first responsive design.',
    tags: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Vercel'],
    highlights: ['Supabase guestbook + contact form', 'Dark/Light mode toggle', 'Scroll reveal animations', 'Mobile-first responsive design'],
    github: 'https://github.com/LimitlessXOD',
    demo: 'https://mugensoft-dev.vercel.app',
    screenshot: '/screenshot-portfolio.png'
  }
];

export const servicesList = [
  { icon: '🌐', title: 'Web App Development', desc: 'Custom full-stack web apps with React & Node.js. From landing pages to complete platforms.', price: 'From N$100' },
  { icon: '🤖', title: 'AI-Powered Tools', desc: 'Apps using Claude/OpenAI APIs to automate tasks, generate content, or analyze data.', price: 'From N$400' },
  { icon: '🎨', title: 'Landing Pages', desc: 'Clean, modern, responsive landing pages optimized for conversion. Quick turnaround.', price: 'From N$100' },
  { icon: '🖥️', title: 'Desktop Applications', desc: 'Custom desktop software for Windows/Mac. Offline-first tools, media apps, productivity.', price: 'From N$300' },
  { icon: '🚀', title: 'Deploy & Setup', desc: 'Get your project live. GitHub setup, Render/Vercel deployment, domain config.', price: 'From N$100' }
];

export const nowBuildingItems = [
  { label: 'AI productivity dashboard', status: 'In Progress', color: '#00e5cc' },
  { label: 'Chess platform v2 — better matchmaking + ELO rating', status: 'Planning', color: '#6366f1' },
  { label: 'SaaS landing page templates pack', status: 'Ideation', color: '#10b981' },
  { label: 'Open source React component library', status: 'Ideation', color: '#f59e0b' }
];

export const testimonialsList = [
  { name: 'Placeholder Client', role: 'Small Business Owner', text: 'Erastus built our landing page in 3 days. Clean, fast, and exactly what we asked for. Would hire again.', avatar: 'PC', color: '#00e5cc' },
  { name: 'Future Collaborator', role: 'Fellow Developer', text: 'Great to work with — communicates well, writes clean code, and actually ships. Rare combo in a junior dev.', avatar: 'FC', color: '#6366f1' },
  { name: 'Internship Manager', role: 'Tech Company', text: 'Impressed by the quality of projects he built independently as a student. Strong initiative and solid fundamentals.', avatar: 'IM', color: '#10b981' }
];

export const blogPostsList = [
  { tag: 'Full Stack', title: 'How I Built a Multiplayer Chess Platform from Scratch', desc: 'The journey of building real-time WebSocket chess — rooms, game state, and deploying on Render\'s free tier.', date: '2025', color: '#c9a84c', mins: 6 },
  { tag: 'Desktop Dev', title: 'Building a Desktop Media App as a First-Year CS Student', desc: 'Why I built MUGEN, what I learned about yt-dlp, Electron vs Tauri, and managing a local media library.', date: '2025', color: '#6366f1', mins: 8 },
  { tag: 'Career', title: 'How to Start Freelancing as a CS Student with No Experience', desc: 'The exact steps I\'m taking to land my first clients — portfolio, pricing, platforms, and positioning.', date: '2025', color: '#10b981', mins: 5 }
];
