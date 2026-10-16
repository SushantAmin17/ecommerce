import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import ProductListing from '../components/product/ProductListing'
import EmptyState from '../components/ui/EmptyState'
import { productsByCategory } from '../data/products'
import { categoryMap } from '../data/categories'

export default function Category() {
  const { slug } = useParams()
  const category = categoryMap[slug]
  const items = productsByCategory(slug)

  if (!category) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon="tag"
            title="Category not found"
            text="That collection doesn't exist. Browse everything instead."
            actionTo="/shop"
            actionLabel="Shop all products"
          />
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={`${category.count} products`}
        title={category.name}
        text={`${category.tagline} — premium ${category.name} cases and accessories, precision-fit and built to last.`}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: category.name },
        ]}
      />
      <section className="section--tight">
        <div className="container container--wide">
          {items.length === 0 ? (
            <EmptyState
              icon="box"
              title="Restocking soon"
              text="We're adding more pieces to this collection. Check back shortly or browse related styles."
            >
              <Link to="/shop" className="btn btn--gold">Browse all products</Link>
            </EmptyState>
          ) : (
            <ProductListing
              baseProducts={items}
              lockCategory
              contextLabel={`${category.name} products`}
            />
          )}
        </div>
      </section>
    </>
  )
}
