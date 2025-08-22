<script setup lang="ts">
import HeaderLanding from './components/HeaderLanding.vue'
import HeroBackground from './components/HeroBackground.vue'
import PropertyCards from './components/PropertyCards.vue'
import DreamPropertySection from './components/DreamPropertySection.vue'
import InvestmentOpportunities from './components/InvestmentOpportunities.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <HeaderLanding />
    <HeroBackground />
    <main class="main-content">
      <PropertyCards />
      
      <DreamPropertySection />
      
      <InvestmentOpportunities />
    </main>
  </div>
  
  <Footer />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  height: 100%;
}

body::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

html {
  margin: 0;
  padding: 0;
}

#app {
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
