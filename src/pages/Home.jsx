import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import CountUp from '../components/CountUp'
import { PHOTOS } from '../lib/photos'
import { HERO, PILLARS, INDUSTRIES, STATS } from '../lib/content'

function GoldArrow() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14 C 30 8, 58 18, 64 50" />
      <path d="M50 44 L65 53 L69 37" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <Reveal>
              <span className="kicker">HR across Egypt &amp; MENA</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="hero-h1" style={{ margin: '18px 0 0' }}>
                <span style={{ display: 'block' }}>{HERO.line1}</span>
                <span className="gold-italic" style={{ display: 'inline-block', marginTop: 6 }}>{HERO.line2}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="hero-sub">{HERO.sub}</p>
            </Reveal>
            <Reveal delay={3}>
              <div className="hero-cta-grid">
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

          <Reveal delay={2}>
            <div className="hero-photo">
              <span className="accent-arrow hero-arrow" aria-hidden="true"><GoldArrow /></span>
              <img
                src={PHOTOS.heroMeeting}
                className="hero-photo-img"
                alt="A HR partner you can trust"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS — cream band */}
      <section className="section cream">
        <div className="container">
          <Reveal>
            <div className="sec-head center" style={{ marginBottom: 44 }}>
              <span className="kicker centered">Why HYRO</span>
              <h2 className="section-h2" style={{ marginTop: 16 }}>
                Built on precision,<br /><span className="gold-italic">trust, and impact.</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i + 1}>
                <div className="card" style={{ height: '100%' }}>
                  <div className="icon-ring" style={{ marginBottom: 18 }}>
                    <Icon name={p.icon} size={22} />
                  </div>
                  <div className="card-title" style={{ marginBottom: 10 }}>{p.title}</div>
                  <p className="card-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA SPLIT — human story */}
      <section className="section">
        <div className="container">
          <div className="media-split">
            <Reveal className="ms-media">
              <Photo src={PHOTOS.handshake} alt="A successful placement, sealed with a handshake" ratio="5 / 4">
                <span className="photo-badge" style={{ bottom: 18, left: 18 }}>Where talent meets opportunity</span>
              </Photo>
            </Reveal>
            <Reveal delay={1} className="ms-copy">
              <span className="kicker">Our Promise</span>
              <h2 className="section-h2" style={{ marginTop: 16 }}>
                We don&apos;t fill seats.<br />We build teams that last.
              </h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Every search starts with your goals and your culture, not a stack of resumes. We map the market,
                engage the people who truly move the needle, and hand you a shortlist you can actually act on.
              </p>
              <div className="feat-list" style={{ marginTop: 28 }}>
                <div className="feat">
                  <span className="fx"><Icon name="crosshair" size={15} /></span>
                  <span><span className="ft">Precision matching</span><span className="fd">Curated candidates aligned to your role, culture, and trajectory.</span></span>
                </div>
                <div className="feat">
                  <span className="fx"><Icon name="shield" size={15} /></span>
                  <span><span className="ft">Absolute discretion</span><span className="fd">Confidential mandates handled with complete privacy.</span></span>
                </div>
              </div>
              <div style={{ marginTop: 30 }}>
                <Link to="/approach" className="btn btn-navy">
                  See Our Approach <Icon name="arrow" size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAT BAND — navy */}
      <section className="section tight stat-band">
        <div className="container">
          <div className="stat-grid">
            {STATS.map((s) => (
              <Reveal key={s.label} className="stat-cell">
                <div className="stat-value"><CountUp value={s.value} /></div>
                <div className="stat-label" style={{ marginTop: 8 }}>{s.label}</div>
              </Reveal>
            ))}
            <Reveal className="stat-cell">
              <div className="stat-value"><CountUp value="98%" /></div>
              <div className="stat-label" style={{ marginTop: 8 }}>Client Retention</div>
            </Reveal>
          </div>
        </div>
      </section>

 
    </>
  )
}
