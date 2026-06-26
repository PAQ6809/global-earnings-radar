import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleProCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/create-ecpay-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.action && data.params) {
        // Create form and submit to ECPay
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = data.action
        form.style.display = 'none'

        for (const [key, value] of Object.entries(data.params)) {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = String(value)
          form.appendChild(input)
        }

        document.body.appendChild(form)
        form.submit()
      } else {
        setError('ECPay checkout is unavailable. Please try again later.')
      }
    } catch (err) {
      setError('ECPay checkout is unavailable. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <h1>Simple, Transparent Pricing</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Choose the plan that fits your research needs. All plans include our educational content disclaimer.
        </p>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="pricing-price">$0<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Get started with basics</p>
            <ul className="pricing-features">
              <li>5 company analyses</li>
              <li>Weekly industry briefs</li>
              <li>Basic glossary access</li>
              <li>Community newsletter</li>
              <li>Mobile responsive</li>
            </ul>
            <Link to="/company/NVDA" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Explore Now (Free)
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="pricing-card featured">
            <span className="popular-badge">Most Popular</span>
            <h3>Pro</h3>
            <div className="pricing-price">$9<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For serious investors</p>
            <ul className="pricing-features">
              <li>All company analyses</li>
              <li>Daily earnings summaries</li>
              <li>Advanced watchlist</li>
              <li>Export PDF & Markdown</li>
              <li>Priority weekly briefs</li>
              <li>Full glossary access</li>
              <li>API access (coming soon)</li>
            </ul>
            <button
              onClick={handleProCheckout}
              disabled={isLoading}
              className="btn btn-primary"
              style={{ display: 'block', width: '100%', textAlign: 'center' }}
            >
              {isLoading ? 'Processing...' : 'Start ECPay Checkout'}
            </button>
            {error && (
              <p style={{ color: 'var(--error-red, #ef4444)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {error}
              </p>
            )}
          </div>

          {/* Team Tier */}
          <div className="pricing-card">
            <h3>Team</h3>
            <div className="pricing-price">$29<span>/month</span></div>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>For research teams</p>
            <ul className="pricing-features">
              <li>Everything in Pro</li>
              <li>Multi-user workspace</li>
              <li>Shared notes</li>
              <li>Company comparison</li>
              <li>Team dashboards</li>
              <li>Priority support</li>
              <li>Dedicated account manager</li>
            </ul>
            <Link to="/waitlist" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Coming Soon
            </Link>
          </div>
        </div>

        {/* ECPay Payment Notice */}
        <div style={{
          maxWidth: '700px',
          margin: '2rem auto 0',
          padding: '1rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          color: 'var(--gray-600)',
          fontSize: '0.85rem'
        }}>
          Payments are processed securely by ECPay Green World.
          <br />
          <em>This MVP demo does not automatically unlock paid features yet.</em>
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
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>Can I cancel anytime?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Yes, you can cancel your subscription at any time. Monthly plans can be cancelled
              before the next billing cycle. Annual plans have a 30-day money-back guarantee.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>Do you offer refunds?</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Monthly subscriptions are non-refundable but can be cancelled before renewal.
              Annual subscriptions include a 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}