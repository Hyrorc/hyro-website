import { useEffect, useRef } from 'react'

// Site-wide star sky: fixed canvas behind all content.
// Tiny ivory/gold stars, gentle twinkle, ultra-slow drift, scroll parallax.
export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    let scroll = 0

    const stars = []

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    function init() {
      stars.length = 0
      const count = Math.round((w * h) / 6500) // density-based (~200 on 1440x900)
      for (let i = 0; i < count; i++) {
        const layer = Math.random() // 0 far, 1 near
        stars.push({
          x: Math.random() * w,
          y: Math.random() * (h * 1.4),
          r: 0.4 + layer * 1.3,
          layer: 0.15 + layer * 0.55,          // parallax factor
          base: 0.08 + Math.random() * 0.45,    // base alpha
          warm: Math.random() < 0.3,            // 30% gold, rest ivory
          tw: Math.random() * Math.PI * 2,
          tws: 0.004 + Math.random() * 0.014,
          vx: (Math.random() - 0.5) * 0.016,
        })
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.tw += s.tws
        if (!reduced) s.x += s.vx
        if (s.x < -2) s.x = w + 2
        if (s.x > w + 2) s.x = -2

        // parallax: wrap within extended band
        let y = s.y - scroll * s.layer
        y = ((y % (h * 1.4)) + h * 1.4) % (h * 1.4) - h * 0.2

        const a = s.base * (0.55 + 0.45 * Math.sin(s.tw))
        ctx.fillStyle = s.warm
          ? `rgba(232, 213, 160, ${a})`
          : `rgba(245, 243, 240, ${a})`
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(frame)
    }

    const onScroll = () => { scroll = window.scrollY }

    resize()
    frame()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
