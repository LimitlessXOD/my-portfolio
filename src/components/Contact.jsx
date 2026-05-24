import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      const { error } = await supabase.from('contact_messages').insert([{ name, email, message }]);
      if (error) throw error;
      try { await supabase.functions.invoke('notify-contact', { body: { name, email, message } }); } catch (_) {}
      setStatus('success'); setName(''); setEmail(''); setMessage('');
    } catch (err) {
      console.error(err); setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" style={{maxWidth:900,margin:'0 auto',padding:'100px 32px'}}>
      <p className="section-label reveal" style={{textAlign:'center'}}>09. Contact</p>
      <h2 className="reveal" style={{fontSize:'clamp(32px,5vw,56px)',fontWeight:900,lineHeight:1.1,marginBottom:16,textAlign:'center'}}>
        Let's Build Something<br /><span className="grad-text">Together</span>
      </h2>
      <p className="reveal delay-1" style={{color:'var(--muted)',maxWidth:480,margin:'0 auto 60px',lineHeight:1.7,textAlign:'center'}}>
        Open for freelance, collaborations, and internships. Based in Windhoek, Namibia — working with clients worldwide.
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:48,alignItems:'start'}}>
        <div className="card reveal" style={{padding:32}}>
          <h3 style={{fontSize:16,fontWeight:700,marginBottom:24,fontFamily:'Space Mono',color:'var(--cyan)'}}>// Send a Message</h3>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
            <input className="input-field" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required />
            <input className="input-field" type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <textarea className="input-field" placeholder="Tell me about your project..." rows={5} value={message} onChange={e=>setMessage(e.target.value)} style={{resize:'vertical'}} required />
            <button type="submit" className="btn-primary" disabled={status==='sending'} style={{padding:'12px 24px',fontSize:14}}>
              {status==='sending'?'Sending...':status==='success'?'✓ Message Sent!':status==='error'?'✗ Try Again':'Send Message →'}
            </button>
            {status==='success' && <p style={{fontFamily:'Space Mono',fontSize:12,color:'var(--cyan)',textAlign:'center'}}>I'll get back to you within 24hrs!</p>}
          </form>
        </div>
        <div className="reveal delay-2" style={{display:'flex',flexDirection:'column',gap:24}}>
          <div>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:20,fontFamily:'Space Mono',color:'var(--cyan)'}}>// Reach Out Directly</h3>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {[
                {icon:'📧',label:'erastussane618@gmail.com',href:'mailto:erastussane618@gmail.com'},
                {icon:'📱',label:'+264 81 259 0824',href:'tel:+264812590824'},
                {icon:'💬',label:'Chat on WhatsApp',href:"https://wa.me/264812590824?text=Hi%20Erastus%2C%20I%20found%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project."},
                {icon:'📍',label:'Windhoek, Namibia',href:null},
              ].map(item=>(
                <div key={item.label} style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:18}}>{item.icon}</span>
                  {item.href
                    ? <a href={item.href} style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)',textDecoration:'none',transition:'color 0.2s'}}
                        onMouseEnter={e=>e.target.style.color='var(--cyan)'}
                        onMouseLeave={e=>e.target.style.color='var(--muted)'}>{item.label}</a>
                    : <span style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)'}}>{item.label}</span>
                  }
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:'1px solid var(--border)',paddingTop:24}}>
            <h3 style={{fontSize:14,fontWeight:700,marginBottom:16,fontFamily:'Space Mono',color:'var(--muted)'}}>// Find me online</h3>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              {[{label:'GitHub',href:'https://github.com/LimitlessXOD'},{label:'LinkedIn',href:'https://www.linkedin.com/in/erastus-shalimba'}].map(link=>(
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="btn-secondary" style={{textDecoration:'none',fontSize:12,padding:'8px 20px'}}>{link.label} ↗</a>
              ))}
            </div>
          </div>
          <div style={{background:'rgba(0,229,204,0.06)',border:'1px solid rgba(0,229,204,0.2)',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:'#00e5cc',boxShadow:'0 0 10px rgba(0,229,204,0.8)',animation:'pulse 2s ease-in-out infinite',flexShrink:0}} />
            <div>
              <div style={{fontFamily:'Space Mono',fontSize:11,color:'var(--cyan)',letterSpacing:1}}>AVAILABLE FOR WORK</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>Open to freelance & collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
