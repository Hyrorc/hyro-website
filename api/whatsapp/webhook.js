// WhatsApp Cloud API webhook: receives messages sent to the HYRO WhatsApp
// Business number and, when someone attaches a CV, pushes it into
// RecruitCRM as a candidate (same CRM the website forms already use).
//
// Meta calls this endpoint two ways:
//   GET  - one-time webhook verification handshake (hub.challenge echo).
//   POST - every inbound event (messages, statuses, etc).
//
// Required env vars (set in Vercel, and locally in .env for `npm run dev`):
//   WHATSAPP_VERIFY_TOKEN  - a secret string you invent; must match the
//                            "Verify token" you enter in the Meta webhook config.
//   WHATSAPP_APP_SECRET    - from the Meta app's Settings > Basic > App Secret.
//                            Used to verify each POST really came from Meta.
//   WHATSAPP_ACCESS_TOKEN  - a permanent token for a System User with
//                            whatsapp_business_messaging permission.
//   WHATSAPP_PHONE_NUMBER_ID - the Phone number ID shown in the API Setup page.
//
// This must NOT let Vercel auto-parse the JSON body: signature verification
// needs the exact raw bytes Meta signed. vite.config.js's dev middleware
// mirrors this by skipping its own body-parsing for this one route.
export const config = { api: { bodyParser: false } }

import crypto from 'node:crypto'
import { createCandidate, SOURCE_WHATSAPP } from '../_recruitcrm.js'

const GRAPH_VERSION = 'v21.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

const EXT_BY_MIME = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function verifySignature(rawBody, signatureHeader, appSecret) {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false
  const expected = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
  const provided = signatureHeader.slice('sha256='.length)
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(provided, 'utf8')
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

async function downloadMedia(mediaId, token) {
  const metaRes = await fetch(`${GRAPH_BASE}/${mediaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!metaRes.ok) throw new Error(`media lookup failed: ${metaRes.status}`)
  const meta = await metaRes.json()

  const fileRes = await fetch(meta.url, { headers: { Authorization: `Bearer ${token}` } })
  if (!fileRes.ok) throw new Error(`media download failed: ${fileRes.status}`)
  const buffer = Buffer.from(await fileRes.arrayBuffer())
  return { buffer, mimeType: meta.mime_type }
}

async function sendText(to, body, token, phoneNumberId) {
  try {
    await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } }),
    })
  } catch (err) {
    console.error('WhatsApp send error:', err)
  }
}

async function handleDocumentMessage(message, from, profileName, token, phoneNumberId) {
  const doc = message.document
  try {
    const { buffer, mimeType } = await downloadMedia(doc.id, token)
    const ext = EXT_BY_MIME[mimeType] || (doc.filename?.match(/\.\w+$/)?.[0] ?? '')
    const fileName = doc.filename || `whatsapp-cv-${from}${ext}`

    const result = await createCandidate({
      fullName: profileName || `WhatsApp Candidate ${from}`,
      email: `${from}@whatsapp.hyrorc.com`,
      phone: from,
      bio: 'Submitted via WhatsApp.',
      source: SOURCE_WHATSAPP,
      cvFileName: fileName,
      cvFile: { buffer, fileName, contentType: mimeType || 'application/octet-stream' },
    })

    await sendText(
      from,
      result.ok
        ? "Thanks! We've received your CV and added you to HYRO's candidate network. We'll reach out if there's a match."
        : "Thanks for sending your CV — we've got it, but hit a snag saving it automatically. Our team will follow up directly.",
      token,
      phoneNumberId,
    )
    if (!result.ok) console.error('WhatsApp CV -> RecruitCRM push failed:', result.error)
  } catch (err) {
    console.error('WhatsApp CV processing failed:', err)
    await sendText(
      from,
      "We received your file but couldn't process it. Please make sure it's a PDF, DOC, or DOCX and try again.",
      token,
      phoneNumberId,
    )
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const params = req.query || Object.fromEntries(new URL(req.url, 'http://localhost').searchParams)
    const mode = params['hub.mode']
    const token = params['hub.verify_token']
    const challenge = params['hub.challenge']
    if (mode === 'subscribe' && token && process.env.WHATSAPP_VERIFY_TOKEN && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge)
      return
    }
    res.status(403).send('Forbidden')
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const appSecret = process.env.WHATSAPP_APP_SECRET
  if (!appSecret) {
    res.status(503).json({ error: 'WhatsApp integration is not configured' })
    return
  }

  const rawBody = await readRawBody(req)
  if (!verifySignature(rawBody, req.headers['x-hub-signature-256'], appSecret)) {
    res.status(401).json({ error: 'Invalid signature' })
    return
  }

  let payload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    res.status(400).json({ error: 'Invalid payload' })
    return
  }

  const token = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !phoneNumberId) {
    console.error('WhatsApp webhook received a message but ACCESS_TOKEN/PHONE_NUMBER_ID is not configured')
    res.status(200).json({ ok: true }) // still 200 so Meta doesn't retry forever
    return
  }

  try {
    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {}
        const contacts = value.contacts || []
        for (const message of value.messages || []) {
          const from = message.from
          const profileName = contacts.find((c) => c.wa_id === from)?.profile?.name || null

          if (message.type === 'document') {
            await handleDocumentMessage(message, from, profileName, token, phoneNumberId)
          } else {
            await sendText(
              from,
              '👋 Thanks for reaching out to HYRO! To submit your CV, just attach it here as a PDF, DOC, or DOCX file.',
              token,
              phoneNumberId,
            )
          }
        }
      }
    }
  } catch (err) {
    console.error('WhatsApp webhook processing error:', err)
  }

  res.status(200).json({ ok: true })
}
