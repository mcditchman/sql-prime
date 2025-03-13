<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import Message from 'primevue/message'

const authStore = useAuthStore()
const router = useRouter()

const isSignUp = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')
const error = ref('')

// Use the loading state from the auth store
const loading = computed(() => authStore.loading)
// Use the error state from the auth store, but allow local overrides
const displayError = computed(() => error.value || authStore.error)

const toggleForm = () => {
  isSignUp.value = !isSignUp.value
  error.value = ''
}

const handleSubmit = async () => {
  if (!email.value || !password.value || (isSignUp.value && !name.value)) {
    error.value = 'Please fill in all fields'
    return
  }

  error.value = ''
  let success = false

  if (isSignUp.value) {
    success = await authStore.signUp({
      name: name.value,
      email: email.value,
      password: password.value
    })
  } else {
    success = await authStore.signIn({
      email: email.value,
      password: password.value
    })
  }

  if (success) {
    router.push('/dashboard')
  }
}

const handleGoogleSignIn = async () => {
  error.value = ''
  const success = await authStore.signInWithGoogle()
  
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen p-3">
    <Card class="w-full max-w-30rem">
      <template #title>
        <h1 class="text-center text-3xl m-0 mb-4">{{ isSignUp ? 'Create Account' : 'Sign In' }}</h1>
      </template>
      
      <template #content>
        <form @submit.prevent="handleSubmit" class="flex flex-column gap-3">
          <div v-if="isSignUp" class="flex flex-column gap-2">
            <label for="name" class="font-medium">Name</label>
            <InputText
              id="name"
              v-model="name"
              placeholder="Your name"
              autocomplete="name"
            />
          </div>
          
          <div class="flex flex-column gap-2">
            <label for="email" class="font-medium">Email</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="Your email"
              autocomplete="email"
            />
          </div>
          
          <div class="flex flex-column gap-2">
            <label for="password" class="font-medium">Password</label>
            <Password
              id="password"
              v-model="password"
              placeholder="Your password"
              autocomplete="current-password"
              :feedback="false"
              toggleMask
            />
          </div>
          
          <Message v-if="displayError" severity="error" :closable="false">{{ displayError }}</Message>
          
          <Button
            type="submit"
            :label="isSignUp ? 'Create Account' : 'Sign In'"
            :loading="loading"
            class="mt-2"
          />
        </form>
        
        <Divider align="center">
          <span class="text-sm">OR</span>
        </Divider>
        
        <Button
          @click="handleGoogleSignIn"
          outlined
          class="w-full p-button-secondary"
          :loading="loading"
        >
          <i class="pi pi-google mr-2"></i>
          <span>Continue with Google</span>
        </Button>
        
        <div class="flex align-items-center justify-content-center mt-4 text-sm">
          <span>{{ isSignUp ? 'Already have an account?' : 'Need an account?' }}</span>
          <Button
            @click="toggleForm"
            link
            class="ml-2 p-0"
          >
            {{ isSignUp ? 'Sign In' : 'Sign Up' }}
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
/* PrimeVue utility classes */
.flex { display: flex; }
.flex-column { flex-direction: column; }
.align-items-center { align-items: center; }
.justify-content-center { justify-content: center; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 1rem; }
.w-full { width: 100%; }
.min-h-screen { min-height: 100vh; }
.p-3 { padding: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1.5rem; }
.ml-2 { margin-left: 0.5rem; }
.mr-2 { margin-right: 0.5rem; }
.m-0 { margin: 0; }
.mb-4 { margin-bottom: 1.5rem; }
.text-center { text-align: center; }
.text-sm { font-size: 0.875rem; }
.text-3xl { font-size: 1.75rem; }
.font-medium { font-weight: 500; }
.max-w-30rem { max-width: 30rem; }
</style>