<template>
  <div class="max-w-md mx-auto text-center py-12">
    <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-6">Page Not Found</h2>
    <p class="text-card-foreground/70 mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
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