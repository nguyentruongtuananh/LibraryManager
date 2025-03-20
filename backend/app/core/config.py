import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file
load_dotenv()

# Project base directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# API settings
API_V1_STR = "/api/v1"
PROJECT_NAME = "Book Management System"

# Database settings
DATABASE_URL = os.environ.get("DATABASE_URL")

# CORS settings
ORIGINS = [
    "http://localhost",
    "http://localhost:5173",  # Vue.js default development server
    "http://localhost:5000",  # Our API server
    "*",  # For development purposes
]