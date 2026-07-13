import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import { HERO, PILLARS, INDUSTRIES } from '../lib/content'
import heroArch from '../assets/hero-arch.webp'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <Reveal delay={1}>
              <h1 className="hero-h1" style={{ margin: '0 0 24px' }}>
                <span style={{ display: 'block' }}>{HERO.line1}</span>
                <span className="gold-italic" style={{ display: 'block' }}>{HERO.line2}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="hero-sub">{HERO.sub}</p>
            </Reveal>
            <Reveal delay={3}>
              <div className="hero-ctas">
                <Link to="/jobs" className="btn btn-primary">
                  Submit Your Profile <Icon name="arrow" size={14} />
                </Link>
                <Link to="/partner" className="btn btn-ghost">
                  Hire Through HYRO
                </Link>
                <Link to="/join" className="btn btn-ghost">
                  Become a Freelancer
                </Link>
                <Link to="/partner" className="btn btn-ghost">
                  Build Partnerships
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <img src={heroArch} alt="" className="hero-art" aria-hidden="true" />
        <div className="scroll-hint">
          SCROLL
          <span className="line" />
        </div>
      </section>

      {/* PILLARS */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i + 1}>
              <div className="card" style={{ height: '100%' }}>
                <div className="icon-ring" style={{ marginBottom: 18 }}>
                  <Icon name={p.icon} size={18} />
                </div>
                <div className="card-title" style={{ marginBottom: 10 }}>{p.title}</div>
                <p className="card-desc">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* INDUSTRIES */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.36em',
                color: 'rgba(245,243,240,0.35)',
                textTransform: 'uppercase',
                marginBottom: 30,
              }}
            >
              Industries We Serve
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="ind-chip">{ind}</span>
              ))}
              <span className="ind-chip" style={{ fontStyle: 'italic', color: 'var(--gold-soft)', borderColor: 'rgba(203,168,77,0.35)' }}>
                and more
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
