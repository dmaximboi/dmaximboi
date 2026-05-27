import { motion } from 'framer-motion'
import { contact } from '@dmaximboi/ui'

const spring = { type: 'spring', stiffness: 200, damping: 20 }

const subjects = [
  {
    code: 'CHM',
    name: 'Chemistry',
    level: 'O Level to Degree',
    desc: 'Organic, inorganic, and physical chemistry with clear explanations for reactions, equations, bonding, and theory. WAEC, NECO, JAMB, and university level.',
    topics: ['Organic Chemistry', 'Periodic Table', 'Chemical Bonding', 'Stoichiometry', 'Electrochemistry', 'Lab Practicals'],
  },
  {
    code: 'MTH',
    name: 'Mathematics',
    level: 'JSS to University',
    desc: 'Step-by-step problem solving across algebra, calculus, statistics, and more. Building exam confidence and deep conceptual understanding.',
    topics: ['Algebra', 'Calculus', 'Statistics', 'Trigonometry', 'Sequences', 'Probability'],
  },
  {
    code: 'PHY',
    name: 'Physics',
    level: 'O Level to Degree',
    desc: 'Concepts, formulas, experiments, and real-world application. Mechanics, electricity, waves, and modern physics with worked examples.',
    topics: ['Mechanics', 'Electricity', 'Waves', 'Optics', 'Modern Physics', 'Experiments'],
  },
  {
    code: 'BIO',
    name: 'Biology',
    level: 'O Level',
    desc: 'Cell biology, genetics, ecology, and human physiology explained clearly for WAEC, NECO, and JAMB preparation.',
    topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Biology', 'Plant Biology', 'Evolution'],
  },
  {
    code: 'ENG',
    name: 'English Language',
    level: 'JSS to O Level',
    desc: 'Comprehension, essay writing, summary, and oral English skills. Building confidence in expression and examination technique.',
    topics: ['Comprehension', 'Essay Writing', 'Summary', 'Oral English', 'Grammar', 'Literature'],
  },
]

const formats = [
  { label: 'One on One', desc: 'Private sessions tailored entirely to your pace and goals. Fastest progress.' },
  { label: 'Small Groups', desc: 'Up to 4 students. Collaborative learning with personalised attention.' },
  { label: 'Online Sessions', desc: 'Learn from anywhere via video call. Same quality, maximum flexibility.' },
  { label: 'Physical Classes', desc: 'Face to face in Ilorin. Real-time interaction and hands-on support.' },
]

export default function Teach() {
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
          <div className="section-eyebrow">dmaximboi.vercel.app/teach</div>
          <h1 className="section-title">
            Science taught<br />
            <span style={{ color: 'var(--amber-light)' }}>with clarity</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(232,213,176,0.25)', color: 'transparent' }}>and precision.</span>
          </h1>
          <p style={{ marginTop: '1.5rem', fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)', maxWidth: 540 }}>
            A Chemistry graduate who teaches the way he wished he was taught. No rote learning. No confusion. Just real understanding that lasts through exams and beyond.
          </p>
        </motion.div>

        {/* FORMATS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          style={{ marginTop: '4rem' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
            {formats.map((f, i) => (
              <motion.div
                key={f.label}
                className="glass"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={spring}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ borderRadius: '1.5rem', padding: '1.8rem', cursor: 'none' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.8rem' }}>0{i + 1}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>{f.label}</div>
                <p style={{ fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--muted)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SUBJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          style={{ marginTop: '5rem' }}
        >
          <div className="section-eyebrow">Subjects</div>
          <h2 className="section-title">What I <span style={{ color: 'var(--amber-light)' }}>teach.</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '3rem' }}>
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.code}
                className="glass"
                whileHover={{ x: 6 }}
                transition={spring}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ borderRadius: '1.5rem', padding: '2rem', cursor: 'none', display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '2rem', alignItems: 'center' }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--amber-light)' }}>{subject.code}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--cream-dim)', marginTop: '0.2rem', textTransform: 'uppercase' }}>{subject.level}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>{subject.name}</div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--muted)' }}>{subject.desc}</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {subject.topics.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.3rem 0.7rem', borderRadius: 100, background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)', color: 'var(--amber-light)' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="glass-bright"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          style={{ borderRadius: '2rem', padding: '4rem', marginTop: '5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(200,134,10,0.08), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>Book a Session</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Ready to understand<br /><span style={{ color: 'var(--amber-light)' }}>not just memorise?</span>
            </h2>
            <p style={{ marginTop: '1.2rem', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--muted)', maxWidth: 440, margin: '1.2rem auto 0' }}>
              Send me a message on WhatsApp or Gmail to discuss your subject, level, and schedule.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-amber">Book via WhatsApp</a>
              <a href={`mailto:${contact.gmail}`} className="btn-ghost">Send an Email</a>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.main>
  )
}
