// Inline SVG icon set — stroke-based, inherits currentColor.
// Usage: <Icon name="cart" size={20} />
const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-9.2-8.3C1.2 8.6 2.7 5.5 5.8 5.5c1.9 0 3.2 1.1 4.2 2.4 1-1.3 2.3-2.4 4.2-2.4 3.1 0 4.6 3.1 3 6.2C19 15.6 12 20 12 20Z" />
  ),
  'heart-filled': (
    <path
      d="M12 20s-7-4.4-9.2-8.3C1.2 8.6 2.7 5.5 5.8 5.5c1.9 0 3.2 1.1 4.2 2.4 1-1.3 2.3-2.4 4.2-2.4 3.1 0 4.6 3.1 3 6.2C19 15.6 12 20 12 20Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  cart: (
    <>
      <path d="M5 6h15l-1.5 9.5a2 2 0 0 1-2 1.7H9a2 2 0 0 1-2-1.7L5 4H2.5" />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.4h-8A1.5 1.5 0 0 1 6 19.5L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-up': <path d="m6 15 6-6 6 6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'arrow-right': (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.4h7a1.5 1.5 0 0 0 1.5-1.4L18 7" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z" />
  ),
  'star-filled': (
    <path
      d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </>
  ),
  ship: (
    <>
      <path d="M3 7h10v8H3z" />
      <path d="M13 10h4l3 3v2h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h11" />
      <circle cx="16.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  return: (
    <>
      <path d="M4 9a8 8 0 1 1-1.3 4.5" />
      <path d="M4 4v5h5" />
    </>
  ),
  support: (
    <>
      <path d="M5 13a7 7 0 0 1 14 0" />
      <path d="M3 13.5h3V18H4.5A1.5 1.5 0 0 1 3 16.5Z" />
      <path d="M21 13.5h-3V18h1.5A1.5 1.5 0 0 0 21 16.5Z" />
      <path d="M18 18v.6a2.4 2.4 0 0 1-2.4 2.4H12" />
    </>
  ),
  shield: (
    <path d="M12 3l7 2.5v5.5c0 4.3-3 7.8-7 9-4-1.2-7-4.7-7-9V5.5L12 3Z" />
  ),
  sparkle: (
    <path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z" />
  ),
  truck: (
    <>
      <rect x="3" y="7" width="11" height="9" rx="1" />
      <path d="M14 10h3.5L21 13v3h-7z" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 5 5l1.5-2L21 17v3a1.5 1.5 0 0 1-1.6 1.5C10.6 20.8 3.2 13.4 2.5 4.6A1.5 1.5 0 0 1 4 3Z" />
  ),
  pin: (
    <>
      <path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 3 6.5 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  quote: (
    <path
      d="M9 7c-2.6 0-4.5 2-4.5 4.8 0 2.5 1.7 4.2 3.9 4.2 1.9 0 3-1.3 3-3 0-1.6-1-2.8-2.6-2.8h-.6c.2-1.2 1.2-2.1 2.6-2.4L9 7Zm9 0c-2.6 0-4.5 2-4.5 4.8 0 2.5 1.7 4.2 3.9 4.2 1.9 0 3-1.3 3-3 0-1.6-1-2.8-2.6-2.8h-.6c.2-1.2 1.2-2.1 2.6-2.4L18 7Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  whatsapp: (
    <path
      d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm4.3 12.5c-.2.5-1.1 1-1.5 1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.4-.5-2.4-1-4-3.5-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.3.5-.3.7-.3h.5c.1 0 .3 0 .5.4l.7 1.6c.1.1.1.3 0 .5l-.3.5c-.1.2-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.5.7c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  logout: (
    <>
      <path d="M14 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 12H3" />
      <path d="m6 8-4 4 4 4" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
      <path d="m4 7 8 4 8-4" />
      <path d="M12 11v10" />
    </>
  ),
  tag: (
    <>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
}

export default function Icon({ name, size = 22, strokeWidth = 1.6, className = '', ...rest }) {
  const content = paths[name]
  if (!content) return null
  return (
    <svg
      className={`icon icon--${name} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {content}
    </svg>
  )
}
