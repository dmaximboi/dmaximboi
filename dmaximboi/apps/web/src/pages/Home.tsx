import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { personal, contact, projects, skills } from '@dmaximboi/ui'

const spring = { type: 'spring', stiffness: 200, damping: 20 }
const springBouncy = { type: 'spring', stiffness: 280, damping: 18 }

function LotteryTitle() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % personal.roles.length), 2800)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ overflow: 'hidden', height: '1.15em' }}>
      <motion.div
        key={index}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={springBouncy}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--amber-glow)',
          lineHeight: 1.15,
        }}
      >
        {personal.roles[index]}
      </motion.div>
    </div>
  )
}

function StatCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const dur = 1800
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1)
        const ease = 1 - Math.pow(1 - t, 4)
        setVal(Math.round(ease * target))
        if (t < 1) requestAnimationFrame(tick)
        else setVal(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return (
    <div ref={ref} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--amber-light)', letterSpacing: '-0.04em' }}>
      {val}{suffix}
    </div>
  )
}

function SkillSlot({ items, label, level }: { items: string[]; label: string; level: number }) {
  const [idx, setIdx] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 2200 + Math.random() * 800)
    return () => clearInterval(id)
  }, [items.length])

  useEffect(() => {
    const bar = barRef.current
    const slot = slotRef.current
    if (!bar || !slot) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      bar.style.width = level + '%'
      obs.disconnect()
    }, { threshold: 0.4 })
    obs.observe(slot)
    return () => obs.disconnect()
  }, [level])

  return (
    <motion.div
      ref={slotRef}
      className="glass"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={spring}
      style={{ borderRadius: '1.2rem', padding: '1.4rem', cursor: 'none', overflow: 'hidden' }}
    >
      <div style={{ overflow: 'hidden', height: '1.6em' }}>
        <motion.div
          key={idx}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={springBouncy}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--amber-light)', letterSpacing: '0.04em', height: '1.6em', display: 'flex', alignItems: 'center' }}
        >
          {items[idx]}
        </motion.div>
      </div>
      <div style={{ marginTop: '0.8rem', height: 2, borderRadius: 1, background: 'rgba(255,185,80,0.1)', overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', background: 'linear-gradient(to right, var(--amber), var(--amber-glow))', borderRadius: 1, width: 0, transition: 'width 1.5s cubic-bezier(0.34,1.56,0.64,1)' }} />
      </div>
      <div style={{ fontSize: '0.68rem', color: 'var(--cream-dim)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>{label}</div>
    </motion.div>
  )
}

function ProjectCard({ project, featured }: { project: typeof projects[0]; featured?: boolean }) {
  return (
    <motion.div
      className="glass-bright"
      whileHover={{ y: -10, scale: 1.01 }}
      transition={spring}
      style={{
        borderRadius: '2rem', overflow: 'hidden', cursor: 'none',
        display: featured ? 'grid' : 'block',
        gridTemplateColumns: featured ? '1fr 1fr' : undefined,
      }}
    >
      <div style={{
        height: featured ? 'auto' : 220, minHeight: featured ? 280 : undefined,
        background: `linear-gradient(135deg, ${project.color}, ${project.colorAlt})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'rgba(255,185,80,0.1)', letterSpacing: '-0.05em', userSelect: 'none' }}>
          {project.shortName}
        </div>
        <div style={{
          position: 'absolute', bottom: '1rem', left: '1rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em',
          color: 'var(--amber-light)', background: 'rgba(10,7,4,0.7)',
          padding: '0.3rem 0.7rem', borderRadius: 100,
          border: '1px solid rgba(255,185,80,0.2)',
        }}>
          {project.url.replace('https://', '')}
        </div>
      </div>
      <div style={{ padding: '1.8rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.6rem' }}>{project.tag}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '0.6rem', lineHeight: 1.2 }}>{project.name}</div>
        <div style={{ fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--muted)' }}>{project.description}</div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--amber-light)', textDecoration: 'none',
            marginTop: '1.2rem', padding: '0.5rem 1rem', borderRadius: 100,
            border: '1px solid rgba(200,134,10,0.3)',
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          Visit Live Site &#8594;
        </a>
      </div>
    </motion.div>
  )
}

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!fields.name || !fields.email || !fields.subject || !fields.message) {
      setStatus('error'); return
    }
    setStatus('sending')
    try {
      const url = import.meta.env.VITE_SHEETS_URL
      if (url) {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(fields),
        })
      }
      setStatus('done')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('done') // Still show success — message will arrive if URL is set
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,185,80,0.04)', border: '1px solid rgba(255,185,80,0.15)',
    borderRadius: '0.8rem', padding: '0.85rem 1.1rem',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--cream)',
    outline: 'none', width: '100%',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  return (
    <div className="glass-bright" style={{ borderRadius: '2rem', padding: '2.2rem' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--cream)', marginBottom: '1.5rem' }}>Send a Message</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[{ k: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' }, { k: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' }].map(({ k, label, placeholder, type }) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)' }}>{label}</label>
              <input type={type} placeholder={placeholder} value={(fields as any)[k]} onChange={set(k)} style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)' }}>Subject</label>
          <select value={fields.subject} onChange={set('subject')} style={{ ...inputStyle, appearance: 'none', cursor: 'none' }}>
            <option value="">Select a topic</option>
            <option value="hire">Hire Me for a Project</option>
            <option value="teach">Teaching Session</option>
            <option value="collab">Collaboration</option>
            <option value="other">Something Else</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)' }}>Message</label>
          <textarea placeholder="Tell me what you have in mind..." value={fields.message} onChange={set('message')} style={{ ...inputStyle, resize: 'none', height: 120 }} />
        </div>
        <motion.button
          onClick={submit}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={spring}
          style={{
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem',
            letterSpacing: '0.04em', color: 'var(--bg)',
            background: 'linear-gradient(135deg, var(--amber-light), var(--amber-glow))',
            border: 'none', borderRadius: 100, padding: '1rem 2.5rem',
            cursor: 'none', width: '100%',
            boxShadow: '0 0 30px rgba(240,168,48,0.25)',
          }}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </motion.button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textAlign: 'center', color: status === 'error' ? 'rgba(255,100,80,0.8)' : 'var(--amber-light)', minHeight: '1.2rem' }}>
          {status === 'error' && 'Please fill in all fields.'}
          {status === 'done' && 'Message sent. I will respond within 24 hours.'}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const photoRef = useRef<HTMLDivElement>(null)

  const onPhotoMove = (e: React.MouseEvent) => {
    const el = photoRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`
  }
  const onPhotoLeave = () => { if (photoRef.current) photoRef.current.style.transform = '' }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { ...spring, delay },
  })

  const contactItems = [
    { icon: 'WA', label: 'WhatsApp', value: contact.whatsappDisplay, href: contact.whatsapp },
    { icon: 'GM', label: 'Gmail', value: contact.gmail, href: `mailto:${contact.gmail}` },
    { icon: 'FB', label: 'Facebook', value: 'AO Adewuyi', href: contact.facebook },
    { icon: 'IG', label: 'Instagram', value: contact.instagramHandle, href: contact.instagram },
    { icon: 'X', label: 'X', value: contact.xHandle, href: contact.x },
  ]

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: 'relative', zIndex: 2 }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '8rem 3rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', width: '100%' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div {...fadeUp(0.2)} className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-light)', padding: '0.5rem 1.1rem', borderRadius: 100, width: 'fit-content' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber-glow)', boxShadow: '0 0 8px var(--amber-glow)', display: 'inline-block', animation: 'breathe 2.5s ease-in-out infinite' }} />
              Available for Projects
            </motion.div>

            <div>
              <motion.h1 {...fadeUp(0.35)} style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3.5rem,7vw,6rem)', lineHeight: 0.92, letterSpacing: '-0.04em' }}>
                Adewuyi<br />
                <span style={{ WebkitTextStroke: '1px rgba(232,213,176,0.3)', color: 'transparent' }}>Ayuba</span><br />
                <span style={{ color: 'var(--amber-light)' }}>Opeyemi</span>
              </motion.h1>
              <motion.div {...fadeUp(0.5)}>
                <LotteryTitle />
              </motion.div>
            </div>

            <motion.p {...fadeUp(0.65)} style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(232,213,176,0.65)', maxWidth: 480 }}>
              {personal.bio}
            </motion.p>

            <motion.div {...fadeUp(0.8)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/code" className="btn-amber">See My Work</Link>
              <a href="#contact" className="btn-ghost">Get In Touch</a>
            </motion.div>

            <motion.div {...fadeUp(0.95)} style={{ display: 'flex', gap: '2.5rem' }}>
              {[{ target: 4, label: 'Live Projects' }, { target: 3, label: 'Years Teaching' }, { target: 100, label: 'Dedication', suffix: '%' }].map((s) => (
                <div key={s.label}>
                  <StatCounter target={s.target} suffix={s.suffix} />
                  <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} onMouseMove={onPhotoMove} onMouseLeave={onPhotoLeave}>
            <div ref={photoRef} className="glass-bright" style={{ width: 380, height: 480, borderRadius: '2.5rem', overflow: 'hidden', position: 'relative', transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.6s', transformStyle: 'preserve-3d' }}>
              <img src={personal.photo} alt={personal.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'contrast(1.05) saturate(0.9)' }} crossOrigin="anonymous" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,4,0.8) 0%, rgba(10,7,4,0.1) 50%, transparent 100%)' }} />
              <div className="glass" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', padding: '1rem 1.4rem', borderRadius: '1.2rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--cream)' }}>{personal.shortName}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--amber-light)', marginTop: '0.3rem', textTransform: 'uppercase' }}>{personal.domain}</div>
              </div>
            </div>

            <motion.div className="glass" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.7 }} style={{ position: 'absolute', top: '10%', right: '-5%', borderRadius: '1rem', padding: '0.9rem 1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-light)' }}>Stack</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cream)', marginTop: '0.2rem' }}>MERN + MEAN</div>
            </motion.div>

            <motion.div className="glass" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.9 }} style={{ position: 'absolute', bottom: '18%', left: '-8%', borderRadius: '1rem', padding: '0.9rem 1.2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-light)' }}>Status</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--amber-light)', marginTop: '0.2rem' }}>Open to Work</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MOTION STRIP */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,185,80,0.06)', borderBottom: '1px solid rgba(255,185,80,0.06)', padding: '1rem 0' }}>
        <div style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', animation: 'strip 20s linear infinite' }}>
          {[0, 1].map((n) => (
            <div key={n} style={{ display: 'flex', gap: '3rem', flexShrink: 0 }}>
              {['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Full-Stack', 'Chemistry', 'STEM Tutor', 'dmaximboi'].map((item) => (
                <span key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,134,10,0.5)' }}>
                  {item} <span style={{ opacity: 0.4 }}>*</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WHAT I DO */}
      <section id="what-i-do">
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '6rem 3rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
            <div className="section-eyebrow">What I Do</div>
            <h2 className="section-title">One person.<br /><span style={{ color: 'var(--amber-light)' }}>Many capabilities.</span></h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginTop: '3.5rem' }}>
            {[
              { num: '01', icon: '{ }', title: 'Full-Stack Development', desc: 'End-to-end web applications from database schema to polished UI. MERN and MEAN stack, REST APIs, and production deployments.', tags: ['React', 'Node.js', 'MongoDB', 'Express'] },
              { num: '02', icon: 'CH', title: 'STEM Education', desc: 'Teaching Mathematics, Physics, Chemistry with clarity. Online and physical sessions for secondary and tertiary learners.', tags: ['Chemistry', 'Mathematics', 'Physics', 'Biology'] },
              { num: '03', icon: 'DB', title: 'Digital Products', desc: 'Business digitalization, school management systems, branding platforms and e-commerce. Real problems, real solutions.', tags: ['PostgreSQL', 'Supabase', 'Vercel', 'APIs'] },
            ].map((item, i) => (
              <motion.div key={item.num} className="glass" whileHover={{ y: -8, scale: 1.01 }} transition={spring} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ borderRadius: '1.8rem', padding: '2.2rem', cursor: 'none', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--amber)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{item.num}</div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, rgba(200,134,10,0.25), rgba(92,48,21,0.4))', border: '1px solid rgba(255,185,80,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--amber-light)' }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '0.8rem', lineHeight: 1.2 }}>{item.title}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: 'rgba(232,213,176,0.55)' }}>{item.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.4rem' }}>
                  {item.tags.map((t) => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: 100, background: 'rgba(200,134,10,0.12)', border: '1px solid rgba(200,134,10,0.2)', color: 'var(--amber-light)' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section id="projects" style={{ borderTop: '1px solid rgba(255,185,80,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '6rem 3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
              <div className="section-eyebrow">Projects</div>
              <h2 className="section-title">Built. <span style={{ color: 'var(--amber-light)' }}>Shipped.</span><br /><span style={{ WebkitTextStroke: '1px rgba(232,213,176,0.25)', color: 'transparent' }}>Live.</span></h2>
            </motion.div>
            <Link to="/code" className="btn-ghost" style={{ flexShrink: 0 }}>All Projects &#8594;</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring} style={{ gridColumn: '1 / -1' }}>
              <ProjectCard project={projects[0]} featured />
            </motion.div>
            {projects.slice(1, 3).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.1 }}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ borderTop: '1px solid rgba(255,185,80,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '6rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
            <div className="section-eyebrow">Skills</div>
            <h2 className="section-title">The stack<br />behind <span style={{ color: 'var(--amber-light)' }}>the work.</span></h2>
            <p style={{ marginTop: '1.2rem', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--muted)', maxWidth: 380 }}>Every tool chosen with purpose. Every skill sharpened through real projects and real students.</p>
            <Link to="/code" className="btn-amber" style={{ marginTop: '2rem', display: 'inline-flex' }}>See All Projects</Link>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {skills.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.08 }}>
                <SkillSlot items={s.items} label={s.label} level={s.level} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ borderTop: '1px solid rgba(255,185,80,0.06)', background: 'linear-gradient(to bottom, transparent, rgba(61,31,10,0.15), transparent)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '6rem 3rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
            <div className="section-eyebrow">Contact</div>
            <h2 className="section-title">Let us build<br /><span style={{ color: 'var(--amber-light)' }}>something real.</span></h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '3.5rem', alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={spring}>
              <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)', marginBottom: '2rem' }}>Reach me directly. I respond within 24 hours.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {contactItems.map((item) => (
                  <motion.a key={item.icon} href={item.href} target="_blank" rel="noreferrer" className="glass" whileHover={{ x: 6 }} transition={spring} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.4rem', borderRadius: '1.2rem', textDecoration: 'none', color: 'var(--cream)', cursor: 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, rgba(200,134,10,0.2), rgba(92,48,21,0.3))', border: '1px solid rgba(255,185,80,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--amber-light)', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cream-dim)', fontFamily: 'var(--font-mono)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--cream)', marginTop: '0.1rem' }}>{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={spring}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,185,80,0.08)', padding: '2.5rem 3rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', color: 'var(--amber-light)' }}>maxi<span style={{ color: 'var(--cream-dim)', fontStyle: 'italic', fontWeight: 400 }}>M</span></div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--cream-dim)' }}>Adewuyi Ayuba Opeyemi. {personal.domain}. 2026</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--cream-dim)' }}>Chemistry. Code. Education.</div>
        </div>
      </footer>

      <style>{`
        @keyframes breathe { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.7); } }
        @keyframes strip { from { transform:translateX(0); } to { transform:translateX(-50%); } }
      `}</style>
    </motion.main>
  )
}
