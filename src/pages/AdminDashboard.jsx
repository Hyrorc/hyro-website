import { useCallback, useEffect, useMemo, useState } from 'react'

function getToken() {
  return window.sessionStorage.getItem('hyro-admin-token')
}

function signOut() {
  window.sessionStorage.removeItem('hyro-admin-token')
  window.location.assign('/admin')
}

function toCsv(rows) {
  const headers = ['Name', 'Category', 'Position', 'Company', 'Location', 'Email', 'Phone', 'Source', 'Experience (yrs)', 'Added', 'CV']
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push(
      [
        r.fullName,
        r.category || '',
        r.position || '',
        r.company || '',
        r.location || '',
        r.email,
        r.phone || '',
        r.channel === 'website' ? 'Website' : 'Direct',
        r.experience || '',
        r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '',
        r.cvUrl || '',
      ]
        .map(esc)
        .join(','),
    )
  }
  return lines.join('\n')
}

function StatCard({ label, value, accent }) {
  return (
    <div className="adm-stat">
      <div className="adm-stat-value" style={accent ? { color: 'var(--gold-soft)' } : undefined}>{value}</div>
      <div className="adm-stat-label">{label}</div>
    </div>
  )
}

function SourceBadge({ channel }) {
  const website = channel === 'website'
  return (
    <span
      className="adm-badge"
      style={{
        background: website ? 'rgba(185, 151, 74, 0.18)' : 'rgba(245, 243, 240, 0.08)',
        color: website ? 'var(--gold-soft)' : 'rgba(245, 243, 240, 0.7)',
      }}
      title={website ? 'Submitted through the HYRO website' : 'Added directly in Recruit CRM'}
    >
      {website ? 'Website' : 'Direct'}
    </span>
  )
}

function CvButton({ url, name, onDownload }) {
  const [busy, setBusy] = useState(false)
  if (!url) return <span style={{ color: '#9aa3b2' }}>—</span>
  return (
    <button
      type="button"
      className="adm-cv"
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        try {
          await onDownload(url, name)
        } finally {
          setBusy(false)
        }
      }}
    >
      {busy ? 'Downloading…' : 'Download'}
    </button>
  )
}

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [errorMsg, setErrorMsg] = useState('')

  // Filters
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState('all') // all | website | direct
  const [category, setCategory] = useState('all')
  const [location, setLocation] = useState('all')
  const [cvOnly, setCvOnly] = useState(false)

  const load = useCallback(async () => {
    const token = getToken()
    if (!token) {
      window.location.assign('/admin')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/admin/candidates', { headers: { Authorization: `Bearer ${token}` } })
      if (res.status === 401) {
        signOut()
        return
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Could not load candidates.')
      }
      const data = await res.json()
      setCandidates(Array.isArray(data.candidates) ? data.candidates : [])
      setStatus('ready')
    } catch (err) {
      setErrorMsg(err.message || 'Could not load candidates.')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const categoryOptions = useMemo(() => {
    const set = new Set(candidates.map((c) => c.category || 'Uncategorized'))
    return Array.from(set).sort((a, b) => (a === 'Uncategorized' ? 1 : b === 'Uncategorized' ? -1 : a.localeCompare(b)))
  }, [candidates])

  const locationOptions = useMemo(() => {
    const set = new Set(candidates.map((c) => c.location || 'Unspecified'))
    return Array.from(set).sort((a, b) => (a === 'Unspecified' ? 1 : b === 'Unspecified' ? -1 : a.localeCompare(b)))
  }, [candidates])

  // Everything except the category filter — drives both the table and the
  // category breakdown counts (so counts reflect the other active filters).
  const baseFiltered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return candidates.filter((c) => {
      if (channel !== 'all' && c.channel !== channel) return false
      if (location !== 'all' && (c.location || 'Unspecified') !== location) return false
      if (cvOnly && !c.cvUrl) return false
      if (q) {
        const hay = `${c.fullName} ${c.email} ${c.phone || ''} ${c.position || ''} ${c.company || ''} ${c.skills || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [candidates, search, channel, location, cvOnly])

  const rows = useMemo(
    () => baseFiltered.filter((c) => category === 'all' || (c.category || 'Uncategorized') === category),
    [baseFiltered, category],
  )

  const breakdown = useMemo(() => {
    const counts = new Map()
    for (const c of baseFiltered) {
      const key = c.category || 'Uncategorized'
      counts.set(key, (counts.get(key) || 0) + 1)
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  }, [baseFiltered])

  const stats = useMemo(
    () => ({
      total: candidates.length,
      website: candidates.filter((c) => c.channel === 'website').length,
      direct: candidates.filter((c) => c.channel === 'direct').length,
      withCv: candidates.filter((c) => c.cvUrl).length,
    }),
    [candidates],
  )

  async function handleDownloadCv(url, name) {
    const token = getToken()
    const res = await fetch(`/api/admin/cv?u=${encodeURIComponent(url)}`, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) {
      alert('Could not download this CV. Please try again.')
      return
    }
    const blob = await res.blob()
    const ext = { 'application/pdf': '.pdf', 'application/msword': '.doc', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx' }[blob.type] || ''
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = `${(name || 'candidate').replace(/[^a-z0-9]+/gi, '-')}-cv${ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  }

  function exportCsv() {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hyro-candidates-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const hasFilters = search || channel !== 'all' || category !== 'all' || location !== 'all' || cvOnly

  return (
    <section className="adm">
      <style>{ADMIN_CSS}</style>
      <div className="adm-wrap">
        <header className="adm-head">
          <div>
            <span className="adm-kicker">Recruit CRM · Live</span>
            <h1 className="adm-title">Admin Dashboard</h1>
            <p className="adm-sub">Every candidate in Recruit CRM — website submissions and directly-added — in one place.</p>
          </div>
          <div className="adm-actions">
            <button className="adm-btn adm-btn-ghost" onClick={load}>Refresh</button>
            <button className="adm-btn adm-btn-gold" onClick={exportCsv} disabled={rows.length === 0}>Export CSV</button>
            <button className="adm-btn adm-btn-ghost" onClick={signOut}>Sign out</button>
          </div>
        </header>

        {status === 'error' ? (
          <div className="adm-error">
            {errorMsg}
            <button className="adm-btn adm-btn-ghost" style={{ marginLeft: 12 }} onClick={load}>Try again</button>
          </div>
        ) : (
          <>
            <div className="adm-stats">
              <StatCard label="Total candidates" value={status === 'loading' ? '—' : stats.total} accent />
              <StatCard label="From the website" value={status === 'loading' ? '—' : stats.website} />
              <StatCard label="Added directly" value={status === 'loading' ? '—' : stats.direct} />
              <StatCard label="With CV attached" value={status === 'loading' ? '—' : stats.withCv} />
            </div>

            <div className="adm-panel">
              <div className="adm-panel-head">
                <h2 className="adm-h2">By category</h2>
                <span className="adm-muted">Auto-detected from role &amp; skills · click to filter the table</span>
              </div>
              <div className="adm-chips">
                <button
                  className={`adm-chip${category === 'all' ? ' is-active' : ''}`}
                  onClick={() => setCategory('all')}
                >
                  All <span className="adm-chip-n">{baseFiltered.length}</span>
                </button>
                {breakdown.map(([name, n]) => (
                  <button
                    key={name}
                    className={`adm-chip${category === name ? ' is-active' : ''}`}
                    onClick={() => setCategory(category === name ? 'all' : name)}
                  >
                    {name} <span className="adm-chip-n">{n}</span>
                  </button>
                ))}
                {breakdown.length === 0 && <span className="adm-muted">No data yet.</span>}
              </div>
            </div>

            <div className="adm-filters">
              <input
                className="adm-input"
                type="search"
                placeholder="Search name, email, phone, role, company or skills…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="adm-select" value={channel} onChange={(e) => setChannel(e.target.value)}>
                <option value="all">All sources</option>
                <option value="website">Website submissions</option>
                <option value="direct">Added directly</option>
              </select>
              <select className="adm-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All categories</option>
                {categoryOptions.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <select className="adm-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="all">All locations</option>
                {locationOptions.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <label className="adm-check">
                <input type="checkbox" checked={cvOnly} onChange={(e) => setCvOnly(e.target.checked)} />
                With CV only
              </label>
              {hasFilters && (
                <button
                  className="adm-btn adm-btn-ghost"
                  onClick={() => {
                    setSearch(''); setChannel('all'); setCategory('all'); setLocation('all'); setCvOnly(false)
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="adm-count">
              {status === 'loading' ? 'Loading…' : `Showing ${rows.length} of ${candidates.length} candidate${candidates.length === 1 ? '' : 's'}`}
            </div>

            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Source</th>
                    <th>Added</th>
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {status === 'loading' ? (
                    <tr><td colSpan="10" className="adm-empty">Loading candidates…</td></tr>
                  ) : rows.length === 0 ? (
                    <tr><td colSpan="10" className="adm-empty">No candidates match these filters.</td></tr>
                  ) : (
                    rows.map((c) => (
                      <tr key={c.id}>
                        <td className="adm-name">
                          {c.profileUrl ? (
                            <a className="adm-namelink" href={c.profileUrl} target="_blank" rel="noopener noreferrer">{c.fullName}</a>
                          ) : c.fullName}
                        </td>
                        <td>{c.category ? <span className="adm-pill">{c.category}</span> : <span className="adm-muted">—</span>}</td>
                        <td className="adm-clip" title={c.position || ''}>{c.position || '—'}</td>
                        <td className="adm-clip" title={c.company || ''}>{c.company || '—'}</td>
                        <td>{c.location || '—'}</td>
                        <td><a className="adm-mail" href={`mailto:${c.email}`}>{c.email}</a></td>
                        <td>{c.phone || '—'}</td>
                        <td><SourceBadge channel={c.channel} /></td>
                        <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
                        <td><CvButton url={c.cvUrl} name={c.fullName} onDownload={handleDownloadCv} /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const ADMIN_CSS = `
.adm { position: relative; z-index: 2; min-height: 100vh; padding: 150px 24px 100px; margin-bottom: -1px; background:
  radial-gradient(90% 80% at 50% -10%, rgba(244,181,45,0.10) 0%, rgba(15,26,60,0) 60%), var(--navy-deep); }
.adm-wrap { max-width: 1360px; margin: 0 auto; }
.adm-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; margin-bottom: 32px; }
.adm-kicker { display: inline-block; font-family: var(--font-body); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.adm-title { font-family: var(--font-display); color: var(--ivory); font-size: 46px; line-height: 1.05; margin: 0 0 8px; font-weight: 500; }
.adm-sub { color: rgba(245,243,240,0.55); margin: 0; font-size: 15px; }
.adm-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.adm-btn { font-family: var(--font-body); font-weight: 600; font-size: 14px; padding: 10px 18px; border-radius: 999px; cursor: pointer; transition: all .2s ease; }
.adm-btn:disabled { opacity: .45; cursor: not-allowed; }
.adm-btn-gold { border: none; background: var(--grad-gold); color: var(--ink); }
.adm-btn-gold:not(:disabled):hover { filter: brightness(1.06); box-shadow: 0 6px 20px rgba(185,151,74,0.30); }
.adm-btn-ghost { border: 1px solid rgba(245,243,240,0.18); background: transparent; color: var(--ivory); }
.adm-btn-ghost:hover { background: rgba(245,243,240,0.06); border-color: rgba(245,243,240,0.32); }

.adm-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.adm-stat { background: rgba(245,243,240,0.02); border: 1px solid rgba(245,243,240,0.08); border-radius: 18px; padding: 22px 24px; }
.adm-stat-value { font-family: var(--font-display); font-size: 42px; line-height: 1; color: var(--ivory); font-weight: 500; }
.adm-stat-label { margin-top: 10px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,243,240,0.42); }

.adm-panel { background: rgba(245,243,240,0.02); border: 1px solid rgba(245,243,240,0.08); border-radius: 18px; padding: 22px 24px; margin-bottom: 24px; }
.adm-panel-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.adm-h2 { font-family: var(--font-display); color: var(--ivory); font-size: 24px; margin: 0; font-weight: 500; }
.adm-muted { color: rgba(245,243,240,0.4); font-size: 13px; }
.adm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.adm-chip { font-family: var(--font-body); font-size: 13.5px; font-weight: 600; color: rgba(245,243,240,0.85); background: rgba(245,243,240,0.05); border: 1px solid rgba(245,243,240,0.08); border-radius: 999px; padding: 7px 14px; cursor: pointer; transition: all .18s ease; }
.adm-chip:hover { background: rgba(245,243,240,0.09); border-color: rgba(203,168,77,0.4); }
.adm-chip.is-active { background: var(--grad-gold); color: var(--ink); border-color: transparent; }
.adm-chip-n { display: inline-block; margin-left: 6px; font-size: 12px; opacity: .65; }
.adm-chip.is-active .adm-chip-n { opacity: .8; }

.adm-filters { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 14px; }
.adm-input, .adm-select { font-family: var(--font-body); font-size: 14px; color: var(--ivory); background: rgba(245,243,240,0.03); border: 1px solid rgba(245,243,240,0.12); border-radius: 10px; padding: 11px 13px; outline: none; transition: border-color .2s ease, background .2s ease; color-scheme: dark; }
.adm-input { flex: 1 1 280px; min-width: 220px; }
.adm-input::placeholder { color: rgba(245,243,240,0.35); }
.adm-input:focus, .adm-select:focus { border-color: rgba(203,168,77,0.6); background: rgba(203,168,77,0.04); }
.adm-select option { background: #0E1838; color: var(--ivory); }
.adm-check { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(245,243,240,0.8); cursor: pointer; user-select: none; }
.adm-check input { width: 16px; height: 16px; accent-color: var(--gold); }

.adm-count { font-size: 13px; color: rgba(245,243,240,0.45); margin-bottom: 10px; }

.adm-table-wrap { overflow-x: auto; border: 1px solid rgba(245,243,240,0.08); border-radius: 18px; background: rgba(245,243,240,0.02); }
.adm-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.adm-table thead th { text-align: left; padding: 15px 14px; color: rgba(245,243,240,0.5); font-weight: 600; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; background: rgba(245,243,240,0.03); white-space: nowrap; }
.adm-table tbody td { padding: 14px 14px; color: rgba(245,243,240,0.72); border-top: 1px solid rgba(245,243,240,0.06); vertical-align: middle; }
.adm-table tbody tr:hover { background: rgba(203,168,77,0.05); }
.adm-name { color: var(--ivory); font-weight: 600; white-space: nowrap; }
.adm-namelink { color: var(--ivory); text-decoration: none; }
.adm-namelink:hover { color: var(--gold-soft); text-decoration: underline; }
.adm-clip { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.adm-badge { display: inline-block; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
.adm-pill { display: inline-block; font-size: 12.5px; padding: 4px 10px; border-radius: 8px; background: rgba(245,243,240,0.07); color: rgba(245,243,240,0.85); white-space: nowrap; }
.adm-mail { color: rgba(245,243,240,0.72); text-decoration: none; }
.adm-mail:hover { color: var(--gold-soft); text-decoration: underline; }
.adm-cv { background: none; border: none; padding: 0; font: inherit; color: var(--gold-soft); font-weight: 600; cursor: pointer; text-decoration: underline; }
.adm-cv:disabled { color: rgba(245,243,240,0.35); cursor: default; text-decoration: none; }
.adm-empty { padding: 30px 14px; color: rgba(245,243,240,0.45); text-align: center; }

.adm-error { padding: 18px 20px; border-radius: 14px; border: 1px solid rgba(224,169,160,0.3); background: rgba(224,169,160,0.08); color: #E0A9A0; display: flex; align-items: center; flex-wrap: wrap; }

@media (max-width: 900px) { .adm-stats { grid-template-columns: repeat(2, 1fr); } .adm { padding-top: 130px; } }
@media (max-width: 560px) { .adm-stats { grid-template-columns: 1fr; } .adm-title { font-size: 34px; } }
`
