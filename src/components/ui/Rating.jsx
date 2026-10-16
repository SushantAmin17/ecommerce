import Icon from './Icon'

export default function Rating({ value = 0, reviews, size = 15, showValue = false, className = '' }) {
  const rounded = Math.round(value)
  return (
    <span className={`rating ${className}`} aria-label={`Rated ${value} out of 5`}>
      <span className="rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name={i <= rounded ? 'star-filled' : 'star'} size={size} />
        ))}
      </span>
      {showValue && <span className="rating__value">{value.toFixed(1)}</span>}
      {reviews != null && <span className="rating__count">({reviews})</span>}
    </span>
  )
}
