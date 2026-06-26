import React from 'react'
import { useParams, Link } from 'react-router-dom'
import financials from '../data/financials.json'
import companies from '../data/companies.json'

export default function Company() {
  const { ticker } = useParams()
  const data = financials[ticker]
  const companyInfo = companies.find(c => c.ticker === ticker)

  if (!data) {
    return (
      <div className="container">
        <div className="error-state">
          <h2>Company Not Found</h2>
          <p>The ticker "{ticker}" is not in our database.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatPercent = (value) => {
    const percent = value * 100
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(1)}%`
  }

  const formatCurrency = (value, unit) => {
    if (unit === 'USD millions') return `$${(value / 1000).toFixed(1)}B`
    if (unit === 'EUR millions') return `€${(value / 1000).toFixed(1)}B`
    return `${value}`
  }

  return (
    <div>
      {/* Company Header */}
      <div className="sector-hero">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="ticker-badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              {data.ticker}
            </span>
            <span className="sector-badge" style={{ background: 'var(--secondary)', marginLeft: '0.5rem' }}>
              {companyInfo?.exchange}
            </span>
          </div>
          <h1>{data.companyName}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
            {companyInfo?.hq}
          </p>
        </div>
      </div>

      <div className="container">
        {/* Quick Stats */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Latest Quarter Financials</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Revenue</div>
              <div className="stat-value">{data.financials.revenue.formatted}</div>
              <div className={`stat-change ${data.financials.revenue.growth >= 0 ? 'positive' : 'negative'}`}>
                {data.financials.revenue.growthFormatted}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Gross Margin</div>
              <div className="stat-value">{(data.financials.grossProfit.margin * 100).toFixed(0)}%</div>
              <div className="stat-change positive">+{((data.financials.grossProfit.margin - 0.70) * 100).toFixed(0)}pp vs avg</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Net Income</div>
              <div className="stat-value">{formatCurrency(data.financials.netIncome.value, data.financials.revenue.unit.replace('USD', 'USD').replace('EUR', 'EUR'))}</div>
              <div className={`stat-change ${data.financials.netIncome.growth >= 0 ? 'positive' : 'negative'}`}>
                {formatPercent(data.financials.netIncome.growth)} YoY
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">EPS</div>
              <div className="stat-value">${data.financials.eps.value.toFixed(2)}</div>
              <div className={`stat-change ${data.financials.eps.growth >= 0 ? 'positive' : 'negative'}`}>
                {formatPercent(data.financials.eps.growth)} YoY
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="earnings-summary" style={{ marginBottom: '2rem' }}>
          <div className="summary-header">
            <h2>Earnings Summary</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
              {data.latestFiling.type} • {data.latestFiling.date} • {data.latestFiling.period}
            </p>
          </div>
          <div className="earnings-grid">
            {/* Facts */}
            <div className="summary-section">
              <h4>📊 Facts</h4>
              <ul>
                <li>Revenue: {data.financials.revenue.formatted} ({data.financials.revenue.growthFormatted})</li>
                <li>Gross Margin: {(data.financials.grossProfit.margin * 100).toFixed(0)}%</li>
                <li>Operating Margin: {(data.financials.operatingIncome.margin * 100).toFixed(0)}%</li>
                <li>Net Margin: {(data.financials.netIncome.margin * 100).toFixed(0)}%</li>
                <li>EPS: ${data.financials.eps.value.toFixed(2)} ({formatPercent(data.financials.eps.growth)} YoY)</li>
              </ul>
            </div>

            {/* AI Summary */}
            <div className="summary-section">
              <h4>📝 AI Summary</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                {data.aiSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Business Segments */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Business Segments</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Revenue</th>
                <th>% of Total</th>
                <th>YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {data.segments.map((segment, index) => (
                <tr key={index}>
                  <td>
                    <strong>{segment.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                      {segment.description}
                    </div>
                  </td>
                  <td>{segment.formatted}</td>
                  <td>{(segment.percentage * 100).toFixed(1)}%</td>
                  <td>
                    <span className={`tag ${segment.growth >= 0.1 ? 'tag-success' : segment.growth >= 0 ? 'tag-warning' : 'tag-danger'}`}>
                      {formatPercent(segment.growth)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Business Insights */}
        <div className="card insights-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--primary)' }}>
            💡 Business Insights
          </h2>
          {data.businessInsights.map((insight, index) => (
            <div key={index} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < data.businessInsights.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--gray-800)' }}>
                {index + 1}. {insight.title}
              </h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '0.75rem' }}>
                {insight.description}
              </p>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                <strong>Implications:</strong> {insight.implications}
              </p>
            </div>
          ))}
        </div>

        {/* Risk Factors */}
        <div className="card risk-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
            ⚠️ Risk Factors
          </h2>
          {data.riskFactors.map((risk, index) => (
            <div key={index} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: index < data.riskFactors.length - 1 ? '1px solid #fecaca' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className={`tag ${risk.severity === 'high' ? 'tag-danger' : risk.severity === 'medium' ? 'tag-warning' : 'tag-success'}`}>
                  {risk.severity.toUpperCase()}
                </span>
                <strong>{risk.category}</strong>
              </div>
              <p style={{ color: 'var(--gray-700)' }}>
                {risk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Questions to Watch */}
        <div className="questions-list" style={{ marginBottom: '2rem' }}>
          <h4>🔍 Questions to Watch</h4>
          <ol>
            {data.questionsToWatch.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ol>
        </div>

        {/* Guidance */}
        {data.guidance && (
          <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
              📈 Management Guidance
            </h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--dark)' }}>
              Next Quarter Revenue: {data.guidance.revenue}
            </p>
            <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>
              "{data.guidance.comments}"
            </p>
          </div>
        )}

        {/* Sources */}
        <div className="card" style={{ background: 'var(--gray-50)', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--gray-600)' }}>
            📚 Data Sources
          </h2>
          <ul style={{ listStyle: 'none', color: 'var(--gray-500)', fontSize: '0.9rem' }}>
            {data.sources.map((source, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                • {source}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-outline">
            ← Back to Home
          </Link>
          <Link to="/pricing" className="btn btn-primary">
            Join Waitlist for Updates
          </Link>
        </div>
      </div>
    </div>
  )
}