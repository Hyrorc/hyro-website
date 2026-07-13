import { Link } from 'react-router-dom'
import Wordmark from './Wordmark'
import { Icon } from './Icons'
import { FOOTER } from '../lib/content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div className="footer-brand">
          <Wordmark />
          <p className="footer-blurb">{FOOTER.blurb}</p>
          <div style={{ display: 'flex', gap: 14 }}>
            <a className="social-ring" href={FOOTER.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={14} /></a>
            <a className="social-ring" href={FOOTER.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={14} /></a>
          </div>
        </div>
        <div>
          <div className="footer-head">Quick Links</div>
          {FOOTER.quickLinks.map((l) => (
            <Link key={l.label} className="footer-link" to={l.to}>{l.label}</Link>
          ))}
        </div>
        <div>
          <div className="footer-head">Industries</div>
          {FOOTER.industries.map((i) => (
            <span key={i} className="footer-link">{i}</span>
          ))}
        </div>
        <div>
          <div className="footer-head">Get in Touch</div>
          <a className="footer-link" href={`mailto:${FOOTER.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ivory)' }}>
            <span style={{ color: 'var(--gold)', display: 'inline-flex' }}><Icon name="mail" size={14} /></span>
            {FOOTER.email}
          </a>
          <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--gold)', display: 'inline-flex' }}><Icon name="pin" size={14} /></span>
            {FOOTER.location}
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>{FOOTER.copyright}</span>
          <span className="legal">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
