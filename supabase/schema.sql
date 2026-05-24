-- MugenSoft Portfolio — Supabase schema
-- Run in Supabase SQL Editor after creating your project.

-- Guestbook
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  approved boolean default true,
  created_at timestamptz default now()
);

-- Contact form
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Analytics (owner views in Supabase Dashboard → Table Editor)
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  path text,
  payload jsonb default '{}',
  session_id text,
  referrer text,
  viewport text,
  created_at timestamptz default now()
);

create index if not exists analytics_events_type_idx on public.analytics_events (event_type);
create index if not exists analytics_events_created_idx on public.analytics_events (created_at desc);

-- RLS
alter table public.comments enable row level security;
alter table public.contact_messages enable row level security;
alter table public.analytics_events enable row level security;

-- Guestbook: public read approved, public insert
create policy "comments_select" on public.comments for select using (approved = true);
create policy "comments_insert" on public.comments for insert with check (true);

-- Contact: insert only (no public read)
create policy "contact_insert" on public.contact_messages for insert with check (true);

-- Analytics: insert only from site (no public read — view in dashboard)
create policy "analytics_insert" on public.analytics_events for insert with check (true);

-- Optional: project view counts (sync from analytics later)
create table if not exists public.project_stats (
  slug text primary key,
  view_count int default 0,
  demo_clicks int default 0,
  updated_at timestamptz default now()
);
