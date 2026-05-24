// Supabase Edge Function — notify-contact
// Sends an email to erastussane618@gmail.com whenever someone submits the contact form.
//
// SETUP (one-time, ~5 minutes):
//   1. Go to https://resend.com → sign up free → "API Keys" → create one
//   2. In your Supabase dashboard → Project Settings → Edge Functions → Secrets
//      Add: RESEND_API_KEY = re_xxxxxxxxxxxx
//   3. Deploy: supabase functions deploy notify-contact

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OWNER_EMAIL = "erastussane618@gmail.com";
const FROM_EMAIL  = "portfolio@mugensoft.dev"; // must be a verified Resend sender (or use onboarding@resend.dev for testing)

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { name, email, message } = await req.json();
  const safeName = escapeHtml(name ?? "");
  const safeEmail = escapeHtml(email ?? "");
  const safeMessage = escapeHtml(message ?? "");

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    return new Response("RESEND_API_KEY not set", { status: 500 });
  }

  const html = `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#080c12;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(0,229,204,0.2)">
      <h2 style="color:#00e5cc;margin:0 0 24px">📬 New Portfolio Lead</h2>
      <p style="margin:0 0 8px"><strong style="color:#00e5cc">Name:</strong> ${safeName}</p>
      <p style="margin:0 0 8px"><strong style="color:#00e5cc">Email:</strong> <a href="mailto:${safeEmail}" style="color:#00e5cc">${safeEmail}</a></p>
      <p style="margin:0 0 16px"><strong style="color:#00e5cc">Message:</strong></p>
      <div style="background:rgba(0,229,204,0.06);border-left:3px solid #00e5cc;padding:16px;border-radius:4px;white-space:pre-wrap">${safeMessage}</div>
      <hr style="border:none;border-top:1px solid rgba(0,229,204,0.15);margin:24px 0"/>
      <p style="color:#64748b;font-size:12px;margin:0">
        Sent from your MugenSoft portfolio contact form.<br/>
        Reply directly to this email to respond to ${safeName}.
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to:   OWNER_EMAIL,
      reply_to: email,
      subject: `[MugenSoft] New message from ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response("Email send failed", { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
