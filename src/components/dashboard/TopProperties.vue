<template>
  <div class="top-properties-card card">
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
    <div class="top-properties-card__header card-header">
      <h3>Top Properties</h3>
      <a href="#" class="link-underline-anim link-primary">
        View all
        <i class="mdi mdi-arrow-right"></i>
      </a>
    </div>

    <div class="top-properties-card__content">
      <div 
        v-for="property in properties" 
        :key="property.id"
        class="property-item"
      >
        <div class="property-item__image">
          <img :src="property.image" :alt="property.name" />
        </div>
        
        <div class="property-item__info">
          <div class="property-item__details">
            <h4 class="property-name">{{ property.name }}</h4>
            <p class="property-location">{{ property.location }}</p>
          </div>
          
          <div class="property-item__percentage">
            <span class="percentage-value" :class="getPercentageClass(property.percentage)">
              <i :class="getArrowIcon(property.percentage)"></i> {{ Math.abs(property.percentage) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { dashboardService } from '@/services/dashboard.service'

type PropertyStatus = 'High' | 'Medium' | 'Low'

interface Property {
  id: number
  image: string
  name: string
  location: string
  price: string
  percentage: number
  status: PropertyStatus
}

const isLoading = ref(true)
const properties = ref<Property[]>([])

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await dashboardService.getTopProperties(6)
    properties.value = res.map((p: any) => ({
      id: p.id,
      image: p.image,
      name: p.name,
      location: p.location,
      price: typeof p.price === 'number' ? `$${p.price.toLocaleString()}` : (p.price ?? ''),
      percentage: p.percentage,
      status: p.status,
    }))
  } finally {
    isLoading.value = false
  }
})

const getPercentageClass = (percentage: number) => {
  if (percentage > 0) return 'text-emerald-600'
  return 'text-red-600'
}

const getArrowIcon = (percentage: number) => {
  if (percentage > 0) return 'mdi mdi-arrow-top-right'
  return 'mdi mdi-arrow-bottom-left'
}
</script>

<style scoped>
.top-properties-card__header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.top-properties-card__content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 24px;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

@media (min-width: 1000px) {
  .top-properties-card__content {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
  }

  .top-properties-card__content::-webkit-scrollbar {
    width: 10px;
  }

  .top-properties-card__content::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
  }

  .top-properties-card__content::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
    border: 2px solid #f1f5f9;
  }

  .top-properties-card__content::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
  }
}

@media (max-width: 999px) {
  .top-properties-card__content {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }

  .top-properties-card__content::-webkit-scrollbar {
    width: 5px;
  }

  .top-properties-card__content::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 10px;
  }
}

.top-properties-card__content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.top-properties-card__content::-webkit-scrollbar-track {
  background: transparent;
}

.top-properties-card__content::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.top-properties-card__content:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}

.property-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-slate-100, #f1f5f9);
  transition: background-color 0.2s ease-in-out;
}

.property-item:last-child {
  border-bottom: none;
}

.property-item:hover {
  background-color: var(--color-slate-50, #f8fafc);
  cursor: pointer;
  border-radius: 8px;
  margin: 0 -8px;
  padding: 12px 8px;
}

.property-item__image {
  flex-shrink: 0;
}

.property-item__image img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
}

.property-item__info {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.property-item__details {
  flex-grow: 1;
}

.property-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.property-location {
  font-size: 12px;
  color: var(--color-slate-400, #64748b);
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.property-item__percentage {
  display: flex;
  align-items: center;
}

.percentage-value {
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

.text-emerald-600 {
  color: #10b981;
  font-weight: 400;
}

.text-red-600 {
  color: #dc2626;
  font-weight: 400;
}

.mdi-arrow-top-right,
.mdi-arrow-bottom-left {
  font-size: 16px;
  font-weight: 400;
}
.top-properties-card {
  width: 100%;
  min-width: 0;
  flex: 1;
}

/* Spinner overlay */
.top-properties-card { position: relative; }
.spinner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.6);
  z-index: 2;
  border-radius: var(--radius-lg);
}
.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e5e7eb;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
