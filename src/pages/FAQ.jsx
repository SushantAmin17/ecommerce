import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { faqs, brand } from '../data/site'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button type="button" className="faq-item__q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{q}</span>
        <Icon name={open ? 'minus' : 'plus'} size={20} />
      </button>
      <div className="faq-item__a">
        <div className="faq-item__a-inner"><p>{a}</p></div>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <>
      <PageHeader
        eyebrow="Help centre"
        title="Frequently asked questions"
        text="Everything about orders, shipping, fit and returns. Can't find your answer? We're one message away."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
      />

      <section className="section--tight">
        <div className="container faq">
          {faqs.map((group, gi) => (
            <Reveal key={group.group} className="faq-group" variant="up" delay={gi * 0.05}>
              <h2 className="faq-group__title">{group.group}</h2>
              <div className="faq-list">
                {group.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </Reveal>
          ))}

          <div className="faq-help">
            <h3>Still have a question?</h3>
            <p>Our team replies within one business day — ask us anything.</p>
            <div className="faq-help__actions">
              <Link to="/contact" className="btn btn--gold">Contact us</Link>
              <a href={brand.phoneHref} className="btn btn--outline">
                <Icon name="phone" size={16} /> {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
