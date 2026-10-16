import { useState } from 'react'

/**
 * Brand logo. If a real logo file exists at /logo.png it is used automatically;
 * otherwise a crafted navy + gold SVG badge is rendered so the UI always has a
 * polished mark. Drop your circular logo in `public/logo.png` to swap it in.
 */
export default function Logo({
  variant = 'dark', // 'dark' = for light backgrounds, 'light' = for navy backgrounds
  showWordmark = true,
  size = 54,
  className = '',
}) {
  const [imgOk, setImgOk] = useState(true)
  const light = variant === 'light'
  const ink = light ? '#F4F1EA' : '#1C335A'
  const sub = light ? 'rgba(244,241,234,0.7)' : 'rgba(28,51,90,0.55)'
  const uid = 'logo'

  return (
    <span className={`logo ${className}`} aria-label="Case Solutions 4U home">
      <span className="logo__badge" style={{ width: size, height: size }}>
        {imgOk ? (
          <img
            src="/logo.png"
            alt="Case Solutions 4U"
            width={size}
            height={size}
            onError={() => setImgOk(false)}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Case Solutions 4U">
            <defs>
              <path id={`${uid}-top`} d="M50,50 m-37,0 a37,37 0 1,1 74,0" />
              <path id={`${uid}-bot`} d="M50,50 m37,0 a37,37 0 1,1 -74,0" />
            </defs>
            <circle cx="50" cy="50" r="49" fill="#1C335A" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#B9A16A" strokeWidth="1" opacity="0.8" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#B9A16A" strokeWidth="0.8" opacity="0.5" />
            <text
              fill="#B9A16A"
              fontFamily="'Manrope', sans-serif"
              fontSize="9.2"
              fontWeight="600"
              letterSpacing="3.1"
            >
              <textPath href={`#${uid}-top`} startOffset="50%" textAnchor="middle">
                CASE SOLUTIONS
              </textPath>
            </text>
            <text
              fill="#B9A16A"
              fontFamily="'Manrope', sans-serif"
              fontSize="8"
              fontWeight="600"
              letterSpacing="4"
            >
              <textPath href={`#${uid}-bot`} startOffset="50%" textAnchor="middle">
                EST · INDIA
              </textPath>
            </text>
            {/* Center monogram */}
            <text
              x="50"
              y="54"
              textAnchor="middle"
              fontFamily="'Fraunces', Georgia, serif"
              fontSize="24"
              fontStyle="italic"
              fontWeight="500"
              fill="#F4F1EA"
            >
              cs
            </text>
            <text
              x="50"
              y="66"
              textAnchor="middle"
              fontFamily="'Manrope', sans-serif"
              fontSize="7"
              fontWeight="700"
              letterSpacing="2"
              fill="#B9A16A"
            >
              4U
            </text>
            <circle cx="16.5" cy="50" r="1.4" fill="#B9A16A" />
            <circle cx="83.5" cy="50" r="1.4" fill="#B9A16A" />
          </svg>
        )}
      </span>
      {showWordmark && (
        <span className="logo__wordmark">
          <span className="logo__name" style={{ color: ink }}>
            Case Solutions
          </span>
          <span className="logo__sub" style={{ color: sub }}>
            4U · Phone Atelier
          </span>
        </span>
      )}
    </span>
  )
}
