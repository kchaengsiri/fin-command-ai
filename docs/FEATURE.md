# Feature Documentation

## 1. Feature Name: AI Insights Engine Backend
- **Description:** A FastAPI backend endpoint that aggregates current market snapshot (VIX, S&P500, Gold) and the user's mutual fund portfolio data, and queries Gemini 2.5 Flash using the new `google-genai` SDK to generate a brief risk assessment and actionable portfolio adjustment suggestions. Also fixes the conversational `/api/ask-ai` endpoint model.
- **API/Endpoint Used:** `GET /api/ai-insights`, `POST /api/ask-ai`
- **Status:** Completed (Backend)

## 2. Feature Name: Market Overview Widget
- **Description:** A sleek React UI component built with Tailwind CSS, Framer Motion, and Lucide React that fetches and displays real-time or end-of-day market data (VIX, S&P500, Gold Spot).
- **API/Endpoint Used:** `GET /api/market`
- **Status:** Completed (Full-Stack)

## 3. Feature Name: Portfolio Tracker
- **Description:** A dynamic React component that tracks specific mutual funds (e.g., SCBS&P500, SCBSET50, SCBGOLDH) by fetching holdings and performance metrics from local JSON storage, featuring native THB (฿) currency formatting.
- **API/Endpoint Used:** `GET /api/portfolio`
- **Status:** Completed (Full-Stack)
