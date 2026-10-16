import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'
import EmptyState from '../components/ui/EmptyState'
import { useStore } from '../context/StoreContext'
import { formatINR } from '../data/products'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  payment: 'upi',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

export default function Checkout() {
  const { cart, subtotal, shipping, total, clearCart } = useStore()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(null)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email'
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit number'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a 6-digit PIN'
    if (form.payment === 'card') {
      if (!form.cardName.trim()) e.cardName = 'Required'
      if (!/^\d{12,19}$/.test(form.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Enter a valid card number'
      if (!/^\d{2}\s*\/\s*\d{2}$/.test(form.cardExpiry)) e.cardExpiry = 'MM/YY'
      if (!/^\d{3,4}$/.test(form.cardCvc)) e.cardCvc = '3–4 digits'
    }
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      first?.focus?.()
      return
    }
    const orderId = 'CS4U-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    setPlaced({ orderId, email: form.email, name: form.firstName, total })
    clearCart()
    window.scrollTo({ top: 0 })
  }

  if (placed) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <div className="order-confirm">
            <span className="order-confirm__icon">
              <Icon name="check" size={40} />
            </span>
            <span className="eyebrow eyebrow--plain">Order confirmed</span>
            <h1 className="order-confirm__title">Thank you, {placed.name}!</h1>
            <p className="lead">
              Your order <strong>{placed.orderId}</strong> is confirmed. A summary is
              on its way to <strong>{placed.email}</strong>.
            </p>
            <div className="order-confirm__meta">
              <div>
                <span>Order number</span>
                <strong>{placed.orderId}</strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>{formatINR(placed.total)}</strong>
              </div>
              <div>
                <span>Est. delivery</span>
                <strong>2–5 business days</strong>
              </div>
            </div>
            <p className="order-confirm__demo">
              <Icon name="shield" size={15} /> This is a frontend demo — no payment was
              processed and no personal data was stored.
            </p>
            <div className="order-confirm__actions">
              <Link to="/shop" className="btn">Continue shopping</Link>
              <Link to="/account" className="btn btn--outline">View account</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Checkout" crumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <section className="section">
          <div className="container">
            <EmptyState
              icon="bag"
              title="Your bag is empty"
              text="Add a few pieces before heading to checkout."
              actionTo="/shop"
              actionLabel="Shop all products"
            />
          </div>
        </section>
      </>
    )
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className="input"
        value={form[name]}
        onChange={set(name)}
        aria-invalid={errors[name] ? 'true' : undefined}
        {...props}
      />
      {errors[name] && <span className="field__error">{errors[name]}</span>}
    </div>
  )

  return (
    <>
      <PageHeader
        eyebrow="Secure checkout"
        title="Checkout"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]}
      />
      <section className="section--tight">
        <div className="container container--wide checkout">
          <form className="checkout__form" onSubmit={submit} noValidate>
            <div className="checkout__demo-note">
              <Icon name="shield" size={16} /> Demo checkout — no real payment is taken and no data is stored.
            </div>

            <fieldset className="checkout__block">
              <legend className="checkout__legend"><span>1</span> Contact</legend>
              {field('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
              {field('phone', 'Mobile number', { type: 'tel', placeholder: '98765 43210', autoComplete: 'tel' })}
            </fieldset>

            <fieldset className="checkout__block">
              <legend className="checkout__legend"><span>2</span> Shipping address</legend>
              <div className="checkout__row">
                {field('firstName', 'First name', { autoComplete: 'given-name' })}
                {field('lastName', 'Last name', { autoComplete: 'family-name' })}
              </div>
              {field('address', 'Street address', { placeholder: 'House no, street, area', autoComplete: 'street-address' })}
              <div className="checkout__row checkout__row--3">
                {field('city', 'City', { autoComplete: 'address-level2' })}
                {field('state', 'State', { autoComplete: 'address-level1' })}
                {field('pincode', 'PIN code', { inputMode: 'numeric', placeholder: '560001' })}
              </div>
            </fieldset>

            <fieldset className="checkout__block">
              <legend className="checkout__legend"><span>3</span> Payment</legend>
              <div className="checkout__pay">
                {[
                  { id: 'upi', label: 'UPI', hint: 'GPay, PhonePe, Paytm' },
                  { id: 'card', label: 'Card', hint: 'Credit / Debit' },
                  { id: 'cod', label: 'Cash on Delivery', hint: 'Pay when it arrives' },
                ].map((opt) => (
                  <label key={opt.id} className={`pay-option ${form.payment === opt.id ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={form.payment === opt.id}
                      onChange={set('payment')}
                    />
                    <span className="pay-option__radio" />
                    <span className="pay-option__text">
                      <strong>{opt.label}</strong>
                      <em>{opt.hint}</em>
                    </span>
                  </label>
                ))}
              </div>

              {form.payment === 'card' && (
                <div className="checkout__card">
                  {field('cardName', 'Name on card')}
                  {field('cardNumber', 'Card number', { inputMode: 'numeric', placeholder: '1234 5678 9012 3456' })}
                  <div className="checkout__row">
                    {field('cardExpiry', 'Expiry (MM/YY)', { placeholder: '08/28' })}
                    {field('cardCvc', 'CVC', { inputMode: 'numeric', placeholder: '123' })}
                  </div>
                </div>
              )}
              {form.payment === 'upi' && (
                <p className="checkout__pay-note">You'll be prompted to approve the payment in your UPI app (demo).</p>
              )}
              {form.payment === 'cod' && (
                <p className="checkout__pay-note">Keep the exact amount ready — our courier will collect on delivery.</p>
              )}
            </fieldset>

            <button type="submit" className="btn btn--gold btn--lg btn--block checkout__submit">
              <Icon name="lock" size={16} /> Place order · {formatINR(total)}
            </button>
          </form>

          <aside className="checkout__summary">
            <h2 className="checkout__summary-title">Order summary</h2>
            <ul className="checkout__lines">
              {cart.map((line) => (
                <li key={line.key} className="checkout__line">
                  <span className="checkout__line-media">
                    <CaseRender style={line.product.render.style} accent={line.product.render.accent} />
                    <span className="checkout__line-qty">{line.qty}</span>
                  </span>
                  <span className="checkout__line-info">
                    <strong>{line.product.name}</strong>
                    {line.colorName && <em>{line.colorName}</em>}
                  </span>
                  <span className="price checkout__line-price">{formatINR(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="checkout__totals">
              <div>
                <dt>Subtotal</dt>
                <dd className="price">{formatINR(subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatINR(shipping)}</dd>
              </div>
              <div className="checkout__grand">
                <dt>Total</dt>
                <dd className="price">{formatINR(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}
