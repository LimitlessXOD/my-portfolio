import useCountUp from '../hooks/useCountUp';

function CountUpInner({ end, suffix, className, style }) {
  const { ref, value } = useCountUp(end, { suffix });
  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}

export default function CountUpStat({ stat, className, style }) {
  if (stat === '∞') {
    return <span className={className} style={style}>∞</span>;
  }

  const match = String(stat).match(/^(\d+)(.*)$/);
  if (!match) {
    return <span className={className} style={style}>{stat}</span>;
  }

  return (
    <CountUpInner
      end={parseInt(match[1], 10)}
      suffix={match[2] || ''}
      className={className}
      style={style}
    />
  );
}
