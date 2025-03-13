import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Query {
  id: string
  name: string
  sql: string
  connectionId: string
  createdAt: string
  updatedAt: string
}

export interface QueryResult {
  columns: string[]
  rows: any[]
  executionTime: number
  affectedRows?: number
}

export interface ExecutionPlan {
  id: string
  queryId: string
  plan: any // This would be a more complex structure in a real app
  cost: number
  createdAt: string
}

export const useQueryStore = defineStore('query', () => {
  // State
  const queries = ref<Query[]>([])
  const currentQuery = ref<Query | null>(null)
  const queryResult = ref<QueryResult | null>(null)
  const executionPlan = ref<ExecutionPlan | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters
  const queryById = computed(() => (id: string) => {
    return queries.value.find(q => q.id === id) || null
  })
  
  const queriesByConnection = computed(() => (connectionId: string) => {
    return queries.value.filter(q => q.connectionId === connectionId)
  })
  
  // Actions
  async function fetchQueries(connectionId?: string) {
    loading.value = true
    error.value = null
    
    try {
      // Here you would make an API call to fetch queries
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock data
      queries.value = [
        {
          id: '1',
          name: 'Sample Query',
          sql: 'SELECT * FROM users',
          connectionId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      
      if (connectionId) {
        queries.value = queries.value.filter(q => q.connectionId === connectionId)
      }
    } catch (err) {
      error.value = 'Failed to load queries'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  
  function setCurrentQuery(query: Query | null) {
    currentQuery.value = query
  }
  
  async function executeQuery(sql: string, connectionId: string) {
    loading.value = true
    error.value = null
    queryResult.value = null
    
    try {
      // Here you would make an API call to execute the query
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock result
      queryResult.value = {
        columns: ['id', 'name', 'email'],
        rows: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ],
        executionTime: 0.123
      }
    } catch (err) {
      error.value = 'Failed to execute query'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  
  async function analyzeQuery(sql: string, connectionId: string) {
    loading.value = true
    error.value = null
    executionPlan.value = null
    
    try {
      // Here you would make an API call to analyze the query
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock execution plan
      executionPlan.value = {
        id: '1',
        queryId: '1',
        plan: {
          // This would be a more complex structure in a real app
          type: 'SELECT',
          cost: 1.5,
          steps: [
            { type: 'TABLE SCAN', table: 'users', cost: 1.5 }
          ]
        },
        cost: 1.5,
        createdAt: new Date().toISOString()
      }
    } catch (err) {
      error.value = 'Failed to analyze query'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  
  return {
    // State
    queries,
    currentQuery,
    queryResult,
    executionPlan,
    loading,
    error,
    
    // Getters
    queryById,
    queriesByConnection,
    
    // Actions
    fetchQueries,
    setCurrentQuery,
    executeQuery,
    analyzeQuery
  }
})