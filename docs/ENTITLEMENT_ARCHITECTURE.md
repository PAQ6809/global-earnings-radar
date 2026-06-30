# Entitlement / Subscription Architecture

This document describes the planned entitlement architecture for Global Earnings Radar.

This is an architecture preview. It does not enable real authentication, subscriptions, payments, databases, or AI access.

## Current state

Current entitlement behavior:

- The product is operating in preview mode.
- Free educational features are visible.
- Pro, Team, and Research Lab features are shown as planned or locked previews.
- ECPay checkout remains disabled until explicitly configured.
- No user database or subscription table is active yet.
- AI analysis must remain a paid / Pro feature or higher.

## Preview status endpoint

/api/entitlement-status

Expected current behavior:

- HTTP 200
- status is preview
- currentTier is free
- authEnabled is false
- subscriptionEnabled is false
- paymentEnabled is false
- databaseEnabled is false
- aiAccessEnabled is false

## Planned architecture

Future entitlement flow:

User account -> Auth provider -> Subscription record -> Server-side entitlement check -> Feature access decision -> Frontend locked/unlocked UI

Planned components:

- Auth: Supabase Auth or equivalent account system
- Database: entitlement table for subscription status and tier
- Payment: ECPay checkout and webhook verification
- Backend gate: server-side checks before paid APIs or AI analysis
- Frontend gate: locked-state UI and upgrade messaging

## Auth Entitlement Architecture

### Entitlement decision flow (server-side)

When a user makes a request to a protected endpoint or fetches entitlement status:

```
1. Check authentication
   ├── Unauthenticated -> return free tier
   └── Authenticated -> continue to step 2

2. Check developer allowlist (HIGHEST PRIORITY)
   ├── Email in DEVELOPER_ACCOUNT_EMAILS -> developer tier
   ├── User ID in DEVELOPER_ACCOUNT_IDS -> developer tier
   └── Not in allowlist -> continue to step 3

3. Check subscription status
   ├── Subscription active -> tier = subscription.tier (pro/team/researchLab)
   └── No active subscription -> free tier
```

### Tier determination order

| Priority | Condition | Result |
|----------|-----------|--------|
| 1 (highest) | Email/ID in developer allowlist | `developer` |
| 2 | Active subscription with tier | `pro` / `team` / `researchLab` |
| 3 | Authenticated, no subscription | `free` |
| 4 | Unauthenticated | `free` (preview) |

### Environment variables (future)

```bash
# Auth provider configuration
AUTH_PROVIDER=supabase

# Developer allowlist (comma-separated)
DEVELOPER_ACCOUNT_EMAILS=dev@example.com,qa@example.com
DEVELOPER_ACCOUNT_IDS=uuid_1,uuid_2

# Entitlement mode (preview = safe mode, production = full)
ENTITLEMENT_MODE=preview
```

### Auth check requirements

**Server-side entitlement endpoint pattern:**

```javascript
// GET /api/entitlement-status
// Headers: Authorization: Bearer <token>

export default async function handler(req) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  const user = await verifyToken(token) // Server-side only

  // Priority 1: Developer allowlist check
  if (user && isDeveloperAllowlisted(user)) {
    return { currentTier: 'developer', aiAccessEnabled: true }
  }

  // Priority 2: Subscription check
  if (user) {
    const subscription = await getSubscription(user.id)
    if (subscription?.active) {
      return { currentTier: subscription.tier }
    }
  }

  // Priority 3: Default to free
  return { currentTier: 'free', aiAccessEnabled: false }
}
```

### Security notes

- **Never trust frontend for entitlement checks**
- **Always verify on server-side**
- **Developer allowlist is secret** (env vars, not in code)
- **Subscription status must come from database**, not from client claims
- **ECPay webhooks must verify signatures** before updating subscription

## Tier boundaries

| Tier | Intended access |
|---|---|
| Free | Company search, static summaries, delayed or cached market snapshots, public filings source discovery |
| Pro | AI earnings analysis, company comparison, exportable research reports, live or near-real-time quote access when configured |
| Team | Shared watchlists, batch company tracking, team workspace features |
| Research Lab | Large-scale company research workflows, advanced batch analysis, API access when configured |
| Developer | Test access to Pro/AI/paid features for development and QA testing |

## Developer Account Entitlement

### Purpose

A special `developer` tier exists for authorized developers to test all paid features without real subscriptions. This enables:

- Testing Pro features (AI analysis, export, comparison)
- Testing subscription UI flows
- Error checking and QA validation
- Development workflow without payment credentials

### Security requirements

**Developer account is NOT a frontend bypass.**

- Do NOT use `localStorage`, `sessionStorage`, or cookies to store developer flags.
- Do NOT use query parameters (`?dev=true`, `?developer=1`) to unlock features.
- Do NOT hardcode bypass logic in UI components.
- Developer access must be verified server-side against an allowlist.

**Allowlist configuration (future):**

```bash
# Environment variables (not in code)
DEVELOPER_ACCOUNT_EMAILS=developer@example.com,qa@example.com
DEVELOPER_ACCOUNT_IDS=user_uuid_1,user_uuid_2
```

### Planned developer tier features

When a user is authenticated AND their email/ID is in the allowlist:

| Feature | Developer access |
|---|---|
| aiAccessEnabled | true |
| exportEnabled | true |
| advancedCompareEnabled | true |
| developerBypassEnabled | true |
| billingMode | sandbox |

### ECPay boundary for developers

**ECPay production checkout remains disabled even for developer accounts.**

Developer accounts use `billingMode: sandbox` or `billingMode: bypass`. Production ECPay checkout must:
- Require explicit merchant credential configuration
- Verify webhook signatures
- Not be auto-enabled by developer accounts

### Current safe preview behavior

The current `/api/entitlement-status` always returns `currentTier: free` and `aiAccessEnabled: false`. The `plannedDeveloperAccess` field documents future behavior without enabling it today.

## Feature access map

| Feature | Preview access state |
|---|---|
| Company search | Free preview |
| Static summaries | Free preview |
| Delayed or cached market snapshots | Free preview |
| Public filings source discovery | Free preview |
| AI earnings analysis | Pro locked |
| Company comparison | Pro locked preview |
| Export reports | Pro locked |
| Shared watchlists | Team locked |
| Batch tracking | Team locked |
| Research API access | Research Lab locked |

## Security rules

- Do not put API keys in frontend code.
- Do not commit secrets to the repository.
- Payment credentials must stay in Vercel environment variables only.
- Provider access must stay backend-only.
- AI analysis endpoints must verify entitlement server-side before running paid analysis.
- Frontend locked-state UI is not a security boundary.
- ECPay checkout must remain disabled until merchant credentials and webhook verification are configured.
- Webhook handlers must verify signatures before changing entitlement state.

## ECPay boundary

ECPay code may exist in the repository, but checkout remains disabled until configured.

The current expected disabled response is:

{"error":"ECPay checkout is not configured."}

## AI boundary

AI earnings analysis is not part of the Free tier.

Any future AI endpoint must check entitlement server-side before generating analysis. The frontend should never be trusted as the only gate for paid features.

## Disclaimer

Global Earnings Radar is for educational and informational purposes only. It is not investment advice. Users should verify information from official sources before making financial decisions.
