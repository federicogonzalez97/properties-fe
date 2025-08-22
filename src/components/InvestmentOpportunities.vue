<template>
  <div class="investment-opportunities-section">
    <!-- Título principal -->
    <div class="section-header">
      <h2>Oportunidades de inversión</h2>
      <p class="subtitle">Explora Nuestra Oferta de Complejos Residenciales</p>
    </div>

    <!-- Contenedor de cards de propiedades -->
    <div class="property-cards-container">
      <div class="property-card"></div>
      <div class="property-card"></div>
      <div class="property-card"></div>
      <div class="property-card"></div>
    </div>

    <!-- Paginador -->
    <div class="pagination">
      <div class="pagination-dot active"></div>
      <div class="pagination-dot"></div>
      <div class="pagination-dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente para la sección de oportunidades de inversión
</script>

<style lang="scss" scoped>
.investment-opportunities-section {
  width: 1041px;
  height: 90px;
  margin: 0 auto;
  text-align: center;
  opacity: 1;
}

.section-header {
  margin-top: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.section-header h2 {
  width: 1041px;
  height: 44px;
  margin: 0;
  opacity: 1;

  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;

  color: #222222;

  display: flex;
  align-items: center;
  justify-content: center;
}

.subtitle {
  width: 530px;
  height: 26px;
  margin: 0;
  opacity: 1;

  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  text-align: center;

  color: #838383;

  display: flex;
  align-items: center;
  justify-content: center;
}

.property-cards-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 46px;
  margin-bottom: 72.42px;
  flex-wrap: wrap;
  max-width: 1000px;
}

.property-card {
  width: 228.85px;
  height: 299.58px;
  background: #fcfcfc;
  border-radius: 3.47px;
  opacity: 1;

  box-shadow: 0px 4.16px 8.32px 0px #6a64a61a, 0px 15.95px 15.95px 0px #6a64a617,
    0px 35.37px 20.8px 0px #6a64a60d, 0px 62.41px 24.97px 0px #6a64a603,
    0px 97.78px 27.74px 0px #6a64a600;

  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-dot:hover {
  background: #bdbdbd;
}

.pagination-dot.active {
  background: #365196;
}
</style>
