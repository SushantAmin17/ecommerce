import Breadcrumbs from './Breadcrumbs'

// Compact editorial header for inner pages.
export default function PageHeader({ eyebrow, title, text, crumbs, align = 'left', children }) {
  return (
    <section className={`page-header bg-ivory page-header--${align}`}>
      <div className="container page-header__inner">
        {crumbs && <Breadcrumbs items={crumbs} className="page-header__crumbs" />}
        {eyebrow && <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`}>{eyebrow}</span>}
        <h1 className="page-header__title">{title}</h1>
        {text && <p className="lead page-header__text">{text}</p>}
        {children}
      </div>
    </section>
  )
}
