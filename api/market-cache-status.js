/**
 * Market Cache Status API - Preview Endpoint
 *
 * GET /api/market-cache-status
 */

export const config = {
  runtime: 'edge',
}

const CACHE_STATUS = {
  status: 'preview',
  cacheEnabled: false,
  cronEnabled: false,
  providerConfigured: false,
  currentMode: 'on-demand-demo-fallback',
  plannedArchitecture: {
    dataProvider: 'Market data provider API',
    serverLayer: 'Vercel Serverless API',
    cacheLayer: 'Future Redis/Supabase cache',
    scheduledRefresh: 'Future Vercel Cron refresh for popular symbols',
    frontend: 'React market page and research previews',
  },
  plannedRefreshPolicy: {
    popularSymbols: '1-5 minutes when enabled',
    companyProfile: 'daily or weekly when enabled',
    financialStatements: 'daily refresh or filing-triggered refresh when enabled',
    news: '15-60 minutes when enabled',
  },
  popularSymbolsPreview: ['NVDA', 'TSLA', 'AAPL', 'MSFT', 'TSM'],
  disclaimer: 'Educational and informational only. Not investment advice.',
}

export default async function handler() {
  return new Response(JSON.stringify(CACHE_STATUS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}
