// Shared RecruitCRM helper for the HYRO website serverless functions.
//
// - createCandidate(): forwards a form submission into RecruitCRM as a candidate.
//   It never throws — a CRM outage must not break a visitor's submission.
// - listWebsiteCandidates(): reads candidates back out of RecruitCRM for the
//   admin dashboard, keeping only the ones this website created.
//
// The API token lives in the RECRUITCRM_API_TOKEN env var (never in the bundle).

const CANDIDATES_URL = 'https://api.recruitcrm.io/v1/candidates'
const REQUEST_TIMEOUT_MS = 10_000
const UPLOAD_TIMEOUT_MS = 60_000
const LIST_TIMEOUT_MS = 15_000

// Every candidate this site creates carries a source that starts with this
// prefix, so the admin can separate website submissions from the rest of the CRM.
export const SOURCE_PREFIX = 'HYRO Website'
export const SOURCE_PROFILE = `${SOURCE_PREFIX} — Submit Your Profile`
export const SOURCE_FREELANCER = `${SOURCE_PREFIX} — Become a Freelancer`
export const SOURCE_WHATSAPP = `${SOURCE_PREFIX} — WhatsApp CV`

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { first_name: 'Candidate', last_name: '-' }
  if (parts.length === 1) return { first_name: parts[0], last_name: '-' }
  return { first_name: parts[0], last_name: parts.slice(1).join(' ') }
}

function buildSummary(input) {
  const cvLine = input.cvUrl
    ? `CV (download): ${input.cvFileName ?? 'View document'} — ${input.cvUrl}`
    : input.cvFileName
      ? `CV provided: ${input.cvFileName}`
      : ''
  return [
    input.industry ? `Industry: ${input.industry}` : '',
    input.skills ? `Skills / Preferences: ${input.skills}` : '',
    input.bio ? `Notes: ${input.bio}` : '',
    input.portfolioUrl ? `Portfolio: ${input.portfolioUrl}` : '',
    cvLine,
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Forward a candidate captured on the HYRO website into RecruitCRM.
 * Always resolves to a plain result object; never throws.
 *
 * input: { fullName, email, phone?, industry?, location?, skills?, bio?,
 *          portfolioUrl?, source?, cvFile?: { buffer, fileName, contentType } }
 */
export async function createCandidate(input) {
  const token = process.env.RECRUITCRM_API_TOKEN
  if (!token) {
    return { ok: false, error: 'RECRUITCRM_API_TOKEN is not configured' }
  }

  const { first_name, last_name } = splitName(input.fullName)
  const summary = buildSummary(input)

  const payload = {
    first_name,
    last_name,
    email: input.email,
    source: input.source || SOURCE_PREFIX,
  }
  if (input.phone) payload.mobile = input.phone
  if (input.location) payload.locality = input.location
  if (input.portfolioUrl) payload.website = input.portfolioUrl
  if (input.industry) payload.tags = input.industry
  if (summary) payload.summary = summary

  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(),
    input.cvFile ? UPLOAD_TIMEOUT_MS : REQUEST_TIMEOUT_MS,
  )

  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' }
  let body
  if (input.cvFile) {
    // Multipart create so the CV lands in the candidate's resume section
    // (not just as a link inside the summary).
    const form = new FormData()
    for (const [key, value] of Object.entries(payload)) form.append(key, value)
    form.append(
      'resume',
      new Blob([new Uint8Array(input.cvFile.buffer)], { type: input.cvFile.contentType }),
      input.cvFile.fileName,
    )
    body = form
  } else {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(payload)
  }

  try {
    const res = await fetch(CANDIDATES_URL, { method: 'POST', headers, body, signal: controller.signal })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('RecruitCRM candidate create failed:', res.status, text.slice(0, 500))
      return { ok: false, status: res.status, error: text.slice(0, 500) }
    }
    const data = await res.json().catch(() => null)
    const slug = data?.slug ?? data?.data?.slug
    return { ok: true, status: res.status, slug }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('RecruitCRM request error:', message)
    return { ok: false, error: message }
  } finally {
    clearTimeout(timeout)
  }
}

// --- Reading candidates back for the admin dashboard ---

function pick(...vals) {
  for (const v of vals) {
    if (v !== undefined && v !== null && String(v).trim() !== '') return v
  }
  return null
}

function resumeUrl(candidate) {
  const r = candidate.resume
  if (!r) return null
  if (typeof r === 'string') return r
  return pick(r.file_link, r.download_url, r.url, r.link)
}

// RecruitCRM has no single "industry" field, so we infer a category from the
// candidate's role, skills, specialization and current employer. First match in
// priority order wins. This powers the "by category" breakdown in the admin.
const CATEGORY_RULES = [
  ['Technology', ['software', 'developer', 'programmer', 'full stack', 'fullstack', 'front-end', 'frontend', 'back-end', 'backend', 'devops', 'data scientist', 'data engineer', 'data analyst', 'machine learning', 'artificial intelligence', ' ai ', 'python', 'javascript', 'react', 'node.js', 'nodejs', '.net', 'c++', 'c#', ' sql', 'cyber', 'cloud', 'information technology', 'flutter', 'android', 'ios ', 'qa engineer', 'web develop', 'it support', 'system admin', 'network engineer']],
  ['Finance & Banking', ['finance', 'financial', 'accountant', 'accounting', 'accounts payable', 'accounts receivable', 'audit', ' tax ', 'treasury', 'banking', 'investment', 'credit', 'fp&a', 'valuation', 'portfolio', 'equity', 'wealth', 'actuar']],
  ['Legal', ['legal', 'lawyer', 'attorney', 'litigation', 'paralegal', 'compliance', 'law office', 'law firm']],
  ['Healthcare', ['medical', 'health', 'pharmac', 'doctor', 'nurse', 'clinical', 'dentist', 'physician']],
  ['Education', ['teacher', 'teaching', 'education', 'instructor', 'professor', 'lecturer', 'tutor', 'curriculum', 'school']],
  ['HR & Recruitment', ['human resource', 'recruit', 'talent acquisition', 'people operations', 'payroll', 'hr ', ' hr', 'total rewards', 'compensation']],
  ['Marketing & PR', ['marketing', 'brand', 'social media', 'public relations', ' pr ', 'content creat', 'seo', 'advertis', 'communications', 'media buy', 'digital market', 'copywrit', 'growth']],
  ['Design & Creative', ['graphic design', 'ui/ux', ' ux', 'ui design', 'creative director', 'illustrat', 'photoshop', 'motion graphic', 'video edit', 'animation', 'art director', 'photograph', 'videograph', 'filmmak', '3d model']],
  ['Sales & Business Dev', ['sales', 'business development', 'account manager', 'account executive', 'commercial', 'relationship manager', 'key account']],
  ['Engineering', ['mechanical', 'electrical engineer', 'civil engineer', 'industrial engineer', 'solar', 'renewable energy', 'manufacturing', 'hvac', 'automotive', 'chemical eng', 'petroleum', 'architect']],
  ['Operations & Supply Chain', ['operations', 'supply chain', 'logistics', 'procurement', 'warehouse', 'inventory', 'fulfillment', 'project manager', 'project management']],
  ['Consulting & Strategy', ['consultant', 'consulting', 'strategy', 'strategic', 'advisory']],
]

function classifyCategory({ position, specialization, skill, company }) {
  const hay = ` ${[position, specialization, skill, company].filter(Boolean).join(' ')} `.toLowerCase()
  for (const [name, keywords] of CATEGORY_RULES) {
    if (keywords.some((k) => hay.includes(k))) return name
  }
  return 'Uncategorized'
}

function normalizeCandidate(c) {
  const first = pick(c.first_name, c.firstName) || ''
  const last = pick(c.last_name, c.lastName) || ''
  const fullName = `${first} ${last}`.trim() || pick(c.name, c.full_name) || '—'
  const source = String(pick(c.source, c.candidate_source) || '')
  const position = pick(c.position, c.title, c.job_title)
  const company = pick(c.current_organization, c.company)
  const specialization = pick(c.specialization)
  const skill = pick(c.skill, c.skills, c.tags)
  return {
    id: pick(c.id, c.slug, c.candidate_id, c.email),
    slug: pick(c.slug),
    fullName,
    email: pick(c.email, c.email1) || '—',
    phone: pick(c.mobile, c.contact_number, c.phone, c.contact_number_1),
    location: pick(c.city, c.locality, c.location, c.state),
    position: position || null,
    company: company || null,
    skills: skill || null,
    experience: pick(c.work_ex_year, c.total_experience) || null,
    linkedin: pick(c.linkedin),
    profileUrl: pick(c.resource_url),
    // Auto-detected category (role/skills based) — used for the breakdown & filter.
    category: classifyCategory({ position, specialization, skill, company }),
    // Where the record came from: our website form vs added directly in the CRM.
    channel: source.startsWith(SOURCE_PREFIX) ? 'website' : 'direct',
    // Which website form produced it (only meaningful for channel === 'website').
    form: source.includes('Become a Freelancer') ? 'freelancer' : source.includes('WhatsApp') ? 'whatsapp' : 'profile',
    source,
    cvUrl: resumeUrl(c),
    createdAt: pick(c.created_on, c.createdOn, c.created_at, c.updated_on) || null,
  }
}

/**
 * Fetch every candidate in the RecruitCRM account (website submissions AND those
 * added directly by recruiters). Follows Laravel-style pagination.
 * Throws on auth/config errors so the endpoint can surface a proper status.
 */
export async function listCandidates() {
  const token = process.env.RECRUITCRM_API_TOKEN
  if (!token) {
    const err = new Error('RECRUITCRM_API_TOKEN is not configured')
    err.code = 'NO_TOKEN'
    throw err
  }

  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' }
  const out = []
  let url = CANDIDATES_URL
  let guard = 0

  while (url && guard < 200) {
    guard += 1
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), LIST_TIMEOUT_MS)
    let res
    try {
      res = await fetch(url, { headers, signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      const err = new Error(`RecruitCRM list failed: ${res.status} ${text.slice(0, 300)}`)
      err.status = res.status
      throw err
    }
    const json = await res.json().catch(() => null)
    const rows = Array.isArray(json) ? json : json?.data ?? []
    for (const row of rows) out.push(row)
    // Advance to the next page if the API paginated the result.
    url = (!Array.isArray(json) && json?.next_page_url) || null
  }

  return out
    .map(normalizeCandidate)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
}
