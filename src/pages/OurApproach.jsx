import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { APPROACH } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import approachHero from '../assets/desk.jpg'

const DECO = ['users', 'search', 'checks', 'handshake', 'trend']

export default function OurApproach() {
  return (
    <>
      <header className="page-head page-head--photo">
        <div className="ph-media" aria-hidden="true">
          <Photo src={approachEvaluation} alt="A recruitment consultant carefully evaluating candidate profiles" veil eager />
        </div>
        <div className="ph-inner">
          <div className="ph-copy">
            <Reveal>
              <span className="kicker">{APPROACH.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 style={{ marginTop: 20 }}>
                {APPROACH.h2a}<br />
                <span className="gold-italic">{APPROACH.h2b}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="muted" style={{ maxWidth: 500, marginTop: 22, fontSize: 16, lineHeight: 1.75 }}>
                {APPROACH.sub}
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

      <section className="approach-timeline">
        <div className="container">
          <div className="approach-stepper">
            {APPROACH.steps.map((step, i) => (
              <Fragment key={step.num}>
                <Reveal delay={Math.min(i, 2)}>
                  <div className="step-row">
                    <div className="step-track">
                      <div className="step-node">{step.num}</div>
                      {i < APPROACH.steps.length - 1 && <div className="step-connector" aria-hidden="true" />}
                    </div>
                    <div className="step-icon-bubble">
                      <Icon name={step.icon} size={24} />
                    </div>
                    <div className="step-card">
                      <div>
                        <div className="step-title">{step.title}</div>
                        <p className="step-desc">{step.desc}</p>
                      </div>
                      <span className="step-deco"><Icon name={step.deco} size={26} /></span>
                    </div>
                  </div>
                </Reveal>
              </Fragment>
            ))}
          </div>

          <Reveal delay={2}>
            <div className="approach-cta">
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span className="approach-cta-icon"><Icon name="users" size={22} /></span>
                <p className="approach-cta-text">
                  {APPROACH.cta.text} <span className="gold-italic" style={{ color: 'var(--gold)' }}>{APPROACH.cta.emphasis}</span>
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary">{APPROACH.cta.button} <Icon name="arrow" size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
