import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import CaseRender from '../components/ui/CaseRender'
import Reveal from '../components/ui/Reveal'
import Rating from '../components/ui/Rating'
import SectionHeader from '../components/ui/SectionHeader'
import ProductCard from '../components/product/ProductCard'
import CategoryIcon from '../components/ui/CategoryIcon'
import { browseCategories } from '../data/categories'
import { benefits, testimonials } from '../data/site'
import { newArrivals, bestSellers, featuredProducts } from '../data/products'

function Hero() {
  const heroCases = [
    { style: 'leather', accent: '#6f2a39' },
    { style: 'silicone', accent: '#223a63' },
    { style: 'diamond', accent: '#e4b7b2' },
  ]
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container container--wide hero__inner">
        <div className="hero__content">
          <Reveal as="span" className="eyebrow" variant="fade">
            Case Solutions 4U — Phone Atelier
          </Reveal>
          <Reveal as="h1" className="hero__title" variant="up" delay={0.05}>
            Premium covers that <em>speak for you.</em>
          </Reveal>
          <Reveal as="p" className="lead hero__lead" variant="up" delay={0.12}>
            Trendy cases and accessories for the phones you actually carry —
            protection that lasts, at prices made for everyday.
          </Reveal>
          <Reveal className="hero__cta" variant="up" delay={0.18}>
            <Link to="/shop" className="btn btn--lg">
              Shop all cases <Icon name="arrow-right" size={17} className="btn__icon" />
            </Link>
            <Link to="/categories" className="btn btn--outline btn--lg">
              Browse by phone
            </Link>
          </Reveal>
          <Reveal className="hero__trust" variant="fade" delay={0.26}>
            <div className="hero__trust-rating">
              <Rating value={5} size={16} />
              <span>
                <strong>4.9/5</strong> from 900+ reviews
              </span>
            </div>
            <span className="hero__trust-div" />
            <p>Free shipping over ₹499 · 7-day returns</p>
          </Reveal>
        </div>

        <Reveal className="hero__stage" variant="scale" delay={0.1}>
          <span className="hero__arc" aria-hidden="true" />
          <span className="hero__tag hero__tag--colors">17 colourways</span>
          <span className="hero__tag hero__tag--mag">
            <Icon name="shield" size={15} /> MagSafe ready
          </span>
          <div className="hero__fan">
            {heroCases.map((c, i) => (
              <div key={i} className={`hero__fan-item hero__fan-item--${i}`}>
                <CaseRender style={c.style} accent={c.accent} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function BenefitsBar() {
  return (
    <section className="benefits-bar">
      <div className="container container--wide">
        <ul className="benefits-bar__grid">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} className="benefit" variant="up" delay={i * 0.06}>
              <span className="benefit__icon">
                <Icon name={b.icon} size={24} />
              </span>
              <div>
                <h3 className="benefit__title">{b.title}</h3>
                <p className="benefit__text">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CategoryShowcase() {
  return (
    <section className="section">
      <div className="container container--wide">
        <SectionHeader
          align="center"
          eyebrow="Shop by category"
          title="Find the perfect fit for your device"
          text="From the latest flagships to everyday essentials — browse by model or by what you need."
        />
        <div className="cat-grid">
          {browseCategories.map((c, i) => (
            <Reveal
              as={Link}
              to={c.to ?? `/category/${c.slug}`}
              key={c.slug}
              className={`cat-card cat-card--${c.tone}`}
              variant="up"
              delay={(i % 5) * 0.05}
            >
              <span className="cat-card__icon">
                <CategoryIcon kind={c.kind} size={28} />
              </span>
              <div className="cat-card__text">
                <h3 className="cat-card__name">{c.name}</h3>
                <p className="cat-card__meta">{c.count} products</p>
              </div>
              <span className="cat-card__go">
                <Icon name="arrow-right" size={16} />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ShopByPhone() {
  const panels = [
    {
      title: 'iPhone',
      sub: 'iPhone 16 · 15 · 14 · 13',
      to: '/iphone',
      cases: [
        { style: 'silicone', accent: '#223a63' },
        { style: 'leather', accent: '#14161b' },
        { style: 'clear', accent: '#92b6d6' },
      ],
      tone: 'navy',
    },
    {
      title: 'Samsung',
      sub: 'Galaxy S & A series',
      to: '/category/samsung',
      cases: [
        { style: 'carbon', accent: '#33383f' },
        { style: 'silicone', accent: '#315545' },
        { style: 'clear', accent: '#b3a4d2' },
      ],
      tone: 'gold',
    },
  ]
  return (
    <section className="section bg-ivory">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Shop by phone"
          title="Built for your exact model"
          text="Precision-cut cases with raised camera lips and tactile buttons — made to fit like they were meant to."
          link="/categories"
          linkLabel="All devices"
        />
        <div className="phone-split">
          {panels.map((p, i) => (
            <Reveal
              as={Link}
              to={p.to}
              key={p.title}
              className={`phone-panel phone-panel--${p.tone}`}
              variant="up"
              delay={i * 0.08}
            >
              <div className="phone-panel__head">
                <div>
                  <h3 className="phone-panel__title">{p.title}</h3>
                  <p className="phone-panel__sub">{p.sub}</p>
                </div>
                <span className="phone-panel__cta link-underline">
                  See all <Icon name="arrow-right" size={15} />
                </span>
              </div>
              <div className="phone-panel__cases">
                {p.cases.map((c, j) => (
                  <div className="phone-panel__case" key={j}>
                    <CaseRender style={c.style} accent={c.accent} />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductRail({ eyebrow, title, text, link, items }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <SectionHeader eyebrow={eyebrow} title={title} text={text} link={link} />
        <div className="product-grid">
          {items.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} variant="up" delay={(i % 4) * 0.06}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CarryBanner() {
  return (
    <section className="carry-banner bg-navy on-navy">
      <div className="carry-banner__glow" aria-hidden="true" />
      <div className="container container--wide carry-banner__inner">
        <Reveal className="carry-banner__text" variant="left">
          <span className="eyebrow">Upgrade your everyday carry</span>
          <h2 className="carry-banner__title">
            MagSafe power, perfumed leather &amp; more — built for life on the move.
          </h2>
          <p>
            Accessories that keep up with your day: fast-charge power banks,
            crossbody lanyard cases and armoured glass. Carry smarter.
          </p>
          <Link to="/shop" className="btn btn--gold btn--lg">
            Shop accessories <Icon name="arrow-right" size={17} className="btn__icon" />
          </Link>
        </Reveal>
        <Reveal className="carry-banner__visual" variant="right" delay={0.1}>
          <div className="carry-banner__case carry-banner__case--a">
            <CaseRender style="powerbank" accent="#223a63" />
          </div>
          <div className="carry-banner__case carry-banner__case--b">
            <CaseRender style="lanyard" accent="#2f6f6a" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function BrandStory() {
  return (
    <section className="section">
      <div className="container container--wide story">
        <Reveal className="story__visual" variant="left">
          <div className="story__frame">
            <CaseRender style="leather" accent="#6f2a39" />
          </div>
          <div className="story__frame story__frame--sm">
            <CaseRender style="diamond" accent="#92b6d6" />
          </div>
          <span className="story__badge">
            <span className="story__badge-num">60+</span>
            <span className="story__badge-label">styles in stock</span>
          </span>
        </Reveal>
        <Reveal className="story__content" variant="right" delay={0.08}>
          <span className="eyebrow">Our story</span>
          <h2 className="story__title">
            Protection, considered. Designed in India, built to last.
          </h2>
          <p className="lead">
            Case Solutions 4U began with a simple belief: the thing you hold a
            hundred times a day deserves to feel considered. We curate and craft
            cases that balance real protection with materials worth touching.
          </p>
          <ul className="story__points">
            {[
              'Premium materials — full-grain leather, soft-touch silicone, anti-yellow clarity',
              'Precision-engineered fit for every supported model',
              'Honest everyday pricing, no inflated markups',
            ].map((t) => (
              <li key={t}>
                <Icon name="check-circle" size={20} /> {t}
              </li>
            ))}
          </ul>
          <Link to="/about" className="link-underline">
            Read our full story <Icon name="arrow-right" size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section bg-ivory testimonials">
      <div className="container container--wide">
        <SectionHeader
          align="center"
          eyebrow="Loved by customers"
          title="Carried with confidence"
          text="Sample reviews shown for demonstration."
        />
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              key={t.name}
              className="testimonial"
              variant="up"
              delay={(i % 4) * 0.06}
            >
              <Icon name="quote" size={30} className="testimonial__quote" />
              <Rating value={t.rating} size={15} />
              <blockquote className="testimonial__text">{t.quote}</blockquote>
              <figcaption className="testimonial__by">
                <span className="testimonial__avatar">{t.name.charAt(0)}</span>
                <span>
                  <strong>{t.name}</strong>
                  <em>{t.detail}</em>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedStrip() {
  return (
    <section className="section section--tight">
      <div className="container container--wide">
        <SectionHeader
          eyebrow="Editor's picks"
          title="Pieces worth the double-take"
          link="/shop?tag=featured"
          linkLabel="Shop featured"
        />
        <div className="product-grid">
          {featuredProducts.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} variant="up" delay={(i % 4) * 0.06}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HelpBanner() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="help-banner" variant="scale">
          <h2 className="help-banner__title">Not sure which case fits your phone?</h2>
          <p>
            Tell us your model and we&rsquo;ll help you find the right one — we
            reply within one business day.
          </p>
          <div className="help-banner__actions">
            <Link to="/contact" className="btn btn--gold">
              Ask our team
            </Link>
            <Link to="/shop" className="btn btn--outline">
              Browse all products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsBar />
      <CategoryShowcase />
      <ShopByPhone />
      <ProductRail
        eyebrow="Just landed"
        title="New arrivals"
        text="The latest cases and accessories, fresh off the bench."
        link="/shop?tag=new-arrival"
        items={newArrivals}
      />
      <CarryBanner />
      <ProductRail
        eyebrow="Most wanted"
        title="Best sellers"
        text="The pieces our customers keep coming back for."
        link="/shop?tag=bestseller"
        items={bestSellers}
      />
      <BrandStory />
      <Testimonials />
      <FeaturedStrip />
      <HelpBanner />
    </>
  )
}
