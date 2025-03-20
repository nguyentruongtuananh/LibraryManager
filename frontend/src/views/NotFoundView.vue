<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] text-center">
    <h1 class="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
    <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <router-link to="/" class="btn btn-primary px-6 py-2 rounded-lg">
      Go Home
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView'
})
</script>