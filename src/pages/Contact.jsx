import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { brand } from '../data/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CHANNELS = [
  { icon: 'mail', label: 'Email us', value: brand.email, href: `mailto:${brand.email}`, note: 'We reply within one business day' },
  { icon: 'phone', label: 'Call / WhatsApp', value: brand.phone, href: brand.phoneHref, note: 'Mon–Sat, 10am – 7pm IST' },
  { icon: 'pin', label: 'Shipping', value: brand.location, href: null, note: 'Dispatched within 24–48 hours' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Order help', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (!EMAIL_RE.test(form.email)) errs.email = 'Enter a valid email'
    if (form.message.trim().length < 10) errs.message = 'Tell us a little more (10+ characters)'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="We're here to help"
        title="Contact us"
        text="Questions about a case, an order, or which model fits your phone? Reach out — a real person will get back to you."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="section--tight">
        <div className="container container--wide contact">
          <div className="contact__info">
            <ul className="contact__channels">
              {CHANNELS.map((c, i) => (
                <Reveal as="li" key={c.label} className="contact-channel" variant="up" delay={i * 0.06}>
                  <span className="contact-channel__icon"><Icon name={c.icon} size={22} /></span>
                  <div>
                    <span className="contact-channel__label">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} className="contact-channel__value">{c.value}</a>
                    ) : (
                      <span className="contact-channel__value">{c.value}</span>
                    )}
                    <span className="contact-channel__note">{c.note}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="contact__social">
              <span className="eyebrow eyebrow--plain">Follow us</span>
              <div className="contact__social-row">
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="Instagram"><Icon name="instagram" size={19} /></a>
                <a href="https://wa.me/917977069466" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="WhatsApp"><Icon name="whatsapp" size={19} /></a>
                <a href={`mailto:${brand.email}`} className="footer__social-btn" aria-label="Email"><Icon name="mail" size={19} /></a>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap">
            {sent ? (
              <div className="contact__sent">
                <span className="contact__sent-icon"><Icon name="check" size={34} /></span>
                <h2>Message sent</h2>
                <p>Thanks, {form.name.split(' ')[0]}. We've received your note and will reply to {form.email} within one business day.</p>
                <button type="button" className="btn btn--outline" onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'Order help', message: '' }) }}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit} noValidate>
                <h2 className="contact__form-title">Send us a message</h2>
                <div className="checkout__row">
                  <div className="field">
                    <label htmlFor="c-name">Your name</label>
                    <input id="c-name" className="input" value={form.name} onChange={set('name')} aria-invalid={errors.name ? 'true' : undefined} />
                    {errors.name && <span className="field__error">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" className="input" value={form.email} onChange={set('email')} aria-invalid={errors.email ? 'true' : undefined} />
                    {errors.email && <span className="field__error">{errors.email}</span>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-topic">Topic</label>
                  <select id="c-topic" className="select" value={form.topic} onChange={set('topic')}>
                    <option>Order help</option>
                    <option>Find the right case</option>
                    <option>Returns & exchanges</option>
                    <option>Wholesale enquiry</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" className="textarea" value={form.message} onChange={set('message')} placeholder="How can we help?" aria-invalid={errors.message ? 'true' : undefined} />
                  {errors.message && <span className="field__error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn--lg">
                  Send message <Icon name="arrow-right" size={16} className="btn__icon" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
