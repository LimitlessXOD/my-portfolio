import { servicesList } from '../data/portfolioData';

const WA_SVG = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Services() {
  const WA = s => `https://wa.me/264812590824?text=Hi%20Erastus!%20I'm%20interested%20in%20your%20*${encodeURIComponent(s)}*%20service.%20Here%20are%20my%20project%20details%3A%20`;
  return (
    <section id="services" style={{background:'var(--bg2)',padding:'100px 0'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'0 32px'}}>
        <p className="section-label reveal">04. Services</p>
        <h2 className="reveal" style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,marginBottom:12}}>What MugenSoft Builds</h2>
        <p className="reveal delay-1" style={{color:'var(--muted)',marginBottom:48}}>Available for freelance. Let's build something useful together.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
          {servicesList.map((s,i)=>(
            <div key={s.title} className={`card reveal delay-${(i%4)+1}`} style={{padding:28,display:'flex',flexDirection:'column'}}>
              <div className="service-icon">{s.icon}</div>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>{s.title}</h3>
              <p style={{color:'var(--muted)',fontSize:14,lineHeight:1.6,marginBottom:16,flex:1}}>{s.desc}</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginTop:'auto'}}>
                <div style={{fontFamily:'Space Mono',fontSize:12,color:'var(--cyan)'}}>{s.price}</div>
                <a href={WA(s.title)} target="_blank" rel="noreferrer"
                  style={{display:'inline-flex',alignItems:'center',gap:6,fontFamily:'Space Mono',fontSize:11,color:'#111',background:'#25D366',padding:'6px 14px',borderRadius:8,textDecoration:'none',transition:'opacity 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  {WA_SVG} Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{textAlign:'center',marginTop:48}}>
          <a href="#contact" className="btn-primary" style={{textDecoration:'none',display:'inline-block',padding:'14px 40px',fontSize:14}}>Let's Work Together →</a>
        </div>
      </div>
    </section>
  );
}
