# Global Earnings Radar - Project Memory

## Product Direction

**Product**: A financial research assistant for US and European tech stocks.
**Goal**: Help users quickly understand earnings reports, business trends, and risk factors—in minutes.
**Positioning**: Educational tool, NOT investment advisor.

### Primary Markets
- United States (US)
- European Union (EU)
- United Kingdom (UK)

### Target Companies (MVP)
| Ticker | Company | Exchange | Sectors |
|--------|---------|----------|---------|
| NVDA | NVIDIA Corporation | NASDAQ | AI, Semiconductors |
| MSFT | Microsoft Corporation | NASDAQ | Cloud, SaaS, AI |
| AAPL | Apple Inc. | NASDAQ | Consumer Tech |
| ASML | ASML Holding N.V. | Euronext Amsterdam | Semiconductors |
| SAP | SAP SE | Xetra Frankfurt | SaaS |
| GOOGL | Alphabet Inc. | NASDAQ | AI, Cloud, Consumer |
| AMZN | Amazon.com, Inc. | NASDAQ | Cloud, Consumer |
| META | Meta Platforms, Inc. | NASDAQ | AI, Consumer |
| TSLA | Tesla, Inc. | NASDAQ | Consumer |
| AMD | Advanced Micro Devices, Inc. | NASDAQ | AI, Semiconductors |
| TSM | Taiwan Semiconductor | NYSE (ADR) | Semiconductors |

---

## Language

- **External output**: English only
- **Internal notes/comments**: Traditional Chinese (繁體中文) acceptable

---

## Permission Mode

**High Autonomy Execution** - Local safe operations do not require asking for confirmation.

### Can Do Directly ✅
- Create/modify files in project directory
- `npm install` for new dependencies
- `npm run build` / `npm run dev` / `npm run preview`
- Fix build errors and code issues
- Create mock data (JSON/Markdown/CSV)
- Create UI components, pages, layouts
- Create documentation (README, ROADMAP, etc.)
- Use existing skills (skills-audit, earnings-report-summarizer, etc.)
- Local file operations (read, write, mkdir, mv, rm)

### Cannot Do Without Explicit Permission ❌
- Real deployment (GitHub Pages, Vercel, Netlify, Cloudflare, etc.)
- `git commit` or `git push`
- Create GitHub repositories
- Write to `.env` files or expose API keys
- Connect to real payment providers (Stripe, PayPal, Paddle, etc.)
- Connect to real email services (SendGrid, Mailgun, etc.)
- Web scraping
- Post to social media (Twitter/X, LinkedIn, Reddit, etc.)
- Process real user personal data (emails, passwords, payment info)
- Access production databases
- Use paid APIs without approval
- Modify system environment variables

---

## Investment Content Rules

**All content must comply with these rules:**

### Required
- Include disclaimer on every page: "Educational and informational purposes only"
- Clearly separate: Facts / AI Summary / Business Insights / Risk Factors / Questions to Watch
- Cite sources for all data
- Present multiple perspectives
- End with questions, not predictions

### Prohibited
- Buy / Sell / Hold recommendations
- Price targets or price predictions
- Guaranteed returns language
- "Will", "Should", "Going to" for stock movements
- Comparison to "winners" or "losers"
- FOMO language ("Don't miss out", "Act now")
- Implied investment expertise ("We recommend", "Experts say buy")

### Disclaimer Text (Required on every page)
```
⚠️ Disclaimer: This content is for educational and informational purposes only.
It does not constitute investment advice, a recommendation to buy or sell any security,
or an offer or solicitation of an offer to buy or sell any security.
All investments involve risk, including the possible loss of principal.
Past performance is not indicative of future results.
Always conduct your own independent research.
```

---

## Skills Available

These local skills are available in `~/.claude/skills/`:

| Skill | Category | Purpose |
|-------|----------|---------|
| `global-stock-data-reference` | Library & API Reference | SEC EDGAR, EU data sources, data formats |
| `earnings-report-summarizer` | Data & Analysis | 10-K/10-Q summary framework |
| `global-tech-industry-brief-generator` | Business Automation | Weekly briefs, SEO articles, newsletters |
| `startup-mvp-planner-global` | Agent Workflow | MVP planning, validation metrics |
| `investment-content-compliance-check` | Code Quality & Review | Compliance checking |
| `computer-control-safety-runbook` | Infrastructure Ops | Safety rules for computer control |
| `screen-reading-ui-debug` | Product Verification | Screenshot analysis, UI debugging |
| `browser-automation-research` | Product Verification | Web research, browser testing |
| `image-understanding-workflow` | Data & Analysis | Image analysis |
| `audio-understanding-workflow` | Data & Analysis | Audio file analysis planning |
| `web-research-verification` | Library & API Reference | Web search and source verification |
| `global-stock-data-reference` | - | - |

---

## Project Status

### Completed ✅
- [x] Vite + React project structure
- [x] Landing page (optimized with educational focus)
- [x] Company dashboard (11 companies)
- [x] Earnings summary cards
- [x] Risk factor sections
- [x] Business segment analysis
- [x] Sector pages (AI, Semiconductors, SaaS, Cloud, Consumer Tech)
- [x] Internal search (companies + glossary)
- [x] Dark mode toggle (with localStorage + system preference)
- [x] Pricing page (mock, compliant)
- [x] Waitlist page (mock, frontend only)
- [x] 404 NotFound page
- [x] Disclaimer component
- [x] Mobile responsive CSS
- [x] Basic SEO meta tags
- [x] README.md
- [x] ROADMAP.md
- [x] Build succeeds

### Next Steps (Priority Order)
1. Test with `npm run dev` - verify all pages work
2. Back to top button
3. Error boundaries
4. Favicon and branding
5. Git repository setup (when ready)
6. Deployment planning

---

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router DOM 6
- **Build Tool**: Vite 5
- **Styling**: Plain CSS with CSS Variables
- **State**: React Context (Dark Mode)
- **Data**: Static JSON files (no API, no database)

---

## File Structure

```
global-earnings-radar/
├── src/
│   ├── components/
│   │   ├── Disclaimer.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Company.jsx
│   │   ├── Sector.jsx
│   │   ├── Glossary.jsx
│   │   ├── Pricing.jsx
│   │   ├── Waitlist.jsx
│   │   └── NotFound.jsx
│   ├── data/
│   │   ├── companies.json
│   │   ├── financials.json
│   │   └── glossary.json
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── radar.svg
├── dist/                    # Build output
├── index.html               # SEO meta tags
├── package.json
├── vite.config.js
├── README.md
├── ROADMAP.md
└── CLAUDE.md               # This file
```

---

## Commands

```bash
# Development
npm run dev       # Start dev server at http://localhost:5173

# Production
npm run build     # Build to dist/
npm run preview  # Preview production build

# Install new packages
npm install <package>
```

---

*Last updated: 2026-06-26*
*Built with Claude Code*