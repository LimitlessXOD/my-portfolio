const VARIANTS = {
  nav: { height: 42, maxWidth: 180 },
  hero: { height: 52, maxWidth: 220 },
  loader: { height: 128, maxWidth: 320 },
  footer: { height: 40, maxWidth: 160 },
  compact: { height: 32, maxWidth: 120 },
};

export default function Logo({ variant = 'nav', className = '', style = {} }) {
  const size = VARIANTS[variant] || VARIANTS.nav;

  return (
    <img
      src="/mugensoft-logo.png"
      alt="MugenSoft Developer Studio"
      className={className}
      style={{
        height: size.height,
        maxWidth: size.maxWidth,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        ...style,
      }}
      draggable={false}
    />
  );
}
