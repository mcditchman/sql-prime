<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <nav class="bg-white dark:bg-gray-900 shadow-md mb-4 px-4 py-2">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold text-blue-600 dark:text-blue-400">
          SQL Prime Engine
        </div>
        <div class="flex items-center gap-3">
          <span v-if="authStore.user" class="text-gray-700 dark:text-gray-300">{{ authStore.user.name }}</span>
          <button
            @click="handleLogout"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
    
    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h1 class="text-blue-600 dark:text-blue-400 text-3xl font-bold mb-4">Welcome to SQL Prime Engine</h1>
        <p class="text-gray-700 dark:text-gray-300">Your dashboard is ready. This is a placeholder for the actual dashboard content.</p>
      </div>
    </div>
  </div>
</template>
