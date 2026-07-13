import { useEffect, useRef } from 'react'

// Rotating 3D particle globe: a global talent network of gold points with
// depth-scaled brightness, great-circle arcs, and subtle mouse parallax.
export default function Constellation() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    let rot = 0
    let mx = 0, my = 0        // mouse parallax target
    let cmx = 0, cmy = 0      // eased

    const N = 220
    const pts = []
    const LINKS = 40
    const links = []

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      pts.length = 0
      links.length = 0
      // Fibonacci sphere: even distribution
      const GA = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2
        const r = Math.sqrt(1 - y * y)
        const th = GA * i
        pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, tw: Math.random() * Math.PI * 2, tws: 0.01 + Math.random() * 0.02 })
      }
      // link only near neighbors on the sphere surface: short, clean chords
      const cand = []
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j]
          const dot = a.x * b.x + a.y * b.y + a.z * b.z
          if (dot > 0.955) cand.push([i, j]) // ~ <17 degrees apart
        }
      }
      for (let i = 0; i < LINKS && cand.length; i++) {
        links.push(cand.splice(Math.floor(Math.random() * cand.length), 1)[0])
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h)

      const mobile = w < 768
      const R = mobile ? Math.min(w, h) * 0.42 : Math.min(w, h) * 0.36
      const cx = (mobile ? w * 0.5 : w * 0.78) + cmx * 14
      const cy = (mobile ? h * 0.34 : h * 0.5) + cmy * 10

      cmx += (mx - cmx) * 0.04
      cmy += (my - cmy) * 0.04

      const tilt = -0.35 + cmy * 0.06
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt)
      const cosR = Math.cos(rot), sinR = Math.sin(rot)

      // soft halo behind the globe
      const halo = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.65)
      halo.addColorStop(0, 'rgba(203, 168, 77, 0.10)')
      halo.addColorStop(0.55, 'rgba(203, 168, 77, 0.035)')
      halo.addColorStop(1, 'rgba(203, 168, 77, 0)')
      ctx.fillStyle = halo
      ctx.fillRect(cx - R * 1.8, cy - R * 1.8, R * 3.6, R * 3.6)

      // project all points
      const proj = []
      for (const p of pts) {
        // rotate around Y, then tilt around X
        const x1 = p.x * cosR + p.z * sinR
        const z1 = -p.x * sinR + p.z * cosR
        const y1 = p.y * cosT - z1 * sinT
        const z2 = p.y * sinT + z1 * cosT
        const depth = (z2 + 1) / 2 // 0 back, 1 front
        proj.push({ sx: cx + x1 * R, sy: cy + y1 * R, depth, p })
      }

      // links (behind points): faint golden arcs between linked nodes
      for (const [a, b] of links) {
        const A = proj[a], B = proj[b]
        const d = (A.depth + B.depth) / 2
        if (d < 0.35) continue
        ctx.strokeStyle = `rgba(203, 168, 77, ${0.06 + d * 0.2})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(A.sx, A.sy)
        ctx.lineTo(B.sx, B.sy)
        ctx.stroke()
      }

      // points
      for (const q of proj) {
        q.p.tw += q.p.tws
        const twinkle = 0.75 + 0.25 * Math.sin(q.p.tw)
        const dim = mobile ? 0.55 : 1
        const alpha = (0.06 + Math.pow(q.depth, 1.8) * 0.85) * twinkle * dim
        const size = 0.6 + q.depth * 1.9
        // warm front, dim back
        ctx.fillStyle = q.depth > 0.72
          ? `rgba(232, 213, 160, ${alpha})`
          : `rgba(203, 168, 77, ${alpha})`
        ctx.beginPath()
        ctx.arc(q.sx, q.sy, size, 0, Math.PI * 2)
        ctx.fill()
        // bright nodes get a tiny glow
        if (q.depth > 0.95) {
          ctx.fillStyle = `rgba(232, 213, 160, ${alpha * 0.08})`
          ctx.beginPath()
          ctx.arc(q.sx, q.sy, size * 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduced) {
        rot += 0.0016
        raf = requestAnimationFrame(frame)
      }
    }

    function onMove(e) {
      mx = (e.clientX / w - 0.5) * 2
      my = (e.clientY / h - 0.5) * 2
    }

    resize()
    init()
    frame()
    const onResize = () => { resize(); if (reduced) frame() }
    window.addEventListener('resize', onResize)
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
