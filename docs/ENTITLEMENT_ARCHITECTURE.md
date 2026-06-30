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

## Tier boundaries

| Tier | Intended access |
|---|---|
| Free | Company search, static summaries, delayed or cached market snapshots, public filings source discovery |
| Pro | AI earnings analysis, company comparison, exportable research reports, live or near-real-time quote access when configured |
| Team | Shared watchlists, batch company tracking, team workspace features |
| Research Lab | Large-scale company research workflows, advanced batch analysis, API access when configured |

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
