// Protected CV proxy: streams a candidate's resume from RecruitCRM using the
// server's API token, so the admin can download CVs without exposing the token.
// Gated by ADMIN_PASSWORD (Bearer), same as /api/admin/candidates.

import { timingSafeEqual } from 'node:crypto'

const ALLOWED_PREFIX = 'https://api.recruitcrm.io/'

function safeEqual(a, b) {
  const ab = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const expected = (process.env.ADMIN_PASSWORD || 'hyro-admin').trim()
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined
  if (!token || !safeEqual(token, expected)) {
    res.status(401).json({ error: 'Invalid admin credentials' })
    return
  }

  const crmToken = process.env.RECRUITCRM_API_TOKEN
  if (!crmToken) {
    res.status(503).json({ error: 'RecruitCRM is not configured' })
    return
  }

  // The full RecruitCRM resume URL is passed as ?u=...; restrict to RecruitCRM
  // to prevent this endpoint from being used as an open proxy.
  const url = req.query?.u || new URL(req.url, 'http://localhost').searchParams.get('u')
  if (!url || !String(url).startsWith(ALLOWED_PREFIX)) {
    res.status(400).json({ error: 'Invalid CV url' })
    return
  }

  try {
    const upstream = await fetch(String(url), {
      headers: { Authorization: `Bearer ${crmToken}`, Accept: '*/*' },
    })
    if (!upstream.ok) {
      res.status(502).json({ error: `CV fetch failed (${upstream.status})` })
      return
    }
    const buffer = Buffer.from(await upstream.arrayBuffer())
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/octet-stream')
    const disposition = upstream.headers.get('content-disposition')
    res.setHeader('Content-Disposition', disposition || 'attachment; filename="cv"')
    res.status(200).send(buffer)
  } catch (err) {
    console.error('CV proxy error:', err)
    res.status(502).json({ error: 'Could not download CV' })
  }
}
