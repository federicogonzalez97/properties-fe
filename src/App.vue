<script setup lang="ts">
import HeaderLanding from './components/HeaderLanding.vue'
import HeroBackground from './components/HeroBackground.vue'
import PropertyCards from './components/PropertyCards.vue'
// App principal
</script>

<template>
  <div id="app">
    <HeaderLanding />
    <HeroBackground />
    <main class="main-content">
      <!-- Aquí irán los componentes -->
      <div class="content-placeholder">
        <h2>Explora nuestras propiedades exclusivas.</h2>
        <p class="subtitle">Las propiedades que buscás, en un solo lugar</p>
      </div>
      
      <!-- Sección de cartas de propiedades -->
      <PropertyCards />
    </main>
  </div>
</template>

<style>
/* Importar fuentes */
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
  overflow-x: hidden; /* Evitar scroll horizontal */
}

#app {
  min-height: 100vh;
  position: relative;
}

.main-content {
  padding-top: 0; /* Sin padding-top ya que el header es transparente */
  min-height: 100vh;
  background: #FFFFFF; /* Fondo blanco uniforme */
  position: relative;
  z-index: 1;
}

.content-placeholder {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 1rem 2rem; /* Reducido el padding-bottom para acercar las cards */
  text-align: center;
  position: relative; /* Necesario para el posicionamiento absoluto del h2 */
}

.content-placeholder h2 {
  /* Dimensiones exactas del Figma */
  width: 500px;
  height: 100px;
  margin: 0 auto; /* Centrar horizontalmente */
  opacity: 1;
  
  /* Tipografía exacta del Figma */
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 50px;
  letter-spacing: 0.3px;
  text-align: center;
  
  /* Color del texto */
  color: #222222;
  
  /* Espaciado para separarlo del contenido anterior */
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
  /* Dimensiones exactas del Figma */
  width: 530px;
  height: 26px;
  margin: 0 auto; /* Centrar horizontalmente */
  opacity: 1;
  
  /* Tipografía exacta del Figma */
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  text-align: center;
  
  /* Color del texto */
  color: #838383;
  
  /* Espaciado para separarlo del título principal */
  margin-top: 1rem;
  margin-bottom: 1rem; /* Reducido de 2rem a 1rem */
}
</style>
