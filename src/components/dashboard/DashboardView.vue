<template>
  <div class="dashboard-view">
    <div class="dashboard-view__content">
      <div class="flex justify-between items-center">
        <div>
          <h5 class="text-xl font-semibold">Hello, Calvin</h5>
          <h6 class="text-slate-400">Welcome back!</h6>
        </div>
      </div>

      <div class="kpi-cards">
      </div>

      <div class="charts-container">
        <div class="revenue-analytics">
        </div>
        <div class="sales-data">
        </div>
      </div>

      <div class="bottom-sections">
        <div class="area-map">
        </div>
        <div class="recent-transactions">
        </div>
        <div class="top-properties">
        </div>
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
  font-family: var(--font-league-light);
  font-weight: var(--font-league-300);
}

.dashboard-view__content {
  padding: calc(var(--spacing) * 6);
}

/* Para pantallas ≥1000px, asegurar que el contenido se desplace correctamente */
@media (min-width: 1000px) {
  .dashboard-view {
    padding-top: 0;
    margin-top: 0;
  }
  
  .dashboard-view__content {
    padding-top: calc(var(--spacing) * 6);
    margin-top: 0;
  }
  
  /* Asegurar que el primer elemento tenga espacio suficiente */
  .dashboard-view__content > div:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  
  /* Asegurar que el contenido se vea completo */
  .dashboard-view {
    min-height: calc(100vh - 70px);
  }
}

/* Para pantallas menores a 1000px, agregar margin-top para evitar solapamiento con el header */
@media (max-width: 999px) {
  .dashboard-view {
    margin-top: 80px;
  }
  
  .dashboard-view__content {
    padding-top: calc(var(--spacing) * 6);
  }
}

.charts-container {
  margin-top: calc(var(--spacing) * 8);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 6);
  width: 100%;
}

.bottom-sections {
  margin-top: calc(var(--spacing) * 8);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing) * 6);
  width: 100%;
}

.kpi-cards {
  margin-top: calc(var(--spacing) * 8);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: calc(var(--spacing) * 6);
  width: 100%;
}

.revenue-analytics,
.sales-data {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 6);
  box-shadow: var(--tw-shadow);
}

.area-map,
.recent-transactions,
.top-properties {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 6);
  box-shadow: var(--tw-shadow);
}

*, ::backdrop, ::file-selector-button, :after, :before {
  border: 0 solid;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
  --tw-leading: var(--leading-normal);
  line-height: var(--leading-normal);
}

.font-semibold {
  --tw-font-weight: var(--font-weight-semibold);
  font-weight: var(--font-weight-semibold);
}

.text-xl {
  font-size: 17px;
  line-height: var(--tw-leading, var(--text-xl--line-height));
}

.text-slate-400 {
  color: var(--color-slate-400);
  font-size: 17px;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}



.mt-8 {
  margin-top: calc(var(--spacing) * 8);
}
</style>
