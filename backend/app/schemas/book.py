from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    author: str = Field(..., min_length=1, max_length=255)
    year: int = Field(..., ge=1, le=datetime.now().year)
    genre: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    author: Optional[str] = Field(None, min_length=1, max_length=255)
    year: Optional[int] = Field(None, ge=1, le=datetime.now().year)
    genre: Optional[str] = Field(None, min_length=1, max_length=100)

class Book(BookBase):
    id: int

    class Config:
        orm_mode = True