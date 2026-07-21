import { Link } from 'react-router-dom'
import { INDUSTRIES, SERVICES } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import servicesBg from '../assets/services.jpg'
import selectiveSearch from '../assets/desk.jpg'
import freelanceLaptop from '../assets/freelance-cafe-laptop.png'
import businessBridges from '../assets/business-bridges.png'
import tailoredLaptops from '../assets/tailored-two-laptops.png'

const SERVICE_IMAGES = [
  { src: selectiveSearch, alt: 'A recruitment consultant evaluating candidate profiles' },
  { src: freelanceLaptop, alt: 'A laptop ready for independent work in a modern café' },
  { src: businessBridges, alt: 'Aerial bridges representing valuable business connections' },
  { src: tailoredLaptops, alt: 'A collaborative HYRO workshop using two laptops' },
]

export default function OurServices() {
  return (
    <>
      <header className="services-hero" style={{ '--services-hero-image': `url(${servicesBg})` }}>
        <div className="container services-hero-content">
          <div className="services-hero-copy">
            <Reveal>
              <span className="kicker">{SERVICES.kicker}</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="services-hero-title">
                {SERVICES.h2a}<br />
                <span className="gold-italic">{SERVICES.h2b}</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="services-hero-description">
                We combine intelligence, experience, and a trusted network to deliver talent and opportunities that drive real impact.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="services-mosaic-section">
        <div className="container">
          <div className="services-mosaic">
            {SERVICES.items.map((item, index) => {
              const image = SERVICE_IMAGES[index]
              const reverse = index % 2 === 1

              return (
                <Reveal key={item.num} className={`service-row${reverse ? ' service-row-reverse' : ''}`}>
                  <div className="service-row-image">
                    <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                    <div className="service-row-image-shade" />
                  </div>
                  <article className="service-row-content">
                    <span className="service-row-number">{item.num}</span>
                    <h2>{item.title}</h2>
                    <p className="service-row-tag">{item.tag}</p>
                    <p className="service-row-description">{item.desc}</p>
                    <div className="service-row-tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <Link to={item.actionTo} className="service-action-pill">
                      <Icon name={item.icon} size={17} />
                      <span>{item.actionLabel}</span>
                      <Icon name="arrow" size={17} />
                    </Link>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section cream" style={{ textAlign: 'center' }}>
        <div className="container">
          <Reveal>
            <span className="kicker centered">Industries We Serve</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 30 }}>
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="ind-chip">{ind}</span>
              ))}
              <span className="ind-chip" style={{ color: 'var(--gold-deep)', borderColor: 'rgba(244,181,45,0.55)' }}>
                and more
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
