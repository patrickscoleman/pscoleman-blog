export function Arrow({
  external = false,
  direction = 'right',
}: {
  external?: boolean;
  direction?: 'left' | 'right';
}) {
  return (
    <svg
      className={`arrow${external ? ' arrow-external' : direction === 'left' ? ' arrow-left' : ''}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      {external ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : direction === 'left' ? (
        <path d="M20 12H4m6-6-6 6 6 6" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
