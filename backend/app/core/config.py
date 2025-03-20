import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

class Settings:
    PROJECT_NAME: str = "Book Management API"
    PROJECT_VERSION: str = "1.0.0"
    
    POSTGRES_USER: str = os.getenv("PGUSER")
    POSTGRES_PASSWORD: str = os.getenv("PGPASSWORD")
    POSTGRES_SERVER: str = os.getenv("PGHOST", "localhost")
    POSTGRES_PORT: str = os.getenv("PGPORT", "5432")
    POSTGRES_DB: str = os.getenv("PGDATABASE")
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    )
    
    API_PREFIX: str = "/api"
    
    # CORS settings
    BACKEND_CORS_ORIGINS: list = ["*"]

settings = Settings()