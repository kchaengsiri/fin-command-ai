# Changelog

*Format: `[YYYY-MM-DD] - [Type: Added/Changed/Fixed/Removed] - Description`*

**[2026-03-19]** - *22:55* - `Added` - Initialized project documentation (PRD, GEMINI.md, changelog, feature).

**[2026-03-20]**
- *09:15* - `Added` - Initialized Vite + React + TS frontend (pnpm) and basic FastAPI application (`main.py`, `requirements.txt`).
- *09:40* - `Added` - Set up complete Docker environment (`docker-compose.yml`, `frontend/Dockerfile`, `backend/Dockerfile`).
- *10:10* - `Added` - Installed and configured Tailwind CSS v3 in the Vite React frontend.
- *11:05* - `Added` - Created `fetch_market.py` agent skill to fetch VIX and S&P500 market data using `yfinance`.
- *13:30* - `Added` - Implemented sleek `MarketOverviewWidget.tsx` React component with Tailwind, Framer Motion, and Lucide React.
- *14:45* - `Added` - Built dynamic `PortfolioWidget.tsx` component and wired it to a new backend `/api/portfolio` FastAPI endpoint.
- *15:20* - `Added` - Integrated real Thai Fund data (SCB RMF, SSF) into local JSON storage.
- *15:45* - `Changed` - Formatted Portfolio metrics to reliably render THB (฿) currency natively.
- *18:30* - `Added` - Implemented the AI Insights Engine backend (`GET /api/ai-insights`) to generate daily risk assessments.
- *19:15* - `Fixed` - Fixed Gemini model name for the conversational `/api/ask-ai` endpoint.
- *19:45* - `Changed` - Migrated the backend from the deprecated `google-generativeai` package to the newly supported `google-genai` SDK.
- *20:10* - `Added` - Implemented the AI Command Interface frontend (Spotlight input & API integration).
- *20:50* - `Changed` - Refactored AI Command Interface UI into a persistent Right-Side Drawer with full chat history and continuous chat input.
- *21:16* - `Added` - Implemented AIInsightsWidget frontend and completed all core MVP features.
