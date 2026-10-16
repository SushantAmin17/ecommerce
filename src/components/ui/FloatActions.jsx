import { useEffect, useState } from 'react'
import Icon from './Icon'

export default function FloatActions() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="float-actions">
      <a
        href="https://wa.me/917977069466"
        target="_blank"
        rel="noreferrer"
        className="float-btn float-btn--wa"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" size={24} />
      </a>
      <button
        type="button"
        className={`float-btn float-btn--top ${showTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <Icon name="chevron-up" size={20} />
      </button>
    </div>
  )
}
