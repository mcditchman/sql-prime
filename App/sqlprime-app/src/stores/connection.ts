import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Connection {
  id: string
  name: string
  type: 'mysql' | 'postgresql' | 'sqlserver' | 'oracle'
  host: string
  port: number
  database: string
  username: string
  password?: string
  ssl: boolean
  createdAt: string
  updatedAt: string
}

export type ConnectionCreate = Omit<Connection, 'id' | 'createdAt' | 'updatedAt'>
export type ConnectionUpdate = Partial<Omit<Connection, 'id' | 'createdAt' | 'updatedAt'>>

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
      // Here you would make an API call to fetch connections
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock data
      connections.value = [
        {
          id: '1',
          name: 'Local MySQL',
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          database: 'test',
          username: 'root',
          ssl: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    } catch (err) {
      error.value = 'Failed to load connections'
      console.error(err)
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
    selectConnection
  }
})