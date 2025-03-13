<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* SQLPrime style guide applied */
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: var(--surface-ground);
  color: var(--text-color);
  line-height: var(--line-height-base);
  font-size: var(--font-size-base);
}

#app {
  width: 100%;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

/* Component-specific styles based on style guide */
.card {
  background: var(--secondary-light);
  border: var(--border-width-thin) solid var(--secondary-main);
  border-radius: var(--border-radius-lg);
  padding: var(--space-4) var(--space-5);
  box-shadow: var(--shadow-sm);
}

.card-header {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-3);
}

.btn {
  border-radius: var(--border-radius-md);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-fast) var(--easing-default);
}

.btn-primary {
  background-color: var(--primary-main);
  color: var(--text-inverse);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-secondary {
  background-color: var(--secondary-main);
  color: var(--text-primary);
}

.btn-success {
  background-color: var(--success);
  color: var(--text-inverse);
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background-color: var(--secondary-main);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  padding: var(--space-3) var(--space-4);
}

table td {
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-width-thin) solid var(--secondary-main);
}

table tr:nth-child(even) {
  background-color: var(--secondary-light);
}

/* Navigation styles */
.nav-item {
  padding: var(--space-2) var(--space-4);
  margin-bottom: var(--space-2);
  border-radius: var(--border-radius-md);
}

.nav-item.active {
  background-color: var(--primary-light);
  color: var(--text-inverse);
}

.nav-item:not(.active) {
  color: var(--text-secondary);
}
</style>
