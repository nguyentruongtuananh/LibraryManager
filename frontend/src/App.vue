<template>
  <div class="min-h-screen bg-background">
    <header class="sticky top-0 z-40 bg-card border-b shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-primary">Book Management System</h1>
        <nav>
          <ul class="flex space-x-4">
            <li><router-link to="/" class="text-foreground hover:text-primary">Home</router-link></li>
            <li><router-link to="/books" class="text-foreground hover:text-primary">Books</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>
    <footer class="bg-card border-t py-6">
      <div class="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} Book Management System. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>