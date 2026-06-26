# Global Earnings Radar

**[?? Live Demo](https://global-earnings-radar.vercel.app)**

A financial research assistant for US and European tech stocks. Understand earnings reports, business trends, and risk factors?n minutes.

## ?? Important Disclaimer

**This is an educational research tool only.**

- Does NOT constitute investment advice
- Does NOT recommend buying, selling, or holding any security
- Does NOT provide price targets or predictions
- All investments involve risk, including possible loss of principal
- Past performance is not indicative of future results
- Always conduct your own independent research

## ?? Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ?? Current Status

**Status: MVP / Demo**

This is a minimum viable product demonstration featuring:
- Sample financial data for demonstration purposes only
- No backend or API integration
- No real-time market data
- Static mock data (financials.json, companies.json)

All financial information presented should be verified from official sources before making any investment decisions.

## ?? Project Structure

```
global-earnings-radar/
??? src/
??  ??? components/       # React components
??  ??  ??? DarkModeToggle.jsx
??  ??  ??? Disclaimer.jsx
??  ??  ??? Footer.jsx
??  ??  ??? Search.jsx
??  ??? context/         # React contexts
??  ??  ??? DarkModeContext.jsx
??  ??? pages/           # Page components
??  ??  ??? Landing.jsx
??  ??  ??? Company.jsx
??  ??  ??? Sector.jsx
??  ??  ??? Glossary.jsx
??  ??  ??? Pricing.jsx
??  ??  ??? Waitlist.jsx
??  ??  ??? NotFound.jsx
??  ??  ??? Privacy.jsx
??  ??  ??? Terms.jsx
??  ??  ??? SiteDisclaimer.jsx
??  ??? data/            # Sample demo data
??  ??  ??? companies.json (11 companies)
??  ??  ??? financials.json
??  ??  ??? glossary.json
??  ??? styles/
??  ??  ??? global.css
??  ??? App.jsx
??  ??? main.jsx
??? public/
??? index.html
??? package.json
??? vite.config.js
```

## ? Features

### Current Features (Demo/MVP)
- Landing page with company showcase
- 11 company dashboards (NVDA, MSFT, AAPL, ASML, SAP, GOOGL, AMZN, META, TSLA, AMD, TSM)
- Earnings summary cards with analysis framework
- Business segment analysis
- Risk factor analysis
- Sector-based browsing (AI, Semiconductors, SaaS, Cloud, Consumer Tech)
- Financial glossary with 20+ terms
- Internal search (companies and glossary terms)
- Dark mode toggle (with system preference detection)
- Pricing page with Free / Pro / Team tiers (Pro features in preview)
- Waitlist signup form (Pro early access)
- Legal pages (Privacy, Terms, Disclaimer)
- 404 NotFound page
- Liquid Glass continuous scroll landing page
- Mobile responsive design
- Basic SEO meta tags

### Future Features
- [ ] Additional company coverage
- [ ] Real-time data integration (with public APIs)
- [ ] User watchlist
- [ ] PDF/Markdown export
- [ ] Email newsletter subscription
- [ ] API access for researchers

## ?? Companies Covered

| Ticker | Company | Sector |
|--------|---------|--------|
| NVDA | NVIDIA Corporation | AI, Semiconductors |
| MSFT | Microsoft Corporation | Cloud, SaaS, AI |
| AAPL | Apple Inc. | Consumer Tech |
| ASML | ASML Holding N.V. | Semiconductors |
| SAP | SAP SE | SaaS |
| GOOGL | Alphabet Inc. | AI, Cloud, Consumer |
| AMZN | Amazon.com, Inc. | Cloud, Consumer |
| META | Meta Platforms, Inc. | AI, Consumer |
| TSLA | Tesla, Inc. | Consumer |
| AMD | Advanced Micro Devices | AI, Semiconductors |
| TSM | Taiwan Semiconductor | Semiconductors |

## ??儭?Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: Plain CSS with CSS Variables
- **State**: React Context (Dark Mode)

## ? Design

Apple-inspired Liquid Glass UI with:
- Continuous gradient background
- Glass morphism cards
- Dark mode support
- Responsive design

## ?? Data Disclaimer

**All data in this demo is sample data for product demonstration.**

The financials.json and companies.json contain illustrative financial information. For actual investment decisions:
1. Verify all data from official company filings (SEC EDGAR, annual reports)
2. Consult qualified financial advisors
3. Conduct your own due diligence

## ?? Compliance

- All financial content is clearly labeled as educational
- No buy/sell/hold recommendations
- No price targets or predictions
- No guaranteed returns
- Risk factors are prominently displayed
- Legal disclaimers on every page

## ?? Security Notes

**Architecture**
- Static frontend only (React + Vite)
- No authentication system
- No backend or server-side processing
- No database or persistent storage

**Data Handling**
- No user account system
- No personal financial data collection
- Demo/sample data only (financials.json, companies.json)
- Payments processed securely by ECPay Green World (Taiwan payment gateway)

**Security Measures**
- Security headers configured via vercel.json (CSP, HSTS, X-Frame-Options, etc.)
- Static assets served via Vercel Edge Network
- HTTPS enforced via Strict-Transport-Security header

*Note: As with any web application, maintain good security practices and keep dependencies updated.*

## ? Payment Setup (ECPay Green World)

This project uses ECPay Green World hosted checkout for Taiwan payment support. Credit card payments are handled entirely by ECPay; no payment information is processed or stored on this server.

### Prerequisites
- ECPay merchant account (test/development environment)
- Vercel account with this project deployed
- ECPay test credentials from [ECPay Developer Center](https://www.ecpay.com.tw)

### Environment Variables

Configure these in **Vercel Project Settings ??Environment Variables**:

| Variable | Description | Example |
|----------|-------------|---------|
| `ECPAY_MERCHANT_ID` | ECPay Merchant ID | `merchant_id_xxx` |
| `ECPAY_HASH_KEY` | ECPay HashKey | `hash_key_xxx` |
| `ECPAY_HASH_IV` | ECPay HashIV | `hash_iv_xxx` |
| `ECPAY_STAGE` | Use test environment | `true` |
| `SITE_URL` | Production site URL | `https://global-earnings-radar.vercel.app` |

### Setup Steps

1. **Get ECPay Test Credentials**:
   - Apply for ECPay test account or use provided test merchant
   - Obtain MerchantID, HashKey, and HashIV

2. **Configure Vercel Environment Variables**:
   - Go to Vercel Dashboard ??Project ??Settings ??Environment Variables
   - Add each variable from the table above
   - Set `ECPAY_STAGE=true` for test mode

3. **Test Payment Flow**:
   - Navigate to Pricing page
   - Click "Start ECPay Checkout"
   - Use ECPay test credit card: `4311-9522-2222-2222` (success) or other test cards

### Security Notes
- **Never commit HashKey or HashIV** to the repository
- ECPay handles all payment data; we only receive transaction results
- Test mode (`ECPAY_STAGE=true`) uses ECPay staging environment
- Production payment activation requires ECPay merchant approval, legal/business setup, and database-backed entitlement management

### MVP Limitation
This MVP does not automatically unlock paid features. The checkout flow is implemented for demonstration purposes only.

## ?? Waitlist Collection Setup

The waitlist form submits to `/api/submit-waitlist`, which forwards submissions to an external webhook.

### Prerequisites
- Vercel account with this project deployed
- A webhook receiver service (see options below)

### Supported Webhook Services
- Formspree (form endpoint)
- Make.com (automation webhook)
- Zapier (webhook)
- Tally (form webhook)
- Airtable (automation webhook)
- Google Sheets (via Apps Script webhook)
- Any service that accepts POST JSON

### Environment Variable

Configure in **Vercel Project Settings ??Environment Variables**:

| Variable | Description | Example |
|----------|-------------|---------|
| `WAITLIST_WEBHOOK_URL` | Webhook URL for collecting submissions | `https://hooks.zapier.com/hooks/catch/xxx` |

### Webhook Payload

When a user submits the form, the following JSON is sent to your webhook:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Student",
  "interests": ["AI earnings summaries", "Exportable reports"],
  "message": "Looking forward to the AI features",
  "source": "waitlist-page",
  "submittedAt": "2026-06-26T12:00:00.000Z",
  "site": "Global Earnings Radar"
}
```

### Setup Steps

1. **Create a webhook receiver**:
   - Formspree: Create a form and get your endpoint URL
   - Zapier/Make: Create a webhook trigger
   - Airtable: Create an automation with a webhook action
   - Google Sheets: Create an Apps Script webhook

2. **Configure Vercel Environment Variables**:
   - Go to Vercel Dashboard ??Project ??Settings ??Environment Variables
   - Add `WAITLIST_WEBHOOK_URL` with your webhook URL

3. **Test the form**:
   - Go to the waitlist page and submit a test entry
   - Verify the data appears in your webhook service

### Security Notes
- **Do not commit real production webhook URLs** to the repository
- If `WAITLIST_WEBHOOK_URL` is not configured, the form shows a friendly message
- No user data is stored on this server
- Only basic email validation is performed client-side

### MVP Limitation
If `WAITLIST_WEBHOOK_URL` is not set, the form still works from the user's perspective but submissions are not stored. The frontend shows "The collection backend is not configured yet."

## Feature Tiering Strategy

### Product Tiers

**Free (No account required)**
- All-company basic search
- Static company summaries
- Delayed / cached financial snapshots
- Basic public data freshness
- Public filings source discovery
- Sample research reports
- Glossary and sector browsing
- Pro waitlist access

**Pro / Paid (Coming Soon)**
- AI-assisted earnings analysis
- AI-generated earnings briefs
- Management tone summary
- Risk factor extraction
- Company comparison
- Exportable reports
- Saved watchlists
- Research notes
- Earnings alerts

**Team / Research Lab (Coming Soon)**
- Everything in Pro
- Batch company tracking
- Shared research workspace
- Classroom / lab use
- Batch exports
- Admin billing support

### Design Principles

- AI analysis is treated as a Pro / paid feature.
- Free users can access company profile search, static summaries, delayed or cached financial snapshots, basic public data freshness, public filing source discovery, glossary content, sector browsing, and sample research report structures.
- Pro users are planned to receive AI-assisted earnings analysis, AI-generated briefs, management tone summaries, risk factor extraction, company comparison, saved watchlists, research notes, alerts, and exportable reports.
- Team / Lab users are planned to receive shared research workflows, batch company tracking, classroom / lab usage, and batch exports.
- Current implementation is preview-only and does not perform live AI analysis or live web search yet.
- Future live data should be powered by cloud jobs, provider adapters, and databases rather than local machine updates.

## ?? Product Roadmap - Paid Features

### Current Status
- **ECPay Integration**: Prepared (test environment) but not activated for production payments
- **Pro Features**: Displayed as "Pro Preview" on landing page but not yet functional
- **Account System**: Not yet implemented
- **Entitlement Management**: No automated access control

### Pro Features (Planned)
- [x] Pricing tiers displayed (Free / Pro / Team)
- [x] Pro features preview section on landing page
- [x] Upgrade prompts on company pages
- [ ] Saved watchlists and research notes
- [ ] AI-assisted earnings brief generation
- [ ] Sector trend dashboards
- [ ] Exportable research reports (PDF / Markdown)
- [ ] Earnings calendar alerts
- [ ] Company comparison workspace

### Production Activation Requirements
To enable real payments and Pro feature access:
1. Complete ECPay merchant verification and legal review
2. Implement user authentication (login system)
3. Set up database for subscription and entitlement management
4. Configure webhook handlers for payment status updates
5. Add user account dashboard for managing subscription

## ?? Competitor-Inspired Product Direction

The product is inspired by earnings research workflows such as:
- Earnings call summaries and insights
- Watchlists for tracking companies
- Company comparison tools
- Sector trend dashboards
- Exportable research briefs

Current implementation is preview-only. The Pro features shown on the website (watchlists, AI briefs, sector dashboards, exportable reports) are displayed as product direction, not functional features.

**What is NOT implemented yet:**
- Paid entitlement (no automated access control)
- AI-generated earnings briefs (no actual AI processing)
- Data persistence (no database for saved data)
- Automated checkout (ECPay is prepared but not activated)
- User authentication (no login system)

**Required for production:**
- Backend API for user data
- Database for subscriptions and saved content
- Authentication system
- ECPay merchant verification and legal setup
- Database-backed entitlement management

## ?? License

MIT

---

*Built with Claude Code. Educational purposes only.*
