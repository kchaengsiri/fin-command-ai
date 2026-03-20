# Changelog

*Format: `[YYYY-MM-DD] - [Type: Added/Changed/Fixed/Removed] - Description`*

- **[2026-03-19]** - `Added` - Initialized project documentation (PRD, GEMINI.md, changelog, feature).
- **[2026-03-20]** - `Added` - Initialized Vite + React + TS frontend (pnpm) and basic FastAPI application (`main.py`, `requirements.txt`).
- **[2026-03-20]** - `Added` - Created `fetch_market.py` agent skill to fetch VIX and S&P500 market data using `yfinance`.
- **[2026-03-20]** - `Added` - Set up complete Docker environment (`docker-compose.yml`, `frontend/Dockerfile`, `backend/Dockerfile`).
- **[2026-03-20]** - `Added` - Installed and configured Tailwind CSS v3 in the Vite React frontend.
- **[2026-03-20]** - `Added` - Implemented sleek `MarketOverviewWidget.tsx` React component with Tailwind, Framer Motion, and Lucide React to fetch and display live market data.
- **[2026-03-20]** - `Added` - Built dynamic `PortfolioWidget.tsx` component and wired it to a new backend `/api/portfolio` FastAPI endpoint.
- **[2026-03-20]** - `Added` - Integrated real Thai Fund data (SCB RMF, SSF) into local JSON storage.
- **[2026-03-20]** - `Changed` - Formatted Portfolio metrics to reliably render THB (฿) currency natively.
- **[2026-03-20]** - `Added` - Implemented the AI Insights Engine backend (`GET /api/ai-insights`) to generate daily risk assessments and portfolio suggestions using Gemini 2.5 Flash.
- **[2026-03-20]** - `Fixed` - Fixed Gemini model name for the conversational `/api/ask-ai` endpoint.
- **[2026-03-20]** - `Changed` - Migrated the backend from the deprecated `google-generativeai` package to the newly supported `google-genai` SDK.
