<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="text-primary text-4xl font-medium mb-3">{{ msg }}</h1>
    <h3 class="text-xl">
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener" class="text-primary hover:underline">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener" class="text-primary hover:underline">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
.greetings {
  text-align: center;
}

.text-primary {
  color: var(--primary-color);
}

.text-4xl {
  font-size: 2.6rem;
}

.text-xl {
  font-size: 1.2rem;
}

.font-medium {
  font-weight: 500;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.hover\:underline:hover {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .greetings {
    text-align: left;
  }
}
</style>
