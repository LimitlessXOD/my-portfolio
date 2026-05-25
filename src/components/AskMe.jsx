import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'What projects have you built?',
  'What are your rates?',
  'Are you available for freelance?',
  'What stack do you use?',
];

export default function AskMe() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Leroy's AI assistant. Ask me anything about his projects, skills, or services 👋" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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

    // Skip the initial greeting when sending to API
    const apiMessages = newMessages.filter((m, i) => !(i === 0 && m.role === 'assistant'));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      // Surface API errors visibly
      if (!res.ok) {
        const errText = await res.text();
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `Error ${res.status}: ${errText}` }
        ]);
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
              setMessages(prev => [
                ...prev.slice(0, -1),
                { role: 'assistant', content: assistantText }
              ]);
            }
          } catch {}
        }
      }

      // If we got nothing back, show a fallback
      if (!assistantText) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: "Sorry, I didn't get a response. Please try again or contact Erastus directly." }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Network error: ${err.message}` }
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ask AI about this portfolio"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 200,
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--cyan)', border: 'none',
          cursor: 'pointer', fontSize: 22,
          boxShadow: '0 4px 24px rgba(0,229,204,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '✦'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 92, right: 28, zIndex: 200,
          width: 'min(380px, calc(100vw - 40px))',
          height: 480,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--cyan)',
              boxShadow: '0 0 8px rgba(0,229,204,0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--cyan)' }}>
              ASK LEROY'S AI
            </span>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                background: m.role === 'user'
                  ? 'var(--cyan)' : 'var(--bg3, var(--bg))',
                color: m.role === 'user' ? '#000' : 'var(--text)',
                border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                padding: '10px 14px',
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {m.content}
              </div>
            ))}

            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'var(--bg3, var(--bg))',
                border: '1px solid var(--border)',
                borderRadius: '14px 14px 14px 4px',
                padding: '10px 16px',
                fontSize: 18, letterSpacing: 3,
                color: 'var(--cyan)',
              }}>
                ···
              </div>
            )}

            {/* Suggestions — only show before any user message */}
            {messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: 8, padding: '7px 12px',
                    color: 'var(--muted)', fontSize: 12,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
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
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8,
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
                border: '1px solid var(--border)',
                borderRadius: 8, padding: '8px 12px',
                color: 'var(--text)', fontSize: 13,
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                background: 'var(--cyan)', border: 'none',
                borderRadius: 8, padding: '8px 14px',
                cursor: 'pointer', fontSize: 14,
                opacity: loading || !input.trim() ? 0.4 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
