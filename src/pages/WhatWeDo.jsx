import { Link } from 'react-router-dom'
import { ABOUT, STATS } from '../lib/content'
import { Icon } from '../components/Icons'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import philosophyBooks from '../assets/about-philosophy-books.png'
import rowingTeam from '../assets/about-rowing-team.png'

const ACRONYM = [
  ['H', 'Hire'],
  ['Y', 'Your'],
  ['R', 'Right'],
  ['O', 'One'],
]

export default function WhatWeDo() {
  return (
    <>
      <header className="about-name-section">
        <div className="container">
          <Reveal>
            <div className="about-name-heading">
              <span className="kicker centered">Our Name Says It All</span>
            </div>
          </Reveal>

          <div className="about-letter-grid">
            {ACRONYM.map(([letter, word], index) => (
              <Reveal key={letter} delay={index + 1}>
                <div className="about-letter-card">
                  <span className="about-letter">{letter}</span>
                  <span className="about-letter-word">{word}</span>
                  <span className="about-letter-line" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="about-stat-grid">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={index + 1} className="about-stat">
                <div className="about-stat-value"><CountUp value={stat.value} /></div>
                <div className="about-stat-label">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      <section className="about-quote-band">
        <div className="container">
          <Reveal>
            <div className="about-quote-mark">“</div>
            <blockquote>
              The right person doesn&apos;t just fill a role.<br />
              <em>They shape the future of a business.</em>
            </blockquote>
            <span className="about-quote-line" />
          </Reveal>
        </div>
      </section>

      <section className="about-editorial about-editorial-light">
        <div className="about-editorial-grid">
          <div className="about-editorial-copy">
            <Reveal>
              <span className="kicker">Our Philosophy</span>
              <h2 className="about-editorial-title">
                Our Name Is<br /><span className="gold-italic">Our Philosophy</span>
              </h2>
              <div className="about-gold-rule" />
              <p>{ABOUT.philosophyP1}</p>
              <p>{ABOUT.philosophyP2}</p>
            </Reveal>
          </div>
          <Reveal className="about-editorial-image-wrap">
            <img src={philosophyBooks} className="about-editorial-image" alt="Vintage books representing knowledge, experience, and thoughtful leadership" />
          </Reveal>
        </div>
      </section>

      <section className="about-editorial about-editorial-dark">
        <div className="about-editorial-grid about-editorial-grid-reverse">
          <Reveal className="about-editorial-image-wrap">
            <img src={rowingTeam} className="about-editorial-image" alt="A rowing team moving together with precision" />
          </Reveal>
          <div className="about-editorial-copy">
            <Reveal delay={1}>
              <span className="kicker">About Us</span>
              <h2 className="about-editorial-title">
                {ABOUT.h2a}<br /><span className="gold-italic">{ABOUT.h2b}</span>
              </h2>
              <div className="about-gold-rule" />
              <p>{ABOUT.p1}</p>
              <p>{ABOUT.philosophyP2}</p>
              <Link to="/contact" className="btn btn-primary about-contact-btn">
                Get In Touch <Icon name="arrow" size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
