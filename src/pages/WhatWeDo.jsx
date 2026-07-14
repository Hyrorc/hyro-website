import { Link } from 'react-router-dom'
import { ABOUT, STATS } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'
import CountUp from '../components/CountUp'

const ACRONYM = [
  ['H', 'Hire'],
  ['Y', 'Your'],
  ['R', 'Right'],
  ['O', 'One'],
]

export default function WhatWeDo() {
  return (
    <>
      <header className="page-head">
        <Stars />
        <div className="container">
          <Reveal>
            <span className="kicker centered">{ABOUT.kicker}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 22 }}>
              {ABOUT.h2a}
              <br />
              <span className="gold-italic">{ABOUT.h2b}</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="muted" style={{ maxWidth: 620, margin: '26px auto 0', fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>
              {ABOUT.p1}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'center' }}>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, maxWidth: 440 }}>
                {ACRONYM.map(([letter, word], i) => (
                  <div key={letter} className="letter-cell-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, '--d': `${i * 0.14}s` }}>
                    <div
                      className="card"
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        maxWidth: 88,
                        borderRadius: 16,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 38,
                        fontWeight: 500,
                        color: 'var(--gold)',
                      }}
                    >
                      {letter}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontStyle: 'italic',
                        fontSize: 22,
                        fontWeight: 500,
                        color: 'var(--ivory)',
                      }}
                    >
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="section-h2">{ABOUT.philosophyH2}</h2>
              <p className="muted" style={{ marginTop: 24, fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>
                {ABOUT.philosophyP1}
              </p>
              <p className="muted" style={{ marginTop: 18, fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>
                {ABOUT.philosophyP2}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 44, borderTop: '1px solid rgba(245,243,240,0.08)', paddingTop: 32 }}>
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      textAlign: 'center',
                      borderLeft: i > 0 ? '1px solid rgba(245,243,240,0.08)' : 'none',
                      padding: '0 12px',
                    }}
                  >
                    <div className="stat-value"><CountUp value={s.value} /></div>
                    <div className="stat-label" style={{ marginTop: 8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <span className="ghost-word">HYRO</span>
        <Stars />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 500, lineHeight: 1.15 }}>
              Let&apos;s build <span className="gold-italic">your team.</span>
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
