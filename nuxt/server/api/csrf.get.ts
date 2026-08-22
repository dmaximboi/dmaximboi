import { csrfStore } from '../utils/csrf'
import { clientIp, csrfLimited, isLocked, originAllowed } from '../utils/security'

export default defineEventHandler((event) => {
  const ip = clientIp(event)
  if (isLocked(ip) || csrfLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Try again later.' })
  }

  const config = useRuntimeConfig(event)
  if (!originAllowed(event, String(config.siteOrigin || ''))) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  csrfStore.set(token, Date.now())
  setCookie(event, 'csrf', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60,
  })
  return { token }
})
