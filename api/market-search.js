/**
 * Market Search API - Serverless Function
 *
 * GET /api/market-search?q=tesla
 *
 * Searches for companies by name or symbol.
 * Uses local data first, optionally calls Finnhub if key is available.
 */

export const config = {
  runtime: 'edge',
}

const LOCAL_COMPANIES = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'ASML', name: 'ASML Holding N.V.', type: 'stock', exchange: 'Euronext Amsterdam' },
  { symbol: 'SAP', name: 'SAP SE', type: 'stock', exchange: 'Xetra Frankfurt' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co.', type: 'stock', exchange: 'NYSE' },
]

export default async function handler(request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')?.trim()

  if (!query || query.length < 1) {
    return new Response(
      JSON.stringify({
        results: [],
        message: 'Query parameter "q" is required and must be at least 1 character',
        example: '/api/market-search?q=tesla',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const queryLower = query.toLowerCase()

  // Search local companies first
  let results = LOCAL_COMPANIES.filter(company => {
    return (
      company.symbol.toLowerCase().includes(queryLower) ||
      company.name.toLowerCase().includes(queryLower)
    )
  }).map(company => ({
    ...company,
    source: 'local',
  }))

  // Try Finnhub search if API key is available
  const finnhubApiKey = process.env?.env?.FINNHUB_API_KEY || process.env?.FINNHUB_API_KEY

  if (finnhubApiKey && results.length < 5) {
    try {
      const searchUrl = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${finnhubApiKey}`
      const finnhubResponse = await fetch(searchUrl, {
        signal: AbortSignal.timeout(5000),
        headers: {
          'Accept': 'application/json',
        },
      })

      if (finnhubResponse.ok) {
        const finnhubData = await finnhubResponse.json()

        if (finnhubData.result && finnhubData.result.length > 0) {
          // Add Finnhub results, avoiding duplicates
          const existingSymbols = new Set(results.map(r => r.symbol))

          const newResults = finnhubData.result
            .filter(item => !existingSymbols.has(item.symbol))
            .slice(0, 5)
            .map(item => ({
              symbol: item.symbol,
              name: item.description,
              type: item.type || 'stock',
              exchange: item.exchange || 'Unknown',
              source: 'finnhub',
            }))

          results = [...results, ...newResults]
        }
      }
    } catch (error) {
    }
  }

  // Limit results
  results = results.slice(0, 10)

  return new Response(
    JSON.stringify({
      query,
      results,
      count: results.length,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    }
  )
}
