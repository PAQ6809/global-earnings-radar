import React, { useState } from 'react'

export default function Waitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  })
  const [interests, setInterests] = useState({
    watchlists: false,
    ai: false,
    dashboards: false,
    reports: false,
    comparison: false,
    classroom: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [notConfigured, setNotConfigured] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (e) => {
    const { name, checked } = e.target
    setInterests(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setNotConfigured(false)

    // Build interests array from checked boxes
    const interestsList = []
    if (interests.watchlists) interestsList.push('Saved watchlists')
    if (interests.ai) interestsList.push('AI earnings summaries')
    if (interests.dashboards) interestsList.push('Sector dashboards')
    if (interests.reports) interestsList.push('Exportable reports')
    if (interests.comparison) interestsList.push('Company comparison')
    if (interests.classroom) interestsList.push('Classroom / research lab use')

    try {
      const response = await fetch('/api/submit-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          interests: interestsList,
          message: formData.message,
          source: 'waitlist-page'
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
      } else if (data.configured === false) {
        setNotConfigured(true)
        setSubmitted(true)
      } else {
        setError(data.message || 'An error occurred. Please try again.')
      }
    } catch (err) {
      setError('Unable to submit. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div>
        <div className="sector-hero">
          <h1>{notConfigured ? "Thanks for Your Interest!" : "You're on the Pro List!"}</h1>
        </div>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ marginBottom: '1rem' }}>Thanks for Your Interest!</h2>
            {notConfigured ? (
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Thanks for your interest in Global Earnings Radar Pro.
                The collection backend is not configured yet, but the Pro preview is available.
                We'll notify you when the service becomes available.
              </p>
            ) : (
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                We've added <strong>{formData.email}</strong> to our Pro early access waitlist.
                We'll notify you when Pro research tools and ECPay checkout become available.
              </p>
            )}
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              In the meantime, you can continue exploring our free company analyses.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <a href="/" className="btn btn-primary">
                Explore Companies
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <h1>Join the Pro Early Access List</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Be the first to know when Pro research tools and ECPay checkout become available.
        </p>
      </div>

      <div className="container">
        <div className="waitlist-form">
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Get Pro Access When Available
          </h2>

          {error && (
            <div className="form-error" style={{ marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name (Optional)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Which Pro features interest you most? (Select all that apply)</label>
              <div className="interest-checkboxes">
                <label className="interest-checkbox">
                  <input
                    type="checkbox"
                    name="watchlists"
                    checked={interests.watchlists}
                    onChange={handleInterestChange}
                  />
                  <span>Saved watchlists</span>
                </label>
                <label className="interest-checkbox">
                  <input
                    type="checkbox"
                    name="ai"
                    checked={interests.ai}
                    onChange={handleInterestChange}
                  />
                  <span>AI earnings summaries</span>
                </label>
                <label className="interest-checkbox">
                  <input
                    type="checkbox"
                    name="dashboards"
                    checked={interests.dashboards}
                    onChange={handleInterestChange}
                  />
                  <span>Sector dashboards</span>
                </label>
                <label className="interest-checkbox">
                  <input
                    type="checkbox"
                    name="reports"
                    checked={interests.reports}
                    onChange={handleInterestChange}
                  />
                  <span>Exportable reports</span>
                </label>
                <label className="interest-checkbox">
                  <input
                    type="checkbox"
                    name="comparison"
                    checked={interests.comparison}
                    onChange={handleInterestChange}
                  />
                  <span>Company comparison</span>
                </label>
                <label className="interest-checkbox">
                  <input
                    type="checkbox"
                    name="classroom"
                    checked={interests.classroom}
                    onChange={handleInterestChange}
                  />
                  <span>Classroom / research lab use</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role / Background (Optional)</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Portfolio Analyst"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Any specific companies or topics you're interested in?"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Pro Waitlist'}
            </button>

            <p style={{
              marginTop: '1rem',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--gray-500)'
            }}>
              We'll respect your privacy. Unsubscribe anytime.
              <br />
              <span style={{ fontSize: '0.8rem' }}>
                ECPay checkout is prepared but not yet activated for production payments.
              </span>
            </p>
          </form>
        </div>

        {/* What You'll Get */}
        <div style={{ maxWidth: '600px', margin: '3rem auto 0' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>What Pro Access Will Include</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>📋</span>
              <div>
                <strong>Saved Watchlists & Research Notes</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Track your favorite companies and keep notes for each analysis
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              <div>
                <strong>AI-Assisted Earnings Briefs</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Get AI-generated summaries of earnings calls with key highlights
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>📊</span>
              <div>
                <strong>Sector Trend Dashboards</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Visualize sector trends and compare company performance
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>📄</span>
              <div>
                <strong>Exportable Research Briefs</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Export analyses to PDF or Markdown for offline reading
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}