import { useState } from 'react'

/**
 * <img> with a graceful, on-brand fallback. If the source fails to load
 * (offline, blocked, bad URL) it degrades to an elegant navy→gold gradient
 * panel instead of a broken-image icon — so layouts never break.
 */
export default function SmartImage({
  src,
  alt = '',
  tone = 'navy', // navy | gold | ivory
  ratio,
  className = '',
  caption,
  loading = 'lazy',
  ...rest
}) {
  const [failed, setFailed] = useState(!src)
  const style = ratio ? { aspectRatio: ratio } : undefined

  return (
    <span className={`smart-img smart-img--${tone} ${className}`} style={style} data-fallback={failed}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          {...rest}
        />
      ) : (
        <span className="smart-img__fallback" role="img" aria-label={alt}>
          <svg viewBox="0 0 120 120" aria-hidden="true" width="64" height="64">
            <rect x="46" y="30" width="28" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="2.4" />
            <rect x="52" y="36" width="10" height="10" rx="3" fill="currentColor" />
          </svg>
          {caption && <span className="smart-img__caption">{caption}</span>}
        </span>
      )}
    </span>
  )
}
