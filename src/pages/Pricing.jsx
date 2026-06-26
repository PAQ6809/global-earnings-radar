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
              <li>All-company basic search</li>
              <li>Static company summaries</li>
              <li>Delayed / cached financial snapshots</li>
              <li>Basic public data freshness</li>
              <li>Public filings source discovery</li>
              <li>Sample research reports</li>
              <li>Glossary and sector browsing</li>
              <li>Pro waitlist access</li>
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
              <li>AI-assisted earnings analysis</li>
              <li>AI-generated earnings briefs</li>
              <li>Management tone summary</li>
              <li>Risk factor extraction</li>
              <li>Company comparison</li>
              <li>Exportable reports</li>
              <li>Saved watchlists</li>
              <li>Research notes</li>
              <li>Earnings alerts</li>
            </ul>
            <Link to="/waitlist" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Pro Preview - Join Waitlist
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
              <li>Everything in Pro</li>
              <li>Batch company tracking</li>
              <li>Shared research workspace</li>
              <li>Classroom / lab use</li>
              <li>Batch exports</li>
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

        {/* Feature Matrix */}
        <div style={{ maxWidth: '800px', margin: '3rem auto 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Feature Comparison</h2>
          <div className="feature-matrix">
            <div className="feature-matrix-header">
              <div className="matrix-feature-col">Feature</div>
              <div className="matrix-tier-col">Free</div>
              <div className="matrix-tier-col">Pro Preview</div>
              <div className="matrix-tier-col">Team / Lab</div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Company snapshots</div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Basic risk factors</div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Glossary access</div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Watchlists</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Saved notes</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Earnings alerts</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">AI earnings briefs</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Exportable reports</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Team workspace</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '1rem', fontSize: '0.85rem' }}>
            <span className="check-icon" style={{ color: 'var(--success)' }}>✓</span> Available &nbsp;&nbsp;
            <span className="preview-label-sm">Preview</span> Coming soon &nbsp;&nbsp;
            — Not available
          </p>
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