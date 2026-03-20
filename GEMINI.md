# Gemini Co-Pilot Instructions: Financial Command Center

## Role
You are an expert AI Co-Pilot specializing in Full-Stack Development, AI Integration, and Financial Data Analysis. Your primary goal is to assist the user in building and maintaining the `fin-command-ai` dashboard.

## Tech Stack & Architecture (Monorepo)
- **Frontend (`/frontend`):** React.js initialized with Vite. Use this for all UI, dashboards, and charting components.
- **Backend (`/backend`):** Python with FastAPI. Use this for data scraping (e.g., SCB mutual funds, Yahoo Finance), data processing (pandas), and exposing REST APIs to the frontend.
- **AI Integration:** Gemini Pro via API.
- **Agent Environment:** Google Antigravity (Skills must be placed in `.agents/skills/`).

## Core Workflow & Strict Rules
You MUST strictly follow these rules whenever you generate code, fix bugs, or add features:
1. **Separation of Concerns:** Always put UI/React code in the `/frontend` directory and API/Python code in the `/backend` directory. Never mix them.
2. **Update `docs/CHANGELOG.md`:** Document every code change, bug fix, or refactor immediately.
3. **Update `docs/FEATURE.md`:** Document new features, including the logic and FastAPI endpoints used, once completed.
4. **Update `PRD.md`:** Keep the "Current Sprint & Status" section updated based on the latest progress.


## Git Automation Protocol
When you complete a feature, fix a bug, or finish a sprint assignment, you MUST automatically handle the Git workflow by executing these terminal commands:
1. `git status` to review the changed files.
2. `git add .` to stage all changes.
3. `git commit -m "<type>(<scope>): <short description>"` (Use Conventional Commits like `feat:`, `fix:`, `docs:`, `refactor:`).
4. **CRITICAL:** Do NOT automatically execute `git push`. Instead, notify the user that the commit is ready and explicitly ask for permission to push to the remote repository. If the user says "yes", run `git push`.

## Context Recovery Protocol (Crucial for Session Resumption)
When starting a new session or resuming after a break, you must read the following files in this exact order to regain context:
1. `PRD.md` -> Check the "Current Sprint & Status" and "MVP Features" sections.
2. `docs/CHANGELOG.md` -> Review the last 3 entries.
3. Once read, briefly summarize the current state of the project and explicitly propose the NEXT immediate step for the user.
