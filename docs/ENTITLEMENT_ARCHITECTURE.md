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
   - Unauthenticated -> return free tier
   - Authenticated -> continue to step 2

2. Check developer allowlist (HIGHEST PRIORITY)
   - Email in DEVELOPER_ACCOUNT_EMAILS -> developer tier
   - User ID in DEVELOPER_ACCOUNT_IDS -> developer tier
   - Not in allowlist -> continue to step 3

3. Check subscription status
   - Subscription active -> tier = subscription.tier (pro/team/researchLab)
   - No active subscription -> free tier
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
DEVELOPER_ACCOUNT_EMAILS=
DEVELOPER_ACCOUNT_IDS=

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

## Auth Provider Selection

### Evaluation criteria

Before implementing login, we evaluated three auth providers:

| Criteria | Supabase Auth | Clerk | Auth0 |
|----------|--------------|-------|-------|
| Development speed | Fast (all-in-one) | Fast (great DX) | Medium |
| Cost (MVP stage) | Free tier generous | Free tier limited | Free tier limited |
| Database integration | Native Postgres | External required | External required |
| Subscription management | Easy (in Postgres) | External needed | External needed |
| Developer allowlist | Easy (env vars) | Middleware | Rules |
| Vercel serverless | Works | Works | Works |
| Entitlement flexibility | High | Medium | Medium |

### Option 1: Supabase Auth (Recommended)

**Pros:**
- Auth + Postgres in one service (users, subscriptions, entitlements in same DB)
- RLS (Row Level Security) for fine-grained access control
- Easy developer allowlist via env vars + server-side check
- Generous free tier (50k monthly active users)
- TypeScript SDK with good Vercel support
- Real-time subscriptions for future features

**Cons:**
- Slightly steeper learning curve than Clerk
- Self-hosting option may be overkill

**Recommended for:**
- MVP with limited resources
- Need database for subscriptions/entitlements
- Want unified auth + data solution

**Implementation pattern:**
```javascript
// api/get-entitlement.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

  // Verify token server-side
  const { data: { user }, error } = await supabase.auth.getUser(token)

  // Developer allowlist check
  const devEmails = process.env.DEVELOPER_ACCOUNT_EMAILS?.split(',') || []
  if (user && devEmails.includes(user.email)) {
    return { currentTier: 'developer', aiAccessEnabled: true }
  }

  // Subscription check from Postgres
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier, active')
    .eq('user_id', user?.id)
    .single()

  if (subscription?.active) {
    return { currentTier: subscription.tier }
  }

  return { currentTier: 'free', aiAccessEnabled: false }
}
```

### Option 2: Clerk

**Pros:**
- Excellent developer experience
- Pre-built components (Login, UserButton)
- Easy multi-tenant support

**Cons:**
- No built-in database (need separate Postgres)
- Limited free tier (10k monthly active users)
- Developer allowlist requires middleware

**Recommended for:**
- Quick prototyping
- No database needed

**Implementation pattern:**
```javascript
// middleware.ts
import { clerkClient } from '@clerk/nextjs'

export async function middleware(req) {
  const { userId } = req.auth()
  const user = await clerkClient.users.getUser(userId)

  // Developer allowlist in middleware
  const devEmails = process.env.DEVELOPER_ACCOUNT_EMAILS?.split(',') || []
  if (devEmails.includes(user.emailAddress)) {
    // Set developer header for downstream
  }
}
```

### Option 3: Auth0

**Pros:**
- Enterprise-grade
- Extensive integrations
- Mature ecosystem

**Cons:**
- Complex setup
- Higher cost at scale
- Overkill for MVP

**Recommended for:**
- Large enterprise projects
- Existing Auth0 integration

### Recommendation

**Use Supabase Auth** for Global Earnings Radar.

**Reasons:**
1. **Unified solution**: Auth + Postgres handles users + subscriptions + entitlements in one place
2. **Developer allowlist**: Easy to implement server-side check against env vars
3. **Cost-effective**: Generous free tier for MVP (50k MAU)
4. **Entitlement flexibility**: Can query subscription from same Postgres DB
5. **Vercel compatible**: Edge Functions + Supabase client works well
6. **Future-proof**: Can add RLS policies for access control later

**Future database tables:**
```sql
-- users table (auto-created by Supabase Auth)
-- subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tier TEXT CHECK (tier IN ('pro', 'team', 'researchLab')),
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- entitlements view (for easy queries)
CREATE VIEW user_entitlements AS
SELECT
  u.id,
  u.email,
  s.tier,
  s.active,
  CASE
    WHEN u.email = ANY(string_to_array(current_setting('app.dev_emails'), ','))
      OR u.id::text = ANY(string_to_array(current_setting('app.dev_ids'), ','))
    THEN 'developer'
    WHEN s.active THEN s.tier
    ELSE 'free'
  END as effective_tier
FROM auth.users u
LEFT JOIN subscriptions s ON u.id = s.user_id;
```

## Supabase Auth Implementation Plan

### Scope of this plan

This section defines the implementation plan for Supabase Auth integration. It is a **planning document only** - no code changes, package installations, or feature activations are made at this stage.

The purpose is to document:
- Required environment variables (without real values)
- Database table schemas (draft)
- Server-side entitlement flow
- Developer account security rules
- What is NOT being implemented now

### What is NOT implemented now

The following are explicitly NOT enabled or created in this phase:

- Supabase packages are NOT installed
- Login UI is NOT added
- API behavior is NOT changed (beyond the existing `/api/entitlement-status` safe preview)
- AI access is NOT enabled
- Payment processing is NOT enabled
- Developer account access is NOT enabled
- No real secrets or credentials are stored anywhere

### Required environment variables (future)

When Supabase Auth is actually implemented, the following environment variables will be required. **No real values are included.**

```bash
# Supabase project configuration
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth provider selection
AUTH_PROVIDER=supabase

# Entitlement mode
ENTITLEMENT_MODE=preview   # or "production"

# Developer account allowlist (server-side only)
DEVELOPER_ACCOUNT_EMAILS=
DEVELOPER_ACCOUNT_IDS=
```

**Security note:** All developer allowlist values must be stored as environment variables only. They must NEVER appear in:
- Source code
- Client-side JavaScript
- localStorage or sessionStorage
- URL query parameters

### Database table schemas (draft)

The following tables will be created in Supabase Postgres. These are **draft schemas** for planning purposes.

#### Table: profiles

User profile extension for Supabase Auth users.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Users can read/update their own profile only
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

#### Table: subscriptions

Subscription records linked to user accounts.

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'pro', 'team', 'researchLab')),
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  provider TEXT NOT NULL CHECK (provider IN ('ecpay', 'stripe', 'manual', 'developer')),
  provider_customer_id TEXT,
  provider_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Users can view their own subscription only
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
-- Service role can manage subscriptions (for webhooks)
```

#### Table: entitlement_audit_logs

Audit trail for entitlement changes (created by webhooks or admin actions).

```sql
CREATE TABLE entitlement_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('subscription_created', 'subscription_updated', 'subscription_canceled', 'developer_added', 'developer_removed')),
  old_tier TEXT,
  new_tier TEXT,
  actor TEXT NOT NULL CHECK (actor IN ('ecpay_webhook', 'stripe_webhook', 'admin', 'system')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Only service role can insert; no direct user access
ALTER TABLE entitlement_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage audit logs" ON entitlement_audit_logs FOR ALL USING (auth.role() = 'service_role');
```

### Server-side entitlement API flow (future)

When `/api/entitlement-status` is updated to use Supabase Auth, the flow will be:

```
Request -> Verify Supabase JWT -> Get user id/email -> Check developer allowlist -> Query subscriptions -> Return effective entitlement
```

**Step 1: Verify Supabase JWT**

```javascript
// api/entitlement-status.js (future)
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(200).json({ currentTier: 'free', aiAccessEnabled: false })
  }

  // Verify JWT server-side using service role key
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return res.status(200).json({ currentTier: 'free', aiAccessEnabled: false })
  }
  // Continue to step 2...
}
```

**Step 2: Check developer allowlist (HIGHEST PRIORITY)**

```javascript
  // Developer allowlist check - MUST be server-side only
  const devEmails = (process.env.DEVELOPER_ACCOUNT_EMAILS || '').split(',').filter(Boolean)
  const devIds = (process.env.DEVELOPER_ACCOUNT_IDS || '').split(',').filter(Boolean)

  if (
    (user.email && devEmails.includes(user.email)) ||
    (user.id && devIds.includes(user.id))
  ) {
    return res.status(200).json({
      currentTier: 'developer',
      aiAccessEnabled: true,
      exportEnabled: true,
      advancedCompareEnabled: true,
      billingMode: 'sandbox'
    })
  }
```

**Step 3: Query subscription**

```javascript
  // Subscription check
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier, status, current_period_end')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing'])
    .single()

  if (subscription) {
    return res.status(200).json({
      currentTier: subscription.tier,
      aiAccessEnabled: ['pro', 'team', 'researchLab'].includes(subscription.tier),
      subscriptionStatus: subscription.status,
      currentPeriodEnd: subscription.current_period_end
    })
  }

  // Default: free tier
  return res.status(200).json({
    currentTier: 'free',
    aiAccessEnabled: false
  })
}
```

### Developer account security rules

Developer account access is a **server-side only** feature. The following rules are enforced:

| Rule | Description |
|------|-------------|
| Server-side allowlist only | Developer emails/IDs stored in environment variables, never in code |
| No localStorage | Developer flags must NEVER be stored in localStorage, sessionStorage, or cookies |
| No query parameters | Features cannot be unlocked via `?dev=true` or similar URL params |
| No frontend hardcode | Developer bypass logic cannot exist in UI components |
| ECPay boundary | ECPay production checkout is NOT auto-enabled for developer accounts |
| Sandbox billing mode | Developer accounts use `billingMode: sandbox`, not production payments |

**Developer account bypass is NOT a security feature - it is a development convenience.** Production features must work correctly for real paid users without relying on developer account logic.

**ECPay production checkout** requires:
- Explicit merchant credential configuration in environment variables
- Valid webhook signature verification
- Real payment processing with Taiwan payment gateway

Developer accounts cannot bypass these requirements.

### Integration sequence

When implementing Supabase Auth, follow this sequence:

1. Configure Supabase project and create database tables
2. Add environment variables (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
3. Install `@supabase/supabase-js` package
4. Update `/api/entitlement-status` to verify JWT and query database
5. Add login UI components
6. Test developer allowlist flow
7. Configure ECPay webhook endpoints
8. Enable production payment processing

Each step should be tested before proceeding to the next.

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
