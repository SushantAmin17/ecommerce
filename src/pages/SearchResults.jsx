import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import ProductListing from '../components/product/ProductListing'
import EmptyState from '../components/ui/EmptyState'
import Icon from '../components/ui/Icon'
import { products } from '../data/products'
import { categories, categoryMap } from '../data/categories'

function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  return products
    .map((p) => {
      const hay = [
        p.name,
        p.brand,
        p.device,
        p.blurb,
        categoryMap[p.category]?.name,
        p.render.style,
      ]
        .join(' ')
        .toLowerCase()
      const score = terms.reduce((s, t) => (hay.includes(t) ? s + 1 : s), 0)
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)
}

export default function SearchResults() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const q = params.get('q') ?? ''
  const [input, setInput] = useState(q)

  const results = useMemo(() => searchProducts(q), [q])

  const submit = (e) => {
    e.preventDefault()
    if (input.trim()) navigate(`/search?q=${encodeURIComponent(input.trim())}`)
  }

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : 'Search'}
        text={q ? `${results.length} matching ${results.length === 1 ? 'product' : 'products'}` : 'Find your perfect case, glass, power bank and more.'}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
      >
        <form className="search-page__form" onSubmit={submit}>
          <Icon name="search" size={20} />
          <input
            type="search"
            className="search-page__input"
            placeholder="Search products…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="btn btn--sm">Search</button>
        </form>
      </PageHeader>

      <section className="section--tight">
        <div className="container container--wide">
          {q && results.length > 0 ? (
            <ProductListing baseProducts={results} contextLabel="results" />
          ) : (
            <EmptyState
              icon="search"
              title={q ? `No results for “${q}”` : 'Start typing to search'}
              text={q ? 'Try a different term — a phone model, a material, or a product type.' : 'Search by model, material or product type.'}
            >
              <div className="search-page__suggest">
                <span className="eyebrow eyebrow--plain">Popular categories</span>
                <div className="search-page__chips">
                  {categories.slice(0, 7).map((c) => (
                    <Link key={c.slug} to={`/category/${c.slug}`} className="chip">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </EmptyState>
          )}
        </div>
      </section>
    </>
  )
}
