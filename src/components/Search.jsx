import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import companies from '../data/companies.json'
import glossaryData from '../data/glossary.json'

export default function Search() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState({ companies: [], terms: [] })
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults({ companies: [], terms: [] })
      return
    }

    const searchTerm = query.toLowerCase()

    // Search companies
    const matchedCompanies = companies.filter(c =>
      c.ticker.toLowerCase().includes(searchTerm) ||
      c.name.toLowerCase().includes(searchTerm)
    )

    // Search glossary
    const matchedTerms = glossaryData.filter(t =>
      t.term.toLowerCase().includes(searchTerm) ||
      t.definition.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    setResults({ companies: matchedCompanies, terms: matchedTerms })
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.companies.length === 1) {
      navigate(`/company/${results.companies[0].ticker}`)
      setIsOpen(false)
      setQuery('')
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  const hasResults = results.companies.length > 0 || results.terms.length > 0

  return (
    <div className="search-container" ref={containerRef}>
      <label htmlFor="search-input" className="sr-only">Search companies or terms</label>
      <div className="search-input-wrapper">
        <input
          id="search-input"
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search companies or terms"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            className="search-clear"
            aria-label="Clear search"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="search-dropdown">
          {hasResults ? (
            <>
              {results.companies.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title">Companies</div>
                  {results.companies.map((company) => (
                    <Link
                      key={company.ticker}
                      to={`/company/${company.ticker}`}
                      className="search-result"
                      onClick={handleResultClick}
                    >
                      <span className="search-result-badge">{company.ticker}</span>
                      <span className="search-result-text">
                        <strong>{company.name}</strong>
                        <small>{company.exchange}</small>
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {results.terms.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title">Glossary Terms</div>
                  {results.terms.map((term, index) => (
                    <Link
                      key={index}
                      to="/glossary"
                      className="search-result"
                      onClick={handleResultClick}
                    >
                      <span className="search-result-icon"></span>
                      <span className="search-result-text">
                        <strong>{term.term}</strong>
                        <small>{term.definition.substring(0, 60)}...</small>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="search-no-results">
              <p>No results found for "{query}"</p>
              <small>Try searching for company ticker (NVDA) or term name</small>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Export empty styles (styles are in global.css)
export const styles = ''