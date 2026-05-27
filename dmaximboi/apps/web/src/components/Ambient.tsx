export default function Ambient() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <style>{`
        @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(4%,6%) scale(1.12); } }
        @keyframes drift2 { from { transform: translate(0,0) scale(1.05); } to { transform: translate(-3%,-5%) scale(0.95); } }
        @keyframes drift3 { from { transform: translate(0,0) scale(1); } to { transform: translate(5%,-4%) scale(1.08); } }
        .orb1 { animation: drift1 22s ease-in-out infinite alternate; }
        .orb2 { animation: drift2 18s ease-in-out infinite alternate; animation-delay: -8s; }
        .orb3 { animation: drift3 25s ease-in-out infinite alternate; animation-delay: -4s; }
      `}</style>
      <div className="orb1" style={{
        position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.18,
        width: '55vw', height: '55vw', top: '-15%', left: '-10%',
        background: 'radial-gradient(circle, #c8860a, transparent 70%)',
      }} />
      <div className="orb2" style={{
        position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.15,
        width: '40vw', height: '40vw', bottom: '-10%', right: '-8%',
        background: 'radial-gradient(circle, #7a3f10, transparent 70%)',
      }} />
      <div className="orb3" style={{
        position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.08,
        width: '30vw', height: '30vw', top: '40%', left: '50%',
        background: 'radial-gradient(circle, #f0a830, transparent 70%)',
      }} />
    </div>
  )
}
