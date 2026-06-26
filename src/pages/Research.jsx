import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'

const sampleCompanies = {
  'NVDA': {
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    exchange: 'NASDAQ',
    sector: 'AI, Semiconductors',
    preview: {
      overview: 'Leading GPU manufacturer powering AI, gaming, and data center markets.',
      revenueSnapshot: 'Revenue grew significantly YoY driven by AI chip demand.',
      epsWatch: 'EPS beat expectations on strong data center performance.',
      marginWatch: 'Gross margins expanded as AI chip mix increased.',
      risks: ['Cyclical semiconductor demand', 'Export restrictions to China', 'GPU supply constraints'],
      questions: ['AI infrastructure spending pace?', 'China export impact?', 'New product ramp timeline?'],
      sources: ['SEC EDGAR 10-K/10-Q', 'Earnings call transcript', 'Company IR page', 'Analyst reports']
    }
  },
  'TSM': {
    name: 'Taiwan Semiconductor',
    ticker: 'TSM',
    exchange: 'NYSE (ADR)',
    sector: 'Semiconductors',
    preview: {
      overview: 'World\'s largest contract chipmaker serving Apple, NVIDIA, and other fabless designers.',
      revenueSnapshot: 'Revenue supported by advanced node demand from major customers.',
      epsWatch: 'EPS in line with guidance despite seasonal headwinds.',
      marginWatch: 'Margins stable at industry-leading levels.',
      risks: ['Geopolitical tensions (Taiwan)', 'Capital intensity', 'Customer concentration'],
      questions: ['Advanced node demand outlook?', 'CapEx plans?', 'CoWoS packaging capacity?'],
      sources: ['SEC EDGAR 20-F/ADR filings', 'TWSE filings', 'Earnings call transcript', 'Company IR page']
    }
  },
  'MSFT': {
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    exchange: 'NASDAQ',
    sector: 'Cloud, SaaS, AI',
    preview: {
      overview: 'Cloud and AI platform leader with Office 365, Azure, and Copilot.',
      revenueSnapshot: 'Cloud revenue continues strong growth trajectory.',
      epsWatch: 'EPS beat on operating leverage and cloud margin improvement.',
      marginWatch: 'Margins expanded as cloud scales.',
      risks: ['AI investment requirements', 'Regulatory scrutiny', 'Competitive pressure in AI'],
      questions: ['Azure AI monetization?', 'Copilot adoption rate?', 'AI infrastructure spend?'],
      sources: ['SEC EDGAR 10-K/10-Q', 'Earnings call transcript', 'Company IR page', 'SEC filings']
    }
  },
  'AAPL': {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    sector: 'Consumer Tech',
    preview: {
      overview: 'Premium consumer electronics and services company with iPhone, Mac, and growing Services.',
      revenueSnapshot: 'iPhone revenue flat; Services revenue growth continues.',
      epsWatch: 'EPS supported by margin management and buybacks.',
      marginWatch: 'Gross margins improved on Services mix.',
      risks: ['China demand uncertainty', 'Regulatory pressure', 'Smartphone market saturation'],
      questions: ['iPhone upgrade cycle?', 'Services growth sustainability?', 'China market outlook?'],
      sources: ['SEC EDGAR 10-K/10-Q', 'Earnings call transcript', 'Company IR page']
    }
  }
}

export default function Research() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.trim().toUpperCase()

    // Check if company exists in sample data or preview list
    const company = companies.find(c =>
      c.ticker.toUpperCase() === query ||
      c.name.toUpperCase().includes(query)
    )

    if (company && sampleCompanies[company.ticker]) {
      setSelectedCompany({
        ...sampleCompanies[company.ticker],
        ...company
      })
      setShowPreview(true)
    } else if (sampleCompanies[query]) {
      setSelectedCompany(sampleCompanies[query])
      setShowPreview(true)
    } else if (query === 'APPLE') {
      setSelectedCompany(sampleCompanies['AAPL'])
      setShowPreview(true)
    } else {
      // Default to NVDA as sample
      setSelectedCompany(sampleCompanies['NVDA'])
      setShowPreview(true)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <h1>Generate an Earnings Research Report</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Enter a company name or ticker to preview how Global Earnings Radar will turn public earnings materials into a structured research brief.
        </p>
      </div>

      <div className="container">
        {/* Search Form */}
        <div className="research-form-container">
          <form className="research-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="company-search">Company name or ticker</label>
              <input
                type="text"
                id="company-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="NVDA, TSM, Microsoft, Apple"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Preview Free Report
            </button>
          </form>
          <p className="form-hint">
            Try: NVDA, TSM, MSFT, AAPL or any company name
          </p>
        </div>

        {/* Free Preview Report */}
        {showPreview && selectedCompany && (
          <div className="research-report">
            {/* Preview Notice */}
            <div className="preview-notice">
              <span className="tier-badge free">Free Preview</span>
              <span className="tier-badge sample">Sample Structure</span>
              <span className="tier-badge disclaimer">Not investment advice</span>
            </div>

            {/* Company Header */}
            <div className="report-header">
              <div>
                <h2>{selectedCompany.name}</h2>
                <span className="ticker-badge">{selectedCompany.ticker}</span>
                <span className="sector-badge">{selectedCompany.sector}</span>
                {selectedCompany.exchange && (
                  <span className="sector-badge">{selectedCompany.exchange}</span>
                )}
              </div>
            </div>

            {/* Report Sections */}
            <div className="report-sections">
              {/* Company Overview */}
              <div className="report-section">
                <h3>1. Company Overview</h3>
                <p>{selectedCompany.preview.overview}</p>
              </div>

              {/* Latest Earnings Snapshot */}
              <div className="report-section">
                <h3>2. Latest Earnings Snapshot</h3>
                <p>{selectedCompany.preview.revenueSnapshot}</p>
              </div>

              {/* Revenue and EPS Watch */}
              <div className="report-section">
                <h3>3. Revenue and EPS Watch</h3>
                <p>{selectedCompany.preview.epsWatch}</p>
              </div>

              {/* Margin and Cash Flow Watch */}
              <div className="report-section">
                <h3>4. Margin and Cash Flow Watch</h3>
                <p>{selectedCompany.preview.marginWatch}</p>
              </div>

              {/* Key Risks */}
              <div className="report-section risks-section">
                <h3>5. Key Risks</h3>
                <ul>
                  {selectedCompany.preview.risks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>

              {/* Questions for Next Quarter */}
              <div className="report-section">
                <h3>6. Questions for Next Quarter</h3>
                <ul>
                  {selectedCompany.preview.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              {/* Source Types to Check */}
              <div className="report-section sources-section">
                <h3>7. Source Types to Check</h3>
                <div className="source-chips">
                  {selectedCompany.preview.sources.map((source, i) => (
                    <span key={i} className="source-chip">{source}</span>
                  ))}
                </div>
                <p className="source-note">
                  These are the types of public sources used to build this research report.
                  The free preview shows the report structure.
                </p>
              </div>
            </div>

            {/* Pro AI Upsell */}
            <div className="pro-upgrade-card">
              <div className="pro-upgrade-header">
                <h3>Unlock AI-Powered Earnings Analysis</h3>
                <span className="pro-badge-label">Pro Feature</span>
              </div>
              <p className="pro-upgrade-desc">
                Pro users will be able to generate AI-assisted earnings briefs from public filings,
                earnings releases, transcripts, and investor materials.
              </p>
              <ul className="pro-features-list">
                <li>AI-assisted earnings analysis</li>
                <li>Live filings source discovery</li>
                <li>Management tone summary</li>
                <li>Risk factor extraction</li>
                <li>Company comparison</li>
                <li>Exportable research brief</li>
              </ul>
              <p className="pro-ai-disclaimer">
                AI analysis is planned as a Pro feature and is not available in the free preview.
              </p>
              <Link to="/waitlist" className="btn btn-primary">
                Join Pro Waitlist
              </Link>
            </div>
          </div>
        )}

        {!showPreview && (
          <div className="research-placeholder">
            <div className="research-placeholder-content">
              <h3>Research Report Preview</h3>
              <p>
                Enter a company name or ticker above to see how Global Earnings Radar
                transforms public earnings materials into structured research briefs.
              </p>
              <div className="placeholder-features">
                <div className="placeholder-feature">
                  <span className="feature-num">01</span>
                  <div>
                    <strong>Free Preview</strong>
                    <p>Static sample structure and educational framing</p>
                  </div>
                </div>
                <div className="placeholder-feature">
                  <span className="feature-num">02</span>
                  <div>
                    <strong>Source Checklist</strong>
                    <p>Reference public sources for further research</p>
                  </div>
                </div>
                <div className="placeholder-feature">
                  <span className="feature-num">03</span>
                  <div>
                    <strong>Pro (Coming Soon)</strong>
                    <p>AI-assisted analysis from live filings and transcripts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}