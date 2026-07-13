import { useRef, useState } from 'react'
import { JOBS_FORM } from '../lib/content'
import { sendForm } from '../lib/sendForm'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'

export default function Jobs() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [workType, setWorkType] = useState('On-Site')
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
        'jobs',
        {
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          industry: fd.get('industry'),
          seniority: fd.get('seniority'),
          city: fd.get('city'),
          workType,
        },
        fileRef.current && fileRef.current.files[0]
      )
      formEl.reset()
      if (fileRef.current) fileRef.current.value = ''
      setFileName('')
      setWorkType('On-Site')
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
            <span className="kicker centered">{JOBS_FORM.kicker}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 22 }}>
              {JOBS_FORM.h1a} <span className="gold-italic">{JOBS_FORM.h1b}</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="muted" style={{ maxWidth: 620, margin: '22px auto 0', fontSize: 15, lineHeight: 1.75 }}>
              {JOBS_FORM.sub}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <Reveal>
            <form className="form-card" style={{ maxWidth: 760, margin: '0 auto' }} onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Personal</div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="jobs-name">Full Name</label>
                    <input id="jobs-name" name="name" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-email">Email</label>
                    <input id="jobs-email" name="email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="jobs-phone">Phone (Optional)</label>
                  <input id="jobs-phone" name="phone" type="tel" placeholder="+20 100 000 0000" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Role Preferences</div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="jobs-industry">Industry</label>
                    <div className="select-wrap">
                      <select id="jobs-industry" name="industry" defaultValue="">
                        <option value="" disabled>All Industries</option>
                        {JOBS_FORM.industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-seniority">Seniority Level</label>
                    <div className="select-wrap">
                      <select id="jobs-seniority" name="seniority" defaultValue="">
                        <option value="" disabled>Select level</option>
                        {JOBS_FORM.seniority.map((lvl) => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-city">Location</label>
                    <div className="select-wrap">
                      <select id="jobs-city" name="city" defaultValue="">
                        <option value="" disabled>Preferred city</option>
                        {JOBS_FORM.cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-sec-head">Work Type</div>
                <div className="toggle-group">
                  {JOBS_FORM.workTypes.map((wt) => (
                    <button
                      key={wt}
                      type="button"
                      className={`toggle-pill${workType === wt ? ' active' : ''}`}
                      onClick={() => setWorkType(wt)}
                    >
                      {wt}
                    </button>
                  ))}
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
                      {sending ? 'Sending...' : 'Submit Profile'} <Icon name="arrow" size={14} />
                    </button>
                    {error && <p style={{ marginTop: 14, fontSize: 13, color: '#E0A9A0' }}>{error}</p>}
                  </>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
