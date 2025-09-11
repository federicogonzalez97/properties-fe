<template>
  <div class="home">
    <HeaderLanding />
    <HeroBackground @filters-changed="handleFiltersChanged" />
    <main class="main-content">
      <PropertyCards :filters="currentFilters" />
      <DreamPropertySection />
      <InvestmentOpportunities />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderLanding from './HeaderLanding.vue'
import HeroBackground from './HeroBackground.vue'
import PropertyCards from './PropertyCards.vue'
import DreamPropertySection from './DreamPropertySection.vue'
import InvestmentOpportunities from './InvestmentOpportunities.vue'
import Footer from './Footer.vue'
import { propertiesService } from '@/services/properties.service'
import type { PropertyFilter } from '@/interfaces/properties.interface'

const currentFilters = ref<PropertyFilter>({})

const handleFiltersChanged = (filters: PropertyFilter) => {
  currentFilters.value = filters
}

onMounted(async () => {
  await propertiesService.loadAllProperties()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.main-content {
  padding-top: 0; 
  min-height: 100vh;
  background: #FFFFFF; 
  position: relative;
}
</style>
