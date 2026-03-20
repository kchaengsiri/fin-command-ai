# 📈 fin-command-ai

**An AI-Powered Financial Command Center**

`fin-command-ai` is a personal, real-time dashboard designed to track critical market indicators (S&P500, VIX, Gold) and manage a mutual fund portfolio (SSF/RMF). Built as a monorepo, it combines a blazing-fast React frontend with a powerful Python backend. It utilizes Google Antigravity and Gemini Pro via an Agentic AI architecture to provide automated market insights, news aggregation, and risk assessment.

## 🚀 Core Features

- **Market Pulse:** Real-time tracking of crucial indices including `^VIX`, `^GSPC` (S&P 500), and `GC=F` (Gold Spot).
- **Portfolio Tracker:** Log, simulate, and monitor returns for specific mutual funds (e.g., SCBS&P500, SCBSET50, SCBGOLDH).
- **AI-Driven Insights:** Utilizes Gemini Pro to analyze daily market data and provide actionable investment strategies.
- **Agentic Skills System:** Built with Antigravity's standard `.agents/skills` architecture, allowing the AI to autonomously fetch data and execute tasks.

## 🛠️ Tech Stack

- **Frontend:** React.js + Vite (Fast UI and dynamic charting)
- **Backend:** Python + FastAPI (Data scraping, AI integration, and API endpoints)
- **Workspace/Environment:** Google Antigravity
- **AI Assistant:** Gemini Pro API

## 📂 Project Architecture (Monorepo)

This project follows a clean separation of concerns within a single repository to maintain AI context:

```text
fin-command-ai/
├── .agents/                  # AI Agent Capabilities (Antigravity standard)
│   └── skills/               # Custom agent skills (e.g., get-market-data)
├── backend/                  # 🐍 Python + FastAPI
│   ├── main.py               # API endpoints for S&P500, VIX, SSF/RMF data
│   └── requirements.txt
├── docs/                     # Project Documentation
│   ├── PRD.md                # Product Requirements & Roadmap
│   ├── FEATURE.md            # Feature documentation
│   └── CHANGELOG.md          # Version history
├── frontend/                 # ⚛️ Vite + React.js
│   ├── src/                  # Dashboard UI and components
│   └── package.json
├── GEMINI.md                 # System instructions for the Gemini Co-pilot
└── README.md
```

## 🧠 Gemini Co-Pilot Protocol

If you are an AI assistant (like Gemini) contributing to this project, you **MUST** read `GEMINI.md` before generating any code or modifying files to ensure context persistence and adherence to the project's strict workflow rules.

## 🛠 Useful Docker Commands

- **Sync Frontend Dependencies:** If you or the AI Agent install a new package locally via `pnpm install`, run this command from the root directory to sync the Docker container:
```bash
docker-compose exec frontend pnpm install
```

## 📄 License

MIT License
