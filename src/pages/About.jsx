import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { benefits } from '../data/site'

const VALUES = [
  { icon: 'shield', title: 'Protection first', text: 'Every case is chosen for real-world drop protection — raised lips, cushioned corners, tested materials.' },
  { icon: 'sparkle', title: 'Materials worth touching', text: 'Full-grain leather, soft-touch silicone and anti-yellow clarity — finishes that feel considered.' },
  { icon: 'wallet', title: 'Honest pricing', text: 'Premium quality without the inflated markup. Everyday prices for everyday carry.' },
  { icon: 'support', title: 'People who reply', text: 'Real humans answer within one business day. We help you find the right fit — every time.' },
]

const STATS = [
  { num: '60+', label: 'Case styles in stock' },
  { num: '10k+', label: 'Orders shipped' },
  { num: '4.9', label: 'Average rating' },
  { num: '24h', label: 'Dispatch window' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Protection, considered."
        text="Case Solutions 4U is a phone atelier built on a simple belief — the thing you hold a hundred times a day deserves to feel premium."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <section className="section">
        <div className="container container--wide story">
          <Reveal className="story__visual" variant="left">
            <div className="story__frame">
              <CaseRender style="leather" accent="#6f2a39" />
            </div>
            <div className="story__frame story__frame--sm">
              <CaseRender style="silicone" accent="#223a63" />
            </div>
          </Reveal>
          <Reveal className="story__content" variant="right" delay={0.08}>
            <span className="eyebrow">How we started</span>
            <h2 className="story__title">From a small bench to a growing atelier.</h2>
            <p className="lead">
              We started by sourcing the cases we actually wanted to carry — ones
              that balanced genuine protection with materials that felt good in the
              hand. What began as a careful edit for friends grew into a curated
              collection for phones across India.
            </p>
            <p>
              Today we stock everything from soft-touch silicone to perfumed
              leather, armoured glass to crossbody lanyards — each piece chosen or
              crafted to the same standard: protect beautifully, price honestly.
            </p>
            <Link to="/shop" className="btn">Explore the collection</Link>
          </Reveal>
        </div>
      </section>

      <section className="about-stats bg-navy on-navy">
        <div className="container container--wide">
          <ul className="about-stats__grid">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} className="about-stat" variant="up" delay={i * 0.06}>
                <span className="about-stat__num">{s.num}</span>
                <span className="about-stat__label">{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container container--wide">
          <SectionHeader align="center" eyebrow="What we stand for" title="The principles behind every case" />
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="value-card" variant="up" delay={(i % 4) * 0.06}>
                <span className="value-card__icon"><Icon name={v.icon} size={24} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <div className="about-promise">
            {benefits.map((b, i) => (
              <Reveal key={b.title} className="about-promise__item" variant="up" delay={(i % 4) * 0.05}>
                <Icon name={b.icon} size={22} />
                <strong>{b.title}</strong>
                <span>{b.text}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Reveal className="help-banner" variant="scale">
            <h2 className="help-banner__title">Ready to find your perfect case?</h2>
            <p>Browse the collection or tell us your model — we'll help you choose.</p>
            <div className="help-banner__actions">
              <Link to="/shop" className="btn btn--gold">Shop all products</Link>
              <Link to="/contact" className="btn btn--outline">Talk to us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
