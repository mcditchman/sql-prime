<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Menubar from 'primevue/menubar'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const menubarItems = [
  {
    label: 'SQL Prime Engine',
    class: 'text-xl font-bold text-primary'
  }
]
</script>

<template>
  <div class="flex flex-column h-screen">
    <Menubar :model="menubarItems" :pt="{ root: { class: 'border-noround mb-3' } }">
      <template #end>
        <div class="flex align-items-center gap-3">
          <span v-if="authStore.user">{{ authStore.user.name }}</span>
          <Button label="Logout" icon="pi pi-sign-out" text severity="info" @click="handleLogout" />
        </div>
      </template>
    </Menubar>
    
    <div class="flex-1 p-4">
      <Card class="max-w-6 m-auto">
        <template #title>
          <h1 class="text-primary text-3xl m-0 mb-3">Welcome to SQL Prime Engine</h1>
        </template>
        <template #content>
          <p>Your dashboard is ready. This is a placeholder for the actual dashboard content.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* PrimeVue will handle most styling, we just need minimal custom styles */
:deep(.p-menubar) {
  background-color: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
}

:deep(.p-card) {
  background-color: var(--surface-card);
  box-shadow: var(--card-shadow);
}

.text-primary {
  color: var(--primary-color);
}

.text-3xl {
  font-size: 1.75rem;
}

.max-w-6 {
  max-width: 800px;
}

.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.flex-column {
  flex-direction: column;
}

.align-items-center {
  align-items: center;
}

.gap-3 {
  gap: 1rem;
}

.p-4 {
  padding: 1.5rem;
}

.m-auto {
  margin: 0 auto;
}

.m-0 {
  margin: 0;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
