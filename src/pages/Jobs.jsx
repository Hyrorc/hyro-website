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
      <header className="page-head page-head--photo">
        <div className="ph-media" aria-hidden="true">
          <Photo src={PHOTOS.cvDesk} alt="Unlock your potential" veil />
        </div>
        <div className="ph-inner">
          <div className="ph-copy">
            <Reveal>
              <span className="kicker">{JOBS_FORM.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 style={{ marginTop: 20 }}>
                {JOBS_FORM.h1a} <span className="gold-italic">{JOBS_FORM.h1b}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="muted" style={{ maxWidth: 500, marginTop: 22, fontSize: 16, lineHeight: 1.75 }}>
                {JOBS_FORM.sub}
              </p>
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

      <section className="profile-form-section">
        <div className="container">
          <div className="form-solo">
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
