<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-primary text-white p-4 shadow-md">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold">Book Management</h1>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <router-link 
                to="/" 
                class="hover:text-primary-200 transition-colors"
                active-class="underline"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link 
                to="/books" 
                class="hover:text-primary-200 transition-colors"
                active-class="underline"
              >
                Books
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="flex-grow container mx-auto p-4">
      <router-view />
    </main>
    
    <footer class="bg-gray-100 dark:bg-gray-800 p-4 text-center text-gray-600 dark:text-gray-400">
      <div class="container mx-auto">
        <p>&copy; {{ new Date().getFullYear() }} Book Management App</p>
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