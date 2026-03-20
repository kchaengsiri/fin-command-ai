from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import logging
import os
import json

# Initialize the FastAPI application
app = FastAPI(title="Fin Command AI API", version="1.0.0")

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
