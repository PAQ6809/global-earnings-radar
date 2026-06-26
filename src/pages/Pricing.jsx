import React from 'react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <h1>Research Tools for Every Level</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Free access to earnings analyses · Pro features coming soon
        </p>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="pricing-price">$0<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For learners</p>
            <ul className="pricing-features">
              <li>Company earnings snapshots</li>
              <li>Basic risk factors</li>
              <li>Glossary access</li>
              <li>Sample company data</li>
              <li>No account required</li>
            </ul>
            <Link to="/company/NVDA" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Explore Now (Free)
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="pricing-card featured">
            <span className="popular-badge">Most Useful for Serious Learners</span>
            <h3>Pro</h3>
            <div className="pricing-price">$9<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For dedicated researchers</p>
            <ul className="pricing-features">
              <li>Full company comparison workspace</li>
              <li>Watchlist and saved research notes</li>
              <li>Earnings calendar alerts</li>
              <li>AI-assisted earnings summary</li>
              <li>Sector trend dashboards</li>
              <li>Exportable research brief</li>
              <li>Priority access to new company coverage</li>
            </ul>
            <Link to="/waitlist" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Join Pro Waitlist
            </Link>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.5rem',
              background: 'rgba(245, 158, 11, 0.15)',
              borderRadius: 'var(--border-radius)',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: 'var(--gray-600)'
            }}>
              <span className="pro-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', marginRight: '0.25rem' }}>STATUS</span>
              Payment setup in progress
            </div>
          </div>

          {/* Team / Research Lab Tier */}
          <div className="pricing-card">
            <h3>Team / Research Lab</h3>
            <div className="pricing-price">$29<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For research teams</p>
            <ul className="pricing-features">
              <li>Shared watchlists</li>
              <li>Team research workspace</li>
              <li>Custom sector coverage</li>
              <li>Classroom / lab usage</li>
              <li>Admin billing support</li>
            </ul>
            <Link to="/waitlist" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Contact for Access
            </Link>
          </div>
        </div>

        {/* ECPay Notice */}
        <div style={{
          maxWidth: '700px',
          margin: '2rem auto 0',
          padding: '1rem',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          color: 'var(--gray-600)',
          fontSize: '0.85rem'
        }}>
          ECPay checkout integration is prepared, but production payments are not enabled
          until merchant verification is complete. Join the waitlist to be notified when
          Pro subscriptions become available.
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '700px', margin: '4rem auto 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>Is this investment advice?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              No. Global Earnings Radar provides educational and informational content only.
              We do not offer investment advice, recommendations, or predictions. All content
              should be used for learning purposes, and you should consult a qualified financial
              advisor before making investment decisions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>Where does the data come from?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Our summaries are based on public company filings (10-K, 10-Q, earnings call transcripts)
              and official investor relations materials. All sources are cited in each analysis.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>When will Pro subscriptions be available?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Pro features and paid subscriptions are planned but not yet activated. Join our
              waitlist to be notified when ECPay checkout and Pro access become available.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>Can I cancel anytime?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Yes, you can cancel your subscription at any time. Monthly plans can be cancelled
              before the next billing cycle. Annual plans have a 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}