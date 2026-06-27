import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'

// Sample watchlist data - 5 companies with different statuses
const watchlistData = [
  { ticker: 'NVDA', status: 'Brief planned', earningsDate: 'Aug 28, 2026' },
  { ticker: 'MSFT', status: 'Compare saved', earningsDate: 'Jul 22, 2026' },
  { ticker: 'AAPL', status: 'Earnings watch', earningsDate: 'Aug 1, 2026' },
  { ticker: 'ASML', status: 'Brief planned', earningsDate: 'Oct 15, 2026' },
  { ticker: 'GOOGL', status: 'Research notes', earningsDate: 'Jul 22, 2026' }
]

// Helper to get company info
const getCompany = (ticker) => {
  return companies.find(c => c.ticker === ticker) || {}
}

// Research workspace locked features
const lockedFeatures = [
  { icon: '??', title: 'Research Notes', description: 'Personal annotations and investment thesis' },
  { icon: '??', title: 'Saved Comparisons', description: 'Return to your comparison sets' },
  { icon: '??', title: 'Earnings Reminders', description: 'Calendar alerts before earnings' },
  { icon: '?', title: 'Export Queue', description: 'PDF or Markdown export list' },
  { icon: '?', title: 'Team Workspace', description: 'Shared research for teams' }
]

export default function Watchlist() {
  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="pro-badge" style={{
              background: 'rgba(255,255,255,0.25)',
              padding: '0.25rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.7rem'
            }}>
              Pro Preview
            </span>
          </div>
          <h1>Watchlist Preview</h1>
          <p style={{ marginTop: '0.75rem' }}>
            Track companies, research notes, earnings dates, and saved comparison ideas.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* Preview Notice */}
        <div className="watchlist-preview-notice" style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <span className="watchlist-tier-badge free">Free Preview</span>
          <span className="watchlist-tier-badge sample">Sample Structure</span>
          <span className="watchlist-tier-badge disclaimer">Not investment advice</span>
        </div>

        {/* Watchlist Section */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Your Watchlist
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              Sample watchlist ??data from cached sample dataset
            </p>
          </div>

          {/* Watchlist Grid */}
          <div className="watchlist-grid">
            {watchlistData.map((item) => {
              const company = getCompany(item.ticker)
              return (
                <div key={item.ticker} className="watchlist-item">
                  <div className="watchlist-item-header">
                    <div>
                      <span className="ticker-badge">{item.ticker}</span>
                    </div>
                    <span className="status-badge" data-status={item.status.split(' ')[0].toLowerCase()}>
                      {item.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{company.name || item.ticker}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    {company.sectors?.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') || 'Sector unavailable'}
                  </p>
                  <div className="watchlist-item-meta">
                    <div className="meta-row">
                      <span className="meta-label">Data Mode</span>
                      <span className="meta-value">
                        <span className="watchlist-freshness-dot watchlist-freshness-dot-demo"></span>
                        Demo / sample dataset
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Earnings</span>
                      <span className="meta-value">{item.earningsDate}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Last Updated</span>
                      <span className="meta-value">Demo snapshot - not live</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Research Workspace Section */}
        <div className="card watchlist-pro-locked-section" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Research Workspace Preview
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              Advanced workspace capabilities for paid subscribers
            </p>
          </div>

          <div className="watchlist-locked-features-grid">
            {lockedFeatures.map((feature, index) => (
              <div key={index} className="watchlist-locked-feature-item">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{feature.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{feature.description}</p>
                <div className="watchlist-pro-preview-label">
                  <span className="pro-badge" style={{ fontSize: '0.6rem' }}>Pro Preview</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/waitlist" className="btn btn-primary">
              Join Pro Waitlist
            </Link>
          </div>
        </div>

        {/* Educational Note */}
        <div className="card" style={{
          background: 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          marginBottom: '2rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--gray-800)' }}>
            How to Use Your Watchlist
          </h3>
          <ul style={{ fontSize: '0.9rem', color: 'var(--gray-600)', listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>1.</span>
              Add companies you want to track and receive earnings date reminders
            </li>
            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>2.</span>
              Save research notes and annotations for each company
            </li>
            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>3.</span>
              Build comparison sets to benchmark companies side-by-side
            </li>
            <li style={{ paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>4.</span>
              Export your research as PDF or Markdown for sharing or offline reading
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/research" className="btn btn-outline">
            ??Research Preview
          </Link>
          <Link to="/compare" className="btn btn-secondary">
            Compare Preview
          </Link>
          <Link to="/waitlist" className="btn btn-primary">
            Join Pro Waitlist
          </Link>
        </div>
      </div>
    </div>
  )
}

