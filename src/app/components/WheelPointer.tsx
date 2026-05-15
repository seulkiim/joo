export default function WheelPointer() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-10"
      style={{ top: -10 }}
    >
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" />
        </filter>
        <polygon
          points="18,44 2,4 34,4"
          fill="#ffd700"
          stroke="#7a5c00"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        <polygon
          points="18,44 2,4 34,4"
          fill="url(#pointerGrad)"
        />
        <defs>
          <linearGradient id="pointerGrad" x1="18" y1="4" x2="18" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe066" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
