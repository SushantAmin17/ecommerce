import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import CaseRender from '../ui/CaseRender'
import QuantityStepper from '../ui/QuantityStepper'
import {
  useStore,
  FREE_SHIPPING_THRESHOLD,
} from '../../context/StoreContext'
import { formatINR } from '../../data/products'

export default function CartDrawer() {
  const {
    cart,
    drawerOpen,
    closeCart,
    updateQty,
    removeFromCart,
    subtotal,
  } = useStore()

  useEffect(() => {
    document.body.classList.toggle('no-scroll', drawerOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [drawerOpen])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeCart()
    if (drawerOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeCart])

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <>
      <div className={`drawer-scrim ${drawerOpen ? 'is-open' : ''}`} onClick={closeCart} />
      <aside
        className={`cart-drawer ${drawerOpen ? 'is-open' : ''}`}
        aria-hidden={!drawerOpen}
        aria-label="Shopping bag"
      >
        <header className="cart-drawer__head">
          <h2 className="cart-drawer__title">
            Your Bag <span>{cart.length ? `(${cart.length})` : ''}</span>
          </h2>
          <button type="button" className="header__icon" onClick={closeCart} aria-label="Close bag">
            <Icon name="close" size={22} />
          </button>
        </header>

        {cart.length > 0 && (
          <div className="cart-drawer__ship">
            {remaining > 0 ? (
              <p>
                You&rsquo;re <strong>{formatINR(remaining)}</strong> away from{' '}
                <strong>free shipping</strong>
              </p>
            ) : (
              <p className="cart-drawer__ship-done">
                <Icon name="check" size={15} /> You&rsquo;ve unlocked free shipping
              </p>
            )}
            <div className="cart-drawer__bar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon">
                <Icon name="bag" size={34} />
              </span>
              <h3>Your bag is empty</h3>
              <p>Find the perfect case for your phone — 60+ styles await.</p>
              <Link to="/shop" className="btn btn--gold" onClick={closeCart}>
                Shop all products
              </Link>
            </div>
          ) : (
            <ul className="cart-lines">
              {cart.map((line) => (
                <li key={line.key} className="cart-line">
                  <Link
                    to={`/product/${line.productId}`}
                    className="cart-line__media"
                    onClick={closeCart}
                  >
                    <CaseRender style={line.product.render.style} accent={line.product.render.accent} />
                  </Link>
                  <div className="cart-line__info">
                    <div className="cart-line__top">
                      <Link
                        to={`/product/${line.productId}`}
                        className="cart-line__name"
                        onClick={closeCart}
                      >
                        {line.product.name}
                      </Link>
                      <button
                        type="button"
                        className="cart-line__remove"
                        onClick={() => removeFromCart(line.key)}
                        aria-label={`Remove ${line.product.name}`}
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                    {line.colorName && (
                      <p className="cart-line__variant">{line.colorName}</p>
                    )}
                    <div className="cart-line__foot">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(q) => updateQty(line.key, q)}
                        size="sm"
                      />
                      <span className="price">{formatINR(line.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <footer className="cart-drawer__foot">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span className="price">{formatINR(subtotal)}</span>
            </div>
            <p className="cart-drawer__note">Shipping &amp; taxes calculated at checkout.</p>
            <div className="cart-drawer__actions">
              <Link to="/cart" className="btn btn--outline btn--block" onClick={closeCart}>
                View bag
              </Link>
              <Link to="/checkout" className="btn btn--block" onClick={closeCart}>
                Checkout <Icon name="arrow-right" size={16} className="btn__icon" />
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  )
}
