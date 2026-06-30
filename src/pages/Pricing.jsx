import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthStatus from '../components/AuthStatus'

export default function Pricing() {
  const [entitlementStatus, setEntitlementStatus] = useState(null)
  const [entitlementLoading, setEntitlementLoading] = useState(true)
  const [entitlementError, setEntitlementError] = useState(false)

  useEffect(() => {
    const fetchEntitlement = async () => {
      try {
        const res = await fetch('/api/entitlement-status')
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setEntitlementStatus(data)
        setEntitlementError(false)
      } catch (err) {
        setEntitlementError(true)
      } finally {
        setEntitlementLoading(false)
      }
    }
    fetchEntitlement()
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <h1>Research Tools for Every Level</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Free access to earnings analyses. Pro features coming soon.
        </p>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {/* Basic Tier */}
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="pricing-price">$0<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For learners</p>
            <ul className="pricing-features">
              <li>All-company basic search</li>
              <li>Static company summaries</li>
              <li>Delayed/cached market data snapshots</li>
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
              <li>Live or near-real-time market data</li>
              <li>AI-assisted earnings analysis</li>
              <li>AI-generated earnings briefs</li>
              <li>Management tone summary</li>
              <li>Risk factor extraction</li>
              <li><Link to="/compare" style={{ color: 'inherit' }}>Company comparison</Link></li>
              <li>Exportable reports</li>
              <li>Saved watchlists</li>
              <li>Research notes</li>
              <li>Earnings alerts</li>
            </ul>
            <Link to="/waitlist" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Pro Preview - Join Waitlist
            </Link>
          </div>

          {/* Team Tier */}
          <div className="pricing-card">
            <h3>Team</h3>
            <div className="pricing-price">$29<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For research teams</p>
            <ul className="pricing-features">
              <li>Everything in Pro</li>
              <li>Shared watchlists</li>
              <li>Batch tracking</li>
              <li>Team research workspace</li>
              <li>Classroom/lab use</li>
              <li>Priority support</li>
            </ul>
            <Link to="/waitlist" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Contact for Access
            </Link>
          </div>
        </div>

        {/* Research Lab Tier */}
        <div style={{ maxWidth: '360px', margin: '2rem auto 0' }}>
          <div className="pricing-card" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
                display: 'inline-block'
              }} />
              <h3 style={{ margin: 0 }}>Research Lab</h3>
            </div>
            <div className="pricing-price">Custom<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For academic and institutional research</p>
            <ul className="pricing-features">
              <li>Everything in Team</li>
              <li>Large-scale company research</li>
              <li>Advanced batch analysis workflows</li>
              <li>API access (coming soon)</li>
              <li>Dedicated support</li>
            </ul>
            <Link to="/waitlist" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Contact for Pricing
            </Link>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div style={{ maxWidth: '900px', margin: '3rem auto 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Feature Comparison</h2>
          <div className="feature-matrix">
            <div className="feature-matrix-header">
              <div className="matrix-feature-col">Feature</div>
              <div className="matrix-tier-col">Basic</div>
              <div className="matrix-tier-col">Pro Preview</div>
              <div className="matrix-tier-col">Team</div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Company search</div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Market data snapshots</div>
              <div className="matrix-tier-col">Delayed</div>
              <div className="matrix-tier-col">Live/Near-real-time</div>
              <div className="matrix-tier-col">Live/Near-real-time</div>
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
              <div className="matrix-tier-col">Shared</div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Saved notes</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Company comparison</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">AI earnings analysis</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
              <div className="matrix-tier-col"><span className="check-icon">✓</span></div>
            </div>
            <div className="feature-matrix-row">
              <div className="matrix-feature-col">Exportable reports</div>
              <div className="matrix-tier-col">—</div>
              <div className="matrix-tier-col"><span className="preview-label-sm">Preview</span></div>
              <div className="matrix-tier-col">Batch</div>
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

        {/* Entitlement Status Preview */}
        <div style={{ maxWidth: '700px', margin: '3rem auto 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Entitlement / Subscription Preview</h2>
          <div className="card entitlement-status-card">
            {entitlementLoading ? (
              <p className="entitlement-status-loading">Loading entitlement status...</p>
            ) : entitlementError ? (
              <p className="entitlement-status-error">Entitlement status is temporarily unavailable.</p>
            ) : entitlementStatus && (
              <div className="entitlement-status-grid">
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">Current Tier:</span>
                  <span className="entitlement-status-value">Free Preview</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">Entitlement Mode:</span>
                  <span className="entitlement-status-value">Preview only</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">Authentication:</span>
                  <span className="entitlement-status-value entitlement-status-inactive">Not active</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">Subscription:</span>
                  <span className="entitlement-status-value entitlement-status-inactive">Not active</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">Payment:</span>
                  <span className="entitlement-status-value entitlement-status-inactive">Not active</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">Database Entitlement:</span>
                  <span className="entitlement-status-value entitlement-status-inactive">Not active</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">AI Access:</span>
                  <span className="entitlement-status-value entitlement-status-inactive">Pro locked / Not active</span>
                </div>
                <div className="entitlement-status-row">
                  <span className="entitlement-status-label">ECPay Checkout:</span>
                  <span className="entitlement-status-value entitlement-status-inactive">Disabled until configured</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Authentication Status Preview */}
        <div className="auth-preview-section">
          <h2 className="auth-preview-title">Authentication Preview</h2>
          <div className="auth-preview-card">
            <AuthStatus />
            <p className="auth-preview-disclaimer">
              Auth status is separate from Pro access. Signing in does not grant Pro features.
            </p>
          </div>
        </div>

        {/* Market Data Info */}
        <div style={{ maxWidth: '700px', margin: '3rem auto 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Market Data Access</h2>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="market-data-tier-info">
              <div className="market-data-tier-row">
                <div className="market-data-tier-name">Basic</div>
                <div className="market-data-tier-desc">Delayed/cached quote snapshots (15+ minutes)</div>
              </div>
              <div className="market-data-tier-row">
                <div className="market-data-tier-name">Pro</div>
                <div className="market-data-tier-desc">Live or near-real-time quote access with minimal delay</div>
              </div>
              <div className="market-data-tier-row">
                <div className="market-data-tier-name">Team</div>
                <div className="market-data-tier-desc">Shared watchlists and batch tracking with live data</div>
              </div>
              <div className="market-data-tier-row">
                <div className="market-data-tier-name">Research Lab</div>
                <div className="market-data-tier-desc">Large-scale company research workflows and API access</div>
              </div>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '1.5rem', fontSize: '0.85rem' }}>
              Market data is provided through integration with market data providers.
              Data freshness depends on your subscription tier.
            </p>
          </div>
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
              and official investor relations materials. Market data is provided through integration with
              market data providers. All sources are cited in each analysis.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>What is the difference between Basic and Pro market data?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Basic tier provides delayed/cached quote snapshots that may be 15 minutes or more behind real-time.
              Pro tier provides live or near-real-time quote access with minimal delay. This allows for more
              timely research and analysis of market conditions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>When will Pro subscriptions be available?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Pro features and paid subscriptions are planned but not yet activated. Join our
              waitlist to be notified when Pro access becomes available.
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

        {/* Disclaimer */}
        <div style={{
          maxWidth: '700px',
          margin: '3rem auto 0',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>
            <strong>Disclaimer:</strong> This content is for educational and informational purposes only.
            It does not constitute investment advice, a recommendation to buy or sell any security,
            or an offer or solicitation of an offer to buy or sell any security.
            All investments involve risk, including the possible loss of principal.
            Past performance is not indicative of future results.
            Always conduct your own independent research.
          </p>
        </div>
      </div>
    </div>
  )
}