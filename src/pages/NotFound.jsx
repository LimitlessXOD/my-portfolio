import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <div
        className="page-enter"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: '120px 32px 80px',
          textAlign: 'center',
        }}
      >
        <p className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: 3 }}>
          // 404
        </p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900 }}>Page not found</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 400, lineHeight: 1.7 }}>
          This route does not exist. Head home or get in touch.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            ← Back Home
          </Link>
          <Link to="/#contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Contact
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
