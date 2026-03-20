# Feature Documentation

## 1. Feature Name: Market Overview Widget
- **Description:** A sleek React UI component built with Tailwind CSS, Framer Motion, and Lucide React that fetches and displays real-time or end-of-day market data (VIX, S&P500, Gold Spot).
- **API/Endpoint Used:** `GET /api/market`
- **Status:** Completed (Full-Stack)

## 2. Feature Name: Portfolio Tracker
- **Description:** A dynamic React component that tracks specific mutual funds (e.g., SCBS&P500, SCBSET50, SCBGOLDH) by fetching holdings and performance metrics from local JSON storage, featuring native THB (฿) currency formatting.
- **API/Endpoint Used:** `GET /api/portfolio`
- **Status:** Completed (Full-Stack)

## 3. Feature Name: AI Insights Engine Backend
- **Description:** A backend service that aggregates current market snapshots (VIX, S&P500, Gold) and the user's mutual fund portfolio data to generate a brief risk assessment and actionable portfolio adjustment suggestions.
- **API/Endpoint Used:** `GET /api/ai-insights`
- **Status:** Completed (Backend)

## 4. Feature Name: AI Command Interface
- **Description:** A sleek, Spotlight-style chat widget on the frontend that allows the user to ask natural language questions about their portfolio and macro trends. It connects to the backend where Gemini 2.5 Flash (via the `google-genai` SDK) analyzes the user's `portfolio.json` context and returns strategic financial advice.
- **API/Endpoint Used:** `POST /api/ask-ai`
- **Status:** Completed (Full-Stack)
