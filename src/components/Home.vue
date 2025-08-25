<template>
  <div class="home">
    <HeaderLanding />
    <HeroBackground />
    <main class="main-content">
      <PropertyCards />
      <DreamPropertySection />
      <InvestmentOpportunities />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import HeaderLanding from './HeaderLanding.vue'
import HeroBackground from './HeroBackground.vue'
import PropertyCards from './PropertyCards.vue'
import DreamPropertySection from './DreamPropertySection.vue'
import InvestmentOpportunities from './InvestmentOpportunities.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
}

.main-content {
  padding-top: 0; 
  min-height: 100vh;
  background: #FFFFFF; 
  position: relative;
}
</style>
