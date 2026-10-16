import { Link } from 'react-router-dom'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container notfound__inner">
        <div className="notfound__visual">
          <CaseRender style="clear" accent="#92b6d6" />
        </div>
        <span className="eyebrow eyebrow--plain">Error 404</span>
        <h1 className="notfound__title">This page slipped out of its case.</h1>
        <p className="lead">
          The page you're looking for doesn't exist or has moved. Let's get you
          back to something you'll love.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn">Back to home</Link>
          <Link to="/shop" className="btn btn--outline">
            Shop all products <Icon name="arrow-right" size={16} className="btn__icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}
