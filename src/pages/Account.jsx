import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'
import EmptyState from '../components/ui/EmptyState'
import ProductCard from '../components/product/ProductCard'
import { useStore } from '../context/StoreContext'
import { getProduct, formatINR } from '../data/products'

const SAMPLE_ORDERS = [
  {
    id: 'CS4U-7FA2K9',
    date: '12 Oct 2026',
    status: 'Delivered',
    total: 1198,
    items: [
      { id: 'ny-perfume-leather-iphone', color: 'Oxblood', qty: 1 },
      { id: 'tempered-glass-iphone', color: 'Clear', qty: 2 },
    ],
  },
  {
    id: 'CS4U-3LM8X1',
    date: '28 Sep 2026',
    status: 'In transit',
    total: 499,
    items: [{ id: 'branded-silicon-iphone', color: 'Midnight', qty: 1 }],
  },
]

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'orders', label: 'Orders', icon: 'box' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { id: 'addresses', label: 'Addresses', icon: 'pin' },
  { id: 'profile', label: 'Profile', icon: 'user' },
]

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('cs4u_demo_user')) || null
  } catch {
    return null
  }
}

function OrderCard({ order }) {
  return (
    <article className="order-card">
      <header className="order-card__head">
        <div>
          <span className="order-card__id">{order.id}</span>
          <span className="order-card__date">Placed {order.date}</span>
        </div>
        <span className={`order-status order-status--${order.status.replace(/\s/g, '-').toLowerCase()}`}>
          {order.status}
        </span>
      </header>
      <ul className="order-card__items">
        {order.items.map((it, i) => {
          const p = getProduct(it.id)
          if (!p) return null
          return (
            <li key={i}>
              <span className="order-card__media">
                <CaseRender style={p.render.style} accent={p.render.accent} />
              </span>
              <span className="order-card__info">
                <Link to={`/product/${p.id}`}>{p.name}</Link>
                <em>{it.color} · Qty {it.qty}</em>
              </span>
              <span className="price">{formatINR(p.price * it.qty)}</span>
            </li>
          )
        })}
      </ul>
      <footer className="order-card__foot">
        <span className="order-card__total">Total <strong className="price">{formatINR(order.total)}</strong></span>
        <div className="order-card__actions">
          <button type="button" className="btn btn--outline btn--sm">Track order</button>
          <button type="button" className="btn btn--sm">Buy again</button>
        </div>
      </footer>
    </article>
  )
}

export default function Account() {
  const [tab, setTab] = useState('overview')
  const navigate = useNavigate()
  const { wishlist } = useStore()
  const user = useMemo(getUser, [])
  const wishItems = wishlist.map(getProduct).filter(Boolean)
  const name = user?.name || 'Member'

  const logout = () => {
    try { localStorage.removeItem('cs4u_demo_user') } catch { /* ignore */ }
    navigate('/login')
  }

  return (
    <>
      <PageHeader
        eyebrow={`Hello, ${name}`}
        title="My Account"
        text="Manage your orders, wishlist, addresses and profile."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
      />
      <section className="section--tight">
        <div className="container container--wide account">
          <aside className="account__nav">
            <div className="account__user">
              <span className="account__avatar">{name.charAt(0).toUpperCase()}</span>
              <div>
                <strong>{name}</strong>
                <span>{user?.email || 'guest@casesolutions4u.in'}</span>
              </div>
            </div>
            <nav>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`account__link ${tab === t.id ? 'is-active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  <Icon name={t.icon} size={18} /> {t.label}
                  {t.id === 'wishlist' && wishItems.length > 0 && (
                    <span className="account__badge">{wishItems.length}</span>
                  )}
                </button>
              ))}
              <button type="button" className="account__link account__link--out" onClick={logout}>
                <Icon name="logout" size={18} /> Sign out
              </button>
            </nav>
          </aside>

          <div className="account__content">
            {tab === 'overview' && (
              <div className="account__overview">
                <div className="account__stats">
                  <div className="account__stat">
                    <span className="account__stat-num">{SAMPLE_ORDERS.length}</span>
                    <span className="account__stat-label">Orders</span>
                  </div>
                  <div className="account__stat">
                    <span className="account__stat-num">{wishItems.length}</span>
                    <span className="account__stat-label">Wishlist</span>
                  </div>
                  <div className="account__stat">
                    <span className="account__stat-num">2</span>
                    <span className="account__stat-label">Addresses</span>
                  </div>
                  <div className="account__stat account__stat--gold">
                    <span className="account__stat-num">Gold</span>
                    <span className="account__stat-label">Member tier</span>
                  </div>
                </div>
                <h3 className="account__h3">Recent order</h3>
                <OrderCard order={SAMPLE_ORDERS[0]} />
              </div>
            )}

            {tab === 'orders' && (
              <div className="account__orders">
                <h3 className="account__h3">Order history</h3>
                {SAMPLE_ORDERS.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))}
              </div>
            )}

            {tab === 'wishlist' && (
              <div>
                <h3 className="account__h3">Saved items</h3>
                {wishItems.length === 0 ? (
                  <EmptyState icon="heart" title="Nothing saved yet" text="Tap the heart on any product to save it." actionTo="/shop" actionLabel="Browse products" />
                ) : (
                  <div className="product-grid product-grid--3">
                    {wishItems.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'addresses' && (
              <div>
                <h3 className="account__h3">Saved addresses</h3>
                <div className="account__addresses">
                  {[
                    { tag: 'Home', name, line: '12 Marine Drive, Nariman Point', city: 'Mumbai, Maharashtra 400021', phone: '+91 79770 69466', primary: true },
                    { tag: 'Work', name, line: 'WeWork, Prestige Atlanta, Koramangala', city: 'Bengaluru, Karnataka 560095', phone: '+91 79770 69466', primary: false },
                  ].map((a) => (
                    <div key={a.tag} className={`address-card ${a.primary ? 'is-primary' : ''}`}>
                      <div className="address-card__tag">
                        {a.tag}
                        {a.primary && <span className="badge badge--gold">Default</span>}
                      </div>
                      <p><strong>{a.name}</strong></p>
                      <p>{a.line}</p>
                      <p>{a.city}</p>
                      <p>{a.phone}</p>
                      <div className="address-card__actions">
                        <button type="button" className="link-underline">Edit</button>
                        <button type="button" className="link-underline">Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="address-card address-card--add">
                    <Icon name="plus" size={24} />
                    <span>Add new address</span>
                  </button>
                </div>
              </div>
            )}

            {tab === 'profile' && (
              <div>
                <h3 className="account__h3">Profile details</h3>
                <form className="account__profile" onSubmit={(e) => e.preventDefault()}>
                  <div className="checkout__row">
                    <div className="field">
                      <label htmlFor="pf-name">Full name</label>
                      <input id="pf-name" className="input" defaultValue={name} />
                    </div>
                    <div className="field">
                      <label htmlFor="pf-phone">Mobile</label>
                      <input id="pf-phone" className="input" defaultValue="+91 79770 69466" />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="pf-email">Email</label>
                    <input id="pf-email" type="email" className="input" defaultValue={user?.email || 'you@example.com'} />
                  </div>
                  <div className="field">
                    <label htmlFor="pf-bday">Birthday (for a surprise)</label>
                    <input id="pf-bday" type="date" className="input" />
                  </div>
                  <button type="submit" className="btn">Save changes</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
