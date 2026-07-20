import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Starfield from './components/Starfield'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import WhatWeDo from './pages/WhatWeDo'
import OurServices from './pages/OurServices'
import OurApproach from './pages/OurApproach'
import Jobs from './pages/Jobs'
import Partner from './pages/Partner'
import Join from './pages/Join'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function AdminGate() {
  return <AdminLogin onSuccess={() => window.location.assign('/admin/dashboard')} />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Starfield />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<WhatWeDo />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/approach" element={<OurApproach />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminGate />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Old URLs redirect so existing shared links keep working */}
          <Route path="/what-we-do" element={<Navigate to="/about-us" replace />} />
          <Route path="/our-services" element={<Navigate to="/services" replace />} />
          <Route path="/our-approach" element={<Navigate to="/approach" replace />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
