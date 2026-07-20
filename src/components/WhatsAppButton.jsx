import { useLocation } from 'react-router-dom'

const WHATSAPP_URL =
  'https://wa.me/201115149500?text=Hello%20HYRO%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services.'

export default function WhatsAppButton() {
  const { pathname } = useLocation()

  if (pathname.startsWith('/admin')) return null

  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact HYRO on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3A12.9 12.9 0 0 0 5.02 22.62L3.3 29l6.53-1.67A12.95 12.95 0 1 0 16.04 3Zm0 23.7c-1.9 0-3.76-.5-5.39-1.43l-.39-.23-3.87.99 1.03-3.76-.25-.39a10.69 10.69 0 1 1 8.87 4.82Zm5.86-8.01c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.63 9.63 0 0 1-1.78-2.21c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.06 1.3 3.27.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.22-.61-.38Z"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  )
}
