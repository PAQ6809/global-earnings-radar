import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'

export default function Landing() {
  const sectors = [
    { id: 'ai', name: 'AI', icon: '🤖', description: 'Artificial Intelligence & Machine Learning' },
    { id: 'semiconductors', name: 'Semiconductors', icon: '💾', description: 'Chips, Foundries & Equipment' },
    { id: 'saas', name: 'SaaS', icon: '☁️', description: 'Software as a Service Platforms' },
    { id: 'cloud', name: 'Cloud', icon: '🖥️', description: 'Cloud Computing Infrastructure' },
    { id: 'consumer', name: 'Consumer Tech', icon: '📱', description: 'Devices & Consumer Electronics' }
  ]

  const features = [
    {
      title: 'Earnings Summaries',
      description: 'Concise, structured summaries of quarterly earnings reports in a consistent format you can understand in minutes.',
      icon: '📊'
    },
    {
      title: 'Business Insights',
      description: 'Clear analysis of key developments, strategic initiatives, and competitive positioning to inform your research.',
      icon: '💡'
    },
    {
      title: 'Risk Factors',
      description: 'Balanced perspective on challenges, regulatory concerns, and market risks to consider in your analysis.',
      icon: '⚠️'
    },
    {
      title: 'Research Questions',
      description: 'Forward-looking questions to guide your own due diligence and independent analysis.',
      icon: '🔍'
    }
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
                <div className="feature-icon">{feature.icon}</div>
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
              <div className="feature-icon">📋</div>
              <h3>Saved Watchlists</h3>
              <p>Track your favorite companies and receive earnings alerts. Save research notes for each company.</p>
            </div>
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <div className="feature-icon">🤖</div>
              <h3>AI Earnings Briefs</h3>
              <p>Get AI-assisted summaries of earnings calls with key highlights, risks, and questions to watch.</p>
            </div>
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <div className="feature-icon">📊</div>
              <h3>Sector Dashboards</h3>
              <p>Visualize sector trends, compare company performance, and track industry momentum.</p>
            </div>
            <div className="card feature-card pro-preview-card">
              <div className="pro-badge-overlay">Pro Preview</div>
              <div className="feature-icon">📄</div>
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

      {/* Sectors Section */}
      <section className="section section-fade-out">
        <div className="container">
          <h2 className="section-title">Browse by Sector</h2>
          <p className="section-subtitle">
            Explore companies organized by technology sector
          </p>
          <div className="card-grid">
            {sectors.map((sector) => (
              <Link to={`/sector/${sector.id}`} key={sector.id} className="card-link">
                <div className="card sector-card">
                  <div className="sector-icon">{sector.icon}</div>
                  <h3>{sector.name}</h3>
                  <p>{sector.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Simple, Transparent</h2>
          <p className="section-subtitle">
            Choose the plan that fits your research needs
          </p>
          <div className="pricing-grid">
            {/* Free Tier */}
            <div className="pricing-card">
              <h3>Free</h3>
              <div className="pricing-price">$0<span>/month</span></div>
              <p className="pricing-tagline">For learners</p>
              <ul className="pricing-features">
                <li>All 11 company analyses</li>
                <li>Weekly earnings summaries</li>
                <li>Full glossary access</li>
                <li>Mobile responsive</li>
                <li>No account required</li>
              </ul>
              <Link to="/company/NVDA" className="btn btn-outline">
                Explore Now
              </Link>
            </div>

            {/* Pro Tier (Coming Soon) */}
            <div className="pricing-card featured">
              <span className="popular-badge">Coming Soon</span>
              <h3>Pro</h3>
              <div className="pricing-price">$9<span>/month</span></div>
              <p className="pricing-tagline">For serious researchers</p>
              <ul className="pricing-features">
                <li>Everything in Free</li>
                <li>20+ company analyses</li>
                <li>Daily earnings summaries</li>
                <li>Export to PDF & Markdown</li>
                <li>Advanced watchlist</li>
                <li>Priority weekly briefs</li>
              </ul>
              <Link to="/waitlist" className="btn btn-primary">
                Join Waitlist
              </Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-400)', marginTop: '40px', fontSize: '0.9375rem' }}>
            Free tier includes full access to all current company analyses.
            <br />Pro features are coming soon—join our waitlist to be notified.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Stay Informed</h2>
        <p>Join our waitlist to receive updates when new company analyses and features are available.</p>
        <Link to="/waitlist" className="btn btn-primary">
          Join Waitlist
        </Link>
      </section>
    </div>
  )
}