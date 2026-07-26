import { useState } from 'react'
import { BIZ_INTRO } from '../lib/content'
import { sendForm } from '../lib/sendForm'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { PHOTOS } from '../lib/photos'

export default function BusinessIntro() {
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
      await sendForm('business', {
        name: fd.get('name'),
        email: fd.get('email'),
        company: fd.get('company'),
        lookingFor: fd.get('lookingFor'),
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
          <Photo src={PHOTOS.handshake} alt="Business introductions" noFilter />
        </div>
        <div className="ph-inner">
          <div className="ph-copy">
            <Reveal>
              <span className="kicker">{BIZ_INTRO.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 style={{ marginTop: 20 }}>
                {BIZ_INTRO.h1a}<br />
                <span className="gold-italic">{BIZ_INTRO.h1b}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="muted" style={{ maxWidth: 500, marginTop: 22, fontSize: 16, lineHeight: 1.75 }}>
                {BIZ_INTRO.sub}
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="hero-icon-row">
                {BIZ_INTRO.heroIcons.map((h) => (
                  <div key={h.label} className="hero-icon-item">
                    <span className="hii-ring"><Icon name={h.icon} size={20} /></span>
                    <span>{h.label}</span>
                  </div>
                ))}
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
                <span className="hero-form-icon"><Icon name="send" size={18} /></span>
                <div>
                  <h2>{BIZ_INTRO.form.heading}</h2>
                  <p>{BIZ_INTRO.form.sub}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="biz-name">Your Name *</label>
                    <input id="biz-name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="biz-email">Work Email *</label>
                    <input id="biz-email" name="email" type="email" placeholder="name@company.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="biz-company">Company Name *</label>
                    <input id="biz-company" name="company" type="text" placeholder="Company name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="biz-looking">What Are You Looking For? *</label>
                    <div className="select-wrap">
                      <select id="biz-looking" name="lookingFor" defaultValue="" required>
                        <option value="" disabled>Select an option</option>
                        {BIZ_INTRO.lookingFor.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="biz-message">Tell Us More (Optional)</label>
                  <textarea
                    id="biz-message"
                    name="message"
                    placeholder="Provide a brief description of what you need or who you'd like to connect with."
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
            <Reveal delay={0}>
              <div className="benefit-item">
                <span className="benefit-icon"><Icon name="users" size={24} /></span>
                <div className="benefit-title">Top Talent</div>
                <p className="benefit-desc">Access to high-caliber professionals across industries.</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="benefit-item">
                <span className="benefit-icon"><Icon name="shield" size={24} /></span>
                <div className="benefit-title">Confidential &amp; Discreet</div>
                <p className="benefit-desc">Your information and searches are always protected.</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="benefit-item">
                <span className="benefit-icon"><Icon name="gauge" size={24} /></span>
                <div className="benefit-title">Fast &amp; Efficient Delivery</div>
                <p className="benefit-desc">We move quickly without compromising quality.</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="benefit-item">
                <span className="benefit-icon"><Icon name="network" size={24} /></span>
                <div className="benefit-title">Extensive Network</div>
                <p className="benefit-desc">Strong relationships across the Middle East and beyond.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
