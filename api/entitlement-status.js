/**
 * Entitlement Status API - Preview Endpoint
 *
 * GET /api/entitlement-status
 *
 * Safe entitlement architecture preview endpoint.
 * Does not require auth, payments, database, or secrets.
 */

export const config = {
  runtime: 'edge',
}

const ENTITLEMENT_STATUS = {
  status: 'preview',
  entitlementMode: 'preview-only',
  currentTier: 'free',
  authEnabled: false,
  subscriptionEnabled: false,
  paymentEnabled: false,
  databaseEnabled: false,
  aiAccessEnabled: false,
  provider: 'none',
  plannedArchitecture: {
    auth: 'Future Supabase Auth or equivalent account system',
    subscription: 'Future subscription entitlement table',
    payment: 'Future ECPay checkout and webhook verification',
    backendGate: 'Server-side entitlement checks before Pro/Team/Lab features',
    frontendGate: 'React UI preview and locked-state messaging',
  },
  tiers: {
    free: {
      label: 'Free',
      active: true,
      features: [
        'Company search',
        'Static company summaries',
        'Delayed or cached market snapshots',
        'Public filings source discovery',
        'Educational disclaimers',
      ],
    },
    pro: {
      label: 'Pro',
      active: false,
      plannedFeatures: [
        'AI earnings analysis',
        'Company comparison',
        'Exportable research reports',
        'Live or near-real-time quote access when configured',
      ],
    },
    team: {
      label: 'Team',
      active: false,
      plannedFeatures: [
        'Shared watchlists',
        'Batch company tracking',
        'Team workspace features',
      ],
    },
    researchLab: {
      label: 'Research Lab',
      active: false,
      plannedFeatures: [
        'Large-scale company research workflows',
        'Advanced batch analysis',
        'API access when configured',
      ],
    },
  },
  featureAccess: {
    delayedMarketSnapshots: 'free-preview',
    companySearch: 'free-preview',
    staticSummaries: 'free-preview',
    publicFilingsSourceDiscovery: 'free-preview',
    aiEarningsAnalysis: 'pro-locked',
    companyComparison: 'pro-locked-preview',
    exportReports: 'pro-locked',
    sharedWatchlists: 'team-locked',
    batchTracking: 'team-locked',
    researchApiAccess: 'research-lab-locked',
  },
  disclaimer: 'Educational and informational only. Not investment advice.',
}

export default async function handler() {
  return new Response(JSON.stringify(ENTITLEMENT_STATUS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}
