import React from 'react'
import { useParams, Link } from 'react-router-dom'
import companies from '../data/companies.json'
import financials from '../data/financials.json'

const sectorData = {
  ai: {
    name: 'AI & Machine Learning',
    icon: '',
    description: 'Companies leading the artificial intelligence revolution, from foundation model providers to AI infrastructure and applications.',
    companies: ['NVDA', 'MSFT', 'GOOGL', 'META', 'AMD'],
    highlights: [
      'Foundation models driving unprecedented AI capability advances',
      'Enterprise AI adoption accelerating across industries',
      'AI infrastructure spending remains robust',
      'Regulatory frameworks evolving globally'
    ]
  },
  semiconductors: {
    name: 'Semiconductors',
    icon: '',
    description: 'The chip ecosystem including fabless designers, foundries, and equipment manufacturers that power modern computing.',
    companies: ['NVDA', 'ASML', 'AMD', 'TSM'],
    highlights: [
      'AI chips driving next wave of semiconductor growth',
      'Advanced node capacity remains constrained',
      'Geopolitical tensions affecting supply chains',
      'Leading-edge technology concentration increasing'
    ]
  },
  saas: {
    name: 'SaaS & Enterprise Software',
    icon: '',
    description: 'Software companies transitioning to cloud subscriptions, offering recurring revenue models and enterprise productivity tools.',
    companies: ['MSFT', 'SAP'],
    highlights: [
      'Enterprise SaaS adoption continuing to accelerate',
      'AI features becoming key differentiators',
      'Consolidation trends in fragmented market',
      'Expansion metrics remain healthy'
    ]
  },
  cloud: {
    name: 'Cloud Computing',
    icon: '',
    description: 'Cloud infrastructure and platform services enabling digital transformation across industries.',
    companies: ['MSFT', 'AMZN', 'GOOGL'],
    highlights: [
      'Cloud adoption accelerating with AI workloads',
      'Multi-cloud strategies becoming standard',
      'Edge computing gaining momentum',
      'Sovereign cloud requirements emerging'
    ]
  },
  consumer: {
    name: 'Consumer Technology',
    icon: '',
    description: 'Consumer electronics, devices, and services reaching billions of users globally.',
    companies: ['AAPL', 'GOOGL', 'AMZN', 'META', 'TSLA'],
    highlights: [
      'AI integration into consumer devices accelerating',
      'Premium segment showing resilience',
      'Services revenue becoming major contributor',
      'Emerging market competition intensifying'
    ]
  }
}

export default function Sector() {
  const { sector } = useParams()
  const data = sectorData[sector]

  if (!data) {
    return (
      <div className="container">
        <div className="error-state">
          <h2>Sector Not Found</h2>
          <p>The sector "{sector}" does not exist.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const sectorCompanies = data.companies.map(ticker => {
    const company = companies.find(c => c.ticker === ticker)
    const financial = financials[ticker]
    return { company, financial }
  }).filter(item => item.company && item.financial)

  return (
    <div>
      {/* Sector Header */}
      <div className="sector-hero">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{data.icon}</div>
        <h1>{data.name}</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          {data.description}
        </p>
      </div>

      <div className="container">
        {/* Industry Highlights */}
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
             Industry Highlights
          </h2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {data.highlights.map((highlight, index) => (
              <li key={index} style={{ marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Companies in Sector */}
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          Companies in {data.name}
        </h2>
        <div className="card-grid" style={{ marginBottom: '2rem' }}>
          {sectorCompanies.map(({ company, financial }) => (
            <Link to={`/company/${company.ticker}`} key={company.ticker} className="card-link">
              <div className="card company-card">
                <h3>{company.name}</h3>
                <span className="ticker-badge">{company.ticker}</span>
                <span className="sector-badge">{company.exchange}</span>

                <div className="stats-grid" style={{ marginTop: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
                  <div className="stat-item">
                    <div className="stat-label">Revenue</div>
                    <div className="stat-value" style={{ fontSize: '1.1rem' }}>
                      {financial.financials.revenue.formatted}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Growth</div>
                    <div className={`stat-value ${financial.financials.revenue.growth >= 0 ? 'positive' : ''}`} style={{
                      fontSize: '1.1rem',
                      color: financial.financials.revenue.growth >= 0 ? 'var(--success)' : 'var(--danger)'
                    }}>
                      {financial.financials.revenue.growthFormatted}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 500 }}>
                  View Full Analysis →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* More Companies Coming Soon */}
        <div className="empty-state" style={{ padding: '2rem', background: 'var(--gray-50)', borderRadius: 'var(--border-radius)' }}>
          <h3>More Companies Coming Soon</h3>
          <p style={{ marginBottom: '1rem' }}>
            We're continuously adding analysis of more {data.name} companies.
          </p>
          <Link to="/waitlist" className="btn btn-outline">
            Join Waitlist for Updates
          </Link>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/" className="btn btn-outline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}