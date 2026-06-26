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
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search companies, terms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            className="search-clear"
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
                      <span className="search-result-icon">📖</span>
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

// Add styles to global.css
const styles = `
/* Search Component */
.search-container {
  position: relative;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--gray-100);
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
  transition: all 0.2s;
}

.search-input-wrapper:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark-mode .search-input-wrapper {
  background: var(--gray-200);
  border-color: var(--gray-500);
}

.dark-mode .search-input-wrapper:focus-within {
  border-color: var(--primary);
}

.search-icon {
  font-size: 0.9rem;
  margin-right: 0.25rem;
  opacity: 0.5;
}

.search-input {
  border: none;
  background: transparent;
  padding: 0.35rem;
  font-size: 0.9rem;
  width: 180px;
  outline: none;
  color: inherit;
}

.search-input::placeholder {
  color: var(--gray-500);
}

.dark-mode .search-input {
  color: var(--gray-700);
}

.dark-mode .search-input::placeholder {
  color: var(--gray-500);
}

.search-clear {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--gray-500);
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
}

.search-clear:hover {
  color: var(--gray-700);
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 320px;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
}

.dark-mode .search-dropdown {
  background: var(--gray-200);
  border-color: var(--gray-400);
}

.search-section {
  padding: 0.5rem 0;
}

.search-section:not(:last-child) {
  border-bottom: 1px solid var(--gray-200);
}

.dark-mode .search-section:not(:last-child) {
  border-bottom-color: var(--gray-400);
}

.search-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  padding: 0.5rem 1rem;
}

.search-result {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: inherit;
  text-decoration: none;
  transition: background 0.15s;
}

.search-result:hover {
  background: var(--gray-100);
}

.dark-mode .search-result:hover {
  background: var(--gray-300);
}

.search-result-badge {
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
}

.search-result-icon {
  font-size: 1.25rem;
}

.search-result-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.search-result-text strong {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-text small {
  font-size: 0.75rem;
  color: var(--gray-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-no-results {
  padding: 2rem;
  text-align: center;
  color: var(--gray-500);
}

.search-no-results p {
  margin-bottom: 0.5rem;
}

.search-no-results small {
  font-size: 0.8rem;
}

/* Responsive Search */
@media (max-width: 768px) {
  .search-input {
    width: 140px;
  }

  .search-dropdown {
    width: 280px;
    right: -20px;
  }
}

@media (max-width: 480px) {
  .search-input {
    width: 120px;
  }

  .search-icon {
    display: none;
  }
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

export { styles }