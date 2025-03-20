<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div class="relative bg-card rounded-lg shadow-lg w-full max-w-md p-6 border" @click.stop>
      <button 
        @click="close" 
        class="absolute top-4 right-4 text-card-foreground/70 hover:text-card-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <h2 class="text-2xl font-bold mb-6">{{ book ? 'Edit Book' : 'Add New Book' }}</h2>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Title field -->
        <div>
          <label for="title" class="block text-sm font-medium text-card-foreground mb-1">Title *</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            :class="{ 'border-red-500': errors.title }"
          />
          <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
        </div>
        
        <!-- Author field -->
        <div>
          <label for="author" class="block text-sm font-medium text-card-foreground mb-1">Author *</label>
          <input
            id="author"
            v-model="formData.author"
            type="text"
            required
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            :class="{ 'border-red-500': errors.author }"
          />
          <p v-if="errors.author" class="text-red-500 text-xs mt-1">{{ errors.author }}</p>
        </div>
        
        <!-- Year field -->
        <div>
          <label for="year" class="block text-sm font-medium text-card-foreground mb-1">Year *</label>
          <input
            id="year"
            v-model.number="formData.year"
            type="number"
            required
            :max="new Date().getFullYear()"
            min="1"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            :class="{ 'border-red-500': errors.year }"
          />
          <p v-if="errors.year" class="text-red-500 text-xs mt-1">{{ errors.year }}</p>
        </div>
        
        <!-- Genre field -->
        <div>
          <label for="genre" class="block text-sm font-medium text-card-foreground mb-1">Genre *</label>
          <input
            id="genre"
            v-model="formData.genre"
            type="text"
            required
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            :class="{ 'border-red-500': errors.genre }"
          />
          <p v-if="errors.genre" class="text-red-500 text-xs mt-1">{{ errors.genre }}</p>
        </div>
        
        <!-- Description field -->
        <div>
          <label for="description" class="block text-sm font-medium text-card-foreground mb-1">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            :class="{ 'border-red-500': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="close"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <span v-if="isSubmitting" class="mr-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ book ? 'Update Book' : 'Add Book' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, onMounted } from 'vue'
import { Book } from '../store/bookStore'

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
    const isSubmitting = ref(false)
    const formData = reactive({
      title: '',
      author: '',
      year: new Date().getFullYear(),
      genre: '',
      description: ''
    })
    const errors = reactive({
      title: '',
      author: '',
      year: '',
      genre: '',
      description: ''
    })

    // Initialize form data when component is mounted or when book prop changes
    onMounted(() => {
      if (props.book) {
        formData.title = props.book.title
        formData.author = props.book.author
        formData.year = props.book.year
        formData.genre = props.book.genre
        formData.description = props.book.description || ''
      }
    })

    const validateForm = (): boolean => {
      let isValid = true
      
      // Reset errors
      errors.title = ''
      errors.author = ''
      errors.year = ''
      errors.genre = ''
      errors.description = ''
      
      // Validate title
      if (!formData.title.trim()) {
        errors.title = 'Title is required'
        isValid = false
      } else if (formData.title.length > 255) {
        errors.title = 'Title must be less than 255 characters'
        isValid = false
      }
      
      // Validate author
      if (!formData.author.trim()) {
        errors.author = 'Author is required'
        isValid = false
      } else if (formData.author.length > 255) {
        errors.author = 'Author must be less than 255 characters'
        isValid = false
      }
      
      // Validate year
      const currentYear = new Date().getFullYear()
      if (!formData.year) {
        errors.year = 'Year is required'
        isValid = false
      } else if (formData.year < 1 || formData.year > currentYear) {
        errors.year = `Year must be between 1 and ${currentYear}`
        isValid = false
      }
      
      // Validate genre
      if (!formData.genre.trim()) {
        errors.genre = 'Genre is required'
        isValid = false
      } else if (formData.genre.length > 100) {
        errors.genre = 'Genre must be less than 100 characters'
        isValid = false
      }
      
      return isValid
    }

    const submitForm = async () => {
      if (!validateForm()) {
        return
      }
      
      isSubmitting.value = true
      
      try {
        const bookData = {
          title: formData.title.trim(),
          author: formData.author.trim(),
          year: formData.year,
          genre: formData.genre.trim(),
          description: formData.description.trim() || null
        }
        
        emit('save', bookData)
      } finally {
        isSubmitting.value = false
      }
    }

    const close = () => {
      emit('close')
    }

    return {
      formData,
      errors,
      isSubmitting,
      submitForm,
      close
    }
  }
})
</script>