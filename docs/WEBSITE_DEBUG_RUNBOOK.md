# Website Debug Runbook

This runbook is for diagnosing Global Earnings Radar website availability, routing, deployment, and API issues.

## First step

When the site cannot be opened or a route/API looks broken, run:

~~~powershell
powershell -ExecutionPolicy Bypass -File scripts/debug-site.ps1
~~~

This creates:

~~~text
docs/debug-last-run.txt
~~~

Do not start new feature work until `scripts/debug-site.ps1` passes.

## Required local checks

Run:

~~~powershell
npm run build

git status
~~~

Expected result:

~~~text
Build succeeds.
Working tree is clean, unless you are actively debugging local changes.
~~~

## Vercel deployment checks

Inspect the latest production deployment:

~~~powershell
vercel inspect <latest-production-url>

vercel inspect <latest-production-url> --logs
~~~

Check recent runtime/request logs:

~~~powershell
vercel logs --since 30m --expand
~~~

## Common causes

### Browser cache

Symptoms:

- The site opens but shows an old navbar or old pricing content.
- Local files are correct but the browser still shows older UI.

Actions:

- Press Ctrl + F5.
- Open the production URL in an incognito window.
- Avoid old preview deployment URLs.

### Old preview URL

Symptoms:

- The URL contains a deployment-specific Vercel preview hostname.
- New production changes are not visible.

Action:

Use only:

~~~text
https://global-earnings-radar.vercel.app
~~~

### DNS or network issue

Symptoms:

- Browser cannot connect.
- `Test-NetConnection` fails.
- `nslookup` fails or returns unexpected results.

Actions:

- Change network.
- Disable VPN temporarily.
- Flush DNS if needed.
- Retry later if Vercel edge routing is temporarily inconsistent.

### Vercel alias not refreshed

Symptoms:

- Latest deployment is ready but production alias still appears stale.

Actions:

- Run `vercel --prod` again.
- Confirm the output includes `Aliased https://global-earnings-radar.vercel.app`.
- Inspect the latest deployment.

### API route error

Symptoms:

- Page routes return 200, but `/api/...` fails.
- Market quote or search returns a 500-level error.

Actions:

- Run `vercel logs --since 30m --expand`.
- Check API fallback behavior.
- Confirm secrets are not required for demo fallback mode.

### SPA route fallback issue

Symptoms:

- `/` works but `/pricing` or `/market` fails on refresh.

Actions:

- Check `vercel.json` rewrite settings.
- Confirm React Router routes exist in `src/App.jsx`.
- Confirm production build succeeds.

## cmini handoff format

When asking cmini to debug, provide:

~~~text
Failing URL:
<url>

docs/debug-last-run.txt:
<paste contents>

npm run build:
<paste output>

git status:
<paste output>

Vercel inspect/logs:
<paste relevant output>
~~~

Rules for cmini:

- Do not start new feature work.
- Do not enable ECPay.
- Do not add dependencies.
- Fix the smallest confirmed issue only.
- Run `npm run build` after changes.

## Market Cache Status Preview Check

The debug workflow also checks:

/api/market-cache-status

Expected result:

- HTTP 200
- status is preview
- cacheEnabled false is normal
- cronEnabled false is normal

This endpoint is an architecture preview only. It does not mean Redis, Supabase, or Vercel Cron are active. Cache and cron should remain inactive until real providers and scheduled refresh jobs are intentionally configured.

## Entitlement Status Preview Check

The debug workflow also checks:

/api/entitlement-status

Expected result:

- HTTP 200
- status is preview
- currentTier is free
- authEnabled false is normal
- subscriptionEnabled false is normal
- paymentEnabled false is normal
- databaseEnabled false is normal
- aiAccessEnabled false is normal

This endpoint is an architecture preview only. It does not mean authentication, subscription checks, ECPay checkout, database-backed entitlement, or AI access are active.
