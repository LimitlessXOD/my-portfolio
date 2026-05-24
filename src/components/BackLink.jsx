import { useNavigateBack } from '../hooks/useNavigateBack';

/**
 * Back navigation that preserves scroll via history (-1) or saved position on fallback.
 */
export default function BackLink({ to = '/', children, style, className, onMouseEnter, onMouseLeave }) {
  const goBack = useNavigateBack(to);

  return (
    <a
      href={to}
      className={className}
      style={style}
      onClick={goBack}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
