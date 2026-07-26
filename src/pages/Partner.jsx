import { useState } from 'react'
import { PARTNER } from '../lib/content'
import { sendForm } from '../lib/sendForm'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { PHOTOS } from '../lib/photos'

export default function Partner() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const formEl = e.target
    const fd = new FormData(formEl)
    setError('')
    setSending(true)
    try {
      await sendForm('partner', {
        name: fd.get('name'),
        email: fd.get('email'),
        company: fd.get('company'),
        jobTitle: fd.get('jobTitle'),
        message: fd.get('message'),
      })
      formEl.reset()
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className="page-head page-head--photo">
        <div className="ph-media" aria-hidden="true">
          <Photo src={PHOTOS.cityExec} alt="Partner with HYRO" noFilter />
        </div>
        <div className="ph-inner">
          <div className="ph-copy">
            <Reveal>
              <span className="kicker">{PARTNER.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 style={{ marginTop: 20 }}>
                {PARTNER.h1a} <span className="gold-italic">{PARTNER.h1b}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="muted" style={{ maxWidth: 500, marginTop: 22, fontSize: 16, lineHeight: 1.75 }}>
                {PARTNER.sub}
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="ph-ctas">
                <a href={`mailto:${PARTNER.email}`} className="btn btn-primary">
                  <Icon name="send" size={14} /> {PARTNER.ctaPrimary}
                </a>
                <a href={PARTNER.phoneHref} className="btn btn-ghost">
                  <Icon name="phone" size={14} /> {PARTNER.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="ph-curve" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,88 1080,88 1440,40 L1440,80 L0,80 Z" style={{ fill: 'var(--paper)' }} />
            <path d="M0,40 C360,88 1080,88 1440,40" style={{ fill: 'none', stroke: 'var(--gold)', strokeWidth: 2 }} />
          </svg>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <Reveal className="hero-form-wrap">
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="hero-form-head">
                <span className="hero-form-icon"><Icon name="mail" size={19} /></span>
                <div>
                  <h2>{PARTNER.form.heading}</h2>
                  <p>{PARTNER.form.sub}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="partner-name">Full Name *</label>
                    <input id="partner-name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="partner-email">Work Email *</label>
                    <input id="partner-email" name="email" type="email" placeholder="name@company.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="partner-company">Company Name *</label>
                    <input id="partner-company" name="company" type="text" placeholder="Company name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="partner-title">Job Title</label>
                    <input id="partner-title" name="jobTitle" type="text" placeholder="Your job title" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="partner-message">How Can We Help You? *</label>
                  <textarea
                    id="partner-message"
                    name="message"
                    placeholder="Tell us about the role, team or challenge you're looking to solve."
                    required
                  />
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 8 }}>
                {submitted ? (
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--gold-soft)' }}>
                    Thank you. We&apos;ll be in touch.
                  </p>
                ) : (
                  <>
                    <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%', ...(sending ? { opacity: 0.6 } : {}) }}>
                      {sending ? 'Sending...' : 'Send Message'} <Icon name="arrow" size={14} />
                    </button>
                    {error && <p style={{ marginTop: 14, fontSize: 13, color: '#E0A9A0' }}>{error}</p>}
                  </>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="benefits-strip">
        <div className="container">
          <Reveal>
            <span className="kicker centered">Why Work With HYRO</span>
          </Reveal>
          <div className="benefits-grid">
            {PARTNER.benefits.map((b, i) => (
              <Reveal key={b.title} delay={Math.min(i, 3)}>
                <div className="benefit-item">
                  <span className="benefit-icon"><Icon name={b.icon} size={24} /></span>
                  <div className="benefit-title">{b.title}</div>
                  <p className="benefit-desc">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
