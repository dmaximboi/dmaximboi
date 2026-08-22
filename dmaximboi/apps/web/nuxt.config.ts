export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 3 },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'maxiM',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Full stack developer, chemistry graduate, and STEM educator. Open to work worldwide.' },
        { name: 'theme-color', content: '#0a0704' },
      ],
      link: [
        { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,700,800&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;0,6..96,700;1,6..96,600;1,6..96,700&family=DM+Mono:wght@400;500&display=swap' },
      ],
    },
  },
  vite: {
    optimizeDeps: { include: ['lucide-vue-next'] },
  },
  runtimeConfig: {
    smtpHost: process.env.NUXT_SMTP_HOST || process.env.SMTP_HOST || '',
    smtpPort: process.env.NUXT_SMTP_PORT || process.env.SMTP_PORT || '',
    smtpSecure: process.env.NUXT_SMTP_SECURE || process.env.SMTP_SECURE || '',
    smtpUser: process.env.NUXT_SMTP_USER || process.env.SMTP_USER || '',
    smtpPass: process.env.NUXT_SMTP_PASS || process.env.SMTP_PASS || '',
    smtpFrom: process.env.NUXT_SMTP_FROM || process.env.SMTP_FROM || '',
    smtpTo: process.env.NUXT_SMTP_TO || process.env.SMTP_TO || '',
    gmail: process.env.NUXT_GMAIL || process.env.GMAIL || '',
    siteOrigin: process.env.NUXT_SITE_ORIGIN || process.env.SITE_ORIGIN || 'http://127.0.0.1:3000',
    public: {},
  },
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          'Cross-Origin-Opener-Policy': 'same-origin',
          'X-Permitted-Cross-Domain-Policies': 'none',
        },
      },
    },
  },
})
