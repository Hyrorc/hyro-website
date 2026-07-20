import { useRef, useState } from 'react'
import { JOIN_FORM } from '../lib/content'
import { sendForm } from '../lib/sendForm'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import freelanceLaptop from '../assets/freelance-cafe-laptop.png'

export default function Join() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const fileRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const formEl = e.target
    const fd = new FormData(formEl)
    setError('')
    setSending(true)
    try {
      await sendForm(
        'join',
        {
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          expertise: fd.get('expertise'),
          city: fd.get('city'),
          services: fd.get('services'),
          rate: fd.get('rate'),
          portfolio: fd.get('portfolio'),
          bio: fd.get('bio'),
        },
        fileRef.current && fileRef.current.files[0]
      )
      formEl.reset()
      if (fileRef.current) fileRef.current.value = ''
      setFileName('')
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
        <div className="container">
          <Reveal>
            <span className="kicker centered">{JOIN_FORM.kicker}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 20 }}>
              {JOIN_FORM.h1a}{' '}
              <span className="gold-italic">{JOIN_FORM.h1b}</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="muted" style={{ maxWidth: 620, margin: '22px auto 0', fontSize: 15, lineHeight: 1.75 }}>
              {JOIN_FORM.sub}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <div className="form-split">
            <Reveal className="form-aside">
              <Photo src={freelanceLaptop} alt="Join the HYRO freelance network" noFilter>
                <span className="photo-badge" style={{ top: 16, left: 16 }}>Freelance Network</span>
              </Photo>
              <div className="feat-list">
                <div className="feat"><span className="fx"><Icon name="check" size={14} /></span><span className="ft">Vetted, premium projects</span></div>
                <div className="feat"><span className="fx"><Icon name="check" size={14} /></span><span className="ft">Work on your terms</span></div>
                <div className="feat"><span className="fx"><Icon name="check" size={14} /></span><span className="ft">Trusted client introductions</span></div>
              </div>
            </Reveal>
          <Reveal>
            <form className="form-card" onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Personal</div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="join-name">Name</label>
                    <input id="join-name" name="name" type="text" placeholder="e.g. Ahmed Hassan" required />
                  </div>
                  <div className="field">
                    <label htmlFor="join-email">Email</label>
                    <input id="join-email" name="email" type="email" placeholder="ahmed@example.com" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="join-phone">Phone (Optional)</label>
                  <input id="join-phone" name="phone" type="tel" placeholder="+20 100 000 0000" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Expertise</div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="join-expertise">Field of Expertise</label>
                    <div className="select-wrap">
                      <select id="join-expertise" name="expertise" defaultValue="">
                        <option value="" disabled>Select industry</option>
                        {JOIN_FORM.expertise.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="join-city">Location</label>
                    <div className="select-wrap">
                      <select id="join-city" name="city" defaultValue="">
                        <option value="" disabled>Select city</option>
                        {JOIN_FORM.cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="join-services">Jobs / Services You Offer (comma separated)</label>
                  <input
                    id="join-services"
                    name="services"
                    type="text"
                    placeholder="e.g. UI/UX Design, Brand Strategy, Financial Modeling..."
                  />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="join-rate">Expected Rate / Salary (Optional)</label>
                    <div className="select-wrap">
                      <select id="join-rate" name="rate" defaultValue="">
                        <option value="" disabled>Select a range</option>
                        {JOIN_FORM.rates.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="join-portfolio">Portfolio / Website URL (if applicable)</label>
                    <input id="join-portfolio" name="portfolio" type="url" placeholder="https://yourportfolio.com" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Biography / Executive Summary (Optional)</div>
                <div className="field">
                  <label htmlFor="join-bio">About You</label>
                  <textarea
                    id="join-bio"
                    name="bio"
                    placeholder="Describe your background, expertise, and the value you bring..."
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Curriculum Vitae</div>
                <div className="dropzone" onClick={() => fileRef.current && fileRef.current.click()}>
                  <Icon name="upload" size={22} />
                  <div className="dz-title">{fileName || 'Drop your CV here or click to browse'}</div>
                  <div className="dz-sub">PDF, DOC or DOCX. Max 10 MB.</div>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0]
                    if (f) setFileName(f.name)
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                {submitted ? (
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--gold-soft)' }}>
                    Thank you. We&apos;ll be in touch.
                  </p>
                ) : (
                  <>
                    <button type="submit" className="btn btn-primary" disabled={sending} style={sending ? { opacity: 0.6 } : undefined}>
                      {sending ? 'Sending...' : 'Apply to Join Network'} <Icon name="arrow" size={14} />
                    </button>
                    {error && <p style={{ marginTop: 14, fontSize: 13, color: '#E0A9A0' }}>{error}</p>}
                  </>
                )}
              </div>
            </form>
          </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
