import React from 'react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div>
      <div className="sector-hero">
        <h1>Privacy Policy</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          How we collect, use, and protect your information
        </p>
      </div>

      <div className="container">
        <div className="legal-content">
          <div className="legal-notice">
            <strong>⚠️ DRAFT DOCUMENT</strong> — This is a placeholder privacy policy for development purposes only.
            It does not constitute a legally binding document. Consult a qualified attorney before use.
          </div>

          <p className="legal-date">Last Updated: June 2024</p>

          <h2>1. Information We Collect</h2>
          <p>
            Global Earnings Radar is an educational website that primarily provides publicly available financial
            information. We collect minimal information necessary to operate our service.
          </p>

          <h3>1.1 Information You Provide</h3>
          <ul>
            <li>Email address (if you join our waitlist)</li>
            <li>Name (optional, when submitting waitlist form)</li>
            <li>Research interests (optional, for waitlist purposes)</li>
          </ul>

          <h3>1.2 Information Collected Automatically</h3>
          <ul>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring website or source</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul>
            <li>Providing and maintaining our service</li>
            <li>Notifying you about updates and changes</li>
            <li>Improving our website and content</li>
            <li>Analyzing usage patterns</li>
          </ul>

          <h2>3. Cookies and Tracking</h2>
          <p>
            We use essential cookies for website functionality and may use analytics services to understand
            how visitors use our site. We do not use advertising cookies or tracking for advertising purposes.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            Waitlist email addresses are retained until you request deletion or we discontinue the service.
            Analytics data is retained for up to 26 months.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of
            transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>We may use third-party services for:</p>
          <ul>
            <li>Website hosting</li>
            <li>Analytics (anonymous usage data)</li>
            <li>Email delivery (for waitlist communications)</li>
          </ul>
          <p>These services have their own privacy policies.</p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of communications</li>
          </ul>
          <p>To exercise these rights, please contact us through our waitlist or contact form.</p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our service is not directed to children under 13 years of age. We do not knowingly collect
            information from children under 13.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            If you are located outside the United States, your information may be transferred to and
            processed in the United States. We comply with applicable data transfer requirements.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of significant
            changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us through our
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