import { useEffect, useRef } from 'react'

// Counts a stat value up from 0 when it scrolls into view.
// Accepts values like "12", "27", "5+" (numeric part animates, suffix stays).
export default function CountUp({ value, duration = 1400, className = '' }) {
  const ref = useRef(null)
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    const el = ref.current
    if (!el || target == null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
        el.textContent = Math.round(eased * target) + suffix
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // Only start once the element is FULLY inside the viewport.
    const r = el.getBoundingClientRect()
    if (r.top >= 0 && r.bottom <= window.innerHeight) {
      run()
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 1) {
          io.disconnect()
          run()
        }
      },
      { threshold: 1 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {target == null ? value : `0${suffix}`}
    </span>
  )
}
