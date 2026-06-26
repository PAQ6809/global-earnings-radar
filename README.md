# Global Earnings Radar

**[🚀 Live Demo](https://global-earnings-radar.vercel.app)**

A financial research assistant for US and European tech stocks. Understand earnings reports, business trends, and risk factors—in minutes.

## ⚠️ Important Disclaimer

**This is an educational research tool only.**

- Does NOT constitute investment advice
- Does NOT recommend buying, selling, or holding any security
- Does NOT provide price targets or predictions
- All investments involve risk, including possible loss of principal
- Past performance is not indicative of future results
- Always conduct your own independent research

## 🚀 Quick Start

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

## 📋 Current Status

**Status: MVP / Demo**

This is a minimum viable product demonstration featuring:
- Sample financial data for demonstration purposes only
- No backend or API integration
- No real-time market data
- Static mock data (financials.json, companies.json)

All financial information presented should be verified from official sources before making any investment decisions.

## 📁 Project Structure

```
global-earnings-radar/
├── src/
│   ├── components/       # React components
│   │   ├── DarkModeToggle.jsx
│   │   ├── Disclaimer.jsx
│   │   ├── Footer.jsx
│   │   └── Search.jsx
│   ├── context/         # React contexts
│   │   └── DarkModeContext.jsx
│   ├── pages/           # Page components
│   │   ├── Landing.jsx
│   │   ├── Company.jsx
│   │   ├── Sector.jsx
│   │   ├── Glossary.jsx
│   │   ├── Pricing.jsx
│   │   ├── Waitlist.jsx
│   │   ├── NotFound.jsx
│   │   ├── Privacy.jsx
│   │   ├── Terms.jsx
│   │   └── SiteDisclaimer.jsx
│   ├── data/            # Sample demo data
│   │   ├── companies.json (11 companies)
│   │   ├── financials.json
│   │   └── glossary.json
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Features

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
- Pricing page (preview/coming soon)
- Waitlist signup form
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

## 📊 Companies Covered

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

## 🛠️ Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: Plain CSS with CSS Variables
- **State**: React Context (Dark Mode)

## 🎨 Design

Apple-inspired Liquid Glass UI with:
- Continuous gradient background
- Glass morphism cards
- Dark mode support
- Responsive design

## 📖 Data Disclaimer

**All data in this demo is sample data for product demonstration.**

The financials.json and companies.json contain illustrative financial information. For actual investment decisions:
1. Verify all data from official company filings (SEC EDGAR, annual reports)
2. Consult qualified financial advisors
3. Conduct your own due diligence

## 🔒 Compliance

- All financial content is clearly labeled as educational
- No buy/sell/hold recommendations
- No price targets or predictions
- No guaranteed returns
- Risk factors are prominently displayed
- Legal disclaimers on every page

## 🔐 Security Notes

**Architecture**
- Static frontend only (React + Vite)
- No authentication system
- No backend or server-side processing
- No database or persistent storage

**Data Handling**
- No payment processing
- No personal financial data collection
- No user account system
- Demo/sample data only (financials.json, companies.json)

**Security Measures**
- Security headers configured via vercel.json (CSP, HSTS, X-Frame-Options, etc.)
- Static assets served via Vercel Edge Network
- HTTPS enforced via Strict-Transport-Security header

*Note: As with any web application, maintain good security practices and keep dependencies updated.*

## 📝 License

MIT

---

*Built with Claude Code. Educational purposes only.*