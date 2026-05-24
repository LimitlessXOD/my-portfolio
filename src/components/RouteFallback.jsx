export default function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Space Mono, monospace',
        fontSize: 12,
        color: 'var(--muted)',
        letterSpacing: 2,
      }}
    >
      Loading…
    </div>
  );
}
