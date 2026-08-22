const WINDOW_MS = 15 * 60 * 1000
const CONTACT_MAX = 5
const CSRF_MAX = 30
const FAIL_MAX = 8
const LOCK_MS = 30 * 60 * 1000

const hits = new Map<string, number[]>()
const fails = new Map<string, number[]>()
const locks = new Map<string, number>()

export function clientIp(event: Parameters<typeof getRequestIP>[0]) {
  return getRequestIP(event, { xForwardedFor: true }) || 'unknown'
}

export function allowedOrigins(siteOrigin: string) {
  return Array.from(new Set([
    siteOrigin,
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'https://dmaximboi.vercel.app',
  ].filter(Boolean)))
}

export function originAllowed(event: Parameters<typeof getHeader>[0], siteOrigin: string) {
  const origin = getHeader(event, 'origin') || ''
  const referer = getHeader(event, 'referer') || ''
  const allow = allowedOrigins(siteOrigin)
  if (origin) return allow.includes(origin)
  if (!referer) return true
  try {
    return allow.includes(new URL(referer).origin)
  } catch {
    return false
  }
}

export function applyCors(event: Parameters<typeof setHeader>[0], siteOrigin: string) {
  const origin = getHeader(event, 'origin') || ''
  if (!origin || !allowedOrigins(siteOrigin).includes(origin)) return
  setHeader(event, 'Access-Control-Allow-Origin', origin)
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  setHeader(event, 'Vary', 'Origin')
}

function prune(list: number[], now: number, span = WINDOW_MS) {
  return list.filter((t) => now - t < span)
}

export function isLocked(ip: string) {
  const until = locks.get(ip) || 0
  if (until > Date.now()) return true
  locks.delete(ip)
  return false
}

export function rateLimited(ip: string, key: string, max: number) {
  const id = `${key}:${ip}`
  const now = Date.now()
  const next = prune(hits.get(id) || [], now)
  if (next.length >= max) {
    hits.set(id, next)
    return true
  }
  next.push(now)
  hits.set(id, next)
  return false
}

export function noteFailure(ip: string) {
  const now = Date.now()
  const next = prune(fails.get(ip) || [], now)
  next.push(now)
  fails.set(ip, next)
  if (next.length >= FAIL_MAX) locks.set(ip, now + LOCK_MS)
}

export function contactLimited(ip: string) {
  return rateLimited(ip, 'contact', CONTACT_MAX)
}

export function csrfLimited(ip: string) {
  return rateLimited(ip, 'csrf', CSRF_MAX)
}

export function tooLarge(event: Parameters<typeof getHeader>[0], max = 20_000) {
  return Number(getHeader(event, 'content-length') || 0) > max
}

export function sameToken(a: string, b: string) {
  if (!a || !b) return false
  const left = new TextEncoder().encode(a)
  const right = new TextEncoder().encode(b)
  if (left.length !== right.length) return false
  let diff = 0
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i]
  return diff === 0
}
