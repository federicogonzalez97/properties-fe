<template>
  <div class="dashboard-view">
    <div class="dashboard-view__content">
      <div class="flex justify-between items-center">
        <div>
          <h5 class="text-xl font-semibold">Hello, Calvin</h5>
          <h6 class="text-slate-400">Welcome back!</h6>
        </div>
      </div>

      <MetricsGrid />

      <div class="charts-container">
        <div class="revenue-analytics revenue-analytics--fixed">
          <div class="charts-header">
            <h2 class="charts-title">Revenue Analytics</h2>
            <select v-model="selectedPeriod" class="charts-select">
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <RevenueChart :selectedPeriod="selectedPeriod" />
        </div>
        <div class="sales-data">
          <SalesData />
        </div>
      </div>

      <div class="bottom-sections">
        <AreaMap />
        <div class="recent-transactions">
        </div>
        <div class="top-properties">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MetricsGrid from './MetricsGrid.vue'
import RevenueChart from './RevenueChart.vue'
import SalesData from './SalesData.vue'
import AreaMap from './AreaMap.vue'

const selectedPeriod = ref<'Yearly' | 'Monthly' | 'Weekly'>('Yearly')
</script>

<style scoped>
.dashboard-view {
  flex: 1;
  background-color: var(--color-slate-50);
  height: 100vh;
  font-family: var(--font-league-light);
  font-weight: var(--font-league-300);
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.dashboard-view::-webkit-scrollbar {
  width: 14px;
  display: block;
}

.dashboard-view::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.dashboard-view::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  border: 2px solid #f1f1f1;
}

.dashboard-view::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dashboard-view__content {
  padding: calc(var(--spacing) * 6);
  min-height: calc(100vh + 200px);
}

@media (min-width: 1000px) {
  .dashboard-view {
    padding-top: 0;
    margin-top: 0;
  }
  
  .dashboard-view__content {
    padding-top: calc(var(--spacing) * 6);
    margin-top: 0;
  }
  
  .dashboard-view__content > div:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  
  .dashboard-view {
    min-height: calc(100vh - 70px);
  }
}

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
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 6);
  width: 100%;
}

@media (min-width: 1000px) {
  .charts-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: calc(var(--spacing) * 6);
    flex-wrap: nowrap;
  }

  .revenue-analytics {
    flex: 1 1 0;
    min-width: 100px; 
  }

  .sales-data {
    flex: 0 1 clamp(380px, 28vw, 500px);
    min-width: 100px;
  }
}

@media (max-width: 1200px) {
  .charts-container {
    display: flex;
    flex-direction: column;
  }

  .revenue-analytics,
  .sales-data {
    flex: 1 1 100%;
    width: 100%;
    min-width: 0;
  }
}

.bottom-sections {
  margin-top: calc(var(--spacing) * 8);
  display: flex;
  gap: calc(var(--spacing) * 6);
  width: 100%;
  align-items: stretch;
  flex-wrap: wrap;
}

@media (max-width: 999px) {
  .bottom-sections {
    flex-direction: column;
  }
  
  .bottom-sections > :first-child,
  .recent-transactions,
  .top-properties {
    width: 100%;
    flex: 1 1 100%;
  }
}

@media (min-width: 1000px) and (max-width: 1139px) {
  .bottom-sections {
    flex-wrap: wrap;
  }
  
  .bottom-sections > :first-child {
    flex: 0 0 383px;
    width: 383px;
  }
  
  .top-properties {
    flex: 1 1 400px;
    min-width: 300px;
  }
  
  .recent-transactions {
    flex: 1 1 100%;
    width: 100%;
    order: 3;
  }
}

@media (min-width: 1140px) {
  .bottom-sections {
    flex-wrap: nowrap;
  }
}



.revenue-analytics,
.sales-data {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 4);
  box-shadow: var(--tw-shadow);
}

.revenue-analytics--fixed {
  height: 473px;
}

.revenue-analytics {
  position: relative;
  overflow: hidden;
}

.sales-data {
  width: auto; 
  max-width: 100%;
  height: 465px;
  box-sizing: border-box;
}

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

.bottom-sections > :first-child {
  flex: 0 0 383px;
  width: 383px;
}

.recent-transactions {
  flex: 1 1 690px;
  min-width: 300px;
  max-width: 690px;
  height: 361px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 6);
  box-shadow: var(--tw-shadow);
}

.top-properties {
  flex: 1 1 400px;
  min-width: 300px;
  height: 361px;
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

