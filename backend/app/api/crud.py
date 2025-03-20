from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.book import Book
from app.schemas.book import BookCreate, BookUpdate


def get_books(db: Session, skip: int = 0, limit: int = 100) -> List[Book]:
    """Get all books with pagination"""
    return db.query(Book).offset(skip).limit(limit).all()


def get_book(db: Session, book_id: int) -> Optional[Book]:
    """Get a book by ID"""
    return db.query(Book).filter(Book.id == book_id).first()


def create_book(db: Session, book: BookCreate) -> Book:
    """Create a new book"""
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def update_book(db: Session, book_id: int, book: BookUpdate) -> Optional[Book]:
    """Update an existing book"""
    db_book = get_book(db, book_id)
    if db_book:
        update_data = book.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
    return db_book


def delete_book(db: Session, book_id: int) -> bool:
    """Delete a book"""
    db_book = get_book(db, book_id)
    if db_book:
        db.delete(db_book)
        db.commit()
        return True
    return False