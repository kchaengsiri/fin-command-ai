# Feature Documentation

## 1. Feature Name: AI Insights Engine Backend
- **Description:** A FastAPI backend endpoint that aggregates current market snapshot (VIX, S&P500, Gold) and the user's mutual fund portfolio data, and queries Gemini 2.5 Flash using the new `google-genai` SDK to generate a brief risk assessment and actionable portfolio adjustment suggestions. Also fixes the conversational `/api/ask-ai` endpoint model.
- **API/Endpoint Used:** `GET /api/ai-insights`, `POST /api/ask-ai`
- **Status:** Completed (Backend)
