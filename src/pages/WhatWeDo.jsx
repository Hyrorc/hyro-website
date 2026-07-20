import { Link } from 'react-router-dom'
import { ABOUT, STATS } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import CountUp from '../components/CountUp'
import { PHOTOS } from '../lib/photos'
import aboutBg from '../assets/about-hero-bg.jpg'

const ACRONYM = [
  ['H', 'Hire'],
  ['Y', 'Your'],
  ['R', 'Right'],
  ['O', 'One'],
]

export default function WhatWeDo() {
  return (
    <>
      {/* HERO — skyline background with layered content */}
      <header className="about-hero">
        <img src={aboutBg} className="about-hero-bg-img" alt="" aria-hidden="true" loading="eager" />
        <div className="about-hero-overlay">
          <div className="container">
            <div className="about-hero-copy">
              <Reveal>
                <span className="kicker">{ABOUT.kicker}</span>
              </Reveal>
              <Reveal delay={1}>
                <h1 className="about-hero-h1">
                  Here&apos;s what<br />
                  <span className="gold-italic">sets us apart.</span>
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="about-hero-lead">{ABOUT.p1}</p>
              </Reveal>
              <Reveal delay={3}>
                <div className="hero-ctas">
                  <Link to="/approach" className="btn btn-primary">
                    Our Approach <Icon name="arrow" size={14} />
                  </Link>
                  <Link to="/partner" className="btn btn-ghost">
                    Partner With Us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* PHILOSOPHY — media split */}
      <section className="section">
        <div className="container">
          <div className="media-split">
            <Reveal className="ms-media">
              <Photo src={PHOTOS.leaderWoman} alt="Shaping the future of leadership" ratio="5 / 4" />
            </Reveal>
            <Reveal delay={1} className="ms-copy">
              <span className="kicker">Our Name Is Our Philosophy</span>
              <h2 className="section-h2" style={{ marginTop: 16 }}>{ABOUT.philosophyH2}</h2>
              <p className="lead" style={{ marginTop: 20 }}>{ABOUT.philosophyP1}</p>
              <p className="muted" style={{ marginTop: 16 }}>{ABOUT.philosophyP2}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 460, marginTop: 32 }}>
                {ACRONYM.map(([letter, word], i) => (
                  <div key={letter} className="letter-cell-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, '--d': `${i * 0.12}s` }}>
                    <div
                      className="card"
                      style={{
                        width: '100%', aspectRatio: '1', maxWidth: 82, borderRadius: 14, padding: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: 40, fontWeight: 500, color: 'var(--gold-deep)',
                      }}
                    >
                      {letter}
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="section tight stat-band">
        <div className="container">
          <div className="stat-grid" style={{ gridTemplateColumns: `repeat(${STATS.length}, 1fr)` }}>
            {STATS.map((s) => (
              <Reveal key={s.label} className="stat-cell">
                <div className="stat-value"><CountUp value={s.value} /></div>
                <div className="stat-label" style={{ marginTop: 8 }}>{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE — cream */}
      <section className="section cream">
        <div className="container" style={{ textAlign: 'center', maxWidth: 860, marginInline: 'auto' }}>
          <Reveal>
            <span style={{ color: 'var(--gold)', fontSize: 56, fontFamily: 'var(--font-serif)', lineHeight: 0.5, display: 'inline-block' }}>&ldquo;</span>
            <p className="section-h2" style={{ fontWeight: 700, lineHeight: 1.25, marginTop: 10 }}>
              {ABOUT.quote}
            </p>
            <p className="kicker centered" style={{ marginTop: 28 }}>{ABOUT.quoteAttr}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <span className="ghost-word">HYRO</span>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <h2 className="section-h2">
              Let&apos;s build <span className="gold-italic">your team.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 32 }}>
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
