import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import Newsletter from '../ui/Newsletter'
import { footerNav, policyLinks, brand } from '../../data/site'

export default function Footer() {
  return (
    <footer className="footer bg-navy on-navy">
      <div className="footer__newsletter">
        <div className="container container--wide footer__newsletter-inner">
          <div className="footer__newsletter-text">
            <span className="eyebrow">Join the atelier</span>
            <h2 className="footer__newsletter-title">
              Early access, new drops &amp; 10% off your first order.
            </h2>
          </div>
          <Newsletter variant="footer" />
        </div>
      </div>

      <div className="container container--wide footer__main">
        <div className="footer__brand">
          <Logo variant="light" size={56} />
          <p className="footer__blurb">
            We make high-quality cases and covers that protect your device and
            turn heads — designed in India, built to last.
          </p>
          <div className="footer__contact">
            <a href={`mailto:${brand.email}`} className="footer__contact-link">
              <Icon name="mail" size={17} /> {brand.email}
            </a>
            <a href={brand.phoneHref} className="footer__contact-link">
              <Icon name="phone" size={17} /> {brand.phone}
            </a>
            <span className="footer__contact-link">
              <Icon name="pin" size={17} /> {brand.location}
            </span>
          </div>
          <div className="footer__social">
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="footer__social-btn">
              <Icon name="instagram" size={19} />
            </a>
            <a href={`https://wa.me/917977069466`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer__social-btn">
              <Icon name="whatsapp" size={19} />
            </a>
            <a href={`mailto:${brand.email}`} aria-label="Email" className="footer__social-btn">
              <Icon name="mail" size={19} />
            </a>
          </div>
        </div>

        <div className="footer__cols">
          {footerNav.map((col) => (
            <nav key={col.heading} className="footer__col" aria-label={col.heading}>
              <h3 className="footer__col-title">{col.heading}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer__bar">
        <div className="container container--wide footer__bar-inner">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <ul className="footer__policies">
            {policyLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="footer__pay">
            <Icon name="lock" size={14} /> Secure checkout · UPI · Cards · COD
          </p>
        </div>
      </div>
    </footer>
  )
}
