import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4>Global Earnings Radar</h4>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>
            A financial research assistant for US and European tech stocks.
            Educational and informational purposes only.
          </p>
        </div>
        <div>
          <h4>Sectors</h4>
          <ul className="footer-links">
            <li><Link to="/sector/ai">AI</Link></li>
            <li><Link to="/sector/semiconductors">Semiconductors</Link></li>
            <li><Link to="/sector/saas">SaaS</Link></li>
            <li><Link to="/sector/cloud">Cloud</Link></li>
            <li><Link to="/sector/consumer">Consumer Tech</Link></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><Link to="/glossary">Glossary</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/waitlist">Join Waitlist</Link></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><Link to="/disclaimer">Disclaimer</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Global Earnings Radar. Educational purposes only. Not investment advice.</p>
      </div>
    </footer>
  )
}