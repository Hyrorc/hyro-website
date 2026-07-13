import { useRef, useState } from 'react'
import { Icon } from '../components/Icons'
import { sendForm } from '../lib/sendForm'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'
import { FOOTER } from '../lib/content'

const TOPICS = [
  'Hiring through HYRO',
  'Submitting my profile',
  'Joining the freelance network',
  'Business partnerships',
  'Something else',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  async function onSubmit(e) {
    e.preventDefault()
    const formEl = e.target
    const fd = new FormData(formEl)
    setError('')
    setSending(true)
    try {
      await sendForm('contact', {
        name: fd.get('fullName'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        topic: fd.get('topic'),
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
      <header className="page-head">
        <Stars />
        <div className="container">
          <Reveal>
            <span className="kicker centered">Contact Us</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 24 }}>
              Let's <span className="gold-italic">Connect.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="muted" style={{ maxWidth: 560, margin: '26px auto 0', fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>
              Tell us what you need. We read every message and reply personally, usually within one business day.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal>
            <form ref={formRef} className="form-card" style={{ maxWidth: 760, margin: '0 auto' }} onSubmit={onSubmit}>
              <div>
                <div className="form-sec-head" style={{ marginBottom: 18 }}>Your Details</div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="c-name">Full Name</label>
                    <input id="c-name" name="fullName" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" name="email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: 20 }}>
                  <div className="field">
                    <label htmlFor="c-phone">Phone (optional)</label>
                    <input id="c-phone" name="phone" type="tel" placeholder="+20 100 000 0000" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-topic">How can we help?</label>
                    <div className="select-wrap">
                      <select id="c-topic" name="topic" defaultValue="" required>
                        <option value="" disabled>Select a topic</option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="form-sec-head" style={{ marginBottom: 18 }}>Your Message</div>
                <div className="field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    placeholder="Tell us about your goals, your team, or the role you're looking for..."
                    required
                    style={{ minHeight: 160 }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {submitted ? (
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: 'italic',
                      fontSize: 24,
                      color: 'var(--gold-soft)',
                      textAlign: 'center',
                    }}
                  >
                    Thank you. We'll be in touch.
                  </p>
                ) : (
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <button type="submit" className="btn btn-primary" disabled={sending} style={sending ? { opacity: 0.6 } : undefined}>
                      {sending ? 'Sending...' : 'Send Message'} <Icon name="arrow" size={14} />
                    </button>
                    {error && <span style={{ fontSize: 13, color: '#E0A9A0' }}>{error}</span>}
                  </span>
                )}
              </div>

              <p className="muted" style={{ fontSize: 12, fontWeight: 300, textAlign: 'center' }}>
                Prefer email? Write to us at{' '}
                <a href={`mailto:${FOOTER.email}`} style={{ color: 'var(--gold)' }}>{FOOTER.email}</a>
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
