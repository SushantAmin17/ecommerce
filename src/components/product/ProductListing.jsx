import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import EmptyState from '../ui/EmptyState'
import { categories } from '../../data/categories'

export const styleLabels = {
  silicone: 'Silicone',
  leather: 'Leather',
  clear: 'Clear & MagSafe',
  matte: 'Matte / Slim',
  diamond: 'Glitter & Diamond',
  wallet: 'Wallet',
  carbon: 'Carbon',
  print: 'Printed',
  powerbank: 'Power Bank',
  glass: 'Tempered Glass',
  ring: 'Camera Ring',
  airpods: 'AirPods',
  lanyard: 'Lanyard',
}

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Alphabetical' },
]

const PRICE_BANDS = [
  { id: 'under-299', label: 'Under ₹299', test: (p) => p.price < 299 },
  { id: '299-599', label: '₹299 – ₹599', test: (p) => p.price >= 299 && p.price <= 599 },
  { id: '600-899', label: '₹600 – ₹899', test: (p) => p.price >= 600 && p.price <= 899 },
  { id: '900-plus', label: '₹900 & above', test: (p) => p.price >= 900 },
]

export default function ProductListing({
  baseProducts,
  lockCategory = false,
  initialStyle = null,
  contextLabel = 'products',
}) {
  const [sort, setSort] = useState('featured')
  const [cats, setCats] = useState(() => new Set())
  const [styles, setStyles] = useState(() =>
    new Set(initialStyle ? [initialStyle] : []),
  )
  const [bands, setBands] = useState(() => new Set())
  const [inStockOnly, setInStockOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setStyles(new Set(initialStyle ? [initialStyle] : []))
  }, [initialStyle])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', filtersOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [filtersOpen])

  const availableStyles = useMemo(() => {
    const s = new Set(baseProducts.map((p) => p.render.style))
    return [...s]
  }, [baseProducts])

  const availableCats = useMemo(() => {
    const counts = {}
    baseProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return categories.filter((c) => counts[c.slug]).map((c) => ({ ...c, n: counts[c.slug] }))
  }, [baseProducts])

  const toggle = (setFn) => (value) =>
    setFn((prev) => {
      const next = new Set(prev)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })

  const filtered = useMemo(() => {
    let list = baseProducts.filter((p) => {
      if (cats.size && !cats.has(p.category)) return false
      if (styles.size && !styles.has(p.render.style)) return false
      if (inStockOnly && !p.inStock) return false
      if (bands.size) {
        const match = PRICE_BANDS.some((b) => bands.has(b.id) && b.test(p))
        if (!match) return false
      }
      return true
    })
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        sorted.sort(
          (a, b) =>
            (b.tags.includes('featured') ? 1 : 0) -
            (a.tags.includes('featured') ? 1 : 0),
        )
    }
    return sorted
  }, [baseProducts, cats, styles, bands, inStockOnly, sort])

  const activeCount = cats.size + styles.size + bands.size + (inStockOnly ? 1 : 0)
  const clearAll = () => {
    setCats(new Set())
    setStyles(new Set())
    setBands(new Set())
    setInStockOnly(false)
  }

  const facets = (
    <>
      {!lockCategory && availableCats.length > 1 && (
        <div className="facet">
          <h3 className="facet__title">Category</h3>
          <ul className="facet__list">
            {availableCats.map((c) => (
              <li key={c.slug}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={cats.has(c.slug)}
                    onChange={() => toggle(setCats)(c.slug)}
                  />
                  <span className="check__box"><Icon name="check" size={13} /></span>
                  <span className="check__label">{c.name}</span>
                  <span className="check__count">{c.n}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {availableStyles.length > 1 && (
        <div className="facet">
          <h3 className="facet__title">Style</h3>
          <ul className="facet__list">
            {availableStyles.map((s) => (
              <li key={s}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={styles.has(s)}
                    onChange={() => toggle(setStyles)(s)}
                  />
                  <span className="check__box"><Icon name="check" size={13} /></span>
                  <span className="check__label">{styleLabels[s] ?? s}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="facet">
        <h3 className="facet__title">Price</h3>
        <ul className="facet__list">
          {PRICE_BANDS.map((b) => (
            <li key={b.id}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={bands.has(b.id)}
                  onChange={() => toggle(setBands)(b.id)}
                />
                <span className="check__box"><Icon name="check" size={13} /></span>
                <span className="check__label">{b.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="facet">
        <label className="check check--switch">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span className="switch"><span /></span>
          <span className="check__label">In stock only</span>
        </label>
      </div>

      {activeCount > 0 && (
        <button type="button" className="facet__clear link-underline" onClick={clearAll}>
          Clear all filters
        </button>
      )}
    </>
  )

  return (
    <div className="listing">
      <aside className="listing__sidebar">
        <div className="listing__sidebar-inner">
          <h2 className="listing__facets-head">
            <Icon name="filter" size={18} /> Filter
          </h2>
          {facets}
        </div>
      </aside>

      <div className="listing__main">
        <div className="listing__toolbar">
          <p className="listing__count">
            <strong>{filtered.length}</strong> {contextLabel}
          </p>
          <div className="listing__tools">
            <button
              type="button"
              className="btn btn--outline btn--sm listing__filter-btn"
              onClick={() => setFiltersOpen(true)}
            >
              <Icon name="filter" size={16} /> Filter
              {activeCount > 0 && <span className="listing__filter-badge">{activeCount}</span>}
            </button>
            <label className="listing__sort">
              <span>Sort</span>
              <select
                className="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="search"
            title="No products match those filters"
            text="Try removing a filter or two to see more of the collection."
          >
            <button type="button" className="btn btn--gold" onClick={clearAll}>
              Clear filters
            </button>
          </EmptyState>
        ) : (
          <div className="product-grid listing__grid">
            {filtered.map((p, i) => (
              <Reveal key={p.id} variant="up" delay={(i % 3) * 0.05}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <div className={`drawer-scrim ${filtersOpen ? 'is-open' : ''}`} onClick={() => setFiltersOpen(false)} />
      <div className={`filter-drawer ${filtersOpen ? 'is-open' : ''}`} aria-hidden={!filtersOpen}>
        <div className="filter-drawer__head">
          <h2>Filter {contextLabel}</h2>
          <button type="button" className="header__icon" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="filter-drawer__body">{facets}</div>
        <div className="filter-drawer__foot">
          <button type="button" className="btn btn--block" onClick={() => setFiltersOpen(false)}>
            Show {filtered.length} {contextLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
