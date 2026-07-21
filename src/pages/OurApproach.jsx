import { Link } from 'react-router-dom'
import { APPROACH } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import approachHero from '../assets/desk.jpg'

const DECO = ['users', 'search', 'checks', 'handshake', 'trend']

export default function OurApproach() {
  return (
    <>
      <header className="page-hero" style={{ '--page-hero-image': `url(${approachHero})` }}>
        <div className="container page-hero-inner">
          <div className="page-hero-copy">
            <Reveal>
              <span className="kicker">{APPROACH.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="page-hero-title">
                {APPROACH.h2a}<br />
                <span className="gold-italic">{APPROACH.h2b}</span>
              </h1>
            </Reveal>
            <div className="page-hero-rule" />
            <Reveal delay={2}>
              <p className="page-hero-sub">
                We combine industry expertise with a human-centered approach to connect you with the right talent.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="approach-timeline">
        <div className="container">
          <div className="approach-steps">
            {APPROACH.steps.map((step, i) => (
              <Reveal key={step.num} className="approach-step" delay={Math.min(i, 3)}>
                <span className="approach-num">{step.num}</span>
                <span className="approach-icon"><Icon name={step.icon} size={30} /></span>
                <div className="approach-body">
                  <h3>{step.title}</h3>
                  <span className="approach-body-rule" />
                  <p>{step.desc}</p>
                </div>
                <span className="approach-deco" aria-hidden="true"><Icon name={DECO[i]} size={40} /></span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-cta">
        <div className="container">
          <Reveal className="approach-cta-bar">
            <span className="approach-cta-icon"><Icon name="users" size={24} /></span>
            <p className="approach-cta-text">
              Our process is built on trust, expertise and commitment <em>to delivering real impact.</em>
            </p>
            <Link to="/contact" className="btn-outline-gold">
              Let&apos;s Start a Conversation <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
