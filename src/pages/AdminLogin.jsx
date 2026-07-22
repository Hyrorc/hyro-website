import { useEffect, useState } from 'react'

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = window.sessionStorage.getItem('hyro-admin-token')
    if (token) onSuccess?.()
  }, [onSuccess])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Keep the password for the session so the dashboard can authorize
      // RecruitCRM reads against /api/admin/candidates.
      window.sessionStorage.setItem('hyro-admin-token', password)
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 15px',
    marginBottom: 16,
    borderRadius: 10,
    border: '1px solid rgba(245,243,240,0.12)',
    background: 'rgba(245,243,240,0.03)',
    color: 'var(--ivory)',
    fontSize: '0.95rem',
    outline: 'none',
    colorScheme: 'dark',
  }
  const labelStyle = { display: 'block', marginBottom: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,243,240,0.7)' }

  return (
    <section style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '150px 24px 80px', background: 'radial-gradient(90% 70% at 50% 0%, rgba(244,181,45,0.10), rgba(15,26,60,0) 60%), var(--navy-deep)' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 440, padding: '44px 40px', border: '1px solid rgba(245,243,240,0.08)', borderRadius: 24, background: 'rgba(245,243,240,0.02)', backdropFilter: 'blur(6px)' }}>
        <span style={{ display: 'inline-block', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>HYRO Admin</span>
        <h1 style={{ marginBottom: 8, color: 'var(--ivory)', fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Admin access</h1>
        <p style={{ marginBottom: 28, color: 'rgba(245,243,240,0.55)', fontSize: 14 }}>Sign in to manage the HYRO candidate dashboard.</p>

        <label style={labelStyle} htmlFor="admin-email">Email</label>
        <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

        <label style={labelStyle} htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...inputStyle, marginBottom: 22 }} />

        {error ? <p style={{ color: '#E0A9A0', marginBottom: 16, fontSize: 13 }}>{error}</p> : null}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px 16px', borderRadius: 999, border: 'none', background: 'linear-gradient(90deg, #D6C28C 0%, #B9974A 100%)', color: 'var(--ink)', fontWeight: 700, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}
