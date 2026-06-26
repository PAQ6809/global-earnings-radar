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
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.5rem' }}>
            📚 Educational Research Tool — Not Investment Advice
          </div>
          <h1>Global Earnings Radar</h1>
          <p>
            Understand earnings reports, business trends, and risk factors—in minutes.
            Built for students, researchers, and curious investors who want to learn.
          </p>
          <div className="hero-cta">
            <Link to="/company/NVDA" className="btn btn-primary">
              Explore NVIDIA Analysis
            </Link>
            <Link to="/glossary" className="btn btn-secondary">
              Learn Financial Terms
            </Link>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginTop: '1.5rem' }}>
            Free access to all company analyses • No account required
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ textAlign: 'left', display: 'inline-block', width: '100%' }}>
              What We Provide
            </h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', textAlign: 'left' }}>
              We analyze publicly available earnings reports and transform complex financial data into
              digestible insights. Our goal is to help you understand how major tech companies are performing—
              not to tell you what to invest in.
            </p>
          </div>
          <div className="card-grid">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--gray-600)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Featured Companies</h2>
          <p className="section-subtitle">
            In-depth analysis of leading US and European tech companies
          </p>
          <div className="card-grid">
            {companies.map((company) => (
              <Link to={`/company/${company.ticker}`} key={company.ticker} className="card-link">
                <div className="card company-card">
                  <h3>{company.name}</h3>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span className="ticker-badge">{company.ticker}</span>
                    <span className="sector-badge">{company.sectors[0]}</span>
                  </div>
                  <p style={{ color: 'var(--gray-600)', marginTop: '1rem', fontSize: '0.95rem' }}>
                    {company.description}
                  </p>
                  <div style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 500 }}>
                    View Analysis →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by Sector</h2>
          <p className="section-subtitle">
            Explore companies organized by technology sector
          </p>
          <div className="card-grid">
            {sectors.map((sector) => (
              <Link to={`/sector/${sector.id}`} key={sector.id} className="card-link">
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{sector.icon}</div>
                  <h3>{sector.name}</h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    {sector.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Simple, Transparent</h2>
          <p className="section-subtitle">
            Choose the plan that fits your research needs
          </p>
          <div className="pricing-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Free Tier */}
            <div className="pricing-card">
              <h3>Free</h3>
              <div className="pricing-price">$0<span>/month</span></div>
              <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For learners</p>
              <ul className="pricing-features">
                <li>All 5 company analyses</li>
                <li>Weekly earnings summaries</li>
                <li>Full glossary access</li>
                <li>Mobile responsive</li>
                <li>No account required</li>
              </ul>
              <Link to="/company/NVDA" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                Explore Now
              </Link>
            </div>

            {/* Pro Tier (Coming Soon) */}
            <div className="pricing-card featured">
              <span className="popular-badge">Coming Soon</span>
              <h3>Pro</h3>
              <div className="pricing-price">$9<span>/month</span></div>
              <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For serious researchers</p>
              <ul className="pricing-features">
                <li>Everything in Free</li>
                <li>10+ company analyses</li>
                <li>Daily earnings summaries</li>
                <li>Export to PDF & Markdown</li>
                <li>Advanced watchlist</li>
                <li>Priority weekly briefs</li>
              </ul>
              <Link to="/waitlist" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                Join Waitlist
              </Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '2rem', fontSize: '0.9rem' }}>
            Free tier includes full access to all current company analyses.
            <br />Pro features are coming soon—join our waitlist to be notified.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--dark)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Stay Informed</h2>
          <p style={{ color: 'var(--gray-300)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Join our waitlist to receive updates when new company analyses and features are available.
          </p>
          <Link to="/waitlist" className="btn btn-primary">
            Join Waitlist
          </Link>
        </div>
      </section>
    </div>
  )
}