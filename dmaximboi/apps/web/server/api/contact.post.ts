import nodemailer from 'nodemailer'
import { csrfStore } from '../utils/csrf'
import { clientIp, contactLimited, isLocked, noteFailure, originAllowed, sameToken, tooLarge } from '../utils/security'

const SUBJECTS: Record<string, string> = {
  hire: 'Hire Me for a Project',
  teach: 'Teaching Session',
  collab: 'Collaboration',
  other: 'Something Else',
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export default defineEventHandler(async (event) => {
  const ip = clientIp(event)
  if (isLocked(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Temporarily locked. Try again later.' })
  }
  if (contactLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many messages. Try again later.' })
  }
  if (tooLarge(event)) {
    throw createError({ statusCode: 413, statusMessage: 'Message too large.' })
  }

  const config = useRuntimeConfig(event)
  if (!originAllowed(event, String(config.siteOrigin || ''))) {
    noteFailure(ip)
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const body = await readBody<{
    name?: string
    email?: string
    subject?: string
    message?: string
    company?: string
    csrf?: string
  }>(event).catch(() => ({} as Record<string, string>))

  if (String(body.company || '').trim()) return { ok: true }

  const headerToken = String(getHeader(event, 'x-csrf-token') || '')
  const bodyToken = String(body.csrf || '')
  const cookieToken = String(getCookie(event, 'csrf') || '')
  const token = headerToken || bodyToken
  const issued = csrfStore.get(token) || 0
  csrfStore.delete(token)

  const fresh = token && Date.now() - issued <= 3600_000
  const matched = fresh && sameToken(token, cookieToken) && sameToken(token, headerToken || bodyToken)
  if (!matched) {
    noteFailure(ip)
    throw createError({ statusCode: 403, statusMessage: 'Refresh and try again.' })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const subjectKey = String(body.subject || '').trim()
  const message = String(body.message || '').trim()
  if (!name || !email || !subjectKey || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill in all fields.' })
  }
  if (name.length > 120 || message.length > 4000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !SUBJECTS[subjectKey]) {
    noteFailure(ip)
    throw createError({ statusCode: 400, statusMessage: 'Invalid message.' })
  }

  const user = String(config.smtpUser || config.gmail || '').trim()
  const pass = String(config.smtpPass || '').replace(/\s+/g, '')
  const to = String(config.smtpTo || config.gmail || user).trim()
  const from = String(config.smtpFrom || user).trim()
  if (!user || !pass) {
    throw createError({ statusCode: 503, statusMessage: 'Mail is not configured yet.' })
  }

  const port = Number(config.smtpPort || 465)
  const transporter = nodemailer.createTransport({
    host: String(config.smtpHost || 'smtp.gmail.com'),
    port,
    secure: port === 465 || String(config.smtpSecure) === 'true',
    requireTLS: port === 587,
    auth: { user, pass },
    tls: { minVersion: 'TLSv1.2' },
  })

  const topic = SUBJECTS[subjectKey]
  try {
    await transporter.sendMail({
      from: `"dmaximboi" <${from}>`,
      to,
      replyTo: email,
      subject: `Portfolio: ${topic}: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${topic}\n\n${message}`,
      html: `<p>New message from <strong>${escapeHtml(name)}</strong></p><p>Email: ${escapeHtml(email)}<br/>Subject: ${escapeHtml(topic)}</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    })
  } catch {
    throw createError({ statusCode: 500, statusMessage: 'Could not send message.' })
  }
  return { ok: true }
})
