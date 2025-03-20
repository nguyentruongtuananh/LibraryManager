from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.api import api_router
from .core.config import API_V1_STR, PROJECT_NAME, ORIGINS
from .db.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=PROJECT_NAME,
    openapi_url=f"{API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=API_V1_STR)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Book Management API"}