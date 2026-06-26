import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'

export default function Landing() {
  const sectors = [
    { id: 'ai', name: 'AI', description: 'Artificial Intelligence & Machine Learning' },
    { id: 'semiconductors', name: 'Semiconductors', description: 'Chips, Foundries & Equipment' },
    { id: 'saas', name: 'SaaS', description: 'Software as a Service Platforms' },
    { id: 'cloud', name: 'Cloud', description: 'Cloud Computing Infrastructure' },
    { id: 'consumer', name: 'Consumer Tech', description: 'Devices & Consumer Electronics' }
  ]

  const features = [
    {
      title: 'Earnings Summaries',
      description: 'Concise, structured summaries of quarterly earnings reports in a consistent format you can understand in minutes.'
    },
    {
      title: 'Business Insights',
      description: 'Clear analysis of key developments, strategic initiatives, and competitive positioning to inform your research.'
    },
    {
      title: 'Risk Factors',
      description: 'Balanced perspective on challenges, regulatory concerns, and market risks to consider in your analysis.'
    },
    {
      title: 'Research Questions',
      description: 'Forward-looking questions to guide your own due diligence and independent analysis.'
    }
  ]

  const workflowSteps = [
    { step: 1, title: 'Track Companies', description: 'Build your watchlist of companies to follow' },
    { step: 2, title: 'Read Earnings Snapshot', description: 'Review structured earnings summaries with key metrics' },
    { step: 3, title: 'Compare Sector Peers', description: 'Benchmark against other companies in the same sector' },
    { step: 4, title: 'Save Research Notes', description: 'Add personal annotations and investment thesis' },
    { step: 5, title: 'Export Research Brief', description: 'Generate a one-page summary for sharing or reference' }
  ]

  const briefPreviewItems = [
    { label: 'Revenue Trend', value: '+18.3% YoY', status: 'positive' },
    { label: 'EPS Surprise', value: '+$0.42 beat', status: 'positive' },
    { label: 'Guidance Watch', value: 'Raised full-year outlook', status: 'neutral' },
    { label: 'Management Tone', value: 'Cautiously optimistic', status: 'neutral' },
    { label: 'Key Risks', value: '3 flagged', status: 'warning' },
    { label: 'Questions for Next Quarter', value: '4 prepared', status: 'neutral' }
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Educational Research Tool</p>
          <h1>Global Earnings Radar</h1>
          <p className="hero-subtitle">
            Understand earnings reports, business trends, and risk factors—in minutes.
            Built for students, researchers, and curious investors who want to learn.
          </p>
          <div className="hero-cta">
            <Link to="/company/NVDA" className="btn btn-primary">
              Explore NVIDIA
            </Link>
            <Link to="/glossary" className="btn btn-secondary">
              Learn Financial Terms
            </Link>
          </div>
          <p className="hero-note">
            Free access to all company analyses · No account required
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">What We Provide</h2>
          <p className="section-subtitle">
            We analyze publicly available earnings reports and transform complex financial data into
            digestible insights. Our goal is to help you understand how major tech companies are performing—
            not to tell you what to invest in.
          </p>
          <div className="card-grid">
            {features.map((feature, index) => (
              <div key={index} className="card feature-card">
                <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="section section-fade-in">
        <div className="container">
          <h2 className="section-title">Featured Companies</h2>
          <p className="section-subtitle">
            In-depth analysis of leading US and European tech companies
          </p>
          <div className="card-grid">
            {companies.map((company) => (
              <Link to={`/company/${company.ticker}`} key={company.ticker} className="card-link">
                <div className="company-card">
                  <h3>{company.name}</h3>
                  <div>
                    <span className="ticker-badge">{company.ticker}</span>
                    <span className="sector-badge">{company.sectors[0]}</span>
                  </div>
                  <p style={{ marginTop: '16px' }}>{company.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Features Preview */}
      <section className="section section-fade-in">
        <div className="container">
          <h2 className="section-title">Built for Deeper Earnings Research</h2>
          <p className="section-subtitle">
            Pro features planned for paid subscribers — now in preview
          </p>
          <div className="card-grid">
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <h3>Saved Watchlists</h3>
              <p>Track your favorite companies and receive earnings alerts. Save research notes for each company.</p>
            </div>
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <h3>AI Earnings Briefs</h3>
              <p>Get AI-assisted summaries of earnings calls with key highlights, risks, and questions to watch.</p>
            </div>
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <h3>Sector Dashboards</h3>
              <p>Visualize sector trends, compare company performance, and track industry momentum.</p>
            </div>
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <h3>Exportable Reports</h3>
              <p>Export company analyses and research briefs to PDF or Markdown for offline reading.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '2rem', fontSize: '0.9rem' }}>
            These features are planned for paid users and are not automatically unlocked yet.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/waitlist" className="btn btn-primary">
              Join Pro Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Pro Research Workflow Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">A Pro Workflow for Earnings Research</h2>
          <p className="section-subtitle">
            Planned workflow for paid subscribers — each step shown as preview
          </p>
          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <div key={step.step} className="card workflow-card">
                <div className="workflow-step-number">{String(step.step).padStart(2, '0')}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="preview-label">Pro Preview</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '2rem', fontSize: '0.9rem' }}>
            This workflow is planned for paid users. It is shown as a product preview and is not automatically unlocked yet.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/waitlist" className="btn btn-primary">
              Join Pro Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Earnings Brief Preview */}
      <section className="section section-fade-out">
        <div className="container">
          <h2 className="section-title">What a Pro Earnings Brief Will Include</h2>
          <p className="section-subtitle">
            Sample preview · Not investment advice
          </p>
          <div className="brief-preview-container">
            <div className="card brief-preview">
              <div className="brief-preview-header">
                <h3>Quarterly Earnings Brief · Sample Preview</h3>
                <span className="preview-label">Pro Preview</span>
              </div>
              <div className="brief-preview-grid">
                {briefPreviewItems.map((item, index) => (
                  <div key={index} className={`brief-preview-item ${item.status}`}>
                    <span className="brief-label">{item.label}</span>
                    <span className="brief-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="brief-preview-disclaimer">
                This is a sample preview for demonstration purposes only. Not investment advice.
                Data shown is illustrative and does not represent actual company performance.
              </p>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '2rem', fontSize: '0.9rem' }}>
            Pro earnings briefs will include structured summaries with revenue trends, EPS analysis,
            guidance highlights, and prepared questions for continued research.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/waitlist" className="btn btn-primary">
              Join Pro Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section section-fade-in">
        <div className="container">
          <h2 className="section-title">Browse by Sector</h2>
          <p className="section-subtitle">
            Explore companies organized by technology sector
          </p>
          <div className="card-grid">
            {sectors.map((sector) => (
              <Link to={`/sector/${sector.id}`} key={sector.id} className="card-link">
                <div className="card sector-card">
                  <h3>{sector.name}</h3>
                  <p>{sector.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Stay Informed</h2>
        <p>Join our waitlist to receive updates when Pro features and new company analyses become available.</p>
        <Link to="/waitlist" className="btn btn-primary">
          Join Pro Waitlist
        </Link>
      </section>
    </div>
  )
}