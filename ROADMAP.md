# MugenSoft Portfolio — Product Roadmap

What’s **done**, **in progress**, and **planned** for scaling the site.

## ✅ Shipped

| Feature | Notes |
|---------|--------|
| Project hub filters | Search, category, tech stack, featured-only, sort (popular / newest / oldest / name) |
| Analytics events | `analytics_events` table + client tracking (page views, demo clicks, project views) |
| Vercel Analytics | Already in `index.html` |
| Contact + guestbook | Supabase-backed |
| Email on contact | Edge function `notify-contact` + Resend |
| Scroll / route animations | Reveal system, lazy routes, page transitions |
| Logo + branding | Nav, hero, loader, footer |

## 🔧 Phase 2 — Professional ops (next)

### Better contact system
- [ ] Auto-response email (Resend template on submit)
- [ ] `VITE_BOOKING_URL` — Calendly / Cal.com “Book a call”
- [ ] File upload (Supabase Storage + contact row)
- [x] Resume download button (CV in `/public`)

### Analytics dashboard (owner)
- [ ] Supabase SQL views for top projects / demo clicks
- [ ] Optional protected `/admin` with Supabase Auth (not client-side secrets)
- [ ] PostHog or Plausible (privacy-friendly) alongside Vercel Analytics

### Guestbook moderation
- [ ] `approved` column (in schema) + admin approve flow

## 🔧 Phase 3 — CMS feel

### Auth + admin panel
- [ ] Supabase Auth (magic link)
- [ ] Edit projects, blog, testimonials
- [ ] Approve guestbook, view analytics

### MDX blog
- [ ] `@mdx-js/rollup` + posts in `content/blog/`
- [ ] Syntax highlighting, TOC, tags, related posts

## 🔧 Phase 4 — Premium UX

### Skills
- [ ] Radar chart or tech ecosystem map (Chart.js / Recharts)
- [ ] Animated timeline (extends About)

### Motion
- [ ] Framer Motion shared layout transitions
- [ ] Subtle cursor glow / mesh gradient (respect `prefers-reduced-motion`)

### Live status
- [ ] GitHub activity widget
- [ ] “Now learning” from `portfolioData`
- [ ] Spotify / WakaTime (optional APIs)

## 🔧 Phase 5 — AI (on-brand)

- [ ] “Ask about my projects” chatbot (RAG over project copy)
- [ ] AI resume summarizer (API route + rate limit)

---

## Environment variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_BOOKING_URL=          # optional Calendly link
RESEND_API_KEY=            # Edge function secret (Supabase dashboard)
```

## Analytics queries (Supabase SQL)

```sql
-- Page views last 7 days
select date_trunc('day', created_at) as day, count(*)
from analytics_events
where event_type = 'page_view'
  and created_at > now() - interval '7 days'
group by 1 order by 1;

-- Top demo clicks
select payload->>'project_slug' as project, count(*) as clicks
from analytics_events
where event_type = 'demo_click'
group by 1 order by clicks desc;
```
