<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const authStore = useAuthStore()
const uiStore = useUIStore()
const router = useRouter()

// Computed property to determine the current theme icon
const themeIcon = computed(() => {
  if (uiStore.theme === 'system') {
    return uiStore.isDarkMode ? 'moon' : 'sun'
  }
  return uiStore.theme === 'dark' ? 'moon' : 'sun'
})

// Function to cycle through themes (light -> dark -> system)
const cycleTheme = () => {
  if (uiStore.theme === 'light') {
    uiStore.setTheme('dark')
  } else if (uiStore.theme === 'dark') {
    uiStore.setTheme('system')
  } else {
    uiStore.setTheme('light')
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <nav class="p-menubar shadow-md mb-4 px-4 py-2">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold text-info dark:text-info">
          SQL Prime Engine
        </div>
        <div class="flex items-center gap-4">
          <div v-if="authStore.user" class="flex items-center">
            <span class="text-text-primary dark:text-text-inverse">{{ authStore.user.name }}</span>
            <span v-if="authStore.isAdmin" class="ml-2 px-2 py-1 text-xs bg-success text-text-inverse rounded-full">Admin</span>
          </div>
          
          <!-- Dark Mode Toggle Button -->
          <button
            @click="cycleTheme"
            class="p-button p-button-text p-button-rounded p-button-icon-only"
            :title="`Current theme: ${uiStore.theme}`"
          >
            <!-- Sun icon for light mode -->
            <svg v-if="themeIcon === 'sun'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            
            <!-- Moon icon for dark mode -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          
          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="p-button p-button-text p-button-danger flex items-center"
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
      <div class="p-card max-w-3xl mx-auto">
        <h1 class="p-card-title text-info dark:text-info text-3xl font-semibold mb-4">
          Welcome to SQL Prime Engine<span v-if="authStore.isAdmin">, Admin</span>
        </h1>
        
        <div v-if="authStore.isAdmin" class="mb-4 p-4 bg-success bg-opacity-10 border-l-4 border-success rounded-md">
          <h2 class="text-xl font-semibold text-success mb-2">Admin Dashboard</h2>
          <p class="text-text-primary dark:text-text-inverse">
            You are logged in as an administrator. You have access to all features of the SQL Prime Engine.
          </p>
        </div>
        
        <p class="text-text-primary dark:text-text-inverse mb-6">
          Your dashboard is ready. Here you can manage your SQL queries, view execution plans, and optimize your database performance.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-card">
            <h3 class="p-card-title text-lg font-semibold mb-2">Recent Queries</h3>
            <p class="text-text-secondary">No recent queries found.</p>
            <div class="mt-4">
              <button class="p-button p-button-primary">
                <span>New Query</span>
              </button>
            </div>
          </div>
          
          <div class="p-card">
            <h3 class="p-card-title text-lg font-semibold mb-2">Performance Metrics</h3>
            <p class="text-text-secondary">No metrics available yet.</p>
            <div class="mt-4">
              <button class="p-button p-button-secondary">
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-text-secondary text-sm">
            Current theme: <span class="font-semibold">{{ uiStore.theme }}</span> |
            Dark mode: <span class="font-semibold">{{ uiStore.isDarkMode ? 'Enabled' : 'Disabled' }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
