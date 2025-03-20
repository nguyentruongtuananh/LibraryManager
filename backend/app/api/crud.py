from sqlalchemy.orm import Session
from typing import List, Optional

from ..models.book import Book
from ..schemas.book import BookCreate, BookUpdate

def get_books(db: Session, skip: int = 0, limit: int = 100) -> List[Book]:
    return db.query(Book).offset(skip).limit(limit).all()

def get_book(db: Session, book_id: int) -> Optional[Book]:
    return db.query(Book).filter(Book.id == book_id).first()

def create_book(db: Session, book: BookCreate) -> Book:
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book(db: Session, book_id: int, book: BookUpdate) -> Optional[Book]:
    db_book = get_book(db, book_id)
    if db_book is None:
        return None
    
    update_data = book.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_book, key, value)
    
    db.commit()
    db.refresh(db_book)
    return db_book

def delete_book(db: Session, book_id: int) -> bool:
    db_book = get_book(db, book_id)
    if db_book is None:
        return False
    
    db.delete(db_book)
    db.commit()
    return True