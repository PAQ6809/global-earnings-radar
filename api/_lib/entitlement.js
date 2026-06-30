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

export default {
  getEntitlementStatus,
  isProAccess,
  isAiAccessEnabled,
  isPaymentEnabled,
  isDeveloperAccount,
  hasActiveSubscription,
  getSubscriptionEntitlement,
  DEFAULT_ENTITLEMENT,
}