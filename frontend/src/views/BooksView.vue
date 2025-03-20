<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold mb-4 md:mb-0">Books</h1>
      <div class="flex flex-col sm:flex-row gap-4">
        <button 
          @click="showAddModal = true" 
          class="btn btn-primary px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </span>
          Add Book
        </button>
        
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search books..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            v-if="searchQuery"
            @click="resetSearch"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="mb-6 flex flex-wrap gap-2">
      <button 
        @click="bookStore.setSelectedGenre('')" 
        class="px-3 py-1 rounded-full text-sm"
        :class="bookStore.selectedGenre === '' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        All
      </button>
      <button 
        v-for="genre in bookStore.genres" 
        :key="genre" 
        @click="bookStore.setSelectedGenre(genre)"
        class="px-3 py-1 rounded-full text-sm"
        :class="bookStore.selectedGenre === genre ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        {{ genre }}
      </button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <h2 class="text-lg font-medium">Book List</h2>

        <div class="flex space-x-1 text-sm">
          <button 
            @click="bookStore.setSortBy('title')" 
            class="px-3 py-1 rounded" 
            :class="bookStore.sortBy === 'title' ? 'bg-gray-200 dark:bg-gray-700' : ''"
          >
            Title
            <span v-if="bookStore.sortBy === 'title'">
              {{ bookStore.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
          <button 
            @click="bookStore.setSortBy('author')" 
            class="px-3 py-1 rounded" 
            :class="bookStore.sortBy === 'author' ? 'bg-gray-200 dark:bg-gray-700' : ''"
          >
            Author
            <span v-if="bookStore.sortBy === 'author'">
              {{ bookStore.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
          <button 
            @click="bookStore.setSortBy('year')" 
            class="px-3 py-1 rounded" 
            :class="bookStore.sortBy === 'year' ? 'bg-gray-200 dark:bg-gray-700' : ''"
          >
            Year
            <span v-if="bookStore.sortBy === 'year'">
              {{ bookStore.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
        </div>
      </div>

      <div v-if="bookStore.loading" class="flex justify-center items-center p-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <div v-else-if="bookStore.error" class="p-6 text-center text-red-500">
        {{ bookStore.error }}
        <button @click="bookStore.fetchBooks()" class="btn btn-primary mt-4">
          Try Again
        </button>
      </div>

      <div v-else-if="filteredBooks.length === 0" class="p-12 text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p class="text-lg">No books found.</p>
        <p v-if="bookStore.searchQuery || bookStore.selectedGenre" class="mt-2">
          Try adjusting your search or filter criteria.
          <button @click="bookStore.resetFilters()" class="text-primary hover:underline">
            Reset all filters
          </button>
        </p>
      </div>

      <div v-else class="divide-y dark:divide-gray-700">
        <div 
          v-for="book in filteredBooks" 
          :key="book.id" 
          class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex flex-col md:flex-row gap-4"
        >
          <div class="flex-grow">
            <h3 class="text-lg font-medium">{{ book.title }}</h3>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              by {{ book.author }} · {{ book.year }}
            </div>
            <div class="mt-1">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                {{ book.genre }}
              </span>
            </div>
            <p v-if="book.description" class="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {{ book.description }}
            </p>
          </div>
          <div class="flex space-x-2 md:self-center">
            <button 
              @click="handleEditBook(book)" 
              class="btn btn-outline p-2 rounded-lg"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              @click="handleDeleteBook(book)" 
              class="btn btn-outline p-2 rounded-lg text-red-500 hover:text-red-700"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Book Form Modal -->
    <BookForm 
      v-if="showAddModal" 
      :show="showAddModal" 
      :book="selectedBook" 
      @close="closeModal"
      @save="saveBook"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmation 
      v-if="showDeleteModal" 
      :show="showDeleteModal" 
      :book="selectedBook" 
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useBookStore, Book } from '@/store/bookStore'
import BookForm from '@/components/BookForm.vue'
import DeleteConfirmation from '@/components/DeleteConfirmation.vue'

export default defineComponent({
  name: 'BooksView',
  components: {
    BookForm,
    DeleteConfirmation
  },
  setup() {
    const bookStore = useBookStore()
    const showAddModal = ref(false)
    const showDeleteModal = ref(false)
    const selectedBook = ref<Book | null>(null)
    const searchQuery = ref('')

    // Sync the search query with the store
    watch(searchQuery, (value) => {
      bookStore.setSearchQuery(value)
    })

    // Fetch books when component is mounted
    onMounted(() => {
      bookStore.fetchBooks()
    })

    // Computed property for filtered books
    const filteredBooks = computed(() => {
      return bookStore.filteredBooks
    })

    // Method to handle editing a book
    const handleEditBook = (book: Book) => {
      selectedBook.value = book
      showAddModal.value = true
    }

    // Method to handle deleting a book
    const handleDeleteBook = (book: Book) => {
      selectedBook.value = book
      showDeleteModal.value = true
    }

    // Method to save a book (create or update)
    const saveBook = async (bookData: any) => {
      if (selectedBook.value) {
        // Update existing book
        await bookStore.updateBook(selectedBook.value.id, bookData)
      } else {
        // Create new book
        await bookStore.createBook(bookData)
      }
      closeModal()
    }

    // Method to confirm deletion of a book
    const confirmDelete = async () => {
      if (selectedBook.value) {
        await bookStore.deleteBook(selectedBook.value.id)
        showDeleteModal.value = false
      }
    }

    // Method to close the modal and reset selected book
    const closeModal = () => {
      showAddModal.value = false
      selectedBook.value = null
    }

    // Method to reset search
    const resetSearch = () => {
      searchQuery.value = ''
    }

    return {
      bookStore,
      showAddModal,
      showDeleteModal,
      selectedBook,
      searchQuery,
      filteredBooks,
      handleEditBook,
      handleDeleteBook,
      saveBook,
      confirmDelete,
      closeModal,
      resetSearch
    }
  }
})
</script>