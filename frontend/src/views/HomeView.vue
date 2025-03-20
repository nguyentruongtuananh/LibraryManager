<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-card rounded-lg shadow-md p-8 text-center mb-8">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-700 text-transparent bg-clip-text">Welcome to Book Management System</h1>
      <p class="text-lg text-card-foreground/80 mb-6">
        A full-stack application for managing your book collection
      </p>
      <router-link to="/books" class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
        View Books
      </router-link>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-card rounded-lg shadow-sm p-6 border">
        <h3 class="text-xl font-semibold mb-2">Create</h3>
        <p class="text-card-foreground/70 mb-4">Add new books to your collection with detailed information.</p>
      </div>
      <div class="bg-card rounded-lg shadow-sm p-6 border">
        <h3 class="text-xl font-semibold mb-2">Manage</h3>
        <p class="text-card-foreground/70 mb-4">Edit, update or remove books from your library easily.</p>
      </div>
      <div class="bg-card rounded-lg shadow-sm p-6 border">
        <h3 class="text-xl font-semibold mb-2">Search</h3>
        <p class="text-card-foreground/70 mb-4">Find books by title, author, genre, or publication year.</p>
      </div>
    </div>
    
    <div class="bg-card rounded-lg shadow-sm p-6 border">
      <h2 class="text-2xl font-semibold mb-4">About This Application</h2>
      <p class="text-card-foreground/80 mb-3">
        This Book Management System was built using:
      </p>
      <ul class="list-disc list-inside space-y-1 text-card-foreground/70 mb-4">
        <li>Vue.js with TypeScript and Composition API</li>
        <li>FastAPI backend with SQLAlchemy</li>
        <li>PostgreSQL database for data persistence</li>
        <li>Tailwind CSS for modern, responsive styling</li>
      </ul>
      <p class="text-card-foreground/80">
        Navigate to the Books page to start managing your collection!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>