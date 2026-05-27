import { motion } from 'framer-motion'
import { personal, contact } from '@dmaximboi/ui'

const spring = { type: 'spring', stiffness: 200, damping: 20 }

const timeline = [
  { year: '2024', label: 'Going Freelance', desc: 'Started taking on freelance web development clients. Built MCAS, De-Omega Lab, AriyoFashion, and SelebrityAboki.' },
  { year: '2023', label: 'Full-Stack Transition', desc: 'Moved from frontend into full-stack development. Mastered Node.js, Express, PostgreSQL, and MongoDB in production.' },
  { year: '2022', label: 'Teaching STEM', desc: 'Started teaching Mathematics, Physics, and Chemistry to secondary and tertiary level students across Nigeria.' },
  { year: '2021', label: 'University of Ilorin', desc: 'Graduated with a degree in Chemistry. Applied scientific thinking to software problem solving.' },
  { year: '2020', label: 'First Line of Code', desc: 'Wrote first HTML file. Could not stop. Built the first project within three months.' },
]

const values = [
  { label: 'Precision', desc: 'Chemistry trained me to care about accuracy. Every function, every component, built to do exactly what it should.' },
  { label: 'Clarity', desc: 'I teach complex ideas simply. That same instinct drives how I write code and communicate with clients.' },
  { label: 'Delivery', desc: 'Ideas without shipping are just thoughts. Every project I take on ends with something live and usable.' },
]

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={spring}
      style={{ position: 'relative', zIndex: 2, paddingTop: '8rem' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 3rem 6rem' }}>

        {/* HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}>
            <div className="section-eyebrow">dmaximboi.vercel.app/about</div>
            <h1 className="section-title">
              The person<br />
              <span style={{ color: 'var(--amber-light)' }}>behind</span><br />
              <span style={{ WebkitTextStroke: '1px rgba(232,213,176,0.25)', color: 'transparent' }}>the screen.</span>
            </h1>
            <p style={{ marginTop: '1.5rem', fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)' }}>
              I am Adewuyi Ayuba Opeyemi. AO Adewuyi. Online I go by maxiM, handle dmaximboi. Chemistry graduate, full-stack developer, and STEM educator from Nigeria.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)' }}>
              I believe the best software comes from people who understand systems deeply. Chemistry gave me that. It taught me to think in reactions, processes, and outcomes. That is exactly how I approach code.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-amber">Reach Out</a>
              <a href={`mailto:${contact.gmail}`} className="btn-ghost">Send Email</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            style={{ position: 'relative' }}
          >
            <div className="glass-bright" style={{ borderRadius: '2.5rem', overflow: 'hidden', aspectRatio: '3/4' }}>
              <img
                src={personal.photo}
                alt={personal.fullName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'contrast(1.05) saturate(0.85)' }}
                crossOrigin="anonymous"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,4,0.85) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--cream)' }}>{personal.fullName}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-light)', marginTop: '0.4rem' }}>Chemistry Graduate. Full-Stack Developer. Educator.</div>
              </div>
            </div>

            <motion.div
              className="glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.6 }}
              style={{ position: 'absolute', top: '-1.5rem', right: '-1.5rem', borderRadius: '1.2rem', padding: '1.2rem 1.5rem' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)' }}>University</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--cream)', marginTop: '0.2rem' }}>Unilorin</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cream-dim)', marginTop: '0.1rem' }}>B.Sc Chemistry</div>
            </motion.div>
          </motion.div>
        </div>

        {/* VALUES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          style={{ marginTop: '6rem' }}
        >
          <div className="section-eyebrow">Values</div>
          <h2 className="section-title">How I <span style={{ color: 'var(--amber-light)' }}>work.</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginTop: '3rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                className="glass"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={spring}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ borderRadius: '1.8rem', padding: '2.2rem', cursor: 'none' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>0{i + 1}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '0.8rem' }}>{v.label}</div>
                <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          style={{ marginTop: '6rem' }}
        >
          <div className="section-eyebrow">Journey</div>
          <h2 className="section-title">How I got <span style={{ color: 'var(--amber-light)' }}>here.</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 48, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--amber), transparent)', opacity: 0.2 }} />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '2rem', alignItems: 'start', padding: '1.8rem 0', borderBottom: i < timeline.length - 1 ? '1px solid rgba(255,185,80,0.06)' : 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 10px var(--amber)', flexShrink: 0, marginLeft: 44 }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500, color: 'var(--amber-light)' }}>{item.year}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '0.4rem' }}>{item.label}</div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--muted)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.main>
  )
}
