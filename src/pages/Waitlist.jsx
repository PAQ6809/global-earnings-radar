import React, { useState } from 'react'

export default function Waitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'individual',
    role: '',
    companies: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send to an API
    // For now, we just show the success state
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div>
        <div className="sector-hero">
          <h1>You're on the List!</h1>
        </div>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ marginBottom: '1rem' }}>Thanks for Joining!</h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
              We've added <strong>{formData.email}</strong> to our waitlist.
              We'll send you updates when new features and company analyses are available.
            </p>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              In the meantime, you can explore our current analyses of leading tech companies.
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
        <h1>Join Our Waitlist</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Be the first to know when new company analyses, features, and subscriptions are available.
        </p>
      </div>

      <div className="container">
        <div className="waitlist-form">
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Get Early Access
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="interest">I am interested as a...</label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
              >
                <option value="individual">Individual Investor</option>
                <option value="professional">Finance Professional</option>
                <option value="student">Student / Researcher</option>
                <option value="journalist">Journalist / Writer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role / Background</label>
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
              <label htmlFor="companies">Companies of Interest (Optional)</label>
              <textarea
                id="companies"
                name="companies"
                value={formData.companies}
                onChange={handleChange}
                rows={3}
                placeholder="Which companies would you like us to cover?"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Join Waitlist
            </button>

            <p style={{
              marginTop: '1rem',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--gray-500)'
            }}>
              We'll respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* What You'll Get */}
        <div style={{ maxWidth: '600px', margin: '3rem auto 0' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>What You'll Get</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <div>
                <strong>Early Access Notifications</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Be the first to know about new features and company analyses
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>💰</span>
              <div>
                <strong>Launch Discount</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Waitlist members get exclusive pricing when we launch
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>📊</span>
              <div>
                <strong>Weekly Updates</strong>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Summary of new company analyses and industry insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}