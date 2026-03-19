# Product Requirements Document (PRD): Financial Command Center

## 1. Product Overview
A personal dashboard and command center to track real-time financial indicators (S&P500, VIX, Gold) and aggregate economic news. This tool empowers the user to make timely decisions for their mutual fund portfolio (SSF/RMF) using AI-driven insights.

## 2. Core Features (MVP)
- [ ] **Market Overview Widget:** Fetch and display real-time or end-of-day data for VIX, S&P500, and Gold Spot.
- [ ] **News Aggregator:** Pull relevant economic news (e.g., Fed interest rates, geopolitical events, US employment data).
- [ ] **Portfolio Tracker:** Log and simulate returns for specific funds (e.g., SCBS&P500, SCBSET50, SCBGOLDH).
- [ ] **AI Insights Engine:** Send daily market data to Gemini Pro API to generate a brief risk assessment and portfolio adjustment suggestions.

## 3. Current Sprint & Status (Last Updated: 2026-03-20)
*AI will automatically update this section.*
- **In Progress:** Building FastAPI endpoints for market data (`^VIX`, `^GSPC`) and wiring them to a new React `MarketOverviewWidget`.
- **Completed:** Defined core AI workflow (`GEMINI.md`), PRD, created `fetch_market.py` script, and completed project setup & Docker environment (React-TS, FastAPI, Docker Compose).
- **Blockers:** None.

## 4. Future Roadmap
- Setup automated alerts (LINE Notify/Telegram) when VIX crosses critical thresholds (e.g., >25).
- Advanced Technical Analysis using AI to read chart patterns.
