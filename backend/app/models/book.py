from sqlalchemy import Column, Integer, String, Text

from app.db.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    author = Column(String(255), nullable=False, index=True)
    year = Column(Integer, nullable=False)
    genre = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)