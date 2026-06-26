import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext'
import Landing from './pages/Landing'
import Company from './pages/Company'
import Sector from './pages/Sector'
import Glossary from './pages/Glossary'
import Pricing from './pages/Pricing'
import Waitlist from './pages/Waitlist'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SiteDisclaimer from './pages/SiteDisclaimer'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import Disclaimer from './components/Disclaimer'
import DarkModeToggle from './components/DarkModeToggle'
import Search from './components/Search'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📡</span>
          <span className="logo-text">Global Earnings Radar</span>
        </Link>
        <div className="nav-controls">
          <Search />
          <DarkModeToggle />
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/sector/ai">AI</Link>
          <Link to="/sector/semiconductors">Semiconductors</Link>
          <Link to="/sector/saas">SaaS</Link>
          <Link to="/sector/cloud">Cloud</Link>
          <Link to="/sector/consumer">Consumer</Link>
          <Link to="/glossary">Glossary</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
      </div>
    </nav>
  )
}

function AppContent() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/company/:ticker" element={<Company />} />
          <Route path="/sector/:sector" element={<Sector />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/pricing" element={<Pricing />} />
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