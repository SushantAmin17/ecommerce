import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function EmptyState({
  icon = 'bag',
  title,
  text,
  actionTo,
  actionLabel,
  children,
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <Icon name={icon} size={32} />
      </span>
      <h3 className="empty-state__title">{title}</h3>
      {text && <p className="empty-state__text">{text}</p>}
      {actionTo && (
        <Link to={actionTo} className="btn btn--gold">
          {actionLabel}
        </Link>
      )}
      {children}
    </div>
  )
}
