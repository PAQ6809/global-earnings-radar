import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteDisclaimer() {
  return (
    <div>
      <div className="sector-hero">
        <h1>Disclaimer</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Important information about our educational content
        </p>
      </div>

      <div className="container">
        <div className="legal-content">
          <h2> Educational Content Only</h2>
          <div className="disclaimer-box">
            <p>
              <strong>Global Earnings Radar is an educational and informational research tool.</strong>
            </p>
            <p>
              Our platform is designed to help users understand earnings reports, business trends, and
              financial concepts. We are NOT:
            </p>
            <ul>
              <li>❌ An investment advisor or financial planner</li>
              <li>❌ A registered investment advisor (RIA)</li>
              <li>❌ A broker-dealer or securities firm</li>
              <li>❌ A provider of investment recommendations</li>
              <li>❌ A substitute for professional financial advice</li>
            </ul>
          </div>

          <h2>What We Provide</h2>
          <p>Our service provides:</p>
          <ul>
            <li> <strong>Educational summaries</strong> of publicly available earnings reports (10-K, 10-Q)</li>
            <li> <strong>Business context</strong> explaining company strategies and market positions</li>
            <li> <strong>Risk factor analysis</strong> based on public company disclosures</li>
            <li> <strong>Research questions</strong> to guide your own due diligence</li>
            <li> <strong>Financial glossary</strong> to help understand industry terminology</li>
          </ul>

          <h2>What We Do NOT Provide</h2>
          <p>The following are <strong>explicitly NOT</strong> part of our service:</p>
          <ul>
            <li>🚫 Buy, sell, or hold recommendations</li>
            <li>🚫 Price targets or stock price predictions</li>
            <li>🚫 Guaranteed returns or performance promises</li>
            <li>🚫 Personalized investment advice</li>
            <li>🚫 Analysis of individual investment portfolios</li>
            <li>🚫 Legal, tax, or accounting advice</li>
          </ul>

          <h2>Investment Risks</h2>
          <p>
            <strong>All investments involve risk, including the possible loss of principal.</strong>
          </p>
          <p>
            Historical performance is not indicative of future results. The stock market can be
            volatile, and individual stock performance depends on numerous factors including:
          </p>
          <ul>
            <li>Market conditions and economic trends</li>
            <li>Company-specific performance and management decisions</li>
            <li>Industry competition and disruption</li>
            <li>Regulatory and geopolitical factors</li>
            <li>Technology changes and innovation</li>
          </ul>

          <h2>Do Your Own Research</h2>
          <p>
            We strongly encourage all users to:
          </p>
          <ul>
            <li>Read original company filings (SEC EDGAR, EU company registers)</li>
            <li>Consult with qualified financial advisors</li>
            <li>Consider your personal financial situation and risk tolerance</li>
            <li>Verify information from multiple sources</li>
            <li>Never invest more than you can afford to lose</li>
          </ul>

          <h2>Information Accuracy</h2>
          <p>
            While we strive for accuracy, we make no guarantees about the completeness, accuracy,
            or reliability of any information on this site:
          </p>
          <ul>
            <li>Earnings summaries are based on publicly available data</li>
            <li>Financial data may become outdated</li>
            <li>Analysis represents one perspective, not definitive conclusions</li>
            <li>Always verify from official sources before making decisions</li>
          </ul>

          <h2>Data Sources</h2>
          <p>Our content is based on:</p>
          <ul>
            <li>SEC EDGAR filings (10-K, 10-Q, earnings call transcripts)</li>
            <li>Official company investor relations materials</li>
            <li>EU company registers and public filings</li>
            <li>Financial news from reputable sources</li>
          </ul>

          <h2>For US Users</h2>
          <p>
            This website is for educational purposes only. Nothing on this site should be construed
            as a recommendation to buy, sell, or hold any security. Securities offered through
            registered broker-dealers or investment advisors are subject to different regulations.
          </p>

          <h2>For EU Users</h2>
          <p>
            The information provided does not constitute investment advice as defined by EU financial
            regulations (MiFID II). Users should consult with appropriately licensed financial advisors
            in their jurisdiction.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this disclaimer, please contact us through our
            <Link to="/waitlist"> waitlist form</Link>.
          </p>

          <div className="disclaimer-box" style={{ marginTop: '2rem', background: '#fff3cd', borderColor: '#ffc107' }}>
            <p style={{ margin: 0 }}>
              <strong>By using Global Earnings Radar, you acknowledge that:</strong>
            </p>
            <ul style={{ marginBottom: 0 }}>
              <li>You understand this is educational content only</li>
              <li>You will conduct your own research before investing</li>
              <li>You will consult qualified professionals for investment decisions</li>
              <li>You accept all risks associated with investing</li>
            </ul>
          </div>

          <div className="legal-footer">
            <p>
              <strong>Final Note:</strong> This disclaimer is for educational purposes. It is not
              a substitute for reading the full disclaimers and understanding the risks of any
              investment decision.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/" className="btn btn-outline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}