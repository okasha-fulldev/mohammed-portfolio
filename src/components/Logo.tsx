type Props = { className?: string };

/** Interlocking "MM" monogram — two M strokes sharing the middle valley. */
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 48"
      className={className}
      role="img"
      aria-label="Mohammed Masoud"
      fill="none"
    >
      <defs>
        <linearGradient id="mm-gold" x1="0" y1="0" x2="64" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f3c98d" />
          <stop offset="0.55" stopColor="#e7a55a" />
          <stop offset="1" stopColor="#b9773a" />
        </linearGradient>
      </defs>
      {/* first M */}
      <path
        d="M4 44V6l16 22L36 6v38"
        stroke="url(#mm-gold)"
        strokeWidth="5"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      {/* second M, offset and thinner, interlocking */}
      <path
        d="M28 44V14l14 19 14-19v30"
        stroke="#e9edf6"
        strokeOpacity="0.9"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  );
}
