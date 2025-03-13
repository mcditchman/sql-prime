import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Actions
  function setUser(newUser: User | null) {
    user.value = newUser
  }
  
  function setToken(newToken: string | null) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('auth_token', newToken)
    } else {
      localStorage.removeItem('auth_token')
    }
  }
  
  async function signIn(credentials: SignInCredentials) {
    loading.value = true
    error.value = null
    
    try {
      // This would be replaced with an actual API call
      console.log('Signing in with:', credentials)
      
      // Mock successful authentication
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: 'Test User',
        email: credentials.email,
        role: 'user' as const
      }
      const mockToken = 'mock-token-' + Math.random().toString(36).substr(2, 16)
      
      // Set user and token
      setUser(mockUser)
      setToken(mockToken)
      
      return true
    } catch (err) {
      console.error('Authentication error:', err)
      error.value = 'Authentication failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function signUp(credentials: SignUpCredentials) {
    loading.value = true
    error.value = null
    
    try {
      // This would be replaced with an actual API call
      console.log('Signing up with:', credentials)
      
      // Mock successful registration
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: credentials.name,
        email: credentials.email,
        role: 'user' as const
      }
      const mockToken = 'mock-token-' + Math.random().toString(36).substr(2, 16)
      
      // Set user and token
      setUser(mockUser)
      setToken(mockToken)
      
      return true
    } catch (err) {
      console.error('Registration error:', err)
      error.value = 'Registration failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function signInWithGoogle() {
    loading.value = true
    error.value = null
    
    try {
      // This would be replaced with actual Google OAuth implementation
      console.log('Signing in with Google')
      
      // Mock successful Google authentication
      const mockUser = {
        id: 'google-user-' + Math.random().toString(36).substr(2, 9),
        name: 'Google User',
        email: 'google.user@example.com',
        role: 'user' as const
      }
      const mockToken = 'google-token-' + Math.random().toString(36).substr(2, 16)
      
      // Set user and token
      setUser(mockUser)
      setToken(mockToken)
      
      return true
    } catch (err) {
      console.error('Google authentication error:', err)
      error.value = 'Google authentication failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }
  
  function logout() {
    user.value = null
    setToken(null)
  }
  
  // Initialize from localStorage
  function init() {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      token.value = storedToken
      // Here you would typically make an API call to get the user data
      // based on the token
      
      // For demo purposes, set a mock user
      if (!user.value) {
        user.value = {
          id: 'stored-user-id',
          name: 'Stored User',
          email: 'stored.user@example.com',
          role: 'user'
        }
      }
    }
  }
  
  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    setUser,
    setToken,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    init
  }
})