import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      const p = pos.current
      p.rx += (p.mx - p.rx) * 0.12
      p.ry += (p.my - p.ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + 'px'
        ringRef.current.style.top = p.ry + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (!ringRef.current) return
      ringRef.current.style.width = '54px'
      ringRef.current.style.height = '54px'
      ringRef.current.style.borderColor = 'rgba(255,185,80,0.9)'
      ringRef.current.style.background = 'rgba(200,134,10,0.08)'
    }

    const onLeave = () => {
      if (!ringRef.current) return
      ringRef.current.style.width = '36px'
      ringRef.current.style.height = '36px'
      ringRef.current.style.borderColor = 'rgba(255,185,80,0.6)'
      ringRef.current.style.background = 'transparent'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', mixBlendMode: 'difference' }}>
      <div
        ref={ringRef}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,185,80,0.6)',
          position: 'absolute', transform: 'translate(-50%,-50%)',
          transition: 'width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, background 0.3s',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={dotRef}
        style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--amber-glow)',
          boxShadow: '0 0 8px var(--amber-glow)',
          position: 'absolute', transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
