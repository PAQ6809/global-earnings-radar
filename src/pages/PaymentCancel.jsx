import React from 'react'
import { Link } from 'react-router-dom'

export default function PaymentCancel() {
  return (
    <div className="container" style={{ maxWidth: '700px', padding: '4rem 1rem' }}>
      <div className="pricing-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          color: 'var(--gray-400)'
        }}>
          ✕
        </div>

        <h1 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>
          Checkout Cancelled
        </h1>

        <p style={{
          color: 'var(--gray-600)',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          Your checkout was cancelled and no payment was processed.
          You can return to pricing to try again whenever you're ready.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/pricing" className="btn btn-primary">
            Back to Pricing
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Disclaimer reminder */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'var(--gray-50)',
        borderRadius: 'var(--border-radius)',
        textAlign: 'center',
        color: 'var(--gray-600)',
        fontSize: '0.85rem'
      }}>
        <strong>Educational Content Only:</strong> Global Earnings Radar provides
        informational content for educational purposes. This is not investment advice.
      </div>
    </div>
  )
}