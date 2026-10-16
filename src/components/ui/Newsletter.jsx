import { useState } from 'react'
import Icon from './Icon'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter({ variant = 'panel' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success | loading

  const submit = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('loading')
    // Frontend-only demo: simulate a request.
    setTimeout(() => setStatus('success'), 700)
  }

  if (status === 'success') {
    return (
      <div className={`newsletter newsletter--${variant} newsletter--done`}>
        <span className="newsletter__tick">
          <Icon name="check" size={20} />
        </span>
        <p>You&rsquo;re on the list. Watch your inbox for early access & 10% off.</p>
      </div>
    )
  }

  return (
    <form className={`newsletter newsletter--${variant}`} onSubmit={submit} noValidate>
      <div className="newsletter__field">
        <input
          type="email"
          className="input newsletter__input"
          placeholder="Your email address"
          value={email}
          aria-label="Email address"
          aria-invalid={status === 'error'}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
        />
        <button type="submit" className="btn btn--gold newsletter__btn" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining…' : 'Subscribe'}
          <Icon name="arrow-right" size={16} className="btn__icon" />
        </button>
      </div>
      {status === 'error' && (
        <span className="field__error newsletter__error">
          Please enter a valid email address.
        </span>
      )}
    </form>
  )
}
