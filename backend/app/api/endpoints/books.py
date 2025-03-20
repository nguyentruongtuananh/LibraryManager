from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.api import crud
from app.schemas.book import Book, BookCreate, BookUpdate

router = APIRouter()


@router.get("/", response_model=List[Book])
def read_books(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all books"""
    books = crud.get_books(db, skip=skip, limit=limit)
    return books


@router.get("/{book_id}", response_model=Book)
def read_book(book_id: int, db: Session = Depends(get_db)):
    """Get a specific book by ID"""
    db_book = crud.get_book(db, book_id=book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@router.post("/", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_new_book(book: BookCreate, db: Session = Depends(get_db)):
    """Create a new book"""
    return crud.create_book(db=db, book=book)


@router.put("/{book_id}", response_model=Book)
def update_existing_book(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    """Update an existing book"""
    db_book = crud.update_book(db=db, book_id=book_id, book=book)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_book(book_id: int, db: Session = Depends(get_db)):
    """Delete a book"""
    success = crud.delete_book(db=db, book_id=book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return None