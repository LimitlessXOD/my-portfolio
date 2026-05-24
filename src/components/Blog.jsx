import React from 'react';
import { Link } from 'react-router-dom';
import { blogPostsList } from '../data/portfolioData';

export default function Blog() {
  return (
    <section id="blog" style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <p className="section-label reveal">07. Blog</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, marginBottom: 8 }}>Things I've Learned</h2>
        <p className="reveal delay-1" style={{ color: 'var(--muted)', marginBottom: 48 }}>Writing about building, shipping and growing as a dev.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {blogPostsList.map((p, i) => (
            <Link
              key={i}
              to={`/blog/${p.slug}`}
              className={`card reveal delay-${i + 1}`}
              style={{
                padding: '28px 32px', display: 'flex', gap: 24,
                alignItems: 'flex-start', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
                textDecoration: 'none', color: 'inherit',
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: p.color, borderRadius: '16px 0 0 16px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 10, padding: '3px 10px', borderRadius: 99, border: `1px solid ${p.color}40`, color: p.color }}>{p.tag}</span>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted)' }}>{p.date} · {p.mins} min read</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
              <div style={{ color: p.color, fontSize: 20, flexShrink: 0, marginTop: 4 }}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
