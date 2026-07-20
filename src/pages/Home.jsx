import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import CountUp from '../components/CountUp'
import { PHOTOS } from '../lib/photos'
import { HERO, PILLARS, INDUSTRIES, STATS } from '../lib/content'
import heroWatch from '../assets/hero-watch.png'

export default function Home() {
  return (
    <>
      <section className="hero" style={{ '--hero-image': `url(${heroWatch})` }}>
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
                <Link to="/jobs" className="hero-action hero-action-primary">
                  <Icon name="users" size={22} />
                  <span>Submit Your Profile</span>
                  <Icon name="arrow" size={21} />
                </Link>
                <Link to="/partner" className="hero-action">
                  <Icon name="search" size={22} />
                  <span>Hire Through HYRO</span>
                  <Icon name="arrow" size={21} />
                </Link>
                <Link to="/join" className="hero-action">
                  <Icon name="award" size={22} />
                  <span>Become a Freelancer</span>
                  <Icon name="arrow" size={21} />
                </Link>
                <Link to="/partner" className="hero-action">
                  <Icon name="handshake" size={22} />
                  <span>Build Partnerships</span>
                  <Icon name="arrow" size={21} />
                </Link>
              </div>
            </Reveal>
          </div>
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
