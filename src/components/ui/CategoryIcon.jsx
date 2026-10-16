// Line-art icons for product categories.
const shapes = {
  iphone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
      <line x1="10.5" y1="18.6" x2="13.5" y2="18.6" />
    </>
  ),
  samsung: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3.2" />
      <circle cx="12" cy="18.4" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  oneplus: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
      <path d="M12 7.5v6M9 10.5h6" />
    </>
  ),
  glass: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 6l6 12" opacity="0.5" />
    </>
  ),
  battery: (
    <>
      <rect x="4" y="7" width="15" height="10" rx="2" />
      <line x1="21" y1="10" x2="21" y2="14" />
      <path d="M11 9l-2 3.2h2.4L9.4 15" />
    </>
  ),
  camera: (
    <>
      <rect x="3.5" y="6.5" width="17" height="12" rx="2.5" />
      <circle cx="12" cy="12.5" r="3.4" />
      <path d="M8 6.5l1.4-2h5.2L16 6.5" />
    </>
  ),
  fashion: (
    <>
      <path d="M6 9h12l-1 11a1.5 1.5 0 0 1-1.5 1.4H8.5A1.5 1.5 0 0 1 7 20L6 9Z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
    </>
  ),
}

export default function CategoryIcon({ kind = 'iphone', size = 26, className = '' }) {
  return (
    <svg
      className={`cat-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[kind] ?? shapes.iphone}
    </svg>
  )
}
