import { useEffect, useRef } from 'react'

// Wraps children in a fade-up-on-scroll container. delay: 0-4 (maps to .reveal-dN)
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // If already in the viewport at mount, reveal immediately (don't depend
    // on IntersectionObserver timing, which is throttled in background tabs).
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const d = delay ? ` reveal-d${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal${d} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
