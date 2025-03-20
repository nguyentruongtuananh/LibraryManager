import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    # Use FASTAPI_PORT environment variable or default to 8000
    port = int(os.getenv("FASTAPI_PORT", "8000"))
    
    # Run the FastAPI application with uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info",
    )