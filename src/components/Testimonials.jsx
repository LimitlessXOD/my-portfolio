import { testimonialsList } from '../data/portfolioData';

export default function Testimonials() {
  return (
    <section id="testimonials" style={{background:'var(--bg2)',padding:'100px 0'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'0 32px'}}>
        <p className="section-label reveal">06. Testimonials</p>
        <h2 className="reveal" style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,marginBottom:8}}>What People Say</h2>
        <p className="reveal delay-1" style={{color:'var(--muted)',marginBottom:48}}>Early feedback — more coming as I take on clients.</p>
        <div className="reveal-group" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:24}}>
          {testimonialsList.map((t,i)=>(
            <div key={i} className="card reveal-child" style={{padding:28,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:16,right:20,fontSize:40,color:`${t.color}15`,fontFamily:'Georgia',lineHeight:1}}>"</div>
              <div style={{fontSize:28,marginBottom:16,color:t.color,opacity:0.7}}>★★★★★</div>
              <p style={{color:'var(--muted)',fontSize:14,lineHeight:1.7,marginBottom:24,fontStyle:'italic'}}>"{t.text}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:`${t.color}20`,border:`1px solid ${t.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Space Mono',fontSize:11,color:t.color,fontWeight:700}}>{t.avatar}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{t.name}</div>
                  <div style={{color:'var(--muted)',fontSize:12,fontFamily:'Space Mono'}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="reveal" style={{color:'var(--muted)',fontFamily:'Space Mono',fontSize:11,textAlign:'center',marginTop:32}}>
          // Placeholder testimonials — real ones coming soon.
        </p>
      </div>
    </section>
  );
}
