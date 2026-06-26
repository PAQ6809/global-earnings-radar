import React from 'react'
import { Link } from 'react-router-dom'

export default function PaymentSuccess() {
  return (
    <div className="container" style={{ maxWidth: '700px', padding: '4rem 1rem' }}>
      <div className="pricing-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          color: 'var(--success-green, #10b981)'
        }}>
          ✓
        </div>

        <h1 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>
          Payment Successful
        </h1>

        <p style={{
          color: 'var(--gray-600)',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          Your subscription checkout was completed successfully.
        </p>

        <div style={{
          padding: '1rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <p style={{
            color: 'var(--gray-600)',
            fontSize: '0.9rem',
            margin: 0
          }}>
            <strong>Note:</strong> Account access and paid features are not yet automated
            in this MVP demo. You have completed a test checkout successfully. For full
            Pro access, please contact support.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" className="btn btn-primary">
            Back to Dashboard
          </Link>
          <Link to="/pricing" className="btn btn-outline">
            Back to Pricing
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