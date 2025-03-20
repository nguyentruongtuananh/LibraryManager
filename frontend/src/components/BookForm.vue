<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-medium">{{ isEditing ? 'Edit Book' : 'Add New Book' }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="submitForm" class="p-4">
        <div class="space-y-4">
          <!-- Title field -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title*
            </label>
            <input 
              id="title" 
              v-model="form.title"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
          </div>
          
          <!-- Author field -->
          <div>
            <label for="author" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Author*
            </label>
            <input 
              id="author" 
              v-model="form.author"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p v-if="errors.author" class="mt-1 text-sm text-red-500">{{ errors.author }}</p>
          </div>
          
          <!-- Year field -->
          <div>
            <label for="year" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Year*
            </label>
            <input 
              id="year" 
              v-model.number="form.year"
              type="number" 
              min="1"
              :max="currentYear"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p v-if="errors.year" class="mt-1 text-sm text-red-500">{{ errors.year }}</p>
          </div>
          
          <!-- Genre field -->
          <div>
            <label for="genre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Genre*
            </label>
            <input 
              id="genre" 
              v-model="form.genre"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p v-if="errors.genre" class="mt-1 text-sm text-red-500">{{ errors.genre }}</p>
          </div>
          
          <!-- Description field -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea 
              id="description" 
              v-model="form.description"
              rows="4" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :disabled="loading"
          >
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType } from 'vue'
import type { Book } from '@/store/bookStore'

export default defineComponent({
  name: 'BookForm',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    book: {
      type: Object as PropType<Book | null>,
      default: null
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const currentYear = new Date().getFullYear()
    const loading = ref(false)
    const errors = ref<Record<string, string>>({})
    
    // Initialize the form with default values
    const form = ref({
      title: '',
      author: '',
      year: currentYear,
      genre: '',
      description: ''
    })
    
    // Computed property to determine if we're editing or adding
    const isEditing = computed(() => props.book !== null)
    
    // Watch for changes in the book prop to update the form
    watch(() => props.book, (newBook) => {
      if (newBook) {
        form.value = {
          title: newBook.title,
          author: newBook.author,
          year: newBook.year,
          genre: newBook.genre,
          description: newBook.description || ''
        }
      } else {
        // Reset form when not editing
        form.value = {
          title: '',
          author: '',
          year: currentYear,
          genre: '',
          description: ''
        }
      }
    }, { immediate: true })
    
    // Validates the form fields
    const validateForm = () => {
      const newErrors: Record<string, string> = {}
      
      if (!form.value.title.trim()) {
        newErrors.title = 'Title is required'
      }
      
      if (!form.value.author.trim()) {
        newErrors.author = 'Author is required'
      }
      
      if (!form.value.year) {
        newErrors.year = 'Year is required'
      } else if (form.value.year < 1 || form.value.year > currentYear) {
        newErrors.year = `Year must be between 1 and ${currentYear}`
      }
      
      if (!form.value.genre.trim()) {
        newErrors.genre = 'Genre is required'
      }
      
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }
    
    // Handle form submission
    const submitForm = async () => {
      if (!validateForm()) {
        return
      }
      
      loading.value = true
      
      try {
        const bookData = {
          title: form.value.title.trim(),
          author: form.value.author.trim(),
          year: form.value.year,
          genre: form.value.genre.trim(),
          description: form.value.description.trim() || null
        }
        
        emit('save', bookData)
      } catch (error) {
        console.error('Error submitting book:', error)
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      errors,
      loading,
      isEditing,
      currentYear,
      submitForm
    }
  }
})
</script>