import { Link } from 'react-router-dom'
import Icon from './Icon'
import Reveal from './Reveal'

export default function SectionHeader({
  eyebrow,
  title,
  text,
  align = 'left', // left | center
  link,
  linkLabel = 'View all',
  className = '',
}) {
  return (
    <Reveal
      className={`section-header section-header--${align} ${className}`}
      variant="up"
    >
      <div className="section-header__text">
        {eyebrow && (
          <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`}>
            {eyebrow}
          </span>
        )}
        {title && <h2 className="section-header__title">{title}</h2>}
        {text && <p className="section-header__sub">{text}</p>}
      </div>
      {link && (
        <Link to={link} className="link-underline section-header__link">
          {linkLabel}
          <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </Reveal>
  )
}
