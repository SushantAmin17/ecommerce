import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import MobileMenu from './MobileMenu'
import { primaryNav } from '../../data/site'
import { useStore } from '../../context/StoreContext'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount, wishlistCount, openCart } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close overlays on route change
  useEffect(() => {
    setOpenMenu(null)
    setSearchOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header__inner container container--wide">
          {/* Left: mobile toggle + nav */}
          <div className="header__left">
            <button
              type="button"
              className="header__icon header__burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={22} />
            </button>
            <nav className="header__nav" aria-label="Primary">
              {primaryNav.map((item) => (
                <div
                  key={item.label}
                  className="header__nav-item"
                  onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    {item.label}
                    {item.columns && <Icon name="chevron-down" size={14} />}
                  </NavLink>

                  {item.columns && openMenu === item.label && (
                    <div className="megamenu" role="menu">
                      <div className="megamenu__inner">
                        {item.columns.map((col) => (
                          <div key={col.heading} className="megamenu__col">
                            <span className="megamenu__heading">{col.heading}</span>
                            <ul>
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <Link to={l.to} className="megamenu__link">
                                    {l.label}
                                    <Icon name="arrow-up-right" size={14} />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="megamenu__feature">
                          <span className="eyebrow">This week</span>
                          <p className="megamenu__feature-title">
                            New leather &amp; MagSafe arrivals
                          </p>
                          <Link to="/shop?tag=new-arrival" className="link-underline">
                            Shop new in <Icon name="arrow-right" size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <Link to="/" className="header__logo">
            <Logo size={scrolled ? 44 : 50} />
          </Link>

          {/* Right: actions */}
          <div className="header__actions">
            <button
              type="button"
              className="header__icon"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Icon name="search" size={21} />
            </button>
            <Link to="/account" className="header__icon header__icon--hide-sm" aria-label="Account">
              <Icon name="user" size={21} />
            </Link>
            <Link to="/wishlist" className="header__icon" aria-label="Wishlist">
              <Icon name="heart" size={21} />
              {wishlistCount > 0 && <span className="header__count">{wishlistCount}</span>}
            </Link>
            <button type="button" className="header__icon" onClick={openCart} aria-label="Open cart">
              <Icon name="bag" size={21} />
              {cartCount > 0 && <span className="header__count header__count--gold">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Search overlay */}
        <div className={`header__search ${searchOpen ? 'is-open' : ''}`}>
          <form className="header__search-form container container--wide" onSubmit={submitSearch}>
            <Icon name="search" size={22} />
            <input
              ref={searchRef}
              type="search"
              className="header__search-input"
              placeholder="Search cases, leather, MagSafe, Samsung…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="header__search-tags">
              {['iPhone 16', 'Leather', 'Clear', 'Power Bank'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="chip"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(t)}`)}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="header__icon"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <Icon name="close" size={20} />
            </button>
          </form>
        </div>
      </header>

      {(searchOpen || openMenu) && (
        <div className="header__scrim" onClick={() => { setSearchOpen(false); setOpenMenu(null) }} />
      )}

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
