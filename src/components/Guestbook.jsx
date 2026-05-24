import React, { useState, useEffect } from 'react';
import { supabase, supabaseReady } from '../supabaseClient';

export default function Guestbook() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchComments = async () => {
    const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
    if (!error && data) setComments(data);
  };

  useEffect(() => { if (supabaseReady) fetchComments(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !commentText || !supabaseReady) return;
    setLoading(true);
    const { error } = await supabase.from('comments').insert([{ name, text: commentText }]);
    if (!error) { setName(''); setCommentText(''); setSubmitted(true); fetchComments(); }
    setLoading(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="guestbook" style={{background:'var(--bg2)',padding:'100px 0'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'0 32px'}}>
        <p className="section-label reveal">08. Guestbook</p>
        <h2 className="reveal" style={{fontSize:'clamp(24px,3vw,36px)',fontWeight:700,marginBottom:8}}>Leave a Note</h2>
        <p className="reveal delay-1" style={{color:'var(--muted)',marginBottom:40}}>Say hi, drop feedback, or just leave your mark!</p>

        {!supabaseReady && (
          <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.3)',borderRadius:10,padding:'12px 20px',marginBottom:24,fontFamily:'Space Mono',fontSize:12,color:'#f59e0b'}}>
            ⚠ Guestbook offline — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel environment variables.
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:48,alignItems:'start'}}>
          <div className="card reveal" style={{padding:32}}>
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
              <input className="input-field" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required disabled={!supabaseReady} />
              <textarea className="input-field" placeholder="Your message..." rows={4} value={commentText} onChange={e=>setCommentText(e.target.value)} style={{resize:'none'}} required disabled={!supabaseReady} />
              <button type="submit" className="btn-primary" disabled={loading || !supabaseReady} style={{padding:'12px 24px',fontSize:14}}>
                {!supabaseReady ? 'Unavailable' : loading ? 'Sending...' : submitted ? '✓ Sent!' : 'Submit →'}
              </button>
            </form>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12,maxHeight:400,overflowY:'auto',paddingRight:8}}>
            {comments.length === 0 ? (
              <div style={{color:'var(--muted)',fontFamily:'Space Mono',fontSize:13,textAlign:'center',padding:'40px 0'}}>// No messages yet. Be the first!</div>
            ) : comments.map(c => (
              <div key={c.id} style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:12,padding:'16px 20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontWeight:600,fontSize:14,color:'var(--cyan)'}}>{c.name}</span>
                  <span style={{fontFamily:'Space Mono',fontSize:10,color:'var(--muted)'}}>{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p style={{color:'var(--muted)',fontSize:14,lineHeight:1.5}}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
