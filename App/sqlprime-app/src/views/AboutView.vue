<template>
  <div class="about">
    <Card>
      <template #title>
        <h1 class="text-primary text-3xl m-0">About SQL Prime Engine</h1>
      </template>
      <template #content>
        <p>This is an about page for SQL Prime Engine. You can add more information about your application here.</p>
      </template>
    </Card>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.text-primary {
  color: var(--primary-color);
}

.text-3xl {
  font-size: 1.75rem;
}

.m-0 {
  margin: 0;
}
</style>
