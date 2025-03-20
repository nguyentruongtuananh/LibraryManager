import { books, type Book, type InsertBook, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book | undefined>;
  deleteBook(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private userCurrentId: number;
  private bookCurrentId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.userCurrentId = 1;
    this.bookCurrentId = 1;
    
    // Add some initial books for testing
    this.seedBooks();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }
  
  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }
  
  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.bookCurrentId++;
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }
  
  async updateBook(id: number, bookUpdate: Partial<InsertBook>): Promise<Book | undefined> {
    const existingBook = this.books.get(id);
    if (!existingBook) {
      return undefined;
    }
    
    const updatedBook = { ...existingBook, ...bookUpdate };
    this.books.set(id, updatedBook);
    return updatedBook;
  }
  
  async deleteBook(id: number): Promise<boolean> {
    return this.books.delete(id);
  }
  
  private seedBooks() {
    const sampleBooks: InsertBook[] = [
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Fiction",
        description: "A lawyer in the Depression-era South defends a black man charged with the rape of a white woman."
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        year: 1997,
        genre: "Fantasy",
        description: "A young wizard discovers his magical heritage and begins his journey at Hogwarts School of Witchcraft and Wizardry."
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance",
        description: "The romantic relationship between Elizabeth Bennet and Mr. Darcy develops amid the social conventions of 19th-century England."
      },
      {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        year: 1988,
        genre: "Science",
        description: "Hawking attempts to explain complex cosmological theories to the general reader, from the Big Bang to black holes."
      }
    ];
    
    sampleBooks.forEach(book => {
      this.createBook(book);
    });
  }
}

export const storage = new MemStorage();
