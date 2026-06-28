import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
export default function Market() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMarket = useCallback(async (query) => {
    if (!query || query.length < 1) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/market-search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      }
    } catch (err) {
      setSearchResults([]);
    }
  }, []);

  const fetchQuote = useCallback(async (symbol) => {
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const response = await fetch(`/api/market-quote?symbol=${symbol}`);
      if (response.ok) {
        const data = await response.json();
        setQuote(data);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to fetch quote');
      }
    } catch (err) {
      setError('Failed to connect to market data service');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 1) {
        searchMarket(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchMarket]);

  const handleSelectResult = (result) => {
    setSearchQuery(result.name);
    setSearchResults([]);
    setSelectedSymbol(result.symbol);
    fetchQuote(result.symbol);
  };

  const formatChange = (change, percent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;
  };

  const renderPopularSymbols = () => (
    <div className="market-popular-symbols-section">
      <div className="market-popular-symbols-header">
        <h3>Popular Symbols</h3>
        <p>Click on a symbol to view a quote preview</p>
      </div>
      <div className="market-popular-symbols-grid">
        {['NVDA', 'TSLA', 'AAPL', 'MSFT', 'TSM'].map(symbol => (
          <button
            key={symbol}
            className="market-popular-symbol-btn"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setSelectedSymbol(symbol);
              fetchQuote(symbol);
            }}
          >
            <span className="market-popular-symbol-symbol">{symbol}</span>
            <span className="market-popular-symbol-name">{symbol}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="market-empty-state">
      <p>No matching companies found. Try a symbol like NVDA, TSLA, AAPL, MSFT, or TSM.</p>
    </div>
  );

  const renderQuoteStatusBadge = () => {
    if (!quote) return null;

    const statusBadgeClass = quote.status === 'fallback'
      ? 'market-quote-badge market-fallback-badge'
      : quote.delayed
        ? 'market-quote-badge market-delayed-badge'
        : 'market-quote-badge market-live-badge';

    const statusText = quote.status === 'fallback'
      ? 'Demo / Fallback'
      : quote.delayed
        ? 'Delayed'
        : 'Live / Near-real-time';

    return (
      <div className={statusBadgeClass}>
        {statusText}
      </div>
    );
  };

  const renderFallbackReason = () => {
    if (quote?.fallbackReason) {
      return (
        <div className="market-fallback-reason-note">
          {quote.fallbackReason}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="market-page">
      {/* Hero Section */}
      <div className="sector-hero">
        <h1>Live Market Data Preview</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'rgba(255,255,255,0.9)' }}>
          Search for companies and view real-time market quotes. Data provided through market data integrations.
        </p>
      </div>

      {/* Popular Symbols Section */}
      {renderPopularSymbols()}

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* Search Section */}
        <div className="market-search-container">
          <div className="market-search-box">
            <label htmlFor="market-search-input" className="market-search-label">
              Search for a company or ticker symbol
            </label>
            <div className="market-search-input-wrapper">
              <input
                id="market-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., NVIDIA or NVDA"
                className="market-search-input"
              />
              {searchQuery && (
                <button
                  className="market-search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setSelectedSymbol(null);
                    setQuote(null);
                  }}
                  aria-label="Clear search"
                >
                  x
                </button>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="market-search-results">
              <div className="market-search-results-header">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((result) => (
                <button
                  key={result.symbol}
                  className="market-search-result-item"
                  onClick={() => handleSelectResult(result)}
                >
                  <div className="market-result-symbol">{result.symbol}</div>
                  <div className="market-result-info">
                    <div className="market-result-name">{result.name}</div>
                    <div className="market-result-exchange">{result.exchange}</div>
                  </div>
                  <div className="market-result-source">
                    {result.source === 'local' ? 'Local' : 'Live'}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {searchQuery && searchResults.length === 0 && renderEmptyState()}

          {/* Loading State */}
          {loading && (
            <div className="market-loading">
              <div className="market-loading-spinner" />
              <p>Fetching market data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="market-error">
              <div className="market-error-icon" />
              <p>{error}</p>
            </div>
          )}

          {/* Quote Display */}
          {quote && !loading && (
            <div className="market-quote-container">
              <div className="market-quote-card">
                <div className="market-quote-header">
                  <div className="market-quote-symbol-section">
                    <h2 className="market-quote-symbol">{quote.symbol}</h2>
                    <span className="market-quote-exchange">{quote.exchange}</span>
                  </div>
                  {renderQuoteStatusBadge()}
                </div>

                <div className="market-quote-price-section">
                  <div className="market-quote-price">
                    {quote.currency === 'USD' ? '$' : ''}
                    {quote.price.toFixed(2)}
                    {quote.currency !== 'USD' ? ` ${quote.currency}` : ''}
                  </div>
                  <div className={`market-quote-change ${quote.change >= 0 ? 'positive' : 'negative'}`}>
                    {formatChange(quote.change, quote.changePercent)}
                  </div>
                </div>

                <div className="market-quote-meta">
                  <div className="market-meta-item">
                    <span className="market-meta-label">Source</span>
                    <span className="market-meta-value">{quote.source}</span>
                  </div>
                  <div className="market-meta-item">
                    <span className="market-meta-label">Data Mode</span>
                    <span className="market-meta-value">{quote.dataMode}</span>
                  </div>
                  {renderFallbackReason()}
                  <div className="market-meta-item">
                    <span className="market-meta-label">Status</span>
                    <span className="market-meta-value">
                      {quote.delayed ? 'Delayed' : 'Real-time'}
                    </span>
                  </div>
                  <div className="market-meta-item">
                    <span className="market-meta-label">Last Updated</span>
                    <span className="market-meta-value">
                      {new Date(quote.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="market-quote-disclaimer">
                {quote.disclaimer}
              </div>
            </div>
          )}

          {/* Upgrade Tier Section */}
          <div className="market-upgrade-section">
            <h2 className="market-upgrade-title">Market Data Access by Tier</h2>
            <p className="market-upgrade-subtitle">
              Different subscription tiers provide different levels of market data access
            </p>

            <div className="market-tier-grid">
              {/* Basic Tier */}
              <div className="market-tier-card">
                <div className="market-tier-header">
                  <h3>Basic</h3>
                  <span className="market-tier-price">Free</span>
                </div>
                <ul className="market-tier-features">
                  <li>Delayed/cached quote snapshots</li>
                  <li>Company search</li>
                  <li>Static financial summaries</li>
                  <li>Public filing source discovery</li>
                  <li>Glossary and educational content</li>
                </ul>
                <div className="market-tier-note">
                  Data may be delayed 15 minutes or more
                </div>
              </div>

              {/* Pro Tier */}
              <div className="market-tier-card featured">
                <div className="market-tier-badge">Recommended</div>
                <div className="market-tier-header">
                  <h3>Pro</h3>
                  <span className="market-tier-price">$9/month</span>
                </div>
                <ul className="market-tier-features">
                  <li>Live or near-real-time quote access</li>
                  <li>AI-assisted earnings analysis</li>
                  <li>Company comparison tools</li>
                  <li>Exportable research reports</li>
                  <li>Saved watchlists and notes</li>
                </ul>
                <div className="market-tier-note">
                  Near-real-time data with minimal delay
                </div>
              </div>

              {/* Team Tier */}
              <div className="market-tier-card">
                <div className="market-tier-header">
                  <h3>Team</h3>
                  <span className="market-tier-price">$29/month</span>
                </div>
                <ul className="market-tier-features">
                  <li>Everything in Pro</li>
                  <li>Shared watchlists</li>
                  <li>Batch tracking</li>
                  <li>Team research workspace</li>
                  <li>Priority support</li>
                </ul>
                <div className="market-tier-note">
                  Collaborative research environment
                </div>
              </div>

              {/* Research Lab Tier */}
              <div className="market-tier-card">
                <div className="market-tier-header">
                  <h3>Research Lab</h3>
                  <span className="market-tier-price">Custom</span>
                </div>
                <ul className="market-tier-features">
                  <li>Everything in Team</li>
                  <li>Large-scale company research</li>
                  <li>Batch analysis workflows</li>
                  <li>API access (coming soon)</li>
                  <li>Dedicated support</li>
                </ul>
                <div className="market-tier-note">
                  For academic and institutional research
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="market-disclaimer">
            <p>
              <strong>Disclaimer:</strong> This content is for educational and informational purposes only.
              It does not constitute investment advice, a recommendation to buy or sell any security,
              or an offer or solicitation of an offer to buy or sell any security. All investments involve risk,
              including the possible loss of principal. Past performance is not indicative of future results.
              Always conduct your own independent research.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="market-nav-links">
            <Link to="/research" className="btn btn-outline">
              Try Research Preview
            </Link>
            <Link to="/watchlist" className="btn btn-outline">
              Try Watchlist Preview
            </Link>
            <Link to="/pricing" className="btn btn-outline">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}