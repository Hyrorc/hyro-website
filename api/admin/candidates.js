// Protected admin endpoint: returns every candidate this website pushed into
// RecruitCRM. Gated by the ADMIN_PASSWORD env var, sent as a Bearer token.

import { timingSafeEqual } from 'node:crypto'
import { listCandidates } from '../_recruitcrm.js'

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

  try {
    const candidates = await listCandidates()
    res.status(200).json({ candidates })
  } catch (err) {
    if (err?.code === 'NO_TOKEN') {
      res.status(503).json({ error: 'RecruitCRM is not configured' })
      return
    }
    console.error('Failed to load candidates:', err)
    res.status(502).json({ error: 'Failed to load candidates from RecruitCRM' })
  }
}
