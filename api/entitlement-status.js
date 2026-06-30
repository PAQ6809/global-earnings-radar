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
    developer: {
      label: 'Developer',
      active: false,
      plannedFeatures: [
        'Test access to all Pro/AI/paid features',
        'Sandbox billing mode (no real charges)',
        'Developer bypass for QA testing',
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
  // Future: developer account features (NOT enabled in current preview)
  plannedDeveloperAccess: {
    enabled: false,
    description: 'Developer accounts can test all Pro features without real subscription',
    requirements: [
      'User must be authenticated',
      'Email must be in DEVELOPER_ACCOUNT_EMAILS allowlist OR',
      'User ID must be in DEVELOPER_ACCOUNT_IDS allowlist',
      'Server-side verification required (not frontend bypass)',
    ],
    features: {
      aiAccessEnabled: true,
      exportEnabled: true,
      advancedCompareEnabled: true,
      developerBypassEnabled: true,
      billingMode: 'sandbox',
    },
    ecpayBoundary: {
      productionCheckoutEnabled: false,
      reason: 'ECPay requires explicit merchant credential configuration',
      note: 'Developer accounts use sandbox mode, not production payments',
    },
    securityRules: [
      'Do NOT use localStorage/sessionStorage for developer flags',
      'Do NOT use query params (?dev=true) to unlock features',
      'Do NOT hardcode bypass logic in UI components',
      'Server-side allowlist verification is required',
    ],
  },
  // Future: auth entitlement flow (NOT enabled in current preview)
  plannedAuthEntitlement: {
    enabled: false,
    description: 'Server-side entitlement determination based on auth state and subscription',
    decisionFlow: [
      '1. Check authentication (unauthenticated -> free)',
      '2. Check developer allowlist (email/id -> developer tier)',
      '3. Check subscription (active -> pro/team/researchLab)',
      '4. Default to free tier',
    ],
    priorityOrder: [
      { priority: 1, condition: 'Email/ID in developer allowlist', result: 'developer' },
      { priority: 2, condition: 'Active subscription', result: 'pro/team/researchLab' },
      { priority: 3, condition: 'Authenticated, no subscription', result: 'free' },
      { priority: 4, condition: 'Unauthenticated', result: 'free (preview)' },
    ],
    requiredEnvVars: [
      'AUTH_PROVIDER (e.g., supabase)',
      'DEVELOPER_ACCOUNT_EMAILS (comma-separated)',
      'DEVELOPER_ACCOUNT_IDS (comma-separated)',
      'ENTITLEMENT_MODE (preview or production)',
    ],
    serverSideRequirements: [
      'Verify JWT token server-side (never trust client claims)',
      'Check developer allowlist against env vars (not in code)',
      'Query subscription from database (not from client token)',
      'Verify ECPay webhook signatures before updating subscription',
    ],
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
