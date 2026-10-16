import { Link } from 'react-router-dom'
import CaseRender from '../ui/CaseRender'
import Icon from '../ui/Icon'
import Rating from '../ui/Rating'
import { useStore } from '../../context/StoreContext'
import { formatINR, discountPercent } from '../../data/products'

export default function ProductCard({ product, index = 0 }) {
  const { isWished, toggleWishlist, addToCart } = useStore()
  const wished = isWished(product.id)
  const discount = discountPercent(product)
  const to = `/product/${product.id}`

  const onQuickAdd = (e) => {
    e.preventDefault()
    addToCart(product.id, { colorName: product.colors?.[0]?.name })
  }

  return (
    <article
      className="pcard"
      style={{ '--i': index }}
    >
      <div className="pcard__media">
        <Link to={to} className="pcard__stage" aria-label={product.name}>
          <CaseRender style={product.render.style} accent={product.render.accent} />
        </Link>

        <div className="pcard__badges">
          {product.badges.includes('sale') && discount > 0 && (
            <span className="badge badge--sale">−{discount}%</span>
          )}
          {product.badges.includes('new') && <span className="badge badge--new">New</span>}
          {product.badges.includes('bestseller') && (
            <span className="badge badge--gold">Bestseller</span>
          )}
          {!product.inStock && <span className="badge badge--soft">Sold out</span>}
        </div>

        <button
          type="button"
          className={`pcard__wish ${wished ? 'is-active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon name={wished ? 'heart-filled' : 'heart'} size={19} />
        </button>

        <div className="pcard__quick">
          {product.inStock ? (
            <button type="button" className="btn btn--sm btn--block" onClick={onQuickAdd}>
              <Icon name="bag" size={16} /> Add to bag
            </button>
          ) : (
            <Link to={to} className="btn btn--sm btn--outline btn--block">
              View details
            </Link>
          )}
        </div>
      </div>

      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="pcard__brand">{product.brand}</span>
          <Rating value={product.rating} size={13} />
        </div>
        <h3 className="pcard__name">
          <Link to={to}>{product.name}</Link>
        </h3>
        <p className="pcard__device">{product.device}</p>

        <div className="pcard__foot">
          <p className="price pcard__price">
            {formatINR(product.price)}
            {product.oldPrice && (
              <span className="price__old">{formatINR(product.oldPrice)}</span>
            )}
          </p>
          {product.colors.length > 1 && (
            <div className="pcard__swatches" aria-hidden="true">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  className="swatch-dot"
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="pcard__swatch-more">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
