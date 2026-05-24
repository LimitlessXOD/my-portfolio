
export default function Footer() {
  return (
    <footer style={{background:'var(--bg2)',padding:'28px 32px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <img src="/mugensoft-logo.png" alt="MugenSoft" style={{height:24,width:'auto',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />
        <span style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)'}}>MugenSoft — Erastus (Leroy) Shalimba · Built with React + Vite + Supabase</span>
      </div>
      <span style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)'}}>© {new Date().getFullYear()}</span>
    </footer>
  );
}
