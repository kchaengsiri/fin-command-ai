from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI application
app = FastAPI(title="Financial Command Center API", version="1.0.0")

# Configure CORS to allow requests from the Vite React frontend
# Note: In a production environment, restrict allow_origins to your specific domain
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
    return {"status": "ok", "message": "Financial Command Center API is running."}
