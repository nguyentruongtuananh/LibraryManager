from fastapi import APIRouter

from app.api.endpoints import books

api_router = APIRouter()
api_router.include_router(books.router, prefix="/books", tags=["books"])