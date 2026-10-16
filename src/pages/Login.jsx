import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CaseRender from '../components/ui/CaseRender'
import Icon from '../components/ui/Icon'
import Logo from '../components/ui/Logo'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const [mode, setMode] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (mode === 'signup' && !form.name.trim()) errs.name = 'Tell us your name'
    if (!EMAIL_RE.test(form.email)) errs.email = 'Enter a valid email'
    if (form.password.length < 6) errs.password = 'Minimum 6 characters'
    if (mode === 'signup' && form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      try {
        localStorage.setItem('cs4u_demo_user', JSON.stringify({ name: form.name || 'Member', email: form.email }))
      } catch { /* ignore */ }
      navigate('/account')
    }
  }

  return (
    <section className="auth">
      <div className="auth__visual">
        <div className="auth__visual-inner">
          <Logo variant="light" size={52} />
          <h2 className="auth__visual-title">Protection, considered.</h2>
          <p>Join the atelier for early access to new drops, members-only pricing and 10% off your first order.</p>
          <ul className="auth__perks">
            <li><Icon name="check-circle" size={18} /> Track every order in one place</li>
            <li><Icon name="check-circle" size={18} /> Save your wishlist across devices</li>
            <li><Icon name="check-circle" size={18} /> Faster, pre-filled checkout</li>
          </ul>
          <div className="auth__visual-cases">
            <CaseRender style="leather" accent="#6f2a39" />
            <CaseRender style="silicone" accent="#315545" />
            <CaseRender style="clear" accent="#92b6d6" />
          </div>
        </div>
      </div>

      <div className="auth__panel">
        <div className="auth__box">
          <div className="auth__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={mode === 'signin'}
              className={`auth__tab ${mode === 'signin' ? 'is-active' : ''}`}
              onClick={() => { setMode('signin'); setErrors({}) }}
            >
              Sign in
            </button>
            <button
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth__tab ${mode === 'signup' ? 'is-active' : ''}`}
              onClick={() => { setMode('signup'); setErrors({}) }}
            >
              Create account
            </button>
          </div>

          <h1 className="auth__title">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="auth__sub">
            {mode === 'signin'
              ? 'Sign in to view orders, wishlist and more.'
              : 'It only takes a minute — and your first order gets 10% off.'}
          </p>

          <form className="auth__form" onSubmit={submit} noValidate>
            {mode === 'signup' && (
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" className="input" value={form.name} onChange={set('name')} aria-invalid={errors.name ? 'true' : undefined} />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="input" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={errors.email ? 'true' : undefined} />
              {errors.email && <span className="field__error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="auth__password">
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  className="input"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  aria-invalid={errors.password ? 'true' : undefined}
                />
                <button type="button" className="auth__eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
                  <Icon name="eye" size={18} />
                </button>
              </div>
              {errors.password && <span className="field__error">{errors.password}</span>}
            </div>
            {mode === 'signup' && (
              <div className="field">
                <label htmlFor="confirm">Confirm password</label>
                <input id="confirm" type={show ? 'text' : 'password'} className="input" value={form.confirm} onChange={set('confirm')} aria-invalid={errors.confirm ? 'true' : undefined} />
                {errors.confirm && <span className="field__error">{errors.confirm}</span>}
              </div>
            )}

            {mode === 'signin' && (
              <div className="auth__row">
                <label className="check">
                  <input type="checkbox" />
                  <span className="check__box"><Icon name="check" size={13} /></span>
                  <span className="check__label">Remember me</span>
                </label>
                <button type="button" className="link-underline auth__forgot">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="btn btn--block btn--lg">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="auth__divider"><span>or continue with</span></div>
          <div className="auth__social">
            <button type="button" className="btn btn--outline auth__social-btn">Google</button>
            <button type="button" className="btn btn--outline auth__social-btn">Apple</button>
          </div>

          <p className="auth__demo">
            <Icon name="shield" size={14} /> Demo UI — no real authentication. Details aren't sent anywhere.
          </p>
          <p className="auth__back">
            <Link to="/" className="link-underline">Back to home</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
