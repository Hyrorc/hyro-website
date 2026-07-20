import { Link } from 'react-router-dom'
import { SERVICES } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { PHOTOS } from '../lib/photos'
import servicesBg from '../assets/services.jpg'

const SERVICE_PHOTOS = [PHOTOS.leaderWoman, PHOTOS.lounge, PHOTOS.handshake]

export default function OurServices() {
  return (
    <>
      <header className="about-hero">
        <img src={servicesBg} className="about-hero-bg-img" alt="" aria-hidden="true" loading="eager" />
        <div className="about-hero-overlay">
          <div className="container">
            <div className="about-hero-copy" style={{ textAlign: 'center', marginInline: 'auto' }}>
              <Reveal>
                <span className="kicker centered">{SERVICES.kicker}</span>
              </Reveal>
              <Reveal delay={1}>
                <h1 className="about-hero-h1" style={{ marginTop: 20 }}>
                  {SERVICES.h2a}<br />
                  <span className="gold-italic">{SERVICES.h2b}</span>
                </h1>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {SERVICES.items.map((item, i) => {
        const reverse = i % 2 === 1
        return (
          <section key={item.num} className={`section${reverse ? ' cream' : ''}`}>
            <div className="container">
              <div className={`media-split${reverse ? ' reverse' : ''}`}>
                <Reveal className="ms-media">
                  <Photo src={SERVICE_PHOTOS[i % SERVICE_PHOTOS.length]} alt={item.title} ratio="5 / 4">
                    <span className="photo-badge" style={{ top: 18, left: 18 }}>{`0${i + 1}`}</span>
                  </Photo>
                </Reveal>
                <Reveal delay={1} className="ms-copy">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="icon-ring"><Icon name={item.icon} size={22} /></span>
                    <span className="sec-index">SERVICE {item.num}</span>
                  </div>
                  <h2 className="section-h2" style={{ marginTop: 18 }}>{item.title}</h2>
                  <p style={{ marginTop: 12, fontFamily: 'var(--font-head)', fontStyle: 'italic', fontWeight: 500, fontSize: 21, color: 'var(--gold-deep)' }}>
                    {item.tag}
                  </p>
                  <p className="muted" style={{ marginTop: 16, lineHeight: 1.8 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          border: '1px solid var(--line-2)', borderRadius: 999, padding: '8px 16px',
                          fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--navy)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 26 }}>
                    <Link to={item.cta ? '/partner' : '/contact'} className="btn btn-navy">
                      {item.cta || 'Start a Conversation'} <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )
      })}

      {/* Closer + CTA on navy */}
      <section className="cta-photo">
        <div className="cta-bg">
          <Photo src={PHOTOS.strategy} alt="" />
        </div>
        <div className="container">
          <Reveal>
            <p className="section-h2" style={{ fontWeight: 700, maxWidth: 820, marginInline: 'auto', lineHeight: 1.3 }}>
              {SERVICES.closer}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 34 }}>
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
