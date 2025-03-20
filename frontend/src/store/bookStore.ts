import { defineStore } from 'pinia'
import { bookApi } from '@/api/bookApi'
import type { Book, BookCreate, BookUpdate } from '@/types/book'

// Define the book store
export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as Book[],
    loading: false,
    error: null as string | null,
    currentBook: null as Book | null,
    searchQuery: '',
    sortBy: 'title' as 'title' | 'author' | 'year',
    sortOrder: 'asc' as 'asc' | 'desc',
    selectedGenre: '' as string
  }),

  getters: {
    filteredBooks: (state) => {
      let result = [...state.books]
      
      // Filter by search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) ||
          (book.description && book.description.toLowerCase().includes(query))
        )
      }
      
      // Filter by genre
      if (state.selectedGenre) {
        result = result.filter(book => book.genre === state.selectedGenre)
      }
      
      // Sort the books
      result.sort((a, b) => {
        const valueA = a[state.sortBy]
        const valueB = b[state.sortBy]
        
        // Handle string comparisons
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          const strA = valueA.toLowerCase()
          const strB = valueB.toLowerCase()
          if (strA < strB) return state.sortOrder === 'asc' ? -1 : 1
          if (strA > strB) return state.sortOrder === 'asc' ? 1 : -1
          return 0
        }
        
        // Handle numeric comparisons
        if (valueA < valueB) return state.sortOrder === 'asc' ? -1 : 1
        if (valueA > valueB) return state.sortOrder === 'asc' ? 1 : -1
        return 0
      })
      
      return result
    },
    
    genres: (state) => {
      const genreSet = new Set<string>()
      state.books.forEach(book => genreSet.add(book.genre))
      return Array.from(genreSet).sort()
    }
  },

  actions: {
    async fetchBooks() {
      this.loading = true
      this.error = null
      try {
        const books = await bookApi.getBooks()
        this.books = books
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = 'Failed to fetch books'
      } finally {
        this.loading = false
      }
    },
    
    async getBook(id: number) {
      this.loading = true
      this.error = null
      try {
        const book = await bookApi.getBook(id)
        this.currentBook = book
        return book
      } catch (error) {
        console.error(`Error fetching book ${id}:`, error)
        this.error = 'Failed to fetch book'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async createBook(book: BookCreate) {
      this.loading = true
      this.error = null
      try {
        const newBook = await bookApi.createBook(book)
        this.books.push(newBook)
        return newBook
      } catch (error) {
        console.error('Error creating book:', error)
        this.error = 'Failed to create book'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async updateBook(id: number, book: BookUpdate) {
      this.loading = true
      this.error = null
      try {
        const updatedBook = await bookApi.updateBook(id, book)
        const index = this.books.findIndex(b => b.id === id)
        if (index !== -1) {
          this.books[index] = updatedBook
        }
        return updatedBook
      } catch (error) {
        console.error(`Error updating book ${id}:`, error)
        this.error = 'Failed to update book'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async deleteBook(id: number) {
      this.loading = true
      this.error = null
      try {
        await bookApi.deleteBook(id)
        this.books = this.books.filter(book => book.id !== id)
        return true
      } catch (error) {
        console.error(`Error deleting book ${id}:`, error)
        this.error = 'Failed to delete book'
        return false
      } finally {
        this.loading = false
      }
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    
    setSortBy(sortBy: 'title' | 'author' | 'year') {
      if (this.sortBy === sortBy) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortBy = sortBy
        this.sortOrder = 'asc'
      }
    },
    
    setSelectedGenre(genre: string) {
      this.selectedGenre = genre
    },
    
    resetFilters() {
      this.searchQuery = ''
      this.selectedGenre = ''
      this.sortBy = 'title'
      this.sortOrder = 'asc'
    }
  }
})