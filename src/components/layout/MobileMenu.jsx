import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { primaryNav, brand } from '../../data/site'
import { categories } from '../../data/categories'

export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  const go = (to) => {
    onClose()
    navigate(to)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    go(`/search?q=${encodeURIComponent(q.trim())}`)
    setQ('')
  }

  return (
    <>
      <div className={`drawer-scrim ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__head">
          <Logo size={40} />
          <button type="button" className="header__icon" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={22} />
          </button>
        </div>

        <form className="mobile-menu__search" onSubmit={submit}>
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          {primaryNav.map((item) =>
            item.columns ? (
              <div key={item.label} className="mobile-menu__group">
                <button
                  type="button"
                  className={`mobile-menu__toggle ${expanded === item.label ? 'is-open' : ''}`}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  aria-expanded={expanded === item.label}
                >
                  {item.label}
                  <Icon name="chevron-down" size={18} />
                </button>
                <div className={`mobile-menu__sub ${expanded === item.label ? 'is-open' : ''}`}>
                  {item.columns.flatMap((c) => c.links).map((l) => (
                    <button key={l.label + l.to} type="button" onClick={() => go(l.to)}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={item.label}
                type="button"
                className="mobile-menu__link"
                onClick={() => go(item.to)}
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="mobile-menu__chips">
          <span className="eyebrow">Popular</span>
          <div className="mobile-menu__chip-row">
            {categories.slice(0, 6).map((c) => (
              <button key={c.slug} type="button" className="chip" onClick={() => go(`/category/${c.slug}`)}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mobile-menu__foot">
          <button type="button" className="mobile-menu__foot-link" onClick={() => go('/account')}>
            <Icon name="user" size={18} /> Account
          </button>
          <button type="button" className="mobile-menu__foot-link" onClick={() => go('/wishlist')}>
            <Icon name="heart" size={18} /> Wishlist
          </button>
          <a className="mobile-menu__foot-link" href={brand.phoneHref}>
            <Icon name="phone" size={18} /> {brand.phone}
          </a>
        </div>
      </aside>
    </>
  )
}
