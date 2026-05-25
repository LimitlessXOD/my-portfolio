/**
 * AdminDashboard.jsx
 *
 * Route: /admin
 * Add to App.jsx routes:
 *   const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
 *   <Route path="/admin" element={<AdminDashboard />} />
 *
 * Password is checked client-side (simple deterrent — not security).
 * For real protection, use Vercel middleware or Supabase RLS.
 *
 * Reads from: supabase → analytics_events table
 * Expected columns: id, event_type, path, payload, session_id, referrer, viewport, created_at
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseReady } from '../supabaseClient';

// ── simple client-side PIN ──────────────────────────────────────────────────
// Change this to whatever you want. Not cryptographically secure — just keeps
// casual visitors out. For real auth, use Supabase Auth or Vercel middleware.
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || 'mugensoft2026';

// ── helpers ─────────────────────────────────────────────────────────────────
function pct(n, total) {
  if (!total) return '0%';
  return Math.round((n / total) * 100) + '%';
}

function relativeTime(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function StatCard({ label, value, sub, accent = 'var(--cyan)' }) {
  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '20px 24px',
    }}>
      <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: 1, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, color: accent, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function BarRow({ label, count, total, color = 'var(--cyan)' }) {
  const width = total ? Math.max(2, Math.round((count / total) * 100)) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'Space Mono' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Space Mono' }}>
          {count} &nbsp;{pct(count, total)}
        </span>
      </div>
      <div style={{ background: 'var(--bg3)', borderRadius: 3, height: 5, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${width}%`,
          background: color,
          borderRadius: 3,
          transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
        }} />
      </div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin-authed') === '1');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [range, setRange] = useState(7); // days

  // ── auth ───────────────────────────────────────────────────────────────────
  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('admin-authed', '1');
      setAuthed(true);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    if (!supabaseReady) return;
    setLoading(true);
    setError(null);
    try {
      const since = new Date();
      since.setDate(since.getDate() - range);

      const { data, error: err } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: false })
        .limit(2000);

      if (err) throw err;
      setEvents(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    if (authed) fetchEvents();
  }, [authed, fetchEvents]);

  // ── derived stats ──────────────────────────────────────────────────────────
  const pageViews     = events.filter(e => e.event_type === 'page_view');
  const contactEvents = events.filter(e => e.event_type === 'contact_submit');
  const demoClicks    = events.filter(e => e.event_type === 'demo_click');
  const projectViews  = events.filter(e => e.event_type === 'project_view');
  const bookingClicks = events.filter(e => e.event_type === 'booking_click');

  const uniqueSessions = new Set(events.map(e => e.session_id)).size;

  // Top pages
  const pageCounts = pageViews.reduce((acc, e) => {
    const p = e.path || '/';
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Top referrers
  const refCounts = events
    .filter(e => e.referrer)
    .reduce((acc, e) => {
      let ref = e.referrer;
      try { ref = new URL(e.referrer).hostname; } catch {}
      acc[ref] = (acc[ref] || 0) + 1;
      return acc;
    }, {});
  const topRefs = Object.entries(refCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Top projects clicked
  const projectCounts = [...demoClicks, ...projectViews].reduce((acc, e) => {
    const slug = e.payload?.project_slug || e.payload?.projectSlug || 'unknown';
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {});
  const topProjects = Object.entries(projectCounts)
    .sort((a, b) => b[1] - a[1]);

  // Viewport breakdown (mobile vs desktop)
  const viewports = events.reduce((acc, e) => {
    if (!e.viewport) return acc;
    const w = parseInt(e.viewport.split('x')[0], 10);
    const type = w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Recent events feed
  const recentFeed = events.slice(0, 20);

  const eventColor = (type) => ({
    page_view: 'var(--cyan)',
    contact_submit: '#22c55e',
    demo_click: '#f59e0b',
    project_view: '#6366f1',
    booking_click: '#ec4899',
  }[type] || 'var(--muted)');

  // ── login screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
      }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '40px 48px',
          width: '100%', maxWidth: 360,
          textAlign: 'center',
        }}>
          <p className="mono" style={{ color: 'var(--cyan)', fontSize: 11, letterSpacing: 4, marginBottom: 16 }}>
            MUGENSOFT
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Admin</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>
            Analytics dashboard
          </p>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="input-field"
            style={{
              width: '100%', marginBottom: 12,
              borderColor: pinError ? '#ef4444' : undefined,
              animation: pinError ? 'shake 0.3s ease' : undefined,
            }}
          />
          <button
            onClick={handleLogin}
            className="btn-primary"
            style={{ width: '100%', padding: '12px 0' }}
          >
            Enter →
          </button>
          {pinError && (
            <p style={{ color: '#ef4444', fontFamily: 'Space Mono', fontSize: 11, marginTop: 10 }}>
              Wrong PIN
            </p>
          )}
        </div>
        <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
      </div>
    );
  }

  // ── not configured ─────────────────────────────────────────────────────────
  if (!supabaseReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ fontSize: 40, marginBottom: 16 }}>⚠️</p>
          <h2 style={{ fontWeight: 900, marginBottom: 8 }}>Supabase not configured</h2>
          <p style={{ color: 'var(--muted)' }}>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.</p>
        </div>
      </div>
    );
  }

  // ── dashboard ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 0 60px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div>
            <p className="mono" style={{ color: 'var(--cyan)', fontSize: 11, letterSpacing: 4, marginBottom: 6 }}>MUGENSOFT ADMIN</p>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 900, margin: 0 }}>Analytics Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Range selector */}
            {[7, 14, 30].map(d => (
              <button
                key={d}
                onClick={() => setRange(d)}
                style={{
                  fontFamily: 'Space Mono', fontSize: 11, padding: '6px 14px',
                  borderRadius: 8, cursor: 'pointer', letterSpacing: 1,
                  background: range === d ? 'var(--cyan)' : 'transparent',
                  color: range === d ? '#000' : 'var(--muted)',
                  border: `1px solid ${range === d ? 'var(--cyan)' : 'var(--border)'}`,
                  transition: 'all 0.15s',
                }}
              >
                {d}D
              </button>
            ))}
            <button
              onClick={fetchEvents}
              className="btn-secondary"
              style={{ fontSize: 12, padding: '6px 16px' }}
              disabled={loading}
            >
              {loading ? '...' : '↻ Refresh'}
            </button>
            <button
              onClick={() => { sessionStorage.removeItem('admin-authed'); setAuthed(false); }}
              style={{
                fontFamily: 'Space Mono', fontSize: 11, padding: '6px 14px',
                borderRadius: 8, cursor: 'pointer',
                background: 'transparent', color: 'var(--muted)',
                border: '1px solid var(--border)',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 10, padding: '12px 20px', marginBottom: 24,
            fontFamily: 'Space Mono', fontSize: 12, color: '#ef4444',
          }}>
            ✗ {error}
          </div>
        )}

        {/* KPI row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 16, marginBottom: 32,
        }}>
          <StatCard label="PAGE VIEWS" value={pageViews.length} sub={`last ${range} days`} />
          <StatCard label="UNIQUE SESSIONS" value={uniqueSessions} sub="estimated visitors" accent="#6366f1" />
          <StatCard label="CONTACT SUBMITS" value={contactEvents.length} sub={`${pct(contactEvents.length, uniqueSessions)} conversion`} accent="#22c55e" />
          <StatCard label="DEMO CLICKS" value={demoClicks.length} sub="project demos" accent="#f59e0b" />
          <StatCard label="PROJECT VIEWS" value={projectViews.length} sub="detail pages" accent="#6366f1" />
          <StatCard label="BOOKING CLICKS" value={bookingClicks.length} sub="call bookings" accent="#ec4899" />
        </div>

        {/* Charts row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24, marginBottom: 32,
        }}>

          {/* Top pages */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h3 className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: 2, marginBottom: 20 }}>// TOP PAGES</h3>
            {topPages.length === 0
              ? <p style={{ color: 'var(--muted)', fontSize: 13 }}>No data yet.</p>
              : topPages.map(([path, count]) => (
                <BarRow key={path} label={path || '/'} count={count} total={pageViews.length} />
              ))
            }
          </div>

          {/* Top referrers */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h3 className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: 2, marginBottom: 20 }}>// REFERRERS</h3>
            {topRefs.length === 0
              ? <p style={{ color: 'var(--muted)', fontSize: 13 }}>No referrer data. Direct traffic or first visit.</p>
              : topRefs.map(([ref, count]) => (
                <BarRow key={ref} label={ref} count={count} total={events.length} color="#6366f1" />
              ))
            }
          </div>

          {/* Projects */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h3 className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: 2, marginBottom: 20 }}>// PROJECT INTEREST</h3>
            {topProjects.length === 0
              ? <p style={{ color: 'var(--muted)', fontSize: 13 }}>No project clicks yet.</p>
              : topProjects.map(([slug, count]) => (
                <BarRow key={slug} label={slug} count={count} total={demoClicks.length + projectViews.length} color="#f59e0b" />
              ))
            }
          </div>

          {/* Devices */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h3 className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: 2, marginBottom: 20 }}>// DEVICES</h3>
            {Object.keys(viewports).length === 0
              ? <p style={{ color: 'var(--muted)', fontSize: 13 }}>No data yet.</p>
              : ['mobile', 'tablet', 'desktop'].filter(t => viewports[t]).map(type => (
                <BarRow
                  key={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  count={viewports[type] || 0}
                  total={events.length}
                  color={type === 'mobile' ? '#ec4899' : type === 'tablet' ? '#f59e0b' : 'var(--cyan)'}
                />
              ))
            }
          </div>
        </div>

        {/* Recent events feed */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <h3 className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: 2, marginBottom: 20 }}>
            // RECENT EVENTS
            <span style={{ color: 'var(--muted)', fontWeight: 400, marginLeft: 8 }}>
              ({events.length} total in {range}d)
            </span>
          </h3>
          {recentFeed.length === 0
            ? <p style={{ color: 'var(--muted)', fontSize: 13 }}>No events yet. Deploy and visit your site to see data here.</p>
            : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'Space Mono' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Event', 'Path', 'Session', 'Referrer', 'Device', 'When'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontWeight: 400, letterSpacing: 1, fontSize: 10 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentFeed.map(e => (
                      <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{
                            background: eventColor(e.event_type) + '22',
                            color: eventColor(e.event_type),
                            borderRadius: 4, padding: '2px 8px', fontSize: 10, whiteSpace: 'nowrap',
                          }}>
                            {e.event_type}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--text)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {e.path || '—'}
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--muted)', fontSize: 10 }}>
                          {e.session_id?.slice(0, 8)}…
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--muted)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {e.referrer ? (() => { try { return new URL(e.referrer).hostname; } catch { return e.referrer; } })() : 'direct'}
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--muted)', fontSize: 10 }}>
                          {e.viewport || '—'}
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                          {relativeTime(e.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
}
