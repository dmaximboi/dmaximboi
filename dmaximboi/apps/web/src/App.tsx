import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Cursor from '@/components/Cursor'
import Ambient from '@/components/Ambient'
import Nav from '@/components/Nav'
import Home from '@/pages/Home'
import Code from '@/pages/Code'
import Teach from '@/pages/Teach'
import About from '@/pages/About'
import Dashboard from '@/pages/Dashboard'
import NotFound from '@/pages/NotFound'

export default function App() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dmxb-inbox'

  return (
    <>
      <Cursor />
      <Ambient />
      {!isDashboard && <Nav />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<Code />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/about" element={<About />} />
          <Route path="/dmxb-inbox" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
