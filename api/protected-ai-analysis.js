/**
 * Protected AI Analysis API
 *
 * GET /api/protected-ai-analysis
 *
 * Gated endpoint for AI-powered earnings analysis features.
 * Access is controlled server-side via requireFeatureAccess.
 *
 * SECURITY: Feature access is determined server-side only.
 * This endpoint does NOT use:
 * - Authentication state
 * - Payment status
 * - Query parameters
 * - localStorage/sessionStorage
 * - Frontend flags
 */

import { requireFeatureAccess } from './_lib/entitlement.js'

export const config = {
  runtime: 'edge',
}

export default async function handler() {
  // Check feature access - server-side only
  const accessResult = requireFeatureAccess('aiEarningsAnalysis')

  if (!accessResult.allowed) {
    return new Response(
      JSON.stringify({
        status: 'locked',
        featureKey: 'aiEarningsAnalysis',
        currentTier: accessResult.currentTier,
        reason: accessResult.reason,
        disclaimer: 'Educational and informational only. Not investment advice.',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  }

  // Feature not yet available - should not reach here in preview mode
  // but keeping as safe fallback
  return new Response(
    JSON.stringify({
      status: 'unavailable',
      featureKey: 'aiEarningsAnalysis',
      reason: 'AI analysis feature is not yet available.',
      disclaimer: 'Educational and informational only. Not investment advice.',
    }),
    {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  )
}