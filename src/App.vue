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
      <div class="content-placeholder">
        <h2>Explora nuestras propiedades exclusivas.</h2>
        <p class="subtitle">Las propiedades que buscás, en un solo lugar</p>
      </div>
      
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

.content-placeholder {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 1rem 2rem; 
  text-align: center;
  position: relative; 
}

.content-placeholder h2 {
  width: 500px;
  height: 100px;
  margin: 0 auto; 
  opacity: 1;
  
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 50px;
  letter-spacing: 0.3px;
  text-align: center;
  
  color: #222222;
  
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.content-placeholder p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.content-placeholder .subtitle {
  width: 530px;
  height: 26px;
  margin: 0 auto; 
  opacity: 1;
  
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  text-align: center;
  
  color: #838383;
  
  margin-top: 1rem;
  margin-bottom: 1rem; 
}
</style>
