import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'
import QuantityStepper from '../components/ui/QuantityStepper'
import EmptyState from '../components/ui/EmptyState'
import {
  useStore,
  FREE_SHIPPING_THRESHOLD,
} from '../context/StoreContext'
import { formatINR } from '../data/products'

export default function Cart() {
  const {
    cart,
    updateQty,
    removeFromCart,
    subtotal,
    shipping,
    total,
  } = useStore()

  if (cart.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="Your bag"
          title="Shopping Bag"
          crumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
        />
        <section className="section">
          <div className="container">
            <EmptyState
              icon="bag"
              title="Your bag is empty"
              text="Looks like you haven't added anything yet. Let's fix that."
              actionTo="/shop"
              actionLabel="Shop all products"
            />
          </div>
        </section>
      </>
    )
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <>
      <PageHeader
        eyebrow="Your bag"
        title="Shopping Bag"
        text={`${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your bag`}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
      />
      <section className="section--tight">
        <div className="container container--wide cart-layout">
          <div className="cart-main">
            <div className="cart-table__head">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            <ul className="cart-items">
              {cart.map((line) => (
                <li key={line.key} className="cart-item">
                  <div className="cart-item__product">
                    <Link to={`/product/${line.productId}`} className="cart-item__media">
                      <CaseRender style={line.product.render.style} accent={line.product.render.accent} />
                    </Link>
                    <div className="cart-item__meta">
                      <span className="cart-item__brand">{line.product.brand}</span>
                      <Link to={`/product/${line.productId}`} className="cart-item__name">
                        {line.product.name}
                      </Link>
                      <span className="cart-item__device">{line.product.device}</span>
                      {line.colorName && <span className="cart-item__variant">Colour: {line.colorName}</span>}
                      <span className="cart-item__price-m">{formatINR(line.product.price)}</span>
                      <button
                        type="button"
                        className="cart-item__remove link-underline"
                        onClick={() => removeFromCart(line.key)}
                      >
                        <Icon name="trash" size={15} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__qty">
                    <QuantityStepper value={line.qty} onChange={(q) => updateQty(line.key, q)} />
                  </div>
                  <div className="cart-item__total price">{formatINR(line.lineTotal)}</div>
                </li>
              ))}
            </ul>
            <div className="cart-main__foot">
              <Link to="/shop" className="link-underline">
                <Icon name="chevron-left" size={15} /> Continue shopping
              </Link>
            </div>
          </div>

          <aside className="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>
            {remaining > 0 ? (
              <p className="cart-summary__ship-note">
                Add <strong>{formatINR(remaining)}</strong> more to unlock free shipping.
              </p>
            ) : (
              <p className="cart-summary__ship-note cart-summary__ship-note--ok">
                <Icon name="check" size={15} /> You've unlocked free shipping.
              </p>
            )}
            <dl className="cart-summary__rows">
              <div>
                <dt>Subtotal</dt>
                <dd className="price">{formatINR(subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatINR(shipping)}</dd>
              </div>
            </dl>
            <div className="cart-summary__total">
              <span>Total</span>
              <span className="price">{formatINR(total)}</span>
            </div>
            <Link to="/checkout" className="btn btn--block cart-summary__checkout">
              Proceed to checkout <Icon name="arrow-right" size={16} className="btn__icon" />
            </Link>
            <ul className="cart-summary__trust">
              <li><Icon name="lock" size={15} /> Secure checkout</li>
              <li><Icon name="return" size={15} /> 7-day returns</li>
            </ul>
            <div className="cart-summary__promo">
              <input className="input" placeholder="Promo code" aria-label="Promo code" />
              <button type="button" className="btn btn--outline btn--sm">Apply</button>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
