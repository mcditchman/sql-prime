# SQLPrime Style Guide - PrimeVue with Lara Theme

## Overview
This document outlines the visual design system for the SQLPrime application using PrimeVue component library with the Lara theme. The design supports both light and dark modes while maintaining a clean, professional appearance suitable for a data-centric SQL optimization tool.

## PrimeVue Integration

PrimeVue is a rich UI component library for Vue with 90+ components, various theme options, and built-in accessibility. It's well-suited for SQLPrime due to its:

- Comprehensive set of data-centric components (DataTable, Tree, Charts)
- Built-in theming system with light/dark mode support
- Material-inspired design that can be customized
- Responsive layout components
- Accessibility compliance

## Theme Configuration

SQLPrime will use PrimeVue's **Lara** theme, which offers a clean, modern design with subtle shadows and rounded corners. Lara is PrimeVue's signature theme with a professional appearance that's perfect for enterprise applications.

### Setting Up PrimeVue with Lara Theme

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

// Import PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css' // Light theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Import your custom CSS
import './assets/main.css'

const app = createApp(App)
app.use(PrimeVue, { ripple: true })
app.mount('#app')
```

For dark mode support, we'll use dynamic theme switching:

```javascript
// In component where theme switching occurs
const switchTheme = (isDark) => {
  const theme = isDark ? 'lara-dark-blue' : 'lara-light-blue'
  const linkId = 'theme-link'
  
  let themeLink = document.getElementById(linkId)
  
  if (!themeLink) {
    themeLink = document.createElement('link')
    themeLink.id = linkId
    themeLink.rel = 'stylesheet'
    document.head.appendChild(themeLink)
  }
  
  themeLink.href = `themes/${theme}/theme.css`
  
  // Store user preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
```

## Color System

### Primary Colors (Lara Blue Theme)

| Color Name | Light Mode Hex | Dark Mode Hex | Usage |
|------------|----------------|--------------|-------|
| Primary | `#3B82F6` | `#93C5FD` | Primary buttons, active states, links |
| Primary Text | `#FFFFFF` | `#121212` | Text on primary backgrounds |
| Surface | `#FFFFFF` | `#1E1E1E` | Card backgrounds, elevated surfaces |
| Surface Border | `#E5E7EB` | `#383838` | Borders for cards and panels |
| Background | `#F8F9FA` | `#121212` | Page background |
| Text | `#495057` | `#E9ECEF` | Primary text color |
| Text Secondary | `#6C757D` | `#ADB5BD` | Secondary text, labels |

### Semantic Colors

| Color Name | Light Mode Hex | Dark Mode Hex | Usage |
|------------|----------------|--------------|-------|
| Success | `#22C55E` | `#4ADE80` | Success states, optimized queries |
| Warning | `#F59E0B` | `#FCD34D` | Warning states, potential issues |
| Danger | `#EF4444` | `#F87171` | Error states, critical issues |
| Info | `#3B82F6` | `#93C5FD` | Information, hints, tips |

### Chart & Visualization Colors

| Color Name | Hex | 
|------------|-----|
| Chart Blue | `#3B82F6` |
| Chart Green | `#22C55E` |
| Chart Purple | `#A855F7` |
| Chart Amber | `#F59E0B` |
| Chart Teal | `#14B8A6` |
| Chart Indigo | `#6366F1` |
| Chart Red | `#EF4444` |
| Chart Pink | `#EC4899` |

## Typography

PrimeVue's Lara theme uses the system font stack by default, but we'll specify Inter as our primary font for consistency:

```css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-family-monospace: 'Fira Code', 'Roboto Mono', 'Source Code Pro', 
    monospace;
}
```

### Font Sizes

PrimeVue's Lara theme defines these font sizes which we'll adopt:

```css
:root {
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.75rem;  /* 28px */
  --font-size-4xl: 2rem;     /* 32px */
}
```

## Spacing System

PrimeVue has built-in spacing classes and variables that follow a consistent scale:

```css
:root {
  --spacing-none: 0;
  --spacing-xs: 0.25rem;    /* 4px */
  --spacing-sm: 0.5rem;     /* 8px */
  --spacing-md: 1rem;       /* 16px */
  --spacing-lg: 1.5rem;     /* 24px */
  --spacing-xl: 2rem;       /* 32px */
  --spacing-2xl: 3rem;      /* 48px */
  --spacing-3xl: 4rem;      /* 64px */
}
```

## Border Radius

Lara theme uses a consistent border-radius approach:

```css
:root {
  --border-radius: 6px;        /* Default for most components */
  --border-radius-sm: 4px;     /* Small elements */
  --border-radius-lg: 8px;     /* Larger elements like cards */
  --border-radius-xl: 12px;    /* Extra large elements */
  --border-radius-circle: 50%; /* Circular elements */
}
```

## Shadow & Elevation

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

## Core Components for SQLPrime

### Layout Components

#### 1. AppLayout
Using PrimeVue's layout components for the main application structure.

```vue
<template>
  <div class="layout-wrapper">
    <AppTopBar @toggle-menu="menuVisible = !menuVisible" />
    
    <Sidebar :visible="menuVisible" @hide="menuVisible = false" />
    
    <div class="layout-main">
      <div class="layout-content">
        <router-view />
      </div>
      
      <AppFooter />
    </div>
  </div>
</template>
```

#### 2. Card Component
For dashboard metrics and content sections.

```vue
<template>
  <Card>
    <template #title>
      Query Performance
    </template>
    <template #content>
      <Chart type="line" :data="chartData" :options="chartOptions" />
    </template>
  </Card>
</template>
```

#### 3. DataTable
For displaying query history, execution plans, and results.

```vue
<template>
  <DataTable 
    :value="queries" 
    :paginator="true" 
    :rows="10"
    :filters="filters"
    :loading="loading"
    responsiveLayout="scroll"
    stripedRows
    class="p-datatable-sm"
  >
    <Column field="name" header="Query Name" sortable></Column>
    <Column field="connection" header="Connection" sortable></Column>
    <Column field="status" header="Status" sortable>
      <template #body="slotProps">
        <Tag 
          :severity="getStatusSeverity(slotProps.data.status)" 
          :value="slotProps.data.status"
        />
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button icon="pi pi-eye" class="p-button-text p-button-sm" 
          @click="viewQuery(slotProps.data)" />
        <Button icon="pi pi-pencil" class="p-button-text p-button-sm" 
          @click="editQuery(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>
```

#### 4. Query Editor
Using the Monaco Editor integration with PrimeVue.

```vue
<template>
  <div class="card p-fluid">
    <div class="flex justify-content-between align-items-center mb-3">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-file"></i>
        </span>
        <InputText v-model="queryName" placeholder="Query Name" />
      </div>
      <div>
        <Button label="Run" icon="pi pi-play" class="mr-2" @click="runQuery" />
        <Button label="Analyze" icon="pi pi-bolt" @click="analyzeQuery" />
      </div>
    </div>
    
    <MonacoEditor
      v-model="queryText"
      language="sql"
      :options="editorOptions"
      theme="vs-dark"
      class="monaco-editor"
      style="height: 400px"
    />
  </div>
</template>
```

## Custom CSS Variables

To extend PrimeVue's Lara theme with our custom variables:

```css
/* src/assets/variables.css */
:root {
  /* Extending PrimeVue's Lara theme with our custom variables */
  
  /* SQLPrime specific colors */
  --sqlprime-highlight: #4ADE80;
  --sqlprime-lowlight: #F87171;
  --sqlprime-neutral: #94A3B8;
  
  /* Execution plan visualization colors */
  --plan-scan: #EF4444;
  --plan-seek: #22C55E;
  --plan-join: #3B82F6;
  --plan-sort: #F59E0B;
  --plan-aggregate: #A855F7;
  
  /* SQL Editor specific */
  --editor-background: #1E1E1E;
  --editor-foreground: #D4D4D4;
  --editor-line-highlight: rgba(255, 255, 255, 0.1);
  --editor-selection: rgba(59, 130, 246, 0.3);
}

/* Dark mode overrides */
[data-theme="dark"] {
  /* Dark mode specific variables */
}
```

## Component Guidelines

### Buttons

PrimeVue provides several button variants that we'll use consistently:

1. **Primary Action**: Blue filled button
   ```vue
   <Button label="Analyze Query" icon="pi pi-bolt" />
   ```

2. **Secondary Action**: Outlined button
   ```vue
   <Button label="Save" icon="pi pi-save" class="p-button-outlined" />
   ```

3. **Tertiary Action**: Text button
   ```vue
   <Button label="Cancel" class="p-button-text" />
   ```

4. **Danger Action**: Red button for destructive actions
   ```vue
   <Button label="Delete" icon="pi pi-trash" class="p-button-danger" />
   ```

### Form Controls

Consistent form styling using PrimeVue's form components:

```vue
<div class="p-fluid">
  <div class="field">
    <label for="connectionName">Connection Name</label>
    <InputText id="connectionName" v-model="connection.name" />
  </div>
  
  <div class="field">
    <label for="serverType">Database Type</label>
    <Dropdown id="serverType" v-model="connection.type" :options="dbTypes" optionLabel="name" />
  </div>
  
  <div class="field">
    <label for="server">Server</label>
    <InputText id="server" v-model="connection.server" />
  </div>
  
  <div class="field-checkbox">
    <Checkbox id="remember" v-model="connection.savePassword" binary />
    <label for="remember">Save Password</label>
  </div>
</div>
```

### Tables and Data

Using PrimeVue's powerful DataTable component with consistent styling:

1. **Standard DataTable**
```vue
<DataTable :value="data" responsiveLayout="scroll" stripedRows class="p-datatable-sm">
  <!-- Columns here -->
</DataTable>
```

2. **Status Indicators**
```vue
<Column field="status" header="Status">
  <template #body="slotProps">
    <Tag 
      :value="slotProps.data.status" 
      :severity="getStatusSeverity(slotProps.data.status)" 
    />
  </template>
</Column>
```

### Charts and Visualizations

Using PrimeVue Chart component with our consistent color palette:

```vue
<Chart type="bar" :data="chartData" :options="chartOptions" />

<script setup>
const chartData = {
  labels: ['Table Scan', 'Index Seek', 'Sort', 'Hash Match', 'Nested Loops'],
  datasets: [
    {
      label: 'Before Optimization',
      backgroundColor: '#EF4444',
      data: [65, 15, 35, 25, 22]
    },
    {
      label: 'After Optimization',
      backgroundColor: '#22C55E',
      data: [15, 55, 10, 5, 10]
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};
</script>
```

## Theme Switching Implementation

PrimeVue supports theme switching. We'll implement a theme toggle component:

```vue
<template>
  <div class="theme-switcher">
    <Button 
      icon="pi pi-sun" 
      class="p-button-rounded p-button-text" 
      v-if="isDarkMode" 
      @click="toggleTheme" 
      aria-label="Switch to light mode"
    />
    <Button 
      icon="pi pi-moon" 
      class="p-button-rounded p-button-text" 
      v-else 
      @click="toggleTheme" 
      aria-label="Switch to dark mode"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isDarkMode = ref(false);

const loadTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  isDarkMode.value = theme === 'dark';
  applyTheme();
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  applyTheme();
};

const applyTheme = () => {
  const theme = isDarkMode.value ? 'lara-dark-blue' : 'lara-light-blue';
  const linkId = 'theme-link';
  
  let themeLink = document.getElementById(linkId);
  
  if (themeLink) {
    themeLink.href = `/themes/${theme}/theme.css`;
  } else {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `/themes/${theme}/theme.css`;
    document.head.appendChild(link);
  }
  
  document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
};

onMounted(() => {
  loadTheme();
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
      isDarkMode.value = e.matches;
      applyTheme();
    }
  });
});
</script>
```

## Accessibility Guidelines

PrimeVue components come with built-in accessibility features, but we should ensure:

1. **Proper Contrast**: Maintain WCAG AA compliance (4.5:1 for normal text)
2. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
3. **Screen Reader Support**: Use proper ARIA labels and roles
4. **Focus Management**: Visible focus indicators for all interactive elements
5. **Responsive Design**: Support for zooming and text resizing

## Responsive Design Guidelines

PrimeVue has built-in responsive capabilities:

1. **Grid System**: Use PrimeFlex grid system for layouts
2. **Responsive Tables**: Set `responsiveLayout="stack"` for mobile-friendly tables
3. **Media Queries**: Supplement with custom breakpoints as needed
4. **Touch-Friendly UI**: Ensure adequate touch target sizes on mobile

```css
/* Responsive breakpoints */
@media screen and (max-width: 576px) {
  /* Small devices */
}

@media screen and (max-width: 768px) {
  /* Medium devices */
}

@media screen and (max-width: 992px) {
  /* Large devices */
}

@media screen and (max-width: 1200px) {
  /* Extra large devices */
}
```

## Sample Dashboard Layout

```vue
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Dashboard Overview</h5>
        <p>SQL Query Performance Metrics</p>
      </div>
    </div>

    <div class="col-12 md:col-6 lg:col-3">
      <div class="card">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Total Queries</span>
            <div class="text-900 font-medium text-xl">342</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-database text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">24 new </span>
        <span class="text-500">since last visit</span>
      </div>
    </div>

    <!-- Additional metric cards -->
    
    <div class="col-12 xl:col-8">
      <div class="card">
        <h5>Recent Queries</h5>
        <DataTable :value="recentQueries" responsiveLayout="scroll" 
          :rows="5" :paginator="true" class="p-datatable-sm">
          <!-- Columns here -->
        </DataTable>
      </div>
    </div>
    
    <div class="col-12 xl:col-4">
      <div class="card">
        <h5>Optimization Impact</h5>
        <Chart type="doughnut" :data="optimizationData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
```

## Conclusion

This style guide provides a comprehensive framework for implementing SQLPrime using PrimeVue with the Lara theme. By following these guidelines, the application will maintain a consistent, professional appearance while providing a great user experience for database professionals working with SQL optimization tasks.

The PrimeVue component library offers all the necessary tools to build SQLPrime with minimal custom CSS, allowing developers to focus on functionality while maintaining a beautiful, consistent interface in both light and dark modes.
