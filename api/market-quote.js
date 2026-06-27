/**
 * Market Quote API - Serverless Function
 *
 * GET /api/market-quote?symbol=NVDA
 *
 * Returns market quote data with fallback to demo data.
 * Uses FINNHUB_API_KEY environment variable if available.
 */

export const config = {
  runtime: 'edge',
}

const DEMO_QUOTES = {
  NVDA: { price: 135.72, change: 3.45, changePercent: 2.61, currency: 'USD', exchange: 'NASDAQ' },
  MSFT: { price: 445.23, change: -2.18, changePercent: -0.49, currency: 'USD', exchange: 'NASDAQ' },
  AAPL: { price: 218.86, change: 1.22, changePercent: 0.56, currency: 'USD', exchange: 'NASDAQ' },
  GOOGL: { price: 175.98, change: 0.87, changePercent: 0.50, currency: 'USD', exchange: 'NASDAQ' },
  AMZN: { price: 198.45, change: -1.55, changePercent: -0.78, currency: 'USD', exchange: 'NASDAQ' },
  META: { price: 545.67, change: 8.92, changePercent: 1.66, currency: 'USD', exchange: 'NASDAQ' },
  TSLA: { price: 248.32, change: -5.67, changePercent: -2.23, currency: 'USD', exchange: 'NASDAQ' },
  AMD: { price: 162.45, change: 2.34, changePercent: 1.46, currency: 'USD', exchange: 'NASDAQ' },
  ASML: { price: 98.45, change: 0.89, changePercent: 0.91, currency: 'EUR', exchange: 'Euronext Amsterdam' },
  SAP: { price: 185.67, change: -1.23, changePercent: -0.66, currency: 'EUR', exchange: 'Xetra' },
  TSM: { price: 168.90, change: 4.56, changePercent: 2.77, currency: 'USD', exchange: 'NYSE' },
}

const DISCLAIMER = 'This data is for educational and informational purposes only. It does not constitute investment advice, a recommendation to buy or sell any security, or an offer or solicitation of an offer to buy or sell any security. All investments involve risk, including the possible loss of principal. Always conduct your own independent research.'

export default async function handler(request) {
  const url = new URL(request.url)
  const symbol = url.searchParams.get('symbol')?.toUpperCase().trim()

  if (!symbol) {
    return new Response(
      JSON.stringify({
        error: 'Symbol parameter is required',
        example: '/api/market-quote?symbol=NVDA',
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

  const now = new Date().toISOString()
  const isMarketHours = checkMarketHours()
  let dataMode = 'demo'
  let delayed = true
  let source = 'Demo'
  let quote = DEMO_QUOTES[symbol]

  // Try to fetch from Finnhub if API key is available
  const finnhubApiKey = process.env?.env?.FINNHUB_API_KEY || process.env?.FINNHUB_API_KEY

  if (finnhubApiKey && quote) {
    try {
      const finnhubResponse = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`,
        { signal: AbortSignal.timeout(5000) }
      )

      if (finnhubResponse.ok) {
        const finnhubData = await finnhubResponse.json()
        if (finnhubData.c && finnhubData.c > 0) {
          quote = {
            price: finnhubData.c,
            change: finnhubData.d,
            changePercent: finnhubData.dp,
            currency: 'USD',
            exchange: 'Live',
          }
          dataMode = 'live'
          delayed = false
          source = 'Finnhub'
        }
      }
    } catch (error) {
    }
  }

  // If symbol not in demo and no live data, return error
  if (!quote) {
    return new Response(
      JSON.stringify({
        error: `Symbol ${symbol} not found`,
        available: Object.keys(DEMO_QUOTES),
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const response = {
    symbol,
    price: quote.price,
    change: quote.change,
    changePercent: quote.changePercent,
    currency: quote.currency,
    exchange: quote.exchange,
    source,
    dataMode,
    delayed,
    lastUpdated: now,
    disclaimer: DISCLAIMER,
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
    },
  })
}

function checkMarketHours() {
  const now = new Date()
  const day = now.getUTCDay()
  const hour = now.getUTCHours()
  const minute = now.getUTCMinutes()

  // NYSE/NASDAQ hours: Mon-Fri 14:30-21:00 UTC
  if (day === 0 || day === 6) return false
  const totalMinutes = hour * 60 + minute
  return totalMinutes >= 870 && totalMinutes < 1260
}
