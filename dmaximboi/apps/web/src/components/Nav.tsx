import { Link, useLocation } from 'react-router-dom'
import { personal } from '@dmaximboi/ui'

const links = [
  { label: 'Code', to: '/code' },
  { label: 'Teach', to: '/teach' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/#contact' },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.2rem 2.5rem',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,7,4,0.7)',
        borderBottom: '1px solid rgba(255,185,80,0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }} />
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--amber-light)', letterSpacing: '-0.02em', textDecoration: 'none' }}>
          maxi<span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>M</span>
        </Link>

        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: pathname === l.to ? 'var(--amber-light)' : 'var(--cream-dim)',
                textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: 100,
                background: pathname === l.to ? 'rgba(255,185,80,0.07)' : 'transparent',
                transition: 'color 0.3s, background 0.3s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href="/#contact"
          style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.78rem',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--bg)', background: 'var(--amber-light)',
            padding: '0.6rem 1.5rem', borderRadius: 100,
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(240,168,48,0.3)',
            transition: 'background 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}
