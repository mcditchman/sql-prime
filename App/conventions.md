# Vue.js Coding Conventions and Best Practices

This document outlines the coding conventions, architecture patterns, and best practices to be followed when developing Vue.js applications. These guidelines ensure consistency, maintainability, and adherence to industry standards throughout the codebase.

## Table of Contents

1. [Vue.js Core Conventions](#vuejs-core-conventions)
2. [Project Structure](#project-structure)
3. [TypeScript Usage](#typescript-usage)
4. [Component Design](#component-design)
5. [State Management](#state-management)
6. [Styling Conventions](#styling-conventions)
7. [Routing](#routing)
8. [Form Handling](#form-handling)
9. [API Communication](#api-communication)
10. [Testing](#testing)
11. [Performance Considerations](#performance-considerations)
12. [Accessibility](#accessibility)
13. [Documentation](#documentation)
14. [Examples](#examples)

## Vue.js Core Conventions

### Vue 3 Composition API

- Use the Composition API for all new components
- Organize composables by feature or domain
- Use `<script setup>` syntax for simpler component definitions
- Extract reusable logic into composables

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

// State
const count = ref(0)

// Computed properties
const doubleCount = computed(() => count.value * 2)

// Methods
const increment = () => {
  count.value++
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})

// Store access
const userStore = useUserStore()
</script>
```

### Naming Conventions

- **Components**: PascalCase (e.g., `DataTable.vue`, `UserProfile.vue`)
- **Props**: camelCase
- **Events**: kebab-case (e.g., `@update-value`, `@item-selected`)
- **Methods**: camelCase with verb prefixes (e.g., `handleSubmit`, `fetchData`)
- **Composables**: prefixed with "use" (e.g., `useUserData`, `useFormValidation`)

### Template Structure

- Use self-closing tags for components without content
- Maintain consistent indentation (2 spaces)
- Use quotes for attribute values
- Order directives consistently: v-if/v-show, v-for, v-model, v-on, other directives

```vue
<template>
  <div class="user-profile">
    <UserAvatar v-if="userStore.isLoggedIn" :src="userStore.avatarUrl" />
    
    <div v-for="item in items" :key="item.id" class="list-item">
      <span>{{ item.name }}</span>
      <button @click="removeItem(item.id)">Remove</button>
    </div>
    
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      @input="handleSearch"
    />
  </div>
</template>
```

## Project Structure

### Feature-based Organization

Organize code by feature or domain rather than by technical layers.

```
/src
  /assets              # Static assets
  /components          # Shared components
    /common            # Truly generic components
    /layout            # Layout components
    /forms             # Form-related components
  /composables         # Shared composable functions
  /features            # Feature modules
    /auth              # Authentication feature
      /components      # Auth-specific components
      /composables     # Auth-specific composables
      /types           # Auth-specific types
    /dashboard         # Dashboard feature
    /editor            # Editor feature
  /router              # Route definitions
  /stores              # Pinia stores
  /services            # API and external services
  /types               # TypeScript types and interfaces
  /utils               # Utility functions
  /views               # Page components
```

### Import Order

- External libraries first
- Internal modules
- Local components/imports

```vue
<script setup lang="ts">
// External imports
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Internal imports
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils/date'

// Local imports
import UserAvatar from './UserAvatar.vue'
</script>
```

## TypeScript Usage

### Type Definitions

- Create explicit interfaces for all data structures
- Use type inference when the type is obvious
- Export shared types in dedicated files
- Use typed props and emits definitions

```vue
<script setup lang="ts">
import { PropType, defineProps, defineEmits } from 'vue'
import type { User } from '@/types'

// Props with types
const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

// Typed emits
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'select', id: number, value: User): void
}>()
</script>
```

### Utility Types

- Use TypeScript utility types (Pick, Omit, Partial) when appropriate
- Create utility types for common patterns

```typescript
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: UserPreferences;
}

// Create a type with only basic user info
export type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// Create a type for updating user info (all fields optional)
export type UserUpdatePayload = Partial<Omit<User, 'id'>>;
```

## Component Design

### Component Size

- Keep components focused on a single responsibility
- Split large components into smaller ones
- Use composables to extract complex logic
- Aim for components under 300 lines

### Props and Events

- Use prop validation with types
- Document props with JSDoc comments
- Emit events for communicating up the component tree
- Avoid mutating props directly

```vue
<script setup lang="ts">
import { PropType, defineProps, defineEmits } from 'vue'

/**
 * Button component with different variants
 */
const props = defineProps({
  /**
   * Button variant style
   * @values 'primary', 'secondary', 'danger'
   */
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'danger'>,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'danger'].includes(value)
  },
  /**
   * Whether the button is disabled
   */
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
```

### Reusable Components

- Create base components for common UI elements
- Use slots for flexible content composition
- Provide sensible defaults
- Implement consistent APIs across similar components

```vue
<!-- BaseButton.vue -->
<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      { 'btn-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="prefix"></slot>
    <slot>Button</slot>
    <slot name="suffix"></slot>
  </button>
</template>

<!-- Usage -->
<BaseButton variant="primary" @click="save">
  <template #prefix>
    <SaveIcon />
  </template>
  Save Changes
</BaseButton>
```

## State Management

### Pinia Store Structure

- Organize stores by domain or feature
- Keep store modules small and focused
- Use composable-style store definitions
- Include proper TypeScript typing

```typescript
// stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  
  // Actions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = 0
  }
  
  return {
    count,
    doubleCount,
    isPositive,
    increment,
    decrement,
    reset
  }
})
```

### State Management Guidelines

- Use local component state (`ref`, `reactive`) for component-specific concerns
- Use Pinia stores for shared state across components
- Avoid direct store mutation; use actions for state changes
- Use composables for complex but localized state logic

## Styling Conventions

### Tailwind CSS Usage

- Use utility classes for layout and common styling
- Create component-specific classes only when necessary
- Apply consistent spacing patterns
- Group related utilities

```vue
<template>
  <div class="flex items-center p-4 bg-white rounded-lg shadow-sm">
    <div class="mr-4">
      <img class="w-12 h-12 rounded-full" :src="user.avatar" :alt="user.name">
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-medium text-gray-900">{{ user.name }}</h3>
      <p class="text-sm text-gray-500">{{ user.email }}</p>
    </div>
    <button 
      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      @click="viewProfile"
    >
      View Profile
    </button>
  </div>
</template>
```

### Component Styling

- Use scoped CSS for component-specific styles
- Use CSS variables for theming and consistent values
- Follow BEM or similar methodology when writing CSS classes

```vue
<style scoped>
.card {
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.card__header {
  margin-bottom: var(--spacing-sm);
}

.card__content {
  font-size: var(--font-size-base);
}
</style>
```

## Routing

### Route Organization

- Group routes by feature
- Use lazy loading for route components
- Implement route guards for authentication
- Add meta information for route-specific behavior

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        requiresAuth: true,
        title: 'Dashboard'
      }
    },
    {
      path: '/connections',
      name: 'connections',
      component: () => import('@/views/ConnectionsView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Check authentication
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
```

## Form Handling

### Form Components

- Use composables for form logic
- Implement consistent validation patterns
- Show validation feedback near the relevant fields
- Handle submission and error states appropriately

## API Communication

### Axios Service Setup

- Create service modules for API communication
- Use interceptors for common tasks (auth tokens, error handling)
- Type API request and response data

```typescript
// services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Create a base API instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
```

### API Service Structure

- Create service modules per domain/feature
- Implement typed API methods
- Handle loading states and errors consistently

```typescript
// services/userService.ts
import apiClient from './api'
import type { User, UserUpdatePayload } from '@/types'

export const userService = {
  /**
   * Get user by ID
   */
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },
  
  /**
   * Get list of users with optional pagination
   */
  async getUsers(page = 1, limit = 20): Promise<{ users: User[], total: number }> {
    const response = await apiClient.get<{ users: User[], total: number }>('/users', {
      params: { page, limit }
    })
    return response.data
  },
  
  /**
   * Update user information
   */
  async updateUser(id: string, data: UserUpdatePayload): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, data)
    return response.data
  },
  
  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }
}
```

## Testing

### Component Testing

- Focus on testing component behavior, not implementation details
- Test user interactions and expected outputs
- Test critical paths and edge cases
- Use data-test attributes for test selectors

```vue
<!-- Component with testable selectors -->
<template>
  <div>
    <input 
      v-model="searchQuery"
      data-test="search-input"
      type="text"
      placeholder="Search..."
    />
    <button 
      data-test="search-button"
      @click="performSearch"
    >
      Search
    </button>
    <div v-if="noResults" data-test="no-results-message">
      No results found
    </div>
    <ul v-else>
      <li 
        v-for="(result, index) in results" 
        :key="result.id"
        :data-test="`search-result-${index}`"
      >
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>
```

```typescript
// Component test
import { mount } from '@vue/test-utils'
import SearchComponent from '@/components/SearchComponent.vue'

describe('SearchComponent', () => {
  it('displays search results when results are available', async () => {
    const wrapper = mount(SearchComponent, {
      props: {
        initialResults: [
          { id: 1, name: 'Result 1' },
          { id: 2, name: 'Result 2' }
        ]
      }
    })
    
    // Check if results are rendered
    expect(wrapper.find('[data-test="search-result-0"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="search-result-0"]').text()).toContain('Result 1')
    expect(wrapper.find('[data-test="no-results-message"]').exists()).toBe(false)
  })
  
  it('displays no results message when no results', async () => {
    const wrapper = mount(SearchComponent, {
      props: {
        initialResults: []
      }
    })
    
    // Check if no results message is shown
    expect(wrapper.find('[data-test="no-results-message"]').exists()).toBe(true)
  })
  
  it('triggers search when button is clicked', async () => {
    const mockSearch = vi.fn()
    const wrapper = mount(SearchComponent, {
      props: {
        performSearch: mockSearch
      }
    })
    
    // Type in search box
    await wrapper.find('[data-test="search-input"]').setValue('test query')
    
    // Click search button
    await wrapper.find('[data-test="search-button"]').trigger('click')
    
    // Check if search function was called
    expect(mockSearch).toHaveBeenCalledWith('test query')
  })
})
```

### Store Testing

- Test store actions and mutations
- Mock API calls when testing stores
- Verify state changes after actions

```typescript
// Store test
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { userService } from '@/services/userService'

// Mock API service
vi.mock('@/services/userService', () => ({
  userService: {
    getUsers: vi.fn()
  }
}))

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('fetches users and updates state', async () => {
    const store = useUserStore()
    const mockUsers = [
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' }
    ]
    
    // Mock API response
    userService.getUsers.mockResolvedValue({
      users: mockUsers,
      total: 2
    })
    
    // Initial state check
    expect(store.users).toEqual([])
    
    // Call action
    await store.fetchUsers()
    
    // Verify state changed
    expect(store.users).toEqual(mockUsers)
    expect(store.totalUsers).toBe(2)
  })
})
```

## Performance Considerations

### Optimizations

- Use `v-once` for static content
- Implement lazy loading for routes and components
- Use `computed` properties for derived values
- Virtualize large lists with `vue-virtual-scroller` or similar

```vue
<!-- Optimized large list -->
<template>
  <RecycleScroller
    class="scroller"
    :items="items"
    :item-size="50"
    key-field="id"
  >
    <template #item="{ item }">
      <div class="list-item">
        {{ item.name }}
      </div>
    </template>
  </RecycleScroller>
</template>

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
```

### Memory Management

- Clean up event listeners in `onUnmounted`
- Avoid memory leaks by properly disposing of resources
- Unsubscribe from external subscriptions

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

// External event handler
const handleResize = () => {
  // Handle resize event
}

onMounted(() => {
  // Set up listeners
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Clean up listeners
  window.removeEventListener('resize', handleResize)
})
</script>
```

## Examples

### Basic Component Structure

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">{{ title }}</h2>
      <button 
        v-if="dismissible"
        class="close-button"
        aria-label="Close"
        @click="$emit('close')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

<style scoped>
.card {
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  background-color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-light);
}
</style>
```

### Composable Example

```typescript
// composables/useDebounce.ts
import { ref, customRef } from 'vue'

/**
 * Creates a debounced value that only updates after the specified delay
 * 
 * @param initialValue - The initial value
 * @param delay - Debounce delay in milliseconds
 * @returns A debounced ref
 */
export function useDebounce<T>(initialValue: T, delay: number = 300) {
  const debouncedRef = customRef<T>((track, trigger) => {
    let value = initialValue
    let timeout: number | null = null
    
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        if (timeout) {
          clearTimeout(timeout)
        }
        
        timeout = window.setTimeout(() => {
          value = newValue
          trigger()
          timeout = null
        }, delay)
      }
    }
  })
  
  return debouncedRef
}

// Usage:
// const searchQuery = useDebounce('', 500)
```

### API Service Example

```typescript
// services/connectionService.ts
import apiClient from './api'
import type { Connection, ConnectionCreate, ConnectionUpdate } from '@/types'

export const connectionService = {
  /**
   * Get all connections
   */
  async getConnections(): Promise<Connection[]> {
    const response = await apiClient.get<Connection[]>('/connections')
    return response.data
  },
  
  /**
   * Get connection by ID
   */
  async getConnection(id: string): Promise<Connection> {
    const response = await apiClient.get<Connection>(`/connections/${id}`)
    return response.data
  },
  
  /**
   * Create a new connection
   */
  async createConnection(data: ConnectionCreate): Promise<Connection> {
    const response = await apiClient.post<Connection>('/connections', data)
    return response.data
  },
  
  /**
   * Update connection
   */
  async updateConnection(id: string, data: ConnectionUpdate): Promise<Connection> {
    const response = await apiClient.put<Connection>(`/connections/${id}`, data)
    return response.data
  },
  
  /**
   * Delete connection
   */
  async deleteConnection(id: string): Promise<void> {
    await apiClient.delete(`/connections/${id}`)
  },
  
  /**
   * Test connection
   */
  async testConnection(connectionData: ConnectionCreate): Promise<{ success: boolean, message: string }> {
    const response = await apiClient.post<{ success: boolean, message: string }>(
      '/connections/test', 
      connectionData
    )
    return response.data
  }
}
```

### Store Example

```typescript
// stores/connectionStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { connectionService } from '@/services/connectionService'
import type { Connection, ConnectionCreate, ConnectionUpdate } from '@/types'

export const useConnectionStore = defineStore('connection', () => {
  // State
  const connections = ref<Connection[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedConnectionId = ref<string | null>(null)
  
  // Getters
  const connectionById = computed(() => (id: string) => {
    return connections.value.find(c => c.id === id) || null
  })
  
  const selectedConnection = computed(() => {
    if (!selectedConnectionId.value) return null
    return connectionById.value(selectedConnectionId.value)
  })
  
  // Actions
  async function fetchConnections() {
    loading.value = true
    error.value = null
    
    try {
      connections.value = await connectionService.getConnections()
    } catch (err) {
      error.value = 'Failed to load connections'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  
  async function createConnection(connectionData: ConnectionCreate) {
    loading.value = true
    error.value = null
    
    try {
      const newConnection = await connectionService.createConnection(connectionData)
      connections.value.push(newConnection)
      return newConnection
    } catch (err) {
      error.value = 'Failed to create connection'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function updateConnection(id: string, connectionData: ConnectionUpdate) {
    loading.value = true
    error.value = null
    
    try {
      const updatedConnection = await connectionService.updateConnection(id, connectionData)
      const index = connections.value.findIndex(c => c.id === id)
      if (index !== -1) {
        connections.value[index] = updatedConnection
      }
      return updatedConnection
    } catch (err) {
      error.value = 'Failed to update connection'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function deleteConnection(id: string) {
    loading.value = true
    error.value = null
    
    try {
      await connectionService.deleteConnection(id)
      connections.value = connections.value.filter(c => c.id !== id)
      if (selectedConnectionId.value === id) {
        selectedConnectionId.value = null
      }
    } catch (err) {
      error.value = 'Failed to delete connection'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  function selectConnection(id: string | null) {
    selectedConnectionId.value = id
  }
  
  return {
    // State
    connections,
    loading,
    error,
    selectedConnectionId,
    
    // Getters
    connectionById,
    selectedConnection,
    
    // Actions
    fetchConnections,
    createConnection,
    updateConnection,
    deleteConnection,
    selectConnection
  }
})