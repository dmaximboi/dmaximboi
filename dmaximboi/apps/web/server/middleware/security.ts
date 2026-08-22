import { applyCors } from '../utils/security'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const prod = process.env.NODE_ENV === 'production'

  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'X-DNS-Prefetch-Control', 'off')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()')
  setHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
  setHeader(event, 'X-Permitted-Cross-Domain-Policies', 'none')

  if (prod) {
    setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    setHeader(
      event,
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: https://i.ibb.co https://*.ibb.co",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
        "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com data:",
        "script-src 'self' 'unsafe-inline'",
        "connect-src 'self'",
      ].join('; '),
    )
  }

  applyCors(event, String(config.siteOrigin || ''))

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }

  if (prod && getRequestURL(event).pathname.startsWith('/api/')) {
    const forwarded = String(getHeader(event, 'x-forwarded-proto') || '')
    if (forwarded === 'http') {
      throw createError({ statusCode: 403, statusMessage: 'HTTPS required.' })
    }
  }
})
