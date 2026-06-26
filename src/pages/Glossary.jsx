import React, { useState } from 'react'
import glossaryData from '../data/glossary.json'

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTerms = glossaryData.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="sector-hero">
        <h1>Financial Glossary</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Understanding financial terminology is essential for analyzing earnings reports.
          Here are common terms you'll encounter.
        </p>
      </div>

      <div className="container">
        {/* Search */}
        <div style={{ marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--border-radius)',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Terms Count */}
        <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: '2rem' }}>
          Showing {filteredTerms.length} of {glossaryData.length} terms
        </p>

        {/* Terms Grid */}
        <div className="glossary-grid">
          {filteredTerms.map((item, index) => (
            <div key={index} className="glossary-item">
              <div className="glossary-term">{item.term}</div>
              <div className="glossary-definition">{item.definition}</div>
              {item.example && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.75rem',
                  background: 'var(--gray-50)',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: 'var(--gray-600)'
                }}>
                  <strong>Example:</strong> {item.example}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTerms.length === 0 && (
          <div className="empty-state">
            <h3>No terms found</h3>
            <p>Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}