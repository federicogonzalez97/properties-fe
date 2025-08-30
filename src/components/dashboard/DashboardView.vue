<template>
  <div class="dashboard-view">
    <div class="dashboard-view__content">
      <h1>Hello, Calvin</h1>
      <p>Welcome back!</p>

      <div class="dashboard-cards-container">
       
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.dashboard-view {
  flex: 1;
  background-color: var(--color-slate-50);
  min-height: 100vh;
}

.dashboard-view__content {
  padding: calc(var(--spacing) * 6);
}


.dashboard-cards-container {
  margin-top: calc(var(--spacing) * 8);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing) * 6);
  width: 100%;
}

h1 {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-slate-900);
  margin-bottom: calc(var(--spacing) * 2);
}

p {
  font-size: var(--text-lg);
  color: var(--color-slate-600);
  margin-bottom: calc(var(--spacing) * 4);
}

.mt-8 {
  margin-top: calc(var(--spacing) * 8);
}
</style>
