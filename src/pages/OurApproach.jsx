import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { APPROACH } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'

export default function OurApproach() {
  return (
    <>
      <header className="page-head">
        <Stars />
        <div className="container">
          <Reveal>
            <span className="kicker centered">{APPROACH.kicker}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 22 }}>
              {APPROACH.h2a}
              <br />
              <span className="gold-italic">{APPROACH.h2b}</span>
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {APPROACH.steps.map((step, i) => (
              <Fragment key={step.num}>
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    style={{ width: 1, height: 56, background: 'var(--gold)', opacity: 0.4, marginLeft: 49 }}
                  />
                )}
                <Reveal delay={Math.min(i, 2)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 999,
                        border: '1px solid rgba(203,168,77,.4)',
                        background: 'radial-gradient(circle at 50% 40%, rgba(203,168,77,0.14) 0%, rgba(203,168,77,0) 70%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 30,
                        fontWeight: 500,
                        color: 'var(--gold)',
                      }}
                    >
                      {step.num}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 500, lineHeight: 1.15 }}>
                        {step.title}
                      </h2>
                      <p className="card-desc" style={{ marginTop: 8, fontSize: 15 }}>{step.desc}</p>
                    </div>
                    <span style={{ color: 'rgba(203,168,77,0.55)', flexShrink: 0 }}>
                      <Icon name={step.icon} size={26} />
                    </span>
                  </div>
                </Reveal>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <span className="ghost-word">HYRO</span>
        <Stars />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 500, lineHeight: 1.15 }}>
              Let&apos;s define <span className="gold-italic">success together.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 36 }}>
              <Link to="/partner" className="btn btn-primary">
                Partner With Us <Icon name="arrow" size={14} />
              </Link>
              <Link to="/jobs" className="btn btn-ghost">
                Submit Your Profile
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
