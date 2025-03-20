<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold">Book Collection</h1>
      <button 
        @click="openBookForm(null)" 
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
      >
        Add New Book
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="bg-card rounded-lg shadow-sm p-4 border mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="col-span-1 md:col-span-3">
          <label for="search" class="block text-sm font-medium text-card-foreground mb-1">Search Books</label>
          <input
            id="search"
            v-model="bookStore.searchQuery"
            type="text"
            placeholder="Search by title, author, genre..."
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label for="sortBy" class="block text-sm font-medium text-card-foreground mb-1">Sort By</label>
          <select
            id="sortBy"
            v-model="bookStore.sortBy"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
            <option value="genre">Genre</option>
          </select>
        </div>

        <div>
          <label for="sortOrder" class="block text-sm font-medium text-card-foreground mb-1">Sort Order</label>
          <select
            id="sortOrder"
            v-model="bookStore.sortOrder"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div class="flex items-end">
          <button
            @click="bookStore.resetFilters"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="bookStore.isLoading" class="text-center py-8">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
      <p class="mt-4 text-card-foreground/70">Loading books...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="bookStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p class="text-red-600">{{ bookStore.error }}</p>
      <button 
        @click="bookStore.fetchBooks" 
        class="mt-2 text-sm text-red-600 hover:underline"
      >
        Try again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="bookStore.filteredAndSortedBooks.length === 0" class="text-center py-8 bg-card rounded-lg shadow-sm border">
      <p class="text-card-foreground/70 mb-4">
        {{ bookStore.searchQuery ? 'No books found matching your search criteria.' : 'Your book collection is empty.' }}
      </p>
      <button 
        v-if="bookStore.searchQuery" 
        @click="bookStore.resetFilters" 
        class="text-primary hover:underline text-sm"
      >
        Clear search filters
      </button>
      <button 
        v-else 
        @click="openBookForm(null)" 
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
      >
        Add Your First Book
      </button>
    </div>

    <!-- Book List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div 
        v-for="book in bookStore.filteredAndSortedBooks" 
        :key="book.id" 
        class="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-5">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-semibold mb-1 line-clamp-2">{{ book.title }}</h3>
            <div class="flex space-x-2">
              <button @click="openBookForm(book)" class="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button @click="openDeleteConfirmation(book)" class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center mt-1 mb-2">
            <span class="text-sm text-card-foreground/70">By {{ book.author }}</span>
            <span class="mx-2 text-card-foreground/30">•</span>
            <span class="text-sm text-card-foreground/70">{{ book.year }}</span>
          </div>
          <div class="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium mb-3">
            {{ book.genre }}
          </div>
          <p v-if="book.description" class="text-sm text-card-foreground/70 line-clamp-3">
            {{ book.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Book Form Modal -->
    <BookForm
      v-if="showBookForm"
      :show="showBookForm"
      :book="selectedBook"
      @close="closeBookForm"
      @save="saveBook"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmation
      v-if="showDeleteConfirmation"
      :show="showDeleteConfirmation"
      :book="bookToDelete"
      @close="closeDeleteConfirmation"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useBookStore, type Book } from '../store/bookStore'
import BookForm from '../components/BookForm.vue'
import DeleteConfirmation from '../components/DeleteConfirmation.vue'

export default defineComponent({
  name: 'BooksView',
  components: {
    BookForm,
    DeleteConfirmation
  },
  setup() {
    const bookStore = useBookStore()
    const showBookForm = ref(false)
    const selectedBook = ref<Book | null>(null)
    const showDeleteConfirmation = ref(false)
    const bookToDelete = ref<Book | null>(null)

    // Fetch books when component is mounted
    onMounted(() => {
      bookStore.fetchBooks()
    })

    // Book form handlers
    const openBookForm = (book: Book | null) => {
      selectedBook.value = book
      showBookForm.value = true
    }

    const closeBookForm = () => {
      showBookForm.value = false
      selectedBook.value = null
    }

    const saveBook = async (bookData: any) => {
      if (selectedBook.value) {
        // Update existing book
        await bookStore.updateBook(selectedBook.value.id, bookData)
      } else {
        // Create new book
        await bookStore.createBook(bookData)
      }
      closeBookForm()
    }

    // Delete confirmation handlers
    const openDeleteConfirmation = (book: Book) => {
      bookToDelete.value = book
      showDeleteConfirmation.value = true
    }

    const closeDeleteConfirmation = () => {
      showDeleteConfirmation.value = false
      bookToDelete.value = null
    }

    const confirmDelete = async () => {
      if (bookToDelete.value) {
        await bookStore.deleteBook(bookToDelete.value.id)
        closeDeleteConfirmation()
      }
    }

    return {
      bookStore,
      showBookForm,
      selectedBook,
      showDeleteConfirmation,
      bookToDelete,
      openBookForm,
      closeBookForm,
      saveBook,
      openDeleteConfirmation,
      closeDeleteConfirmation,
      confirmDelete
    }
  }
})
</script>