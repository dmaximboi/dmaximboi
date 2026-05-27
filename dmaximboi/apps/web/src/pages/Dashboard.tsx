import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 200, damping: 20 }
const DASHBOARD_PIN = import.meta.env.VITE_DASHBOARD_PIN || '2024maxiM'

interface Message {
  Timestamp: string
  Name: string
  Email: string
  Subject: string
  Message: string
  Status: string
}

export default function Dashboard() {
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Message | null>(null)

  const login = () => {
    if (pin === DASHBOARD_PIN) {
      setAuthed(true)
      setError('')
      loadMessages()
    } else {
      setError('Incorrect PIN.')
      setPin('')
    }
  }

  const loadMessages = async () => {
    setLoading(true)
    try {
      const sheetId = import.meta.env.VITE_SHEET_ID
      const apiKey = import.meta.env.VITE_SHEETS_API_KEY
      if (!sheetId || !apiKey) {
        // Show sample data if env vars not set yet
        setMessages([
          { Timestamp: new Date().toLocaleString(), Name: 'Sample User', Email: 'sample@email.com', Subject: 'hire', Message: 'I would like to hire you for a project.', Status: 'Unread' },
          { Timestamp: new Date().toLocaleString(), Name: 'Another User', Email: 'another@email.com', Subject: 'teach', Message: 'I need chemistry tutoring.', Status: 'Unread' },
        ])
        setLoading(false)
        return
      }
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`
      const res = await fetch(url)
      const data = await res.json()
      const [headers, ...rows] = data.values || []
      const parsed = rows.map((row: string[]) =>
        Object.fromEntries(headers.map((h: string, i: number) => [h, row[i] || '']))
      ) as Message[]
      setMessages(parsed.reverse())
    } catch {
      setMessages([])
    }
    setLoading(false)
  }

  const subjectLabel: Record<string, string> = {
    hire: 'Hire Me',
    teach: 'Teaching',
    collab: 'Collaboration',
    other: 'Other',
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,185,80,0.04)',
    border: '1px solid rgba(255,185,80,0.2)',
    borderRadius: '0.8rem',
    padding: '0.85rem 1.2rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '1rem',
    color: 'var(--cream)',
    outline: 'none',
    width: '100%',
    letterSpacing: '0.15em',
    textAlign: 'center' as const,
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div
          className="glass-bright"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
          style={{ borderRadius: '2rem', padding: '3rem', width: '100%', maxWidth: 380, textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1.5rem' }}>Private Area</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>maxiM</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cream-dim)', marginBottom: '2.5rem' }}>Message Inbox</div>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={inputStyle}
          />
          {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,100,80,0.8)', marginTop: '0.8rem' }}>{error}</div>}
          <motion.button
            onClick={login}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
            style={{ width: '100%', marginTop: '1.5rem', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--bg)', background: 'linear-gradient(135deg, var(--amber-light), var(--amber-glow))', border: 'none', borderRadius: 100, padding: '1rem', cursor: 'none', boxShadow: '0 0 30px rgba(240,168,48,0.25)' }}
          >
            Enter
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ minHeight: '100vh', position: 'relative', zIndex: 2, padding: '3rem' }}
    >
      {/* HEADER */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)' }}>Private Dashboard</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--cream)', marginTop: '0.3rem' }}>Message Inbox</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="glass" style={{ borderRadius: '1rem', padding: '0.7rem 1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--amber-light)' }}>
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </div>
            <motion.button
              onClick={loadMessages}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--bg)', background: 'var(--amber-light)', border: 'none', padding: '0.7rem 1.4rem', borderRadius: 100, cursor: 'none' }}
            >
              Refresh
            </motion.button>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cream-dim)' }}>
            Loading messages...
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="glass" style={{ borderRadius: '1.5rem', padding: '4rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cream-dim)' }}>No messages yet. Share your portfolio and they will come.</div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
          {/* MESSAGE LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={selected === msg ? 'glass-bright' : 'glass'}
                onClick={() => setSelected(selected === msg ? null : msg)}
                whileHover={{ x: 4 }}
                transition={spring}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ borderRadius: '1.2rem', padding: '1.4rem 1.6rem', cursor: 'none', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--cream)' }}>{msg.Name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.2rem 0.6rem', borderRadius: 100, background: 'rgba(200,134,10,0.15)', border: '1px solid rgba(200,134,10,0.25)', color: 'var(--amber-light)' }}>
                      {subjectLabel[msg.Subject] || msg.Subject}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cream-dim)' }}>{msg.Email}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.Message}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--cream-dim)', textAlign: 'right', flexShrink: 0 }}>{msg.Timestamp}</div>
              </motion.div>
            ))}
          </div>

          {/* MESSAGE DETAIL */}
          {selected && (
            <motion.div
              className="glass-bright"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
              style={{ borderRadius: '1.8rem', padding: '2rem', height: 'fit-content', position: 'sticky', top: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--cream)' }}>{selected.Name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--amber-light)', marginTop: '0.2rem' }}>{selected.Email}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--cream-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', cursor: 'none' }}>Close</button>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.4rem' }}>Subject</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--cream)', marginBottom: '1.5rem' }}>{subjectLabel[selected.Subject] || selected.Subject}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.4rem' }}>Message</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--cream)', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{selected.Message}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--cream-dim)' }}>{selected.Timestamp}</div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <a href={`mailto:${selected.Email}`} className="btn-amber" style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>Reply via Email</a>
                <a href={`https://wa.me/?text=Hi ${selected.Name}`} target="_blank" rel="noreferrer" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>WhatsApp</a>
              </div>
            </motion.div>
          )}
        </div>

        <div style={{ marginTop: '3rem', padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,185,80,0.04)', border: '1px solid rgba(255,185,80,0.1)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.5rem' }}>Setup Note</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cream-dim)', lineHeight: 1.7 }}>
            To load real messages add VITE_SHEET_ID and VITE_SHEETS_API_KEY to your Vercel environment variables. Enable Google Sheets API in your Google Cloud Console and create an API key restricted to Sheets API. Your sheet ID is in the URL of your Google Sheet.
          </div>
        </div>
      </div>
    </motion.div>
  )
}
