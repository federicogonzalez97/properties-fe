<template>
  <div class="property-cards-section">
    <!-- Contenedor principal de las cartas -->
    <div class="property-cards-container">
      <!-- Contenedor interno para las cartas -->
      <div class="cards-row">
        <!-- Card 1 -->
        <div class="property-card">
          <!-- Contenido de la card (se cargará desde el backend) -->
        </div>
        
        <!-- Card 2 -->
        <div class="property-card">
          <!-- Contenido de la card (se cargará desde el backend) -->
        </div>
        
        <!-- Card 3 -->
        <div class="property-card">
          <!-- Contenido de la card (se cargará desde el backend) -->
        </div>
        
        <!-- Card 4 -->
        <div class="property-card">
          <!-- Contenido de la card (se cargará desde el backend) -->
        </div>
      </div>
    </div>
    
    <!-- Paginador -->
    <div class="pagination">
      <!-- Indicadores de paginación -->
      <div class="pagination-dot active"></div>
      <div class="pagination-dot"></div>
      <div class="pagination-dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente para la sección de cartas de propiedades
// El contenido se cargará dinámicamente desde el backend
</script>

<style lang="scss" scoped>
.property-cards-section {
  /* Contenedor principal - especificaciones exactas del Figma */
  width: 1345px;
  height: 414px;
  padding: 10px 152px 30px 152px;
  gap: 46px;
  transform: rotate(0deg);
  opacity: 1;
  margin: 0 auto;
  
  /* Fondo blanco para que sea uniforme */
  background: #FFFFFF;
  
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.property-cards-container {
  /* Contenedor de las cartas - especificaciones exactas del Figma */
  width: 1029.391357421875px;
  height: 299.5826110839844px;
  gap: 38px;
  transform: rotate(0deg);
  opacity: 1;
  
  /* Layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.cards-row {
  /* Fila de cartas */
  display: flex;
  flex-direction: row;
  gap: 38px;
  align-items: center;
  justify-content: center;
}

.property-card {
  /* Cada card individual - especificaciones exactas del Figma */
  width: 228.84783935546875px;
  height: 299.5826110839844px;
  transform: rotate(0deg);
  opacity: 1;
  border-radius: 3.47px;
  background: var(--crema, #FCFCFC);
  
  /* Sombras múltiples exactas del Figma */
  box-shadow: 
    0px 4.16px 8.32px 0px #6A64A61A,
    0px 15.95px 15.95px 0px #6A64A617,
    0px 35.37px 20.8px 0px #6A64A60D,
    0px 62.41px 24.97px 0px #6A64A603,
    0px 97.78px 27.74px 0px #6A64A600;
  
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* Transiciones suaves */
  transition: all 0.3s ease;
  
  /* Hover effect */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0px 6px 12px 0px #6A64A61A,
      0px 20px 20px 0px #6A64A617,
      0px 40px 25px 0px #6A64A60D,
      0px 70px 30px 0px #6A64A603,
      0px 110px 35px 0px #6A64A600;
  }
}

.pagination {
  /* Contenedor del paginador */
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination-dot {
  /* Punto individual del paginador */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #E0E0E0; /* Color gris para puntos inactivos */
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #C0C0C0;
    transform: scale(1.1);
  }
  
  &.active {
    background: #365196; /* Color azul para el punto activo */
    transform: scale(1.2);
  }
}

/* Variables CSS para colores */
:root {
  --crema: #FCFCFC;
  --fondo-claro: #F8F9FB;
}
</style>
