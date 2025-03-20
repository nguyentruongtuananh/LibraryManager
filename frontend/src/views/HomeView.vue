<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Book Management System
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        A simple and elegant way to manage your book collection
      </p>
      <div class="flex justify-center space-x-4">
        <router-link to="/books" class="btn btn-primary px-6 py-3 rounded-lg">
          Browse Books
        </router-link>
      </div>
    </div>

    <div class="mt-16 max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Add New Books</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Easily add new books to your collection with all the important details.
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Search and Filter</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Find books quickly with powerful search and filtering capabilities.
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Organize Collection</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Keep your book collection organized by genre, author, or year.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>