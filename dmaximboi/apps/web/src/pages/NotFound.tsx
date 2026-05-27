import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const spring = { type: 'spring', stiffness: 200, damping: 20 }

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={spring}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(6rem,20vw,14rem)', color: 'rgba(200,134,10,0.12)', lineHeight: 1, letterSpacing: '-0.06em' }}>404</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--cream)', marginTop: '-2rem', letterSpacing: '-0.03em' }}>Page not found.</div>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '1rem', color: 'var(--muted)', marginTop: '1rem', lineHeight: 1.7 }}>
          That page does not exist. But everything else does.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-amber">Go Home</Link>
          <Link to="/code" className="btn-ghost">See Projects</Link>
        </div>
      </div>
    </motion.div>
  )
}
