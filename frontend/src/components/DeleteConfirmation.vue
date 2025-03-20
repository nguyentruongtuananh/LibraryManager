<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div class="relative bg-card rounded-lg shadow-lg w-full max-w-md p-6 border" @click.stop>
      <h2 class="text-2xl font-bold mb-4">Delete Book</h2>
      
      <p class="text-card-foreground/70 mb-6">
        Are you sure you want to delete <span class="font-semibold">{{ book?.title }}</span>? This action cannot be undone.
      </p>
      
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="close"
          class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="confirm"
          :disabled="isDeleting"
          class="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          <span v-if="isDeleting" class="mr-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Book } from '../store/bookStore'

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
    const isDeleting = ref(false)

    const close = () => {
      emit('close')
    }

    const confirm = async () => {
      isDeleting.value = true
      
      try {
        emit('confirm')
      } finally {
        isDeleting.value = false
      }
    }

    return {
      isDeleting,
      close,
      confirm
    }
  }
})
</script>