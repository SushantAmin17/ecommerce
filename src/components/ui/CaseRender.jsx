// CaseRender — a crafted SVG "studio render" of a phone case.
// Back-of-device view with a top-left camera island, a wrap-around case lip
// and glassy lenses so previews read as real cases. `style` chooses the
// material/silhouette; `accent` is the colourway. Deterministic per id.
import { useId } from 'react'

// Phone/case body geometry (viewBox is 320 x 400).
const PHONE = { x: 98, y: 42, w: 124, h: 316, rx: 42 }

// Camera island, anchored to the top-left corner — the key "iPhone" cue.
const CAM = { x: 112, y: 58, s: 92, rx: 28 }

function Lens({ cx, cy, r = 15 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 2} fill="rgba(0,0,0,0.25)" />
      <circle cx={cx} cy={cy} r={r} fill="#0d1219" />
      <circle cx={cx} cy={cy} r={r * 0.74} fill="url(#cr-lens)" />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="#070a10" />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.32} r={r * 0.16} fill="rgba(255,255,255,0.8)" />
    </g>
  )
}

// Camera module: raised island + three lenses + flash.
function Lenses({ dark = 'rgba(0,0,0,0.26)', ring }) {
  return (
    <g>
      {/* case cutout around the island */}
      <rect
        x={CAM.x - 4}
        y={CAM.y - 4}
        width={CAM.s + 8}
        height={CAM.s + 8}
        rx={CAM.rx + 4}
        fill="rgba(0,0,0,0.10)"
      />
      {/* raised island */}
      <rect x={CAM.x} y={CAM.y} width={CAM.s} height={CAM.s} rx={CAM.rx} fill={dark} />
      <rect
        x={CAM.x}
        y={CAM.y}
        width={CAM.s}
        height={CAM.s}
        rx={CAM.rx}
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.5"
      />
      <Lens cx={CAM.x + 28} cy={CAM.y + 30} />
      <Lens cx={CAM.x + 64} cy={CAM.y + 30} />
      <Lens cx={CAM.x + 28} cy={CAM.y + 66} />
      {/* flash */}
      <circle cx={CAM.x + 64} cy={CAM.y + 66} r="8" fill="#f6efd8" />
      <circle cx={CAM.x + 64} cy={CAM.y + 66} r="3.4" fill="#cfc097" />
      {ring && (
        <>
          <circle cx={CAM.x + 28} cy={CAM.y + 30} r="18" fill="none" stroke="#c9b27e" strokeWidth="3" />
          <circle cx={CAM.x + 64} cy={CAM.y + 30} r="18" fill="none" stroke="#c9b27e" strokeWidth="3" />
          <circle cx={CAM.x + 28} cy={CAM.y + 66} r="18" fill="none" stroke="#c9b27e" strokeWidth="3" />
        </>
      )}
    </g>
  )
}

// A button cover bump on the case edge.
function Button({ x, y, h }) {
  return (
    <g>
      <rect x={x} y={y} width="4" height={h} rx="2" fill="rgba(0,0,0,0.22)" />
      <rect x={x + 1} y={y + 2} width="1.6" height={h - 4} rx="0.8" fill="rgba(255,255,255,0.18)" />
    </g>
  )
}

function Phone({ fill, children, shine = true }) {
  return (
    <g>
      {/* button covers (case wraps the sides) */}
      <Button x={PHONE.x - 4} y={PHONE.y + 92} h={30} />
      <Button x={PHONE.x - 4} y={PHONE.y + 130} h={30} />
      <Button x={PHONE.x + PHONE.w} y={PHONE.y + 104} h={48} />

      {/* case body */}
      <rect x={PHONE.x} y={PHONE.y} width={PHONE.w} height={PHONE.h} rx={PHONE.rx} fill={fill} />

      {/* curvature + top sheen */}
      <rect
        x={PHONE.x}
        y={PHONE.y}
        width={PHONE.w}
        height={PHONE.h}
        rx={PHONE.rx}
        fill="url(#cr-body)"
      />
      {/* raised edge highlight (left) */}
      <rect x={PHONE.x} y={PHONE.y} width="16" height={PHONE.h} rx={PHONE.rx} fill="url(#cr-edge)" opacity="0.55" />
      {/* case lip — inner rim */}
      <rect
        x={PHONE.x + 4.5}
        y={PHONE.y + 4.5}
        width={PHONE.w - 9}
        height={PHONE.h - 9}
        rx={PHONE.rx - 4}
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.5"
      />
      <rect
        x={PHONE.x + 1.5}
        y={PHONE.y + 1.5}
        width={PHONE.w - 3}
        height={PHONE.h - 3}
        rx={PHONE.rx - 1.5}
        fill="none"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1.5"
      />

      {children}

      {shine && (
        <rect
          x={PHONE.x + 12}
          y={PHONE.y + 12}
          width="26"
          height={PHONE.h - 24}
          rx="13"
          fill="url(#cr-shine)"
          opacity="0.4"
        />
      )}
    </g>
  )
}

export default function CaseRender({
  style = 'silicone',
  accent = '#223a63',
  className = '',
}) {
  const uid = useId().replace(/:/g, '')
  const darkOverlay = 'rgba(0,0,0,0.24)'

  let body = null

  switch (style) {
    case 'leather':
      body = (
        <Phone fill={accent} shine={false}>
          {/* grain */}
          {[...Array(11)].map((_, i) => (
            <line
              key={i}
              x1={PHONE.x + 10}
              x2={PHONE.x + PHONE.w - 10}
              y1={PHONE.y + 168 + i * 15}
              y2={PHONE.y + 168 + i * 15}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          {/* stitching */}
          <rect
            x={PHONE.x + 10}
            y={PHONE.y + 10}
            width={PHONE.w - 20}
            height={PHONE.h - 20}
            rx={PHONE.rx - 8}
            fill="none"
            stroke="rgba(244,231,192,0.45)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <Lenses dark="#1a1209" />
        </Phone>
      )
      break

    case 'clear':
      body = (
        <Phone fill={`url(#${uid}-clear)`} shine>
          {/* MagSafe ring (centred) */}
          <circle cx={PHONE.x + PHONE.w / 2} cy="226" r="34" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="2 4" />
          <circle cx={PHONE.x + PHONE.w / 2} cy="226" r="10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <Lenses dark="rgba(20,30,50,0.42)" />
        </Phone>
      )
      break

    case 'diamond':
      body = (
        <Phone fill={accent} shine={false}>
          <rect
            x={PHONE.x + 6}
            y={PHONE.y + 6}
            width={PHONE.w - 12}
            height={PHONE.h - 12}
            rx={PHONE.rx - 4}
            fill={`url(#${uid}-diamond)`}
          />
          <Lenses dark={darkOverlay} />
        </Phone>
      )
      break

    case 'carbon':
      body = (
        <Phone fill={accent} shine>
          <rect
            x={PHONE.x}
            y={PHONE.y}
            width={PHONE.w}
            height={PHONE.h}
            rx={PHONE.rx}
            fill={`url(#${uid}-carbon)`}
          />
          <Lenses dark="#0b0d11" />
        </Phone>
      )
      break

    case 'print':
      body = (
        <Phone fill={accent} shine>
          <rect
            x={PHONE.x}
            y={PHONE.y}
            width={PHONE.w}
            height={PHONE.h}
            rx={PHONE.rx}
            fill={`url(#${uid}-leopard)`}
          />
          <Lenses dark={darkOverlay} />
        </Phone>
      )
      break

    case 'wallet':
      body = (
        <Phone fill={accent} shine={false}>
          {/* folio flap */}
          <rect x={PHONE.x} y={PHONE.y + 120} width={PHONE.w} height={PHONE.h - 120} rx={PHONE.rx - 8} fill="rgba(0,0,0,0.16)" />
          <rect x={PHONE.x + 12} y={PHONE.y + 140} width={PHONE.w - 24} height="40" rx="6" fill="rgba(255,255,255,0.08)" />
          {/* card slot */}
          <rect x={PHONE.x + 12} y={PHONE.y + 190} width={PHONE.w - 24} height="34" rx="6" fill="rgba(255,255,255,0.06)" />
          {/* clasp */}
          <rect x={PHONE.x + PHONE.w / 2 - 14} y={PHONE.y + 238} width="28" height="18" rx="4" fill="#c9b27e" />
          <rect x={PHONE.x + PHONE.w / 2 - 10} y={PHONE.y + 242} width="20" height="10" rx="2" fill={accent} />
          <Lenses dark={darkOverlay} />
        </Phone>
      )
      break

    case 'lanyard':
      body = (
        <Phone fill={accent} shine>
          <path
            d={`M${PHONE.x + 24} ${PHONE.y + 14} Q${PHONE.x - 28} ${PHONE.y - 36} ${PHONE.x + PHONE.w / 2} ${PHONE.y - 38} Q${PHONE.x + PHONE.w + 28} ${PHONE.y - 36} ${PHONE.x + PHONE.w - 24} ${PHONE.y + 14}`}
            fill="none"
            stroke={`url(#${uid}-cord)`}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx={PHONE.x + 24} cy={PHONE.y + 14} r="5" fill="#c9b27e" />
          <circle cx={PHONE.x + PHONE.w - 24} cy={PHONE.y + 14} r="5" fill="#c9b27e" />
          <Lenses dark={darkOverlay} />
        </Phone>
      )
      break

    case 'matte':
      body = (
        <Phone fill={accent} shine={false}>
          <rect
            x={PHONE.x}
            y={PHONE.y}
            width={PHONE.w}
            height={PHONE.h}
            rx={PHONE.rx}
            fill="rgba(255,255,255,0.04)"
          />
          <Lenses dark={darkOverlay} />
        </Phone>
      )
      break

    case 'ring':
      body = (
        <Phone fill={accent === '#b9a16a' ? '#2b2f36' : accent} shine>
          <Lenses dark="rgba(0,0,0,0.3)" ring />
        </Phone>
      )
      break

    case 'powerbank':
      body = (
        <g>
          <rect x="96" y="70" width="128" height="256" rx="26" fill={accent} />
          <rect x="96" y="70" width="40" height="256" rx="26" fill="url(#cr-shine)" opacity="0.35" />
          {/* digital display */}
          <rect x="120" y="104" width="80" height="48" rx="8" fill="#0d1526" />
          <text x="160" y="138" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="26" fontWeight="700" fill="#7fe0a8">88%</text>
          {/* ports / cable */}
          <rect x="128" y="176" width="64" height="10" rx="5" fill="rgba(255,255,255,0.18)" />
          <path d="M150 196 q-34 10 -34 44 q0 26 22 26" fill="none" stroke="#c9b27e" strokeWidth="6" strokeLinecap="round" />
          <rect x="132" y="262" width="16" height="22" rx="3" fill="#c9b27e" />
          <circle cx="178" cy="214" r="4" fill="rgba(255,255,255,0.5)" />
          <circle cx="192" cy="214" r="4" fill="rgba(255,255,255,0.25)" />
        </g>
      )
      break

    case 'glass':
      body = (
        <g>
          <rect x="112" y="52" width="96" height="296" rx="24" fill={`url(#${uid}-glass)`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <path d="M126 70 L150 70 L126 330 L112 300 Z" fill="rgba(255,255,255,0.35)" opacity="0.6" />
          <path d="M176 70 L196 70 L160 330 L146 330 Z" fill="rgba(255,255,255,0.18)" />
          <circle cx="160" cy="200" r="30" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5" />
          <rect x="132" y="58" width="56" height="12" rx="6" fill="rgba(13,21,38,0.35)" />
        </g>
      )
      break

    case 'airpods':
      body = (
        <g>
          <rect x="112" y="150" width="96" height="120" rx="40" fill={accent} />
          <rect x="112" y="150" width="30" height="120" rx="40" fill="url(#cr-shine)" opacity="0.4" />
          <path d="M112 196 q48 -22 96 0" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" />
          <circle cx="160" cy="176" r="3.6" fill="#7fe0a8" />
          <rect x="146" y="256" width="28" height="7" rx="3.5" fill="rgba(255,255,255,0.2)" />
          {/* carabiner */}
          <path d="M160 150 q0 -40 26 -40 q24 0 24 26" fill="none" stroke="#c9b27e" strokeWidth="6" strokeLinecap="round" />
        </g>
      )
      break

    case 'silicone':
    default:
      body = (
        <Phone fill={accent} shine>
          <Lenses dark={darkOverlay} />
        </Phone>
      )
  }

  return (
    <svg
      className={`case-render ${className}`}
      viewBox="0 0 320 400"
      role="img"
      aria-label={`${style} phone case product render`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cr-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cr-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cr-body" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id="cr-lens" cx="38%" cy="34%" r="72%">
          <stop offset="0" stopColor="#4a5d79" />
          <stop offset="0.5" stopColor="#1b2740" />
          <stop offset="1" stopColor="#0a0f18" />
        </radialGradient>
        <linearGradient id={`${uid}-clear`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor={accent} stopOpacity="0.18" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="1" stopColor={accent} stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`${uid}-cord`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor="#c9b27e" />
        </linearGradient>
        <pattern id={`${uid}-carbon`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="12" height="12" fill="rgba(0,0,0,0)" />
          <rect width="6" height="6" fill="rgba(255,255,255,0.06)" />
          <rect x="6" y="6" width="6" height="6" fill="rgba(255,255,255,0.06)" />
        </pattern>
        <pattern id={`${uid}-diamond`} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="rgba(255,255,255,0.04)" />
          <rect x="4" y="4" width="8" height="8" rx="1.5" transform="rotate(45 8 8)" fill="rgba(255,255,255,0.45)" />
        </pattern>
        <pattern id={`${uid}-leopard`} width="34" height="34" patternUnits="userSpaceOnUse">
          <rect width="34" height="34" fill="rgba(0,0,0,0)" />
          <circle cx="9" cy="9" r="5" fill="rgba(60,40,20,0.55)" />
          <circle cx="26" cy="22" r="5.5" fill="rgba(60,40,20,0.55)" />
          <circle cx="9" cy="9" r="2" fill="rgba(20,12,4,0.5)" />
          <circle cx="26" cy="22" r="2.2" fill="rgba(20,12,4,0.5)" />
        </pattern>
        <filter id="cr-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <ellipse cx="160" cy="378" rx="78" ry="12" fill="rgba(15,30,58,0.16)" filter="url(#cr-blur)" />
      {body}
    </svg>
  )
}
