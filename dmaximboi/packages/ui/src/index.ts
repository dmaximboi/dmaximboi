// Design tokens — single source of truth for the entire dmaximboi brand

export const tokens = {
  colors: {
    bg: '#0a0704',
    bg2: '#0f0b08',
    amber: '#c8860a',
    amberLight: '#f0a830',
    amberGlow: '#ffbc4d',
    coffee: '#3d1f0a',
    coffeeMid: '#5c3015',
    cream: '#e8d5b0',
    creamDim: '#9e8a6a',
    glassBg: 'rgba(255,185,80,0.045)',
    glassBg2: 'rgba(255,185,80,0.08)',
    glassBorder: 'rgba(255,185,80,0.18)',
    glassBorderBright: 'rgba(255,185,80,0.38)',
    muted: 'rgba(232,213,176,0.45)',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'Cabinet Grotesk', sans-serif",
    mono: "'DM Mono', monospace",
  },
  radius: {
    sm: '0.8rem',
    md: '1.2rem',
    lg: '1.8rem',
    xl: '2rem',
    xxl: '2.5rem',
  },
  easing: {
    spring: 'cubic-bezier(0.34,1.56,0.64,1)',
    smooth: 'cubic-bezier(0.23,1,0.32,1)',
    cinematic: 'cubic-bezier(0.16,1,0.3,1)',
  },
}

// CSS custom properties string — inject into :root
export const cssVariables = `
  --bg: ${tokens.colors.bg};
  --bg2: ${tokens.colors.bg2};
  --amber: ${tokens.colors.amber};
  --amber-light: ${tokens.colors.amberLight};
  --amber-glow: ${tokens.colors.amberGlow};
  --coffee: ${tokens.colors.coffee};
  --coffee-mid: ${tokens.colors.coffeeMid};
  --cream: ${tokens.colors.cream};
  --cream-dim: ${tokens.colors.creamDim};
  --glass-bg: ${tokens.colors.glassBg};
  --glass-bg2: ${tokens.colors.glassBg2};
  --glass-border: ${tokens.colors.glassBorder};
  --glass-border-bright: ${tokens.colors.glassBorderBright};
  --muted: ${tokens.colors.muted};
  --font-display: ${tokens.fonts.display};
  --font-body: ${tokens.fonts.body};
  --font-mono: ${tokens.fonts.mono};
  --spring: ${tokens.easing.spring};
  --smooth: ${tokens.easing.smooth};
  --cinematic: ${tokens.easing.cinematic};
`

// Shared cn utility (className merger without clsx dependency)
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Shared contact data
export const contact = {
  whatsapp: 'https://wa.me/2349123165792',
  whatsappDisplay: '+234 912 316 5792',
  gmail: 'dmaximboi@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=61580887480821',
  instagram: 'https://www.instagram.com/mrsmith7345?igsh=MXRna3lhcmphMm1o',
  instagramHandle: '@mrsmith7345',
  x: 'https://x.com/dmaximboi',
  xHandle: '@dmaximboi',
}

// Shared personal data
export const personal = {
  fullName: 'Adewuyi Ayuba Opeyemi',
  shortName: 'AO Adewuyi',
  alias: 'maxiM',
  handle: 'dmaximboi',
  domain: 'dmaximboi.vercel.app',
  photo: 'https://i.ibb.co/Q711PGWb/1779838620671.png',
  bio: 'I build full-stack digital products, educate the next generation of STEM learners, and bring scientific thinking to software.',
  stack: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Angular'],
  roles: ['Full-Stack Developer', 'Chemistry Graduate', 'STEM Educator', 'Digital Builder'],
}

// Shared projects data
export const projects = [
  {
    id: 'mcas',
    name: 'Merit College Academic System',
    shortName: 'MCAS',
    tag: 'School Management System',
    description:
      'A comprehensive school management platform handling student records, staff management, attendance tracking, academic results, and administrative workflows built for Nigerian schools.',
    url: 'https://meritcollege.vercel.app',
    color: '#1a0d04',
    colorAlt: '#2d1508',
    featured: true,
  },
  {
    id: 'omega',
    name: 'De-Omega Lab Affairs',
    shortName: 'Lab',
    tag: 'Laboratory Platform',
    description:
      'A scientific laboratory management and affairs platform for tracking experiments, results, and lab activities with precision.',
    url: 'https://omegalabaffairs.vercel.app',
    color: '#0a1a0d',
    colorAlt: '#122010',
    featured: false,
  },
  {
    id: 'ariyo',
    name: 'AriyoFashion Stitches',
    shortName: 'Ariyo',
    tag: 'Fashion and Branding',
    description:
      'A fashion brand digital presence with catalog, branding identity, and customer engagement features for a tailoring business.',
    url: 'https://ariyostitches.vercel.app',
    color: '#1a0a10',
    colorAlt: '#250d17',
    featured: false,
  },
  {
    id: 'selebrity',
    name: 'SelebrityAboki Fruit Store',
    shortName: 'Fruit',
    tag: 'E-Commerce',
    description:
      'A fruit store e-commerce platform with product catalog, ordering, and business management features for a fresh produce business.',
    url: 'https://selebrityaboki.vercel.app',
    color: '#0d1a06',
    colorAlt: '#121f08',
    featured: false,
  },
]

// Shared skills data
export const skills = [
  { label: 'Frontend', items: ['React', 'Angular', 'Vite', 'Tailwind'], level: 88 },
  { label: 'Backend', items: ['Node.js', 'Express', 'REST API', 'Auth'], level: 82 },
  { label: 'Database', items: ['MongoDB', 'PostgreSQL', 'NoSQL', 'SQL'], level: 80 },
  { label: 'STEM Teaching', items: ['Chemistry', 'Physics', 'Math', 'Biology'], level: 95 },
]
