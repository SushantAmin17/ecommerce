import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'
import Rating from '../components/ui/Rating'
import QuantityStepper from '../components/ui/QuantityStepper'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import EmptyState from '../components/ui/EmptyState'
import ProductCard from '../components/product/ProductCard'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { useStore } from '../context/StoreContext'
import {
  getProduct,
  productsByCategory,
  featuredProducts,
  formatINR,
  discountPercent,
} from '../data/products'
import { categoryMap } from '../data/categories'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`accordion ${open ? 'is-open' : ''}`}>
      <button type="button" className="accordion__head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        <Icon name={open ? 'minus' : 'plus'} size={18} />
      </button>
      <div className="accordion__panel">
        <div className="accordion__content">{children}</div>
      </div>
    </div>
  )
}

const VIEWS = ['front', 'angle', 'detail']

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addToCart, toggleWishlist, isWished } = useStore()

  const [color, setColor] = useState(product?.colors?.[0] ?? null)
  const [qty, setQty] = useState(1)
  const [view, setView] = useState('front')

  useEffect(() => {
    setColor(product?.colors?.[0] ?? null)
    setQty(1)
    setView('front')
  }, [id, product])

  const related = useMemo(() => {
    if (!product) return []
    const same = productsByCategory(product.category).filter((p) => p.id !== product.id)
    const pool = same.length >= 4 ? same : [...same, ...featuredProducts.filter((p) => p.id !== product.id)]
    return [...new Map(pool.map((p) => [p.id, p])).values()].slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon="box"
            title="Product not found"
            text="This product may have sold out or moved. Explore the full collection instead."
            actionTo="/shop"
            actionLabel="Shop all products"
          />
        </div>
      </section>
    )
  }

  const discount = discountPercent(product)
  const wished = isWished(product.id)
  const accent = color?.hex ?? product.render.accent

  const handleAdd = (openDrawer = true) => {
    addToCart(product.id, { colorName: color?.name, qty, open: openDrawer })
  }
  const buyNow = () => {
    addToCart(product.id, { colorName: color?.name, qty, open: false })
    navigate('/checkout')
  }

  return (
    <div className="pdp">
      <div className="container container--wide pdp__crumbs">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: categoryMap[product.category]?.name ?? 'Products', to: `/category/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container container--wide pdp__grid">
        {/* Gallery */}
        <div className="pdp__gallery">
          <div className={`pdp__stage pdp__stage--${view}`}>
            {product.badges.includes('sale') && discount > 0 && (
              <span className="badge badge--sale pdp__stage-badge">−{discount}%</span>
            )}
            <CaseRender style={product.render.style} accent={accent} />
          </div>
          <div className="pdp__thumbs">
            {VIEWS.map((v) => (
              <button
                key={v}
                type="button"
                className={`pdp__thumb ${view === v ? 'is-active' : ''}`}
                onClick={() => setView(v)}
                aria-label={`${v} view`}
              >
                <CaseRender style={product.render.style} accent={accent} />
                <span className="pdp__thumb-label">{v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pdp__info">
          <div className="pdp__head">
            <span className="pdp__brand">{product.brand}</span>
            <h1 className="pdp__title">{product.name}</h1>
            <div className="pdp__rate">
              <Rating value={product.rating} reviews={product.reviews} size={16} showValue />
              <span className="pdp__stock">
                {product.inStock ? (
                  <><span className="dot dot--ok" /> In stock</>
                ) : (
                  <><span className="dot dot--out" /> Out of stock</>
                )}
              </span>
            </div>
          </div>

          <div className="pdp__price">
            <span className="price pdp__price-now">{formatINR(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="price__old pdp__price-old">{formatINR(product.oldPrice)}</span>
                <span className="badge badge--sale">Save {formatINR(product.oldPrice - product.price)}</span>
              </>
            )}
            <span className="pdp__tax">Incl. of all taxes</span>
          </div>

          <p className="pdp__blurb">{product.description}</p>

          <div className="pdp__device">
            <Icon name="check-circle" size={17} /> Fits: <strong>{product.device}</strong>
          </div>

          {product.colors.length > 0 && (
            <div className="pdp__option">
              <div className="pdp__option-head">
                <span className="pdp__option-label">
                  Colour{color ? <>: <strong>{color.name}</strong></> : ''}
                </span>
                {product.colors.length > 1 && (
                  <span className="pdp__option-count">{product.colors.length} options</span>
                )}
              </div>
              <div className="pdp__swatches">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`pdp__swatch ${color?.name === c.name ? 'is-active' : ''}`}
                    style={{ '--sw': c.hex }}
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                    aria-pressed={color?.name === c.name}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pdp__buy">
            <div className="pdp__qty">
              <span className="pdp__option-label">Qty</span>
              <QuantityStepper value={qty} onChange={setQty} />
            </div>
            <div className="pdp__buy-actions">
              <button
                type="button"
                className="btn btn--block pdp__add"
                onClick={() => handleAdd(true)}
                disabled={!product.inStock}
              >
                <Icon name="bag" size={17} />
                {product.inStock ? 'Add to bag' : 'Sold out'}
              </button>
              <button
                type="button"
                className={`pdp__wish ${wished ? 'is-active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
                aria-label="Add to wishlist"
              >
                <Icon name={wished ? 'heart-filled' : 'heart'} size={20} />
              </button>
            </div>
            <button
              type="button"
              className="btn btn--gold btn--block pdp__buynow"
              onClick={buyNow}
              disabled={!product.inStock}
            >
              Buy it now
            </button>
          </div>

          <ul className="pdp__assurances">
            <li><Icon name="ship" size={18} /> Free shipping over ₹499</li>
            <li><Icon name="return" size={18} /> 7-day easy returns</li>
            <li><Icon name="lock" size={18} /> Secure UPI / Card / COD</li>
          </ul>

          <ul className="pdp__highlights">
            {product.highlights.map((h) => (
              <li key={h}><Icon name="check" size={16} /> {h}</li>
            ))}
          </ul>

          <div className="pdp__accordions">
            <Accordion title="Full description" defaultOpen>
              <p>{product.description}</p>
            </Accordion>
            <Accordion title="Shipping & delivery">
              <p>
                Dispatched within 24–48 hours. Free shipping on orders over ₹499
                across India (₹49 flat otherwise). Metro delivery in 2–4 business
                days; rest of India in 4–7 business days.
              </p>
            </Accordion>
            <Accordion title="Returns & warranty">
              <p>
                Unused items in original packaging can be returned or exchanged
                within 7 days of delivery. Arrived damaged? Send a photo within 48
                hours and we&rsquo;ll replace it free of charge.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="container container--wide">
            <SectionHeader
              eyebrow="You may also like"
              title="Complete the look"
              link={`/category/${product.category}`}
              linkLabel="More like this"
            />
            <div className="product-grid">
              {related.map((p, i) => (
                <Reveal key={p.id} variant="up" delay={(i % 4) * 0.06}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar */}
      <div className="pdp__sticky">
        <div className="pdp__sticky-info">
          <span className="pdp__sticky-name">{product.name}</span>
          <span className="price">{formatINR(product.price * qty)}</span>
        </div>
        <button
          type="button"
          className="btn pdp__sticky-btn"
          onClick={() => handleAdd(true)}
          disabled={!product.inStock}
        >
          <Icon name="bag" size={16} /> Add
        </button>
      </div>
    </div>
  )
}
