import { Link } from 'react-router-dom'
import { SERVICES, PARTNER } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'

export default function OurServices() {
  return (
    <>
      <header className="page-head">
        <Stars />
        <div className="container">
          <Reveal>
            <span className="kicker centered">{SERVICES.kicker}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: 22 }}>
              {SERVICES.h2a}
              <br />
              <span className="gold-italic">{SERVICES.h2b}</span>
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {SERVICES.items.map((item, i) => (
            <Reveal key={item.num} delay={i % 2 ? 1 : 0}>
              <div className="card" style={{ padding: '48px 52px', borderRadius: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 36, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                      <span className="num-italic" style={{ fontSize: 52 }}>{item.num}</span>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 500, lineHeight: 1.1 }}>
                        {item.title}
                      </h2>
                    </div>
                    <p
                      style={{
                        marginTop: 18,
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontStyle: 'italic',
                        fontSize: 19,
                        color: 'var(--gold-soft)',
                      }}
                    >
                      {item.tag}
                    </p>
                    <p className="card-desc" style={{ marginTop: 16, fontSize: 14.5 }}>{item.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="muted"
                          style={{
                            border: '1px solid rgba(203,168,77,.25)',
                            borderRadius: 999,
                            padding: '8px 18px',
                            fontSize: 11,
                            letterSpacing: '0.08em',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: 28 }}>
                      <Link to="/contact" className="btn btn-text">
                        {item.cta || 'Start a Conversation'} <Icon name="arrow" size={14} />
                      </Link>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 999,
                        border: '1px solid rgba(203,168,77,.25)',
                        background: 'radial-gradient(circle at 50% 40%, rgba(203,168,77,0.14) 0%, rgba(203,168,77,0) 70%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={item.icon} size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={1}>
            <div className="card" style={{ padding: '44px 52px', borderRadius: 24, textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 26,
                  color: 'var(--gold-soft)',
                  lineHeight: 1.4,
                }}
              >
                {SERVICES.closer}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <span className="ghost-word">HYRO</span>
        <Stars />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 500, lineHeight: 1.15 }}>
              Ready to hire <span className="gold-italic">your right one?</span>
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
