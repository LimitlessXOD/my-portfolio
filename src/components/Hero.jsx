import React from 'react';
import useTyping from '../hooks/useTyping';

export default function Hero() {
  const role = useTyping(['Full-Stack Developer','AI App Builder','Chess Platform Creator','Freelance Dev','CS Student @ NUST']);
  return (
    <section id="top" className="grid-bg" style={{minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:80}}>
      <div className="orb1" style={{position:'absolute',top:'15%',right:'10%',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,229,204,0.12) 0%,transparent 70%)',pointerEvents:'none'}} />
      <div className="orb2" style={{position:'absolute',bottom:'10%',left:'5%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(79,70,229,0.15) 0%,transparent 70%)',pointerEvents:'none'}} />
      <div style={{maxWidth:900,margin:'0 auto',padding:'0 32px',width:'100%'}}>
        <p className="mono reveal visible" style={{color:'var(--cyan)',fontSize:13,letterSpacing:3,marginBottom:20,opacity:1}}>// Hello, World 👋</p>
        <h1 className="reveal visible" style={{fontSize:'clamp(40px,7vw,80px)',fontWeight:900,lineHeight:1.05,marginBottom:24,opacity:1}}>
          I Build Useful<br /><span className="grad-text">Software</span><br /><span style={{color:'var(--muted)',fontWeight:300}}>& Ship Things</span>
        </h1>
        <p className="mono reveal visible" style={{fontSize:18,marginBottom:12,opacity:1}}>
          <span style={{color:'var(--muted)'}}>$ whoami → </span>
          <span style={{color:'var(--cyan)'}} className="cursor">{role}</span>
        </p>
        <p className="reveal visible" style={{color:'var(--muted)',fontSize:17,maxWidth:520,lineHeight:1.7,marginBottom:40,opacity:1}}>
          Full-stack developer building web apps, AI-powered tools, and desktop software. Based in Windhoek, Namibia — working with clients worldwide.
        </p>
        <div className="reveal visible" style={{display:'flex',gap:12,flexWrap:'wrap',opacity:1}}>
          <a href="#projects" className="btn-primary" style={{textDecoration:'none',display:'inline-block'}}>View Projects →</a>
          <a href="#services" className="btn-secondary" style={{textDecoration:'none',display:'inline-block'}}>Hire Me</a>
          <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-secondary" style={{textDecoration:'none',display:'inline-block'}}>GitHub ↗</a>
          <a href="/mugensoft-cv.pdf" download="Erastus_Shalimba_CV.pdf" className="btn-secondary" style={{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:6}}>↓ CV</a>
        </div>
        <div style={{display:'flex',gap:48,marginTop:64,flexWrap:'wrap'}}>
          {[['3+','Projects Shipped'],['2','Live Products'],['∞','Coffee Consumed']].map(([n,l])=>(
            <div key={l} className="reveal visible" style={{opacity:1}}>
              <div className="grad-text" style={{fontSize:36,fontWeight:900,lineHeight:1}}>{n}</div>
              <div style={{color:'var(--muted)',fontSize:13,marginTop:4,fontFamily:'Space Mono'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <span style={{color:'var(--muted)',fontFamily:'Space Mono',fontSize:10,letterSpacing:2}}>SCROLL</span>
        <div style={{width:1,height:48,background:'linear-gradient(to bottom,var(--cyan),transparent)',animation:'float 2s ease-in-out infinite'}} />
      </div>
    </section>
  );
}
