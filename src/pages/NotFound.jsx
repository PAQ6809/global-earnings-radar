import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <div className="sector-hero" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
        <h1>Page Not Found</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="container" style={{ textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
          <h2 style={{ marginBottom: '1rem' }}>What happened?</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
            We couldn't find the page you were looking for. This might be because:
          </p>
          <ul style={{ textAlign: 'left', color: 'var(--gray-600)', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
            <li>The URL is incorrect or has a typo</li>
            <li>The page has been moved or deleted</li>
            <li>The company or sector doesn't exist in our database</li>
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Link to="/" className="btn btn-primary">
              ← Back to Home
            </Link>
            <Link to="/glossary" className="btn btn-outline">
              Browse Glossary
            </Link>
            <Link to="/waitlist" className="btn btn-outline">
              Join Waitlist
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Popular Pages</h3>
          <div className="card-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/company/NVDA" className="card-link">
              <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                <h4>NVIDIA Analysis</h4>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>NVDA • AI & Semiconductors</p>
              </div>
            </Link>
            <Link to="/company/MSFT" className="card-link">
              <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                <h4>Microsoft Analysis</h4>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>MSFT • Cloud & SaaS</p>
              </div>
            </Link>
            <Link to="/sector/ai" className="card-link">
              <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
                <h4>AI Sector</h4>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>Artificial Intelligence</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}