<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* PrimeVue will handle most styling, we just need minimal overrides */
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: var(--surface-ground);
  color: var(--text-color);
}

#app {
  width: 100%;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
</style>
