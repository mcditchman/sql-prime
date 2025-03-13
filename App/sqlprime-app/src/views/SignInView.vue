<template>
  <div class="bg-secondary-light dark:bg-primary-dark h-screen flex items-center justify-center">
    <div class="bg-white dark:bg-primary-main p-6 rounded-lg shadow-md w-full max-w-md">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-semibold text-text-primary dark:text-text-inverse mb-2">SQLPrime</h1>
        <p class="text-text-secondary dark:text-secondary-light font-medium">Sign in to continue</p>
      </div>

      <div>
        <!-- Toast messages will be handled differently -->
        <div v-if="errorMessage" class="mb-4 p-4 bg-error bg-opacity-10 border-l-4 border-error text-error">
          <p>{{ errorMessage }}</p>
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="form-label dark:text-text-inverse">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-input pl-10 dark:bg-primary-light dark:text-text-inverse dark:border-primary-light"
                :class="{ 'border-error': submitted && !email }"
                placeholder="Email address"
              />
            </div>
            <p v-if="submitted && !email" class="form-error">Email is required.</p>
          </div>

          <div class="mb-4">
            <div class="flex justify-between mb-2">
              <label for="password" class="form-label dark:text-text-inverse">Password</label>
              <router-link to="/forgot-password" class="text-sm text-info hover:text-info dark:text-info dark:hover:text-info">
                Forgot password?
              </router-link>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input pl-10 pr-10 dark:bg-primary-light dark:text-text-inverse dark:border-primary-light"
                :class="{ 'border-error': submitted && !password }"
                placeholder="Password"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="text-text-secondary hover:text-text-primary focus:outline-none"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <p v-if="submitted && !password" class="form-error">Password is required.</p>
          </div>

          <div class="flex items-center mb-4">
            <input
              id="rememberme"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-info focus:ring-info border-secondary-main rounded"
            />
            <label for="rememberme" class="ml-2 block text-sm text-text-primary dark:text-text-inverse">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full flex justify-center items-center"
            :disabled="loading"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-text-inverse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sign In
          </button>
          
          <div class="mt-4 text-center">
            <span class="text-text-secondary dark:text-secondary-light">Don't have an account?</span>
            <router-link to="/register" class="ml-1 text-info hover:text-info dark:text-info dark:hover:text-info">
              Create one
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// State variables
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const submitted = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');

// Hooks
const router = useRouter();

/**
 * Handles the login form submission
 */
const handleLogin = async () => {
  submitted.value = true;
  errorMessage.value = '';

  // Validate form fields
  if (!email.value || !password.value) {
    return;
  }

  try {
    loading.value = true;

    // This would be replaced with your actual API call
    // For example: await authService.login(email.value, password.value);
    await mockLoginRequest();

    // Save token and redirect
    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Navigate to dashboard after successful login
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = error.message || 'Invalid credentials. Please try again.';
  } finally {
    loading.value = false;
  }
};

/**
 * Mock login request with artificial delay for demonstration
 */
const mockLoginRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock validation - This would be handled by your API in production
      if (email.value === 'admin@sqlprime.com' && password.value === 'password') {
        localStorage.setItem('auth-token', 'mock-jwt-token');
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

// Check for remembered email on component mount
if (localStorage.getItem('rememberedEmail')) {
  email.value = localStorage.getItem('rememberedEmail');
  rememberMe.value = true;
}
</script>

<style scoped>
/* Responsive adjustments handled by Tailwind classes */
</style>