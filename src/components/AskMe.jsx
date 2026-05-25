import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'What projects have you built?',
  'What are your rates?',
  'Are you available for freelance?',
  'What stack do you use?',
];

/* ── MugenSoft M mark as inline SVG ── */
function MugenMark({ size = 26, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animated ? { animation: 'mSpinIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' } : {}}
    >
      {/* Left pillar */}
      <rect x="2" y="28" width="18" height="62" rx="4" fill="url(#gLeft)" />
      {/* Left diagonal arm */}
      <polygon points="2,28 20,28 50,58 34,74" fill="url(#gMid)" />
      {/* Right diagonal arm */}
      <polygon points="98,28 80,28 50,58 66,74" fill="url(#gCyan)" />
      {/* Right pillar */}
      <rect x="80" y="28" width="18" height="62" rx="4" fill="url(#gCyan)" />
      {/* Centre diamond highlight */}
      <polygon points="50,44 62,58 50,72 38,58" fill="url(#gCenter)" opacity="0.9" />
      <defs>
        <linearGradient id="gLeft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="gMid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="gCyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e5cc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="gCenter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00e5cc" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Close X ── */
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'mSpinIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
      <line x1="3" y1="3" x2="15" y2="15" stroke="#00e5cc" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="3" x2="3" y2="15" stroke="#00e5cc" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AskMe() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Leroy's AI assistant. Ask me anything about his projects, skills, or services 👋" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    const apiMessages = newMessages.filter((m, i) => !(i === 0 && m.role === 'assistant'));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setMessages(prev => [...prev, { role: 'assistant', content: `Error ${res.status}: ${errText}` }]);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'content_block_delta' && data.delta?.text) {
              assistantText += data.delta.text;
              setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: assistantText }]);
            }
          } catch {}
        }
      }

      if (!assistantText) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: "Sorry, I didn't get a response. Please try again or contact Erastus directly." }
        ]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Network error: ${err.message}` }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes mSpinIn {
          from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
          to   { opacity: 1; transform: rotate(0deg)   scale(1);   }
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.6; transform: scale(1);    }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(0,229,204,0.6);  }
          50%       { box-shadow: 0 0 14px rgba(0,229,204,1);   }
        }
      `}</style>

      {/* ── Floating FAB ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 200,
          width: 58,
          height: 58,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Spinning gradient ring */}
        <div style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #00e5cc, #818cf8, #a855f7, #00e5cc)',
          animation: 'ringRotate 3s linear infinite',
          opacity: hovered || open ? 1 : 0.55,
          transition: 'opacity 0.3s',
        }} />
        {/* Inner mask to make it look like a ring */}
        <div style={{
          position: 'absolute',
          inset: 2,
          borderRadius: '50%',
          background: 'var(--bg, #080c12)',
          zIndex: 1,
        }} />

        {/* Outer orbit pulse (only when closed + hovered) */}
        {!open && hovered && (
          <div style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            border: '1px solid rgba(0,229,204,0.35)',
            animation: 'orbitPulse 1.2s ease-in-out infinite',
            zIndex: 0,
          }} />
        )}

        {/* Button face */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Ask AI about this portfolio"
          style={{
            position: 'absolute',
            inset: 2,
            zIndex: 2,
            borderRadius: '50%',
            background: open
              ? 'linear-gradient(135deg, #0d1420 0%, #111b2e 100%)'
              : 'linear-gradient(135deg, #0d1420 0%, #0f1d30 100%)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {open ? <CloseIcon /> : <MugenMark size={28} animated />}
        </button>
      </div>

      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 100,
          right: 28,
          zIndex: 200,
          width: 'min(380px, calc(100vw - 40px))',
          height: 490,
          background: 'var(--bg2)',
          border: '1px solid rgba(0,229,204,0.2)',
          borderRadius: 18,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,229,204,0.05)',
          overflow: 'hidden',
          animation: 'chatSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both',
        }}>

          {/* Header */}
          <div style={{
            padding: '13px 18px',
            borderBottom: '1px solid rgba(0,229,204,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'linear-gradient(90deg, rgba(0,229,204,0.05) 0%, transparent 100%)',
          }}>
            <MugenMark size={22} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.08em' }}>
                MUGENSOFT AI
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>
                Ask about Leroy's work
              </div>
            </div>
            {/* Online dot */}
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--cyan)',
              animation: 'dotPulse 2s ease-in-out infinite',
            }} />
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                background: m.role === 'user'
                  ? 'linear-gradient(135deg, #00e5cc, #38bdf8)'
                  : 'var(--bg3, var(--bg))',
                color: m.role === 'user' ? '#020d12' : 'var(--text)',
                border: m.role === 'user' ? 'none' : '1px solid rgba(0,229,204,0.12)',
                borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                padding: '10px 14px',
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                fontWeight: m.role === 'user' ? 600 : 400,
              }}>
                {m.content}
              </div>
            ))}

            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'var(--bg3, var(--bg))',
                border: '1px solid rgba(0,229,204,0.12)',
                borderRadius: '14px 14px 14px 4px',
                padding: '10px 16px',
                fontSize: 18,
                letterSpacing: 3,
                color: 'var(--cyan)',
              }}>
                ···
              </div>
            )}

            {messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    background: 'none',
                    border: '1px solid rgba(0,229,204,0.15)',
                    borderRadius: 8,
                    padding: '7px 12px',
                    color: 'var(--muted)',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--cyan)';
                      e.currentTarget.style.color = 'var(--cyan)';
                      e.currentTarget.style.background = 'rgba(0,229,204,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,229,204,0.15)';
                      e.currentTarget.style.color = 'var(--muted)';
                      e.currentTarget.style.background = 'none';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 14px',
            borderTop: '1px solid rgba(0,229,204,0.12)',
            display: 'flex',
            gap: 8,
            background: 'linear-gradient(0deg, rgba(0,229,204,0.03) 0%, transparent 100%)',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--bg)',
                border: '1px solid rgba(0,229,204,0.15)',
                borderRadius: 10,
                padding: '9px 13px',
                color: 'var(--text)',
                fontSize: 13,
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,229,204,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(0,229,204,0.15)'}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                background: 'linear-gradient(135deg, #00e5cc, #38bdf8)',
                border: 'none',
                borderRadius: 10,
                padding: '9px 15px',
                cursor: 'pointer',
                fontSize: 15,
                color: '#020d12',
                fontWeight: 700,
                opacity: loading || !input.trim() ? 0.35 : 1,
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
