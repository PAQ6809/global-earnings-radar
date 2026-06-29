# Market Data Cache / Cron Architecture

This document describes the planned cloud data refresh architecture for Global Earnings Radar.

This is an architecture preview. It does not enable real cron jobs, does not connect to Redis or Supabase, and does not require provider secrets.

## Current state

Browser -> Vercel API -> Market data provider if configured -> Demo/local fallback -> React frontend

Current behavior:

- Market quote data is requested on demand.
- Market search can fall back to local search results.
- Provider API keys are never exposed to the frontend.
- Demo/local fallback keeps the product usable without paid infrastructure.
- ECPay checkout remains disabled until explicitly configured.

## Future state

Vercel Cron -> Refresh popular symbols -> Store normalized data in cache -> Vercel API reads cached data -> Frontend displays latest available snapshots

This matters because users can see updated market snapshots even when the developer computer is off.

## Planned cache options

### Redis / Upstash-style cache

- Popular quote snapshots
- Short-lived market data
- Fast reads with expiration
- Tiered freshness windows

### Supabase table cache

- Company profile snapshots
- Filing/source metadata
- Longer-lived structured data
- Auditability and historical refresh records

### Static snapshots

Static snapshots are not recommended for live market data. They can be useful for demos or examples, but not for freshness-sensitive market data.

## Planned cron jobs

- Refresh popular quote snapshots
- Refresh company profiles
- Refresh filings/source metadata
- Refresh news summaries

## Planned refresh policy

| Data type | Planned refresh |
|---|---|
| Popular symbols | 1-5 minutes when enabled |
| Company profiles | Daily or weekly when enabled |
| Financial statements | Daily refresh or filing-triggered refresh when enabled |
| News | 15-60 minutes when enabled |

## Tier boundaries

| Tier | Planned market data access |
|---|---|
| Basic | Delayed/cached snapshots |
| Pro | Live or near-real-time quote access plus AI analysis |
| Team | Shared watchlists and batch tracking |
| Research Lab | Large-scale batch workflows and API access |

AI analysis must remain a paid / Pro feature or higher.

## Security rules

- Do not put API keys in frontend code.
- Do not commit secrets to the repository.
- Provider access must stay backend-only.
- Cache should not store private user data in the early phase.
- ECPay must remain disabled until required merchant credentials are configured.
- Debug output should not expose secrets.
- Environment variables should only be configured in Vercel or local user environment settings.

## Status endpoint

/api/market-cache-status

This endpoint is informational only. It reports the planned architecture state and does not enable real cache or cron behavior.

## Disclaimer

Global Earnings Radar is for educational and informational purposes only. It is not investment advice. Users should verify information from official sources before making financial decisions.
