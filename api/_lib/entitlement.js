/**
 * Server-side Entitlement Helper
 *
 * Provides centralized entitlement logic for API routes.
 * All entitlement decisions are made server-side - no client bypass.
 *
 * Architecture:
 * - getEntitlementStatus() - main function returns full entitlement state
 * - isProAccess() - checks if user has Pro-level access
 * - isAiAccessEnabled() - checks if AI features are enabled
 *
 * Current state: PREVIEW-ONLY
 * - All access is locked to free tier
 * - No authentication-based entitlement
 * - No subscription-based entitlement
 * - Future hooks are placeholders only
 */

/**
 * Default entitlement state for preview mode
 */
export const DEFAULT_ENTITLEMENT = {
  status: 'preview',
  entitlementMode: 'preview-only',
  currentTier: 'free',
  authEnabled: false,
  subscriptionEnabled: false,
  paymentEnabled: false,
  databaseEnabled: false,
  aiAccessEnabled: false,
  provider: 'none',
  // Developer bypass is DISABLED - no dev accounts can access Pro features
  developerBypassEnabled: false,
  developerAccessEnabled: false,
  // Subscription/database entitlement is DISABLED
  subscriptionEntitlementEnabled: false,
  databaseEntitlementEnabled: false,
  // Payment/ECPay entitlement boundary - DISABLED
  // SECURITY: Payment success alone must NOT unlock Pro features.
  // SECURITY: ECPay callback must verify server-side payment + database subscription before entitlement changes.
  paymentEntitlementEnabled: false,
  ecpayEntitlementEnabled: false,
  productionCheckoutEnabled: false,
}

/**
 * Get full entitlement status
 *
 * This is the single source of truth for entitlement decisions.
 * Currently returns preview-only state.
 *
 * Future flow (NOT IMPLEMENTED):
 * 1. Check authentication (Supabase JWT)
 * 2. Check developer allowlist (DEVELOPER_ACCOUNT_EMAILS env var)
 * 3. Check subscription (database query)
 * 4. Default to free tier
 *
 * @param {Object} options - Optional overrides for testing
 * @param {Object} options.user - Authenticated user object
 * @returns {Object} Full entitlement status
 */
export function getEntitlementStatus(options = {}) {
  // TODO: Future developer allowlist check
  // if (isDeveloperAccount(options.user)) {
  //   return getDeveloperEntitlement()
  // }

  // TODO: Future subscription check
  // if (options.user && await hasActiveSubscription(options.user.id)) {
  //   return getSubscriptionEntitlement(options.user)
  // }

  // Default: Free preview
  return {
    ...DEFAULT_ENTITLEMENT,
  }
}

/**
 * Check if user has Pro-level access
 * @param {Object} options - Optional user context
 * @returns {boolean} True if Pro features are enabled
 */
export function isProAccess(options = {}) {
  const entitlement = getEntitlementStatus(options)
  return entitlement.currentTier !== 'free' &&
         entitlement.currentTier !== 'preview' &&
         entitlement.subscriptionEnabled === true
}

/**
 * Check if AI features are enabled
 * @param {Object} options - Optional user context
 * @returns {boolean} True if AI features are accessible
 */
export function isAiAccessEnabled(options = {}) {
  const entitlement = getEntitlementStatus(options)
  return entitlement.aiAccessEnabled === true
}

/**
 * Check if payment/subscription is enabled
 * @returns {boolean} True if payment features are accessible
 */
export function isPaymentEnabled() {
  return false // Disabled in preview
}

/**
 * Check if user is in developer allowlist (placeholder)
 *
 * Future implementation will check:
 * - DEVELOPER_ACCOUNT_EMAILS env var (comma-separated)
 * - DEVELOPER_ACCOUNT_IDS env var (comma-separated)
 *
 * @param {Object} user - User object with email and id
 * @returns {boolean} True if user is a developer
 */
export function isDeveloperAccount(user) {
  // DISABLED - Always returns false until DEVELOPER_ACCOUNT_EMAILS / DEVELOPER_ACCOUNT_IDS env vars are configured
  // This is a security measure - no dev bypass without explicit allowlist
  // const developerEmails = (process.env.DEVELOPER_ACCOUNT_EMAILS || '').split(',').filter(Boolean)
  // const developerIds = (process.env.DEVELOPER_ACCOUNT_IDS || '').split(',').filter(Boolean)
  // return developerEmails.includes(user?.email) || developerIds.includes(user?.id)
  return false
}

/**
 * Check if user has an active subscription (placeholder)
 *
 * SECURITY: This function always returns false until proper database integration
 * is implemented with server-side subscription verification.
 *
 * DO NOT use client tokens, frontend flags, or localStorage to determine subscription status.
 *
 * @param {string} userId - User ID to check
 * @returns {Promise<boolean>} False until database entitlement is configured
 */
export async function hasActiveSubscription(userId) {
  // DISABLED - Always returns false until subscription database is configured
  // This is a security measure - no subscription access without database verification
  // const subscription = await db.subscriptions.find({ userId, status: 'active' })
  // return subscription !== null
  return false
}

/**
 * Get subscription-based entitlement (placeholder)
 *
 * Returns disabled/free preview state until subscription database is configured.
 * Subscription decisions must be made server-side with database verification.
 *
 * @param {Object} user - User object
 * @returns {Object} Free preview entitlement
 */
export function getSubscriptionEntitlement(user) {
  // DISABLED - Returns free preview until subscription database is configured
  // This is a security measure - no subscription tier without database verification
  return {
    ...DEFAULT_ENTITLEMENT,
    currentTier: 'free',
    entitlementMode: 'preview-only',
  }
}

/**
 * Check if payment entitlement is enabled (placeholder)
 *
 * SECURITY: Payment success alone must NOT unlock Pro features.
 * Payment verification must be combined with subscription database check.
 *
 * @returns {boolean} False until payment entitlement is configured
 */
export function isPaymentEntitlementEnabled() {
  // DISABLED - Always returns false
  // This is a security measure - no payment entitlement without subscription database
  return false
}

/**
 * Check if payment alone can unlock Pro features (placeholder)
 *
 * SECURITY: ECPay callback must verify server-side payment + database subscription
 * before any entitlement changes are made.
 *
 * @returns {boolean} False - payment alone cannot unlock Pro
 */
export function canPaymentUnlockPro() {
  // DISABLED - Always returns false
  // This is a security measure - payment requires database subscription verification
  return false
}

// ============================================================
// Feature Gate System
// ============================================================

/**
 * Free features available without authentication or subscription
 */
const FREE_FEATURES = [
  'companySearch',
  'staticSummaries',
  'delayedMarketSnapshots',
  'publicFilingsSourceDiscovery',
]

/**
 * Pro features - always locked in preview mode
 */
const PRO_FEATURES = [
  'aiEarningsAnalysis',
  'exportReports',
  'advancedCompare',
]

/**
 * Team features - always locked in preview mode
 */
const TEAM_FEATURES = [
  'savedWatchlists',
  'sharedWatchlists',
]

/**
 * Research Lab features - always locked in preview mode
 */
const RESEARCH_LAB_FEATURES = [
  'batchTracking',
  'researchApiAccess',
]

/**
 * Check if a feature is accessible for the current entitlement
 *
 * SECURITY: Feature access is determined server-side only.
 * This function does NOT use:
 * - Authentication state
 * - Payment status
 * - Query parameters
 * - localStorage/sessionStorage
 * - Frontend flags
 *
 * @param {string} featureKey - The feature identifier to check
 * @param {Object} options - Optional parameters (ignored in preview mode)
 * @returns {boolean} True if feature is accessible
 */
export function canAccessFeature(featureKey, options = {}) {
  // Preview mode: Only free features are accessible
  if (FREE_FEATURES.includes(featureKey)) {
    return true
  }

  // All paid features are locked in preview mode
  if (PRO_FEATURES.includes(featureKey)) {
    return false
  }

  if (TEAM_FEATURES.includes(featureKey)) {
    return false
  }

  if (RESEARCH_LAB_FEATURES.includes(featureKey)) {
    return false
  }

  // Unknown features default to false (secure by default)
  return false
}

/**
 * Require feature access for API protection
 *
 * SECURITY: Feature access is determined server-side only.
 * This function does NOT use:
 * - Authentication state
 * - Payment status
 * - Query parameters
 * - localStorage/sessionStorage
 * - Frontend flags
 *
 * @param {string} featureKey - The feature identifier to check
 * @param {Object} options - Optional parameters (ignored in preview mode)
 * @returns {Object} Access result with allowed flag, status code, and reason
 */
export function requireFeatureAccess(featureKey, options = {}) {
  const allowed = canAccessFeature(featureKey, options)

  if (allowed) {
    return {
      allowed: true,
      featureKey,
      currentTier: 'free',
      reason: 'Feature is available in free preview',
      statusCode: 200,
    }
  }

  // Determine the tier for the feature
  let currentTier = 'locked'
  if (PRO_FEATURES.includes(featureKey)) {
    currentTier = 'pro'
  } else if (TEAM_FEATURES.includes(featureKey)) {
    currentTier = 'team'
  } else if (RESEARCH_LAB_FEATURES.includes(featureKey)) {
    currentTier = 'research-lab'
  }

  return {
    allowed: false,
    featureKey,
    currentTier,
    reason: `Feature is locked. ${currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} subscription required.`,
    statusCode: 403,
  }
}

/**
 * Get feature access map for API responses
 *
 * Uses canAccessFeature() to determine access levels for each feature.
 * Returns consistent naming that matches the existing API schema.
 *
 * @returns {Object} Feature access map with status strings
 */
export function getFeatureAccessMap() {
  return {
    companySearch: canAccessFeature('companySearch') ? 'free-preview' : 'locked',
    staticSummaries: canAccessFeature('staticSummaries') ? 'free-preview' : 'locked',
    delayedMarketSnapshots: canAccessFeature('delayedMarketSnapshots') ? 'free-preview' : 'locked',
    publicFilingsSourceDiscovery: canAccessFeature('publicFilingsSourceDiscovery') ? 'free-preview' : 'locked',
    aiEarningsAnalysis: canAccessFeature('aiEarningsAnalysis') ? 'pro' : 'pro-locked',
    companyComparison: canAccessFeature('advancedCompare') ? 'pro' : 'pro-locked-preview',
    exportReports: canAccessFeature('exportReports') ? 'pro' : 'pro-locked',
    savedWatchlists: canAccessFeature('savedWatchlists') ? 'team' : 'team-locked',
    sharedWatchlists: canAccessFeature('sharedWatchlists') ? 'team' : 'team-locked',
    batchTracking: canAccessFeature('batchTracking') ? 'research-lab' : 'team-locked',
    researchApiAccess: canAccessFeature('researchApiAccess') ? 'research-lab' : 'research-lab-locked',
  }
}

export default {
  getEntitlementStatus,
  isProAccess,
  isAiAccessEnabled,
  isPaymentEnabled,
  isDeveloperAccount,
  hasActiveSubscription,
  getSubscriptionEntitlement,
  isPaymentEntitlementEnabled,
  canPaymentUnlockPro,
  canAccessFeature,
  getFeatureAccessMap,
  DEFAULT_ENTITLEMENT,
}