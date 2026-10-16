import PageHeader from '../components/ui/PageHeader'
import ProductCard from '../components/product/ProductCard'
import EmptyState from '../components/ui/EmptyState'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import { useStore } from '../context/StoreContext'
import { getProduct } from '../data/products'

export default function Wishlist() {
  const { wishlist, addToCart } = useStore()
  const items = wishlist.map(getProduct).filter(Boolean)

  const addAll = () => {
    items.forEach((p, i) =>
      p.inStock &&
      addToCart(p.id, { colorName: p.colors?.[0]?.name, open: i === items.length - 1 }),
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Saved for later"
        title="Your Wishlist"
        text={items.length ? `${items.length} ${items.length === 1 ? 'piece' : 'pieces'} you're loving` : 'The pieces you love, kept in one place.'}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]}
      >
        {items.length > 0 && (
          <button type="button" className="btn btn--outline btn--sm wishlist__add-all" onClick={addAll}>
            <Icon name="bag" size={16} /> Add all to bag
          </button>
        )}
      </PageHeader>

      <section className="section--tight">
        <div className="container container--wide">
          {items.length === 0 ? (
            <EmptyState
              icon="heart"
              title="Your wishlist is empty"
              text="Tap the heart on any product to save it here for later."
              actionTo="/shop"
              actionLabel="Discover products"
            />
          ) : (
            <div className="product-grid">
              {items.map((p, i) => (
                <Reveal key={p.id} variant="up" delay={(i % 4) * 0.06}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
