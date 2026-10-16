import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CategoryIcon from '../components/ui/CategoryIcon'
import CaseRender from '../components/ui/CaseRender'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import { browseCategories } from '../data/categories'
import { productsByCategory } from '../data/products'

const PREVIEW = {
  iphone: { style: 'silicone', accent: '#223a63' },
  'iphone-16': { style: 'silicone', accent: '#223a63' },
  'iphone-15': { style: 'clear', accent: '#92b6d6' },
  'iphone-14': { style: 'wallet', accent: '#33383f' },
  'iphone-13': { style: 'matte', accent: '#9aa98f' },
  samsung: { style: 'carbon', accent: '#33383f' },
  oneplus: { style: 'matte', accent: '#315545' },
  'tempered-glass': { style: 'glass', accent: '#92b6d6' },
  'power-bank': { style: 'powerbank', accent: '#223a63' },
  'camera-rings': { style: 'ring', accent: '#b9a16a' },
  fashion: { style: 'lanyard', accent: '#2f6f6a' },
}

export default function Categories() {
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Shop by category"
        text="Pick your phone or the accessory you need — every collection is precision-fit and curated for quality."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Categories' }]}
      />
      <section className="section">
        <div className="container container--wide">
          <div className="cat-feature-grid">
            {browseCategories.map((c, i) => {
              const preview = PREVIEW[c.slug] ?? { style: 'silicone', accent: '#223a63' }
              const items = productsByCategory(c.slug)
              const sample = items[0]
              return (
                <Reveal
                  as={Link}
                  to={c.to ?? `/category/${c.slug}`}
                  key={c.slug}
                  className="cat-feature"
                  variant="up"
                  delay={(i % 3) * 0.06}
                >
                  <div className="cat-feature__media">
                    <CaseRender style={preview.style} accent={preview.accent} />
                  </div>
                  <div className="cat-feature__body">
                    <span className="cat-feature__icon">
                      <CategoryIcon kind={c.kind} size={22} />
                    </span>
                    <h3 className="cat-feature__name">{c.name}</h3>
                    <p className="cat-feature__meta">
                      {c.count} products{sample ? ` · from ₹${Math.min(...items.map((p) => p.price))}` : ''}
                    </p>
                    <span className="cat-feature__cta link-underline">
                      Shop {c.name} <Icon name="arrow-right" size={15} />
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
