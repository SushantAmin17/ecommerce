import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className={last ? 'is-current' : ''}>
              {item.to && !last ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
              {!last && <Icon name="chevron-right" size={13} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
