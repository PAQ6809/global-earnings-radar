import React from 'react'
import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div>
      <div className="sector-hero">
        <h1>Terms of Service</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Rules and guidelines for using our service
        </p>
      </div>

      <div className="container">
        <div className="legal-content">
          <div className="legal-notice">
            <strong>⚠️ DRAFT DOCUMENT</strong> — This is a placeholder terms of service for development purposes only.
            It does not constitute a legally binding document. Consult a qualified attorney before use.
          </div>

          <p className="legal-date">Last Updated: June 2024</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Global Earnings Radar, you accept and agree to be bound by these Terms
            of Service. If you do not agree with any part of these terms, please do not use our service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Global Earnings Radar provides educational content about publicly traded companies. Our service
            includes:
          </p>
          <ul>
            <li>Earnings report summaries and analysis</li>
            <li>Business segment information</li>
            <li>Risk factor documentation</li>
            <li>Financial glossary and educational resources</li>
            <li>Industry sector information</li>
          </ul>

          <h2>3. Educational Purpose Disclaimer</h2>
          <p>
            <strong>IMPORTANT:</strong> All content provided by Global Earnings Radar is for educational
            and informational purposes only. This content:
          </p>
          <ul>
            <li>Does NOT constitute investment advice</li>
            <li>Does NOT recommend buying, selling, or holding any security</li>
            <li>Does NOT provide price targets or predictions</li>
            <li>Is NOT a substitute for professional financial advice</li>
            <li>Should NOT be the sole basis for any investment decision</li>
          </ul>

          <h2>4. No Financial Professional Relationship</h2>
          <p>
            Using Global Earnings Radar does not create any fiduciary, advisory, or professional
            relationship between you and us. We are not financial advisors, brokers, or registered
            investment advisors.
          </p>

          <h2>5. User Responsibilities</h2>
          <p>When using our service, you agree to:</p>
          <ul>
            <li>Use content for educational purposes only</li>
            <li>Conduct your own research before making investment decisions</li>
            <li>Consult qualified financial professionals before investing</li>
            <li>Not misrepresent our content as professional advice</li>
            <li>Not use our content for illegal purposes</li>
            <li>Not attempt to hack, scrape, or misuse our service</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            The content, design, and functionality of Global Earnings Radar are protected by copyright
            and other intellectual property laws. You may not reproduce, distribute, or create derivative
            works without our permission.
          </p>
          <p>
            Company names, logos, and trademarks mentioned on our site belong to their respective owners
            and are used for identification purposes only.
          </p>

          <h2>7. Accuracy of Information</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we make no guarantees about:
          </p>
          <ul>
            <li>The accuracy, completeness, or reliability of any content</li>
            <li>The currency of financial data or earnings summaries</li>
            <li>The suitability of any information for any purpose</li>
          </ul>
          <p>
            All financial data presented is based on public filings and should be verified from official sources.
          </p>

          <h2>8. Third-Party Content</h2>
          <p>
            Our service may contain links to third-party websites or content. We are not responsible for
            the content, accuracy, or opinions expressed on any third-party sites.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Global Earnings Radar and its operators shall NOT be
            liable for:
          </p>
          <ul>
            <li>Any investment losses or damages</li>
            <li>Decisions made based on our content</li>
            <li>Errors or omissions in content</li>
            <li>Any indirect, incidental, or consequential damages</li>
          </ul>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Global Earnings Radar from any claims, damages, or
            expenses arising from your use of our service or violation of these terms.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Significant changes will be
            communicated by posting the updated terms on this page. Continued use constitutes
            acceptance of modified terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These terms shall be governed by applicable laws. Any disputes shall be resolved through
            binding arbitration or appropriate legal proceedings.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms can be directed through our
            <Link to="/waitlist"> waitlist form</Link>.
          </p>

          <div className="legal-footer">
            <p>
              <strong>Disclaimer:</strong> This document is for educational and development purposes only.
              It is not a substitute for professional legal advice.
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