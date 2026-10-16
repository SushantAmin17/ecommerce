import { useEffect, useState } from 'react'
import { announcements } from '../../data/site'
import Icon from '../ui/Icon'

export default function AnnouncementBar() {
  const [i, setI] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setInterval(
      () => setI((n) => (n + 1) % announcements.length),
      4200,
    )
    return () => clearInterval(t)
  }, [])

  if (hidden) return null

  return (
    <div className="announce">
      <div className="announce__inner container container--wide">
        <span className="announce__dot" aria-hidden="true" />
        {/* key forces the fade-in animation to replay on each change */}
        <p className="announce__item" key={i} aria-live="polite">
          {announcements[i]}
        </p>
        <button
          type="button"
          className="announce__close"
          onClick={() => setHidden(true)}
          aria-label="Dismiss announcement"
        >
          <Icon name="close" size={14} />
        </button>
      </div>
    </div>
  )
}
