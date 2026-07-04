// Minimal stroke-based icon set — kept as inline SVG so no icon font/library
// dependency is needed, and every icon inherits `currentColor`.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" />
    </svg>
  );
}

export function IconController(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h12l2 8.5a2 2 0 0 1-3.4 1.7L14 15h-4l-2.6 3.2A2 2 0 0 1 4 16.5z" />
      <line x1="8" y1="11" x2="8" y2="13" />
      <line x1="7" y1="12" x2="9" y2="12" />
      <circle cx="16" cy="10.5" r="0.6" fill="currentColor" />
      <circle cx="18" cy="12.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconContrast(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSun(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <line x1="12" y1="2.5" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="21.5" />
      <line x1="2.5" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="21.5" y2="12" />
      <line x1="5" y1="5" x2="6.8" y2="6.8" />
      <line x1="17.2" y1="17.2" x2="19" y2="19" />
      <line x1="5" y1="19" x2="6.8" y2="17.2" />
      <line x1="17.2" y1="6.8" x2="19" y2="5" />
    </svg>
  );
}

export function IconMoon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function IconDice(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="8.5" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="0.9" fill="currentColor" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}
