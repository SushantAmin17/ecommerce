import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import ProductListing from '../components/product/ProductListing'
import { products } from '../data/products'

const TAG_TITLES = {
  'new-arrival': { title: 'New Arrivals', text: 'The latest cases and accessories, fresh off the bench.' },
  bestseller: { title: 'Best Sellers', text: 'The pieces our customers keep coming back for.' },
  featured: { title: "Editor's Picks", text: 'Hand-selected favourites worth the double-take.' },
}

export default function Shop() {
  const [params] = useSearchParams()
  const tag = params.get('tag')
  const style = params.get('style')

  const base = tag ? products.filter((p) => p.tags.includes(tag)) : products
  const ctx = (tag && TAG_TITLES[tag]) || {
    title: 'All Products',
    text: 'Explore the full Case Solutions 4U collection — cases, glass, power & carry.',
  }

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={ctx.title}
        text={ctx.text}
        crumbs={[{ label: 'Home', to: '/' }, { label: ctx.title }]}
      />
      <section className="section--tight">
        <div className="container container--wide">
          <ProductListing
            baseProducts={base}
            initialStyle={style}
            contextLabel="products"
          />
        </div>
      </section>
    </>
  )
}
