/**
 * Entitlement Status API - Preview Endpoint
 *
 * GET /api/entitlement-status
 *
 * Uses server-side entitlement helper for centralized logic.
 * All entitlement decisions are made server-side.
 */

import { getEntitlementStatus, getFeatureAccessMap } from './_lib/entitlement.js'

export const config = {
  runtime: 'edge',
}

export default async function handler() {
  // Get entitlement status from helper (always preview-only currently)
  const entitlement = getEntitlementStatus()

  // Build response with full feature access info
  const response = {
    ...entitlement,
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
          'Live or near-real-time quote access',
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
          'API access',
        ],
      },
    },
    featureAccess: getFeatureAccessMap(),
    plannedArchitecture: {
      auth: 'Future Supabase Auth',
      subscription: 'Future subscription entitlement table',
      payment: 'Future ECPay checkout and webhook',
      backendGate: 'Server-side entitlement checks before Pro features',
      frontendGate: 'React UI preview and locked-state messaging',
    },
    plannedDeveloperAccess: {
      enabled: false,
      description: 'Developer accounts can test all Pro features without real subscription',
      requirements: [
        'User must be authenticated',
        'Email must be in DEVELOPER_ACCOUNT_EMAILS allowlist OR',
        'User ID must be in DEVELOPER_ACCOUNT_IDS allowlist',
        'Server-side verification required',
      ],
      features: {
        aiAccessEnabled: false,
        exportEnabled: false,
        advancedCompareEnabled: false,
        developerBypassEnabled: false,
        billingMode: 'sandbox',
      },
    },
    disclaimer: 'Educational and informational only. Not investment advice.',
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}