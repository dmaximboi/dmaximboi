import { motion } from 'framer-motion'
import { projects, skills } from '@dmaximboi/ui'

const spring = { type: 'spring', stiffness: 200, damping: 20 }

export default function Code() {
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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}>
          <div className="section-eyebrow">dmaximboi.vercel.app/code</div>
          <h1 className="section-title">
            Projects I<br />
            <span style={{ color: 'var(--amber-light)' }}>shipped to</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(232,213,176,0.25)', color: 'transparent' }}>production.</span>
          </h1>
          <p style={{ marginTop: '1.5rem', fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)', maxWidth: 520 }}>
            Every project here is live, functional, and built to solve a real problem for a real client or organisation.
          </p>
        </motion.div>

        {/* FEATURED PROJECT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.25 }}
          style={{ marginTop: '4rem' }}
        >
          {projects.filter(p => p.featured).map(project => (
            <motion.div
              key={project.id}
              className="glass-bright"
              whileHover={{ y: -6 }}
              transition={spring}
              style={{ borderRadius: '2rem', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', cursor: 'none' }}
            >
              <div style={{
                minHeight: 360,
                background: `linear-gradient(135deg, ${project.color}, ${project.colorAlt})`,
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '2.5rem', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 900, color: 'rgba(255,185,80,0.06)', letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {project.shortName}
                </div>
                <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', borderRadius: 100, width: 'fit-content', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-light)' }}>Featured</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{project.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--amber-light)', marginTop: '0.8rem' }}>{project.url.replace('https://', '')}</div>
              </div>
              <div style={{ padding: '3rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>{project.tag}</div>
                <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)' }}>{project.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '2rem' }}>
                  {[
                    { label: 'Student records and profiles' },
                    { label: 'Staff and admin management' },
                    { label: 'Attendance tracking system' },
                    { label: 'Academic results and reporting' },
                  ].map(f => (
                    <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: 'var(--cream-dim)' }}>{f.label}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-amber"
                  style={{ marginTop: '2.5rem', display: 'inline-flex' }}
                >
                  Visit Live Site &#8594;
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* REST OF PROJECTS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          {projects.filter(p => !p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              className="glass"
              whileHover={{ y: -8, scale: 1.01 }}
              transition={spring}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ borderRadius: '2rem', overflow: 'hidden', cursor: 'none' }}
            >
              <div style={{
                height: 180,
                background: `linear-gradient(135deg, ${project.color}, ${project.colorAlt})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,185,80,0.1)', letterSpacing: '-0.05em' }}>{project.shortName}</div>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--amber-light)', background: 'rgba(10,7,4,0.7)', padding: '0.3rem 0.7rem', borderRadius: 100, border: '1px solid rgba(255,185,80,0.2)' }}>
                  {project.url.replace('https://', '')}
                </div>
              </div>
              <div style={{ padding: '1.8rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.5rem' }}>{project.tag}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--cream)', marginBottom: '0.6rem', lineHeight: 1.2 }}>{project.name}</div>
                <p style={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--muted)' }}>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--amber-light)', textDecoration: 'none', marginTop: '1.2rem', padding: '0.5rem 1rem', borderRadius: 100, border: '1px solid rgba(200,134,10,0.3)', transition: 'background 0.3s' }}>
                  Visit &#8594;
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STACK SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          style={{ marginTop: '6rem' }}
        >
          <div className="section-eyebrow">Tech Stack</div>
          <h2 className="section-title">Tools of <span style={{ color: 'var(--amber-light)' }}>the trade.</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginTop: '3rem' }}>
            {skills.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={spring}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ borderRadius: '1.5rem', padding: '1.8rem', cursor: 'none' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>{s.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.35rem 0.8rem', borderRadius: 100, background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)', color: 'var(--amber-light)' }}>{item}</span>
                  ))}
                </div>
                <div style={{ marginTop: '1.2rem', height: 2, borderRadius: 1, background: 'rgba(255,185,80,0.1)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: s.level + '%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.1 }}
                    style={{ height: '100%', background: 'linear-gradient(to right, var(--amber), var(--amber-glow))', borderRadius: 1 }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cream-dim)', marginTop: '0.5rem' }}>{s.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.main>
  )
}
