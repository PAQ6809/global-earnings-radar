import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext'
import Landing from './pages/Landing'
import Company from './pages/Company'
import Sector from './pages/Sector'
import Glossary from './pages/Glossary'
import Research from './pages/Research'
import Compare from './pages/Compare'
import Pricing from './pages/Pricing'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import Waitlist from './pages/Waitlist'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SiteDisclaimer from './pages/SiteDisclaimer'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import Disclaimer from './components/Disclaimer'
import DarkModeToggle from './components/DarkModeToggle'
import Search from './components/Search'

// Liquid Gradient Background Component
function GradientBackground() {
  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    document.documentElement.style.setProperty('--mouse-x', `${x}%`)
    document.documentElement.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="gradient-background" aria-hidden="true">
      <div className="mouse-glow" />
    </div>
  )
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleNavClick}>
          <span className="logo-text">Global Earnings Radar</span>
        </Link>
        <div className="nav-center">
          <div className="nav-links">
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <Link to="/research" onClick={handleNavClick}>Research</Link>
            <Link to="/compare" onClick={handleNavClick}>Compare</Link>
            <Link to="/pricing" onClick={handleNavClick}>Pricing</Link>
            <Link to="/waitlist" onClick={handleNavClick}>Waitlist</Link>
          </div>
        </div>
        <div className="nav-actions">
          <Search />
          <DarkModeToggle />
        </div>
        <button
          className="nav-mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '×' : '≡'}
        </button>
        <div className={`nav-links-wrapper${mobileMenuOpen ? ' open' : ''}`}>
          <div className="nav-links">
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <Link to="/research" onClick={handleNavClick}>Research</Link>
            <Link to="/compare" onClick={handleNavClick}>Compare</Link>
            <Link to="/pricing" onClick={handleNavClick}>Pricing</Link>
            <Link to="/waitlist" onClick={handleNavClick}>Waitlist</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function AppContent() {
  return (
    <div className="app">
      <GradientBackground />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/company/:ticker" element={<Company />} />
          <Route path="/sector/:sector" element={<Sector />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/research" element={<Research />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<SiteDisclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Disclaimer />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}