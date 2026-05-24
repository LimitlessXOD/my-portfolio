import React from 'react';
import { nowBuildingItems } from '../data/portfolioData';

export default function NowBuilding() {
  return (
    <section id="now" style={{maxWidth:900,margin:'0 auto',padding:'100px 32px'}}>
      <p className="section-label reveal">05. Now</p>
      <h2 className="reveal" style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,marginBottom:8}}>Currently Building</h2>
      <p className="reveal delay-1" style={{color:'var(--muted)',marginBottom:48}}>What I'm actively working on — updated regularly.</p>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {nowBuildingItems.map((item,i)=>(
          <div key={i} className={`card reveal delay-${i+1}`} style={{padding:'20px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:item.color,boxShadow:`0 0 10px ${item.color}80`,flexShrink:0,animation:item.status==='In Progress'?'pulse 2s ease-in-out infinite':'none'}} />
              <span style={{fontSize:15,fontWeight:500}}>{item.label}</span>
            </div>
            <span style={{fontFamily:'Space Mono',fontSize:10,padding:'3px 12px',borderRadius:99,border:`1px solid ${item.color}40`,color:item.color,letterSpacing:1,flexShrink:0}}>{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
