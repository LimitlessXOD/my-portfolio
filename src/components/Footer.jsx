import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer style={{background:'var(--bg2)',padding:'28px 32px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
      <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <Link to="/" style={{textDecoration:'none',flexShrink:0}} aria-label="MugenSoft home">
          <Logo variant="footer" />
        </Link>
        <span style={{fontFamily:'Space Mono',fontSize:11,color:'var(--muted)',lineHeight:1.5}}>
          Erastus (Leroy) Shalimba · React + Vite + Supabase
        </span>
      </div>
      <span style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)'}}>© {new Date().getFullYear()}</span>
    </footer>
  );
}
