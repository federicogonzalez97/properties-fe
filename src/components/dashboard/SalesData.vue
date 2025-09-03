<template>
  <div class="sales-data-content">
    <div class="charts-header">
      <h2 class="charts-title">Sales Data</h2>
      <div class="charts-actions">
        <select v-model="selectedPeriod" class="charts-select">
          <option>Yearly</option>
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Today</option>
        </select>
      </div>
    </div>

    <ul class="sales-list">
      <li v-for="(item, index) in sales" :key="index" class="sales-item">
        <div class="sales-item__row">
          <div class="sales-item__left">
            <span class="sales-item__label">{{ item.label }}</span>
          </div>
          <div class="sales-item__right">
            <span class="sales-item__value">{{ item.value }}%</span>
          </div>
        </div>
        <div class="sales-item__bar">
          <div class="sales-item__bar-fill" :style="{ width: item.value + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Period = 'Yearly' | 'Monthly' | 'Weekly' | 'Today'

const selectedPeriod = ref<Period>('Yearly')

const sales = [
  { label: 'Via Website', value: 50 },
  { label: 'Via Team Member', value: 12 },
  { label: 'Via Agents', value: 6 },
  { label: 'Via Social Media', value: 15 },
  { label: 'Via Digital Marketing', value: 12 },
  { label: 'Via Others', value: 5 }
]
</script>

<style scoped>
.sales-data-content { display: block; }

.charts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-bottom: 1rem;
}

.charts-header::after {
  content: "";
  position: absolute;
  left: calc(var(--spacing) * -6);
  right: calc(var(--spacing) * -6);
  bottom: -1px;
  height: 1px;
  background-color: var(--color-gray-100);
}

.charts-title {
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-slate-900);
}

.charts-actions {
  display: flex;
  gap: calc(var(--spacing) * 4);
}

.charts-select {
  background-color: transparent;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  width: 132px;
  height: 40px;
  padding: 8px 40px 8px 12px;
  font-size: 12px;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.sales-list {
  margin-top: calc(var(--spacing) * 6);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
}

.sales-item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.sales-item__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sales-item__left {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 3);
}

/* se elimina el dot verde para igualar al diseño */

.sales-item__label {
  font-size: 17px;
  color: oklch(70.4% 0.04 256.788);
}

.sales-item__value {
  font-size: 17px;
  color: oklch(70.4% 0.04 256.788);
  font-weight: var(--font-weight-medium);
}

.sales-item__bar {
  width: 100%;
  height: 6px;
  background-color: var(--color-gray-100);
  border-radius: 999px;
  overflow: hidden;
}

.sales-item__bar-fill {
  height: 100%;
  width: 0%;
  background-color: var(--color-primary);
  border-radius: 999px;
  transition: width var(--default-transition-duration) var(--default-transition-timing-function);
}
</style>


