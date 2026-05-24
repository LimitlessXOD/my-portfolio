import { timelineItems } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" style={{background:'var(--bg)',padding:'100px 0'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'0 32px'}}>
      <p className="section-label reveal">01. About</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:64,alignItems:'center'}}>
        <div>
          <h2 className="reveal" style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,lineHeight:1.2,marginBottom:24}}>
            The Dev Behind<br /><span className="grad-text">MugenSoft</span>
          </h2>
          <p className="reveal delay-1" style={{color:'var(--muted)',lineHeight:1.8,marginBottom:16}}>
            I'm Erastus (Leroy) Shalimba — a Computer Science (Cyber Security) student at NUST Namibia, enrolled since 2025. I build real software products and ship things that actually work.
          </p>
          <p className="reveal delay-2" style={{color:'var(--muted)',lineHeight:1.8,marginBottom:16}}>
            I've shipped a multiplayer chess platform, a desktop media tool, and full-stack web apps. My focus is on writing software that solves real problems — not just demo projects.
          </p>
          <p className="reveal delay-3" style={{color:'var(--muted)',lineHeight:1.8}}>
            Currently exploring AI integrations, scalable SaaS, and open to freelance work, collaborations, and internships.
          </p>
          <div className="reveal delay-3" style={{marginTop:28,display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="https://github.com/LimitlessXOD" target="_blank" rel="noreferrer" className="btn-primary" style={{textDecoration:'none',fontSize:12,padding:'8px 20px'}}>GitHub ↗</a>
            <a href="https://www.linkedin.com/in/erastus-shalimba" target="_blank" rel="noreferrer" className="btn-secondary" style={{textDecoration:'none',fontSize:12,padding:'8px 20px'}}>LinkedIn ↗</a>
          </div>
        </div>
        <div className="reveal-right" style={{display:'flex',flexDirection:'column',gap:20}}>
          {timelineItems.map((item,i)=>(
            <div key={i} className={`timeline-item reveal-left delay-${i+1}`}>
              <div className="timeline-dot" />
              <div style={{fontFamily:'Space Mono',fontSize:11,color:'var(--cyan)',marginBottom:4}}>{item.year}</div>
              <div style={{fontWeight:600,fontSize:15,marginBottom:2}}>{item.label}</div>
              <div style={{color:'var(--muted)',fontSize:13}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
