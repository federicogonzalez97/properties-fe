<template>
  <div class="metrics-grid">
    <div class="metric-item">
      <div class="metric-content">
        <h3 class="metric-label">Total Revenue</h3>
        <p class="metric-number">${{ animatedRevenue.toLocaleString() }}</p>
      </div>
      <div class="metric-icon-wrapper">
        <svg class="metric-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
        </svg>
      </div>
    </div>

    <div class="metric-item">
      <div class="metric-content">
        <h3 class="metric-label">Total Visitors</h3>
        <p class="metric-number">{{ animatedVisitors.toLocaleString() }}</p>
      </div>
      <div class="metric-icon-wrapper">
        <svg class="metric-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z" />
        </svg>
      </div>
    </div>

    <div class="metric-item">
      <div class="metric-content">
        <h3 class="metric-label">Total Properties</h3>
        <p class="metric-number">{{ animatedProperties.toLocaleString() }}</p>
      </div>
      <div class="metric-icon-wrapper">
        <svg class="metric-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10,2V4.26L12,5.59V4H22V19H17V21H24V2H10M7.5,5L0,10V21H15V10L7.5,5M14,6V6.93L15.61,8H16V6H14M18,6V8H20V6H18M7.5,7.5L13,11V19H10V13H5V19H2V11L7.5,7.5M18,10V12H20V10H18M18,14V16H20V14H18Z" />
        </svg>
      </div>
    </div>

    <div class="metric-item">
      <div class="metric-content">
        <h3 class="metric-label">Properties for Sale</h3>
        <p class="metric-number">{{ animatedForSale.toLocaleString() }}</p>
      </div>
      <div class="metric-icon-wrapper">
        <svg class="metric-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 20V12H2L12 3L22 12H19V20H5M12 5.69L7 10.19V18H17V10.19L12 5.69M11.5 18V14H9L12.5 7V11H15L11.5 18Z" />
        </svg>
      </div>
    </div>

    <div class="metric-item">
      <div class="metric-content">
        <h3 class="metric-label">Properties for Rent</h3>
        <p class="metric-number">{{ animatedForRent.toLocaleString() }}</p>
      </div>
      <div class="metric-icon-wrapper">
        <svg class="metric-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 16.25L19.36 17.94L18.61 19.16L15 17V12H16.5V16.25M23 16C23 19.87 19.87 23 16 23C13.62 23 11.53 21.81 10.26 20H4V12H1L11 3L18 9.29C20.89 10.15 23 12.83 23 16M9.29 18C9.11 17.37 9 16.7 9 16C9 12.54 11.5 9.68 14.8 9.11L11 5.69L6 10.19V18H9.29M21 16C21 13.24 18.76 11 16 11S11 13.24 11 16 13.24 21 16 21 21 18.76 21 16Z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const finalValues = {
  revenue: 45890,
  visitors: 2456,
  properties: 358,
  forSale: 243,
  forRent: 115
};

const animatedRevenue = ref(0);
const animatedVisitors = ref(0);
const animatedProperties = ref(0);
const animatedForSale = ref(0);
const animatedForRent = ref(0);

const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = start + (end - start) * easeOutQuart;
    
    callback(Math.floor(currentValue));
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

onMounted(() => {
  setTimeout(() => {
    animateValue(0, finalValues.revenue, 1500, (value) => {
      animatedRevenue.value = value;
    });
    
    animateValue(0, finalValues.visitors, 4800, (value) => {
      animatedVisitors.value = value;
    });
    
    animateValue(0, finalValues.properties, 1000, (value) => {
      animatedProperties.value = value;
    });
    
    animateValue(0, finalValues.forSale, 1100, (value) => {
      animatedForSale.value = value;
    });
    
    animateValue(0, finalValues.forRent, 1300, (value) => {
      animatedForRent.value = value;
    });
  }, 200);
});
</script>

<style scoped>
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: calc(var(--spacing) * 6);
  margin-top: calc(var(--spacing) * 8);
}

.metric-item {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 4);
  height: 99.98px;
  box-shadow: var(--tw-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.metric-content {
  flex: 1;
}

.metric-label {
  font-size: var(--text-base);
  color: var(--color-slate-400);
  font-weight: var(--font-weight-medium);
  margin: 0;
  font-family: var(--font-league-light);
}

.metric-number {
  font-size: var(--text-2xl);
  color: var(--color-slate-900);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  font-family: var(--font-league-light);
}

.metric-icon-wrapper {
  background: var(--color-slate-50);
  border-radius: var(--radius-md);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(var(--spacing) * 4);
}

.metric-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}
</style>
