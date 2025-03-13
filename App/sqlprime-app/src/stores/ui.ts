import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

export interface UIState {
  theme: Theme
  sidebarCollapsed: boolean
  editorFontSize: number
  editorTabSize: number
}

export const useUIStore = defineStore('ui', () => {
  // State
  const theme = ref<Theme>('system')
  const sidebarCollapsed = ref(false)
  const editorFontSize = ref(14)
  const editorTabSize = ref(2)
  
  // Getters
  const isDarkMode = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === 'dark'
  })
  
  // Actions
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }
  
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed.value))
  }
  
  function setEditorFontSize(size: number) {
    editorFontSize.value = size
    localStorage.setItem('editorFontSize', String(size))
  }
  
  function setEditorTabSize(size: number) {
    editorTabSize.value = size
    localStorage.setItem('editorTabSize', String(size))
  }
  
  function applyTheme() {
    const isDark = isDarkMode.value
    document.documentElement.classList.toggle('dark', isDark)
  }
  
  // Initialize from localStorage
  function init() {
    const storedTheme = localStorage.getItem('theme') as Theme | null
    if (storedTheme) {
      theme.value = storedTheme
    }
    
    const storedSidebarCollapsed = localStorage.getItem('sidebarCollapsed')
    if (storedSidebarCollapsed !== null) {
      sidebarCollapsed.value = storedSidebarCollapsed === 'true'
    }
    
    const storedEditorFontSize = localStorage.getItem('editorFontSize')
    if (storedEditorFontSize !== null) {
      editorFontSize.value = parseInt(storedEditorFontSize, 10)
    }
    
    const storedEditorTabSize = localStorage.getItem('editorTabSize')
    if (storedEditorTabSize !== null) {
      editorTabSize.value = parseInt(storedEditorTabSize, 10)
    }
    
    applyTheme()
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme()
      }
    })
  }
  
  return {
    // State
    theme,
    sidebarCollapsed,
    editorFontSize,
    editorTabSize,
    
    // Getters
    isDarkMode,
    
    // Actions
    setTheme,
    toggleSidebar,
    setEditorFontSize,
    setEditorTabSize,
    init
  }
})