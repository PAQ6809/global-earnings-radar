import React from 'react'
import { Link } from 'react-router-dom'
import financials from '../data/financials.json'
import companies from '../data/companies.json'

// Sample companies for comparison preview (3 semiconductor/AI companies)
const comparisonTickers = ['NVDA', 'AMD', 'TSM']

// Helper function to get company info
const getCompanyInfo = (ticker) => {
  return companies.find(c => c.ticker === ticker) || {}
}

// Helper function to get financials
const getFinancials = (ticker) => {
  return financials[ticker] || null
}

// Helper to format percentage
const formatPercent = (value) => {
  if (value === undefined || value === null) return '—'
  const percent = value * 100
  const sign = percent >= 0 ? '+' : ''
  return `${sign}${percent.toFixed(1)}%`
}

// Pro features that are locked (not implemented)
const lockedProFeatures = [
  { icon: '🤖', title: 'AI-assisted comparison', description: 'Auto-generated insights from filings' },
  { icon: '⚠️', title: 'Risk factor extraction', description: 'Side-by-side risk analysis' },
  { icon: '💬', title: 'Management tone comparison', description: 'Earnings call sentiment analysis' },
  { icon: '📊', title: 'Exportable comparison report', description: 'Download as PDF or Markdown' },
  { icon: '💾', title: 'Saved comparison workspace', description: 'Return to your saved comparisons' }
]

export default function Compare() {
  // Build comparison data from existing data
  const comparisonData = comparisonTickers.map(ticker => {
    const fin = getFinancials(ticker)
    const info = getCompanyInfo(ticker)

    return {
      ticker,
      name: fin?.companyName || info.name || ticker,
      sector: info.sectors?.join(', ') || '—',
      exchange: info.exchange || '—',
      revenue: fin?.financials?.revenue?.formatted || '—',
      revenueGrowth: fin?.financials?.revenue?.growthFormatted || '—',
      grossMargin: fin?.financials?.grossProfit?.margin
        ? `${(fin.financials.grossProfit.margin * 100).toFixed(1)}%`
        : 'Sample unavailable',
      operatingMargin: fin?.financials?.operatingIncome?.margin
        ? `${(fin.financials.operatingIncome.margin * 100).toFixed(1)}%`
        : 'Sample unavailable',
      netMargin: fin?.financials?.netIncome?.margin
        ? `${(fin.financials.netIncome.margin * 100).toFixed(1)}%`
        : 'Sample unavailable',
      eps: fin?.financials?.eps?.value
        ? `$${fin.financials.eps.value.toFixed(2)}`
        : '—',
      epsGrowth: formatPercent(fin?.financials?.eps?.growth),
      dataMode: 'Demo / sample dataset'
    }
  })

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
          <h1>Company Comparison Preview</h1>
          <p style={{ marginTop: '0.75rem' }}>
            Compare company fundamentals, growth profile, margin structure, risk signals, and earnings context.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* Preview Notice */}
        <div className="preview-notice" style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <span className="tier-badge free">Free Preview</span>
          <span className="tier-badge sample">Sample Structure</span>
          <span className="tier-badge disclaimer">Not investment advice</span>
        </div>

        {/* Comparison Table */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Semiconductor & AI Chip Makers
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              Sample comparison — data from cached sample dataset
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="comparison-grid">
            {/* Table Header */}
            <div className="comparison-header">
              <div className="comparison-cell comparison-label">Metric</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value comparison-header-cell">
                  <div style={{ fontWeight: '600', fontSize: '1rem' }}>{company.name}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="ticker-badge" style={{ fontSize: '0.7rem' }}>{company.ticker}</span>
                    <span className="sector-badge" style={{ fontSize: '0.65rem' }}>{company.exchange}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Company</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  {company.name}
                </div>
              ))}
            </div>

            {/* Sector Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Sector</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <span className="sector-badge" style={{ fontSize: '0.7rem' }}>{company.sector}</span>
                </div>
              ))}
            </div>

            {/* Revenue Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Revenue</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <strong>{company.revenue}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                    {company.revenueGrowth}
                  </div>
                </div>
              ))}
            </div>

            {/* EPS Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">EPS</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <strong>{company.eps}</strong>
                  <div style={{
                    fontSize: '0.8rem',
                    color: company.epsGrowth.startsWith('+') ? 'var(--success)' :
                           company.epsGrowth.startsWith('-') ? 'var(--danger)' : 'var(--gray-500)',
                    marginTop: '0.25rem'
                  }}>
                    {company.epsGrowth} YoY
                  </div>
                </div>
              ))}
            </div>

            {/* Gross Margin Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Gross Margin</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <div className="margin-bar">
                    <div
                      className="margin-bar-fill"
                      style={{
                        width: company.grossMargin !== 'Sample unavailable'
                          ? company.grossMargin
                          : '0%'
                      }}
                    />
                  </div>
                  <strong style={{
                    color: company.grossMargin !== 'Sample unavailable'
                      ? (parseFloat(company.grossMargin) > 60 ? 'var(--success)' : 'var(--dark)')
                      : 'var(--gray-400)'
                  }}>
                    {company.grossMargin}
                  </strong>
                </div>
              ))}
            </div>

            {/* Operating Margin Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Operating Margin</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <div className="margin-bar">
                    <div
                      className="margin-bar-fill"
                      style={{
                        width: company.operatingMargin !== 'Sample unavailable'
                          ? company.operatingMargin
                          : '0%'
                      }}
                    />
                  </div>
                  <strong>
                    {company.operatingMargin}
                  </strong>
                </div>
              ))}
            </div>

            {/* Net Margin Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Net Margin</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <div className="margin-bar">
                    <div
                      className="margin-bar-fill"
                      style={{
                        width: company.netMargin !== 'Sample unavailable'
                          ? company.netMargin
                          : '0%'
                      }}
                    />
                  </div>
                  <strong>
                    {company.netMargin}
                  </strong>
                </div>
              ))}
            </div>

            {/* Data Mode Row */}
            <div className="comparison-row">
              <div className="comparison-cell comparison-label">Data Mode</div>
              {comparisonData.map(company => (
                <div key={company.ticker} className="comparison-cell comparison-value">
                  <span className="freshness-dot freshness-dot-demo" style={{ marginRight: '0.5rem' }}></span>
                  {company.dataMode}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Features Locked Section */}
        <div className="card pro-locked-section" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Pro Comparison Features
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              Advanced comparison capabilities for paid subscribers
            </p>
          </div>

          <div className="locked-features-grid">
            {lockedProFeatures.map((feature, index) => (
              <div key={index} className="locked-feature-item">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{feature.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{feature.description}</p>
                <div className="pro-preview-label">
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
            How to Use This Comparison
          </h3>
          <ul style={{ fontSize: '0.9rem', color: 'var(--gray-600)', listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>1.</span>
              Use this as a starting point for your research, not a final decision
            </li>
            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>2.</span>
              Compare companies within the same sector for meaningful analysis
            </li>
            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>3.</span>
              Look at trends over multiple quarters, not just a single period
            </li>
            <li style={{ paddingLeft: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>4.</span>
              Verify all data from official company filings before making investment decisions
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/research" className="btn btn-outline">
            ← Research Preview
          </Link>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
          <Link to="/waitlist" className="btn btn-primary">
            Join Pro Waitlist
          </Link>
        </div>
      </div>
    </div>
  )
}