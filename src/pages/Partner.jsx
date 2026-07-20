import { PARTNER } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { PHOTOS } from '../lib/photos'

export default function Partner() {
  return (
    <>
      <header className="page-head page-head--photo">
        <div className="ph-media" aria-hidden="true">
          <Photo src={PHOTOS.cityExec} alt="Partner with HYRO" veil />
        </div>
        <div className="ph-inner">
          <div className="ph-copy">
            <Reveal>
              <span className="kicker">{PARTNER.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 style={{ marginTop: 20 }}>
                {PARTNER.h1a} <span className="gold-italic">{PARTNER.h1b}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="muted" style={{ maxWidth: 500, marginTop: 22, fontSize: 16, lineHeight: 1.75 }}>
                {PARTNER.sub}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* INTRO + BENEFITS — media split */}
      <section className="section">
        <div className="container">
          <div className="media-split">
            <Reveal className="ms-media">
              <Photo src={PHOTOS.boardroomEmpty} alt="The cost of a bad hire" ratio="5 / 4" />
            </Reveal>
            <Reveal delay={1} className="ms-copy">
              <span className="kicker">Your Talent Partner</span>
              <p className="lead" style={{ marginTop: 18 }}>{PARTNER.intro}</p>
              <div className="feat-list" style={{ marginTop: 26 }}>
                {PARTNER.benefits.map((b) => (
                  <div key={b} className="feat">
                    <span className="fx"><Icon name="check" size={15} /></span>
                    <span className="ft">{b}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT — cream */}
      <section className="section cream">
        <div className="container">
          <Reveal>
            <div className="sec-head" style={{ marginBottom: 36 }}>
              <span className="kicker">What to Expect</span>
              <h2 className="section-h2" style={{ marginTop: 14 }}>A clear, four-step engagement.</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
            {PARTNER.expect.map((step, i) => (
              <Reveal key={step.num} delay={Math.min(i + 1, 4)}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span className="num-italic" style={{ fontSize: 34 }}>{step.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 600, color: 'var(--navy)' }}>
                    {step.title}
                  </h3>
                  <p className="card-desc">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
