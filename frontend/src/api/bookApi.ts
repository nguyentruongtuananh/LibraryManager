import axios from 'axios';
import type { Book, BookCreate, BookUpdate } from '@/types/book';

// API base URL - will be proxied to our backend
const API_URL = '/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const bookApi = {
  // Get all books
  async getBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books');
    return response.data;
  },

  // Get a single book by ID
  async getBook(id: number): Promise<Book> {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  // Create a new book
  async createBook(book: BookCreate): Promise<Book> {
    const response = await apiClient.post('/books', book);
    return response.data;
  },

  // Update an existing book
  async updateBook(id: number, book: BookUpdate): Promise<Book> {
    const response = await apiClient.put(`/books/${id}`, book);
    return response.data;
  },

  // Delete a book
  async deleteBook(id: number): Promise<void> {
    await apiClient.delete(`/books/${id}`);
  }
};