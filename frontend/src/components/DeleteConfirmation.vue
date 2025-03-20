<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-medium">Delete Book</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="flex items-center mb-5 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="text-lg">Confirm Deletion</span>
        </div>
        
        <p class="mb-4">
          Are you sure you want to delete <strong>{{ book?.title }}</strong>? This action cannot be undone.
        </p>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="button"
            @click="confirmDelete" 
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            :disabled="loading"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import type { Book } from '@/store/bookStore'

export default defineComponent({
  name: 'DeleteConfirmation',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    book: {
      type: Object as PropType<Book | null>,
      required: true
    }
  },
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const loading = ref(false)
    
    const confirmDelete = async () => {
      loading.value = true
      
      try {
        emit('confirm')
      } catch (error) {
        console.error('Error deleting book:', error)
      } finally {
        loading.value = false
      }
    }
    
    return {
      loading,
      confirmDelete
    }
  }
})
</script>