// Client helper: posts a form payload to the /api/send relay.

export async function sendForm(form, fields, file) {
  const payload = { form, fields }

  if (file) {
    if (file.size > 3 * 1024 * 1024) {
      throw new Error('File is too large. Please keep your CV under 3 MB.')
    }
    payload.attachment = {
      filename: file.name,
      content: await toBase64(file),
    }
  }

  const res = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }
  return res.json()
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
