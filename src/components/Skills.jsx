import { useState, useEffect, useRef } from 'react';
import { skillGroups } from '../data/portfolioData';

function SkillBar({ name, pct, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(pct), delay); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);
  return (
    <div ref={ref} style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:500}}>{name}</span>
        <span style={{fontFamily:'Space Mono',fontSize:11,color:'var(--cyan)'}}>{pct}%</span>
      </div>
      <div style={{height:4,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
        <div className="skill-bar-fill" style={{height:'100%',width:`${width}%`,background:'linear-gradient(90deg,var(--cyan),#6366f1)',borderRadius:2,transition:'width 1s cubic-bezier(0.4,0,0.2,1)'}} />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{background:'var(--bg2)',padding:'100px 0'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'0 32px'}}>
        <p className="section-label reveal">02. Skills</p>
        <h2 className="reveal" style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,marginBottom:12}}>Tech Stack</h2>
        <p className="reveal delay-1" style={{color:'var(--muted)',marginBottom:48}}>Tools and technologies I work with every day</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:24}}>
          {skillGroups.map((group,gi)=>(
            <div key={group.cat} className={`card reveal delay-${gi+1}`} style={{padding:24}}>
              <div style={{fontFamily:'Space Mono',fontSize:11,color:group.color,letterSpacing:2,marginBottom:20}}>{group.cat.toUpperCase()}</div>
              {group.skills.map((s,si)=>(
                <SkillBar key={s.n} name={s.n} pct={s.p} delay={si*100} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
