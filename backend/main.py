from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yfinance as yf
import logging
import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Initialize the FastAPI application
app = FastAPI(title="Fin Command AI API", version="1.0.0")

# Configure Gemini AI Brain
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
else:
    logging.warning("GEMINI_API_KEY is not set in environment variables.")

# Configure CORS to allow requests from the Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    """
    Simple health check endpoint to verify the backend container is running.
    """
    return {"status": "ok", "service": "fin-command-ai-backend"}

@app.get("/api/market")
def fetch_market(symbol: str):
    """
    Fetches market data directly using yfinance.
    This acts as the single source of truth for both the React frontend and the AI Agent.
    """
    try:
        # Initialize the yfinance Ticker
        ticker = yf.Ticker(symbol)

        # Fetch the last 1 day of historical data
        history = ticker.history(period="1d")

        if history.empty:
            raise HTTPException(status_code=404, detail=f"No data available for symbol: {symbol}")

        # Extract the last closing price
        current_price = history['Close'].iloc[-1]

        return {
            "symbol": symbol,
            "price": round(float(current_price), 2),
            "status": "success"
        }

    except Exception as e:
        logging.error(f"Error fetching data for {symbol}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/portfolio")
def get_portfolio():
    """
    Reads and returns the portfolio holdings from the local JSON data storage.
    """
    file_path = os.path.join(os.path.dirname(__file__), "data", "portfolio.json")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except Exception as e:
        logging.error(f"Error reading portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

class ChatRequest(BaseModel):
    message: str

@app.post("/api/ask-ai")
def ask_ai(request: ChatRequest):
    """
    Real AI Command Interface powered by Gemini.
    """
    try:
        if not gemini_api_key:
            return {
                "status": "error",
                "reply": "API Key is missing. Please configure GEMINI_API_KEY in the backend .env file."
            }
            
        # 1. Read portfolio
        portfolio_data = get_portfolio()
        
        # 2. Construct prompt
        prompt = f"""You are an expert macroeconomic analyst and financial advisor. 
Here is my current mutual fund and ETF portfolio data: 
{json.dumps(portfolio_data, ensure_ascii=False)}

The user asks: {request.message}

Provide a concise, strategic, and data-driven response."""

        # 3. Initialize and Call Gemini
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        return {
            "status": "success", 
            "reply": response.text
        }
    except Exception as e:
        logging.error(f"Error generating AI response: {str(e)}")
        return {
            "status": "error",
            "reply": f"AI Engine Error: {str(e)}"
        }

def get_market_snapshot():
    """Helper to fetch current snapshot for S&P500, VIX, and Gold."""
    symbols = {"S&P500": "^GSPC", "VIX": "^VIX", "Gold": "GC=F"}
    snapshot = {}
    for name, sym in symbols.items():
        try:
            ticker = yf.Ticker(sym)
            history = ticker.history(period="1d")
            if not history.empty:
                snapshot[name] = round(float(history['Close'].iloc[-1]), 2)
        except Exception as e:
            logging.error(f"Error fetching snapshot for {sym}: {str(e)}")
    return snapshot

@app.get("/api/ai-insights")
def ai_insights():
    """
    Automated Daily AI Insights combining Market Data and Portfolio.
    """
    try:
        if not gemini_api_key:
            return {
                "status": "error",
                "reply": "API Key is missing. Please configure GEMINI_API_KEY in the backend .env file."
            }
            
        portfolio_data = get_portfolio()
        market_data = get_market_snapshot()
        
        prompt = f"""You are an expert macroeconomic analyst and financial advisor. 
Here is the current market snapshot: 
{json.dumps(market_data, ensure_ascii=False)}

Here is my current mutual fund and ETF portfolio data: 
{json.dumps(portfolio_data, ensure_ascii=False)}

Based on the macroeconomic indicators and my portfolio, provide a brief risk assessment and 2-3 actionable portfolio adjustment suggestions. Keep it concise, strategic, and data-driven."""

        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        return {
            "status": "success", 
            "reply": response.text
        }
    except Exception as e:
        logging.error(f"Error generating AI insights: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

