import { supabase, supabaseReady } from '../supabaseClient';

let sessionId = sessionStorage.getItem('mugensoft-session');
if (!sessionId) {
  sessionId = crypto.randomUUID?.() ?? String(Date.now());
  sessionStorage.setItem('mugensoft-session', sessionId);
}

/**
 * Fire-and-forget analytics event (Supabase `analytics_events` table).
 * @param {string} eventType - page_view | demo_click | contact_submit | project_view
 * @param {Record<string, unknown>} payload
 */
export function trackEvent(eventType, payload = {}) {
  if (!supabaseReady) return;

  const row = {
    event_type: eventType,
    path: window.location.pathname + window.location.hash,
    payload,
    session_id: sessionId,
    referrer: document.referrer || null,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  };

  supabase.from('analytics_events').insert([row]).then(({ error }) => {
    if (error) console.warn('[analytics]', error.message);
  });
}

export function trackPageView(pathname) {
  trackEvent('page_view', { pathname });
}

export function trackDemoClick(projectSlug, url) {
  trackEvent('demo_click', { project_slug: projectSlug, url });
}

export function trackProjectView(projectSlug) {
  trackEvent('project_view', { project_slug: projectSlug });
}
