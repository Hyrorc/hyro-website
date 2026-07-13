import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Wordmark from './Wordmark'
import { Icon } from './Icons'
import { NAV_LINKS } from '../lib/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" aria-label="HYRO home"><Wordmark /></Link>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
            <NavLink className="nav-cta" to="/contact">Let's Connect</NavLink>
          </nav>
          <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Icon name="menu" size={24} />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? ' open' : ''}`}>
        <button className="drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <Icon name="x" size={26} />
        </button>
        {NAV_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        <NavLink className="nav-cta" to="/contact" onClick={() => setOpen(false)}>Let's Connect</NavLink>
      </div>
    </>
  )
}
