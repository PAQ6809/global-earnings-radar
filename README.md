# Global Earnings Radar

A financial research assistant for US and European tech stocks. Understand earnings reports, business trends, and risk factors—in minutes.

## ⚠️ Disclaimer

**This is for educational and informational purposes only.** It does not constitute investment advice, a recommendation to buy or sell any security, or an offer or solicitation of an offer to buy or sell any security. All investments involve risk, including the possible loss of principal. Past performance is not indicative of future results. Always conduct your own independent research.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

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
│   ├── data/            # Mock data
│   │   ├── companies.json (11 companies)
│   │   ├── financials.json
│   │   └── glossary.json
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── radar.svg
│   └── og-image.svg
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Features

### Current Features (MVP)
- Landing page with company showcase
- 11 company dashboards (NVDA, MSFT, AAPL, ASML, SAP, GOOGL, AMZN, META, TSLA, AMD, TSM)
- Earnings summary cards with AI-generated insights
- Business segment analysis
- Risk factor analysis
- Sector-based browsing (AI, Semiconductors, SaaS, Cloud, Consumer Tech)
- Financial glossary with 20+ terms
- Internal search (companies and glossary terms)
- Dark mode toggle (with system preference detection)
- Pricing page (mock)
- Waitlist signup form (mock)
- Legal pages (Privacy, Terms, Disclaimer - draft only)
- 404 NotFound page
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
- **Styling**: Plain CSS (CSS Variables)
- **State**: React Context (Dark Mode)

## 🎨 Customization

### Dark Mode
Dark mode is enabled by default based on system preference. Users can toggle between light and dark mode via the button in the navigation bar. Preference is saved to localStorage.

### Search
Use the search bar in the navigation to quickly find:
- Companies by ticker or name
- Glossary terms by term or definition

## 📖 Data Sources

All data in this MVP is mock data for demonstration purposes. Future versions will use:

- SEC EDGAR (US companies)
- EU company registers (European companies)
- Public investor relations materials

## 🔒 Compliance Notes

- All financial content is clearly labeled as educational
- No buy/sell/hold recommendations
- No price targets or predictions
- Sources are always cited
- Risk factors are prominently displayed
- Legal pages are clearly marked as drafts

## 📝 License

MIT

---

*Built with Claude Code. For educational purposes only.*