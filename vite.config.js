import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import adminLogin from './api/admin.js'
import adminCandidates from './api/admin/candidates.js'
import adminCv from './api/admin/cv.js'
import send from './api/send.js'
import whatsappWebhook from './api/whatsapp/webhook.js'

// Adapts a Vercel-style (req, res) serverless handler to a Vite/connect
// middleware so the /api/* functions can be exercised under `npm run dev`.
function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) return resolve({})
      try {
        resolve(JSON.parse(body))
      } catch {
        resolve(null)
      }
    })
  })
}

function vercelRes(res) {
  return {
    statusCode: 200,
    status(code) {
      this.statusCode = code
      return this
    },
    setHeader(key, value) {
      res.setHeader(key, value)
      return this
    },
    json(payload) {
      res.statusCode = this.statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(payload))
      return this
    },
    send(payload) {
      res.statusCode = this.statusCode
      res.end(payload)
      return this
    },
    end(payload) {
      res.statusCode = this.statusCode
      res.end(payload)
      return this
    },
  }
}

function mount(server, route, handler, { rawBody = false } = {}) {
  server.middlewares.use(route, async (req, res) => {
    try {
      // Routes that verify a signature over the raw request bytes (e.g. the
      // WhatsApp webhook) must read the stream themselves — pre-parsing it
      // here would consume the body and break that check.
      if (!rawBody && req.method !== 'GET' && req.method !== 'HEAD') {
        req.body = await readBody(req)
      }
      await handler(req, vercelRes(res))
    } catch (err) {
      console.error(`[dev] ${route} error:`, err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Internal error' }))
    }
  })
}

function apiDevPlugin() {
  return {
    name: 'hyro-api-dev',
    configureServer(server) {
      // Register the most specific routes first so they win the prefix match.
      mount(server, '/api/admin/candidates', adminCandidates)
      mount(server, '/api/admin/cv', adminCv)
      mount(server, '/api/admin', adminLogin)
      mount(server, '/api/send', send)
      mount(server, '/api/whatsapp/webhook', whatsappWebhook, { rawBody: true })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Make .env / .env.local values available to the serverless handlers that run
  // inside the dev middleware (ADMIN_PASSWORD, RECRUITCRM_API_TOKEN, etc.).
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of [
    'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'RECRUITCRM_API_TOKEN', 'RESEND_API_KEY',
    'WHATSAPP_VERIFY_TOKEN', 'WHATSAPP_APP_SECRET', 'WHATSAPP_ACCESS_TOKEN', 'WHATSAPP_PHONE_NUMBER_ID',
  ]) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [react(), apiDevPlugin()],
  }
})
