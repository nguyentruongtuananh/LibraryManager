<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="ml-2 text-xl font-bold">BookManager</span>
            </router-link>
            <nav class="ml-10 flex items-center space-x-4">
              <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium" :class="[isActive('/') ? 'bg-primary-50 text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary']">
                Home
              </router-link>
              <router-link to="/books" class="px-3 py-2 rounded-md text-sm font-medium" :class="[isActive('/books') ? 'bg-primary-50 text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary']">
                Books
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>

    <footer class="bg-white dark:bg-gray-800 shadow mt-auto">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} Book Management System. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()

    const isActive = (path: string) => {
      if (path === '/') {
        return route.path === '/'
      }
      return route.path.startsWith(path)
    }

    return {
      isActive
    }
  }
})
</script>

<style>
@import './styles/main.css';
</style>