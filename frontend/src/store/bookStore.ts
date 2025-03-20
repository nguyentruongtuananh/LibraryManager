import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Define interfaces (matching our backend schema)
export interface Book {
  id: number
  title: string
  author: string
  year: number
  genre: string
  description: string | null
}

export interface BookCreate {
  title: string
  author: string
  year: number
  genre: string
  description?: string | null
}

export interface BookUpdate {
  title?: string
  author?: string
  year?: number
  genre?: string
  description?: string | null
}

export const useBookStore = defineStore('book', () => {
  // State
  const books = ref<Book[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const sortBy = ref('title')
  const sortOrder = ref<'asc' | 'desc'>('asc')

  // Computed
  const filteredAndSortedBooks = computed(() => {
    let result = books.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        (book.description && book.description.toLowerCase().includes(query))
      )
    }

    // Sort books
    result = [...result].sort((a, b) => {
      let comparison = 0
      
      // Handle different sort fields
      if (sortBy.value === 'title') {
        comparison = a.title.localeCompare(b.title)
      } else if (sortBy.value === 'author') {
        comparison = a.author.localeCompare(b.author)
      } else if (sortBy.value === 'year') {
        comparison = a.year - b.year
      } else if (sortBy.value === 'genre') {
        comparison = a.genre.localeCompare(b.genre)
      }
      
      // Apply sort order
      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return result
  })

  // Actions
  async function fetchBooks() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/books')
      if (!response.ok) throw new Error('Failed to fetch books')
      books.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  async function getBook(id: number) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/books/${id}`)
      if (!response.ok) throw new Error('Failed to fetch book')
      return await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function createBook(book: BookCreate) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      
      if (!response.ok) throw new Error('Failed to create book')
      
      const newBook = await response.json()
      books.value.push(newBook)
      return newBook
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function updateBook(id: number, book: BookUpdate) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      
      if (!response.ok) throw new Error('Failed to update book')
      
      const updatedBook = await response.json()
      const index = books.value.findIndex(b => b.id === id)
      
      if (index !== -1) {
        books.value[index] = updatedBook
      }
      
      return updatedBook
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function deleteBook(id: number) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete book')
      
      // Remove book from local state
      books.value = books.value.filter(b => b.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Reset search and sort
  function resetFilters() {
    searchQuery.value = ''
    sortBy.value = 'title'
    sortOrder.value = 'asc'
  }

  return {
    books,
    isLoading,
    error,
    searchQuery,
    sortBy,
    sortOrder,
    filteredAndSortedBooks,
    fetchBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    resetFilters
  }
})