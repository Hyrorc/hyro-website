import { Link } from 'react-router-dom'
import { PARTNER } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'

export default function Partner() {
  return (
    <>
      <header className="page-head">
        <Stars />
        <div className="container">
          <Reveal>
            <span className="kicker centered">{PARTNER.kicker}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 22 }}>
              {PARTNER.h1a} <span className="gold-italic">{PARTNER.h1b}</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="muted" style={{ maxWidth: 620, margin: '22px auto 0', fontSize: 15, lineHeight: 1.75 }}>
              {PARTNER.sub}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 70, alignItems: 'start' }}>
            <Reveal>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.85 }}>{PARTNER.intro}</p>
            </Reveal>
            <Reveal delay={1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {PARTNER.benefits.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: 'var(--gold)', display: 'inline-flex' }}>
                      <Icon name="check" size={15} />
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--ivory)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div style={{ marginTop: 80 }}>
            <Reveal>
              <div className="form-sec-head">What to Expect</div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginTop: 28 }}>
              {PARTNER.expect.map((step, i) => (
                <Reveal key={step.num} delay={Math.min(i + 1, 4)}>
                  <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <span className="num-italic" style={{ fontSize: 34 }}>{step.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: 'var(--ivory)' }}>
                      {step.title}
                    </h3>
                    <p className="card-desc">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div
              className="card"
              style={{
                marginTop: 80,
                padding: '64px 52px',
                borderRadius: 24,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 22,
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 500, lineHeight: 1.15 }}>
                Ready when <span className="gold-italic">you are.</span>
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">
                  <Icon name="mail" size={14} /> Contact Us
                </Link>
                <span style={{ color: 'var(--gold)', letterSpacing: '0.22em', fontSize: 12 }}>
                  {PARTNER.email.toUpperCase()}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
