import { useRef, useState } from 'react'
import { JOBS_FORM } from '../lib/content'
import { sendForm } from '../lib/sendForm'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import jobsHero from '../assets/laptopp.jpg'

const WORK_ICONS = { 'On-Site': 'radar', Hybrid: 'handshake', Remote: 'search' }

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
      <header className="page-hero" style={{ '--page-hero-image': `url(${jobsHero})` }}>
        <div className="container page-hero-inner">
          <div className="page-hero-copy">
            <Reveal>
              <span className="kicker">{JOBS_FORM.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="page-hero-title">
                {JOBS_FORM.h1a}<br />
                <span className="gold-italic">{JOBS_FORM.h1b}</span>
              </h1>
            </Reveal>
            <div className="page-hero-rule" />
            <Reveal delay={2}>
              <p className="page-hero-sub">{JOBS_FORM.sub}</p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="profile-form-section">
        <div className="container">
          <Reveal>
            <form className="profile-form-card" onSubmit={handleSubmit}>
              {/* PERSONAL DETAILS */}
              <div className="form-block">
                <div className="form-block-head">
                  <span className="form-icon-circle"><Icon name="users" size={20} /></span>
                  <span className="form-block-title">Personal Details</span>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="jobs-name">Full Name</label>
                    <input id="jobs-name" name="name" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-email">Email</label>
                    <input id="jobs-email" name="email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-phone">Phone (Optional)</label>
                    <input id="jobs-phone" name="phone" type="tel" placeholder="+20 100 000 0000" />
                  </div>
                </div>
              </div>

              {/* ROLE PREFERENCES */}
              <div className="form-block">
                <div className="form-block-head">
                  <span className="form-icon-circle"><Icon name="crosshair" size={20} /></span>
                  <span className="form-block-title">Role Preferences</span>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="jobs-industry">Industry</label>
                    <div className="select-wrap">
                      <select id="jobs-industry" name="industry" defaultValue="">
                        <option value="" disabled>All Industries</option>
                        {JOBS_FORM.industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-seniority">Seniority Level</label>
                    <div className="select-wrap">
                      <select id="jobs-seniority" name="seniority" defaultValue="">
                        <option value="" disabled>Select level</option>
                        {JOBS_FORM.seniority.map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="jobs-city">Location</label>
                    <div className="select-wrap">
                      <select id="jobs-city" name="city" defaultValue="">
                        <option value="" disabled>Preferred city</option>
                        {JOBS_FORM.cities.map((city) => <option key={city} value={city}>{city}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* WORK TYPE */}
              <div className="form-block">
                <div className="form-block-head">
                  <span className="form-icon-circle"><Icon name="radar" size={20} /></span>
                  <span className="form-block-title">Work Type</span>
                </div>
                <div className="toggle-group">
                  {JOBS_FORM.workTypes.map((wt) => (
                    <button
                      key={wt}
                      type="button"
                      className={`toggle-pill${workType === wt ? ' active' : ''}`}
                      onClick={() => setWorkType(wt)}
                    >
                      <Icon name={WORK_ICONS[wt] || 'check'} size={16} />
                      {wt}
                    </button>
                  ))}
                </div>
              </div>

              {/* CURRICULUM VITAE */}
              <div className="form-block">
                <div className="form-block-head">
                  <span className="form-icon-circle"><Icon name="upload" size={20} /></span>
                  <span className="form-block-title">Curriculum Vitae</span>
                </div>
                <div className="dropzone" onClick={() => fileRef.current && fileRef.current.click()}>
                  <Icon name="upload" size={24} />
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

              {submitted ? (
                <p style={{ textAlign: 'center', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: 24, color: 'var(--gold-deep)' }}>
                  Thank you. We&apos;ll be in touch.
                </p>
              ) : (
                <div>
                  <button type="submit" className="btn btn-primary profile-submit" disabled={sending} style={sending ? { opacity: 0.6 } : undefined}>
                    {sending ? 'Sending...' : 'Submit Profile'} <Icon name="arrow" size={15} />
                  </button>
                  {error && <p style={{ marginTop: 14, fontSize: 13, color: '#E0A9A0', textAlign: 'center' }}>{error}</p>}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
