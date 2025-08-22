<template>
  <div class="property-cards-section">
    <div class="section-header">
      <h2>Explora nuestras propiedades exclusivas.</h2>
      <p class="subtitle">Las propiedades que buscás, en un solo lugar</p>
    </div>
    
    <div class="property-cards-container">
      <div class="cards-row">
        <div class="property-card">
        </div>
        
        <div class="property-card">
        </div>
        
        <div class="property-card">
        </div>
        
        <div class="property-card">
        </div>
      </div>
    </div>
    
    <div class="pagination">
      <div class="pagination-dot active"></div>
      <div class="pagination-dot"></div>
      <div class="pagination-dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.property-cards-section {
  width: 100%;
  max-width: 1345px;
  min-height: 414px;
  padding: 10px 152px 30px 152px;
  gap: 46px;
  transform: rotate(0deg);
  opacity: 1;
  margin: 0 auto;
  
  background: #FFFFFF;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.section-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 1rem 2rem; 
  text-align: center;
  position: relative; 
}

.section-header h2 {
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

.subtitle {
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

.property-cards-container {
  width: 100%;
  max-width: 1029.391357421875px;
  min-height: 299.5826110839844px;
  gap: 38px;
  transform: rotate(0deg);
  opacity: 1;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.cards-row {
  display: flex;
  flex-direction: row;
  gap: 38px;
  align-items: center;
  justify-content: center;
}

.property-card {
  width: 228.84783935546875px;
  height: 299.5826110839844px;
  transform: rotate(0deg);
  opacity: 1;
  border-radius: 3.47px;
  background: var(--crema, #FCFCFC);
  
  box-shadow: 
    0px 4.16px 8.32px 0px #6A64A61A,
    0px 15.95px 15.95px 0px #6A64A617,
    0px 35.37px 20.8px 0px #6A64A60D,
    0px 62.41px 24.97px 0px #6A64A603,
    0px 97.78px 27.74px 0px #6A64A600;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  transition: all 0.3s ease;
  
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

// Responsive para mobile
@media (max-width: 768px) {
  .property-cards-section {
    padding: 20px 20px 30px 20px;
    gap: 30px;
    z-index: 200;
    position: relative;
  }

  .section-header {
    padding: 1.5rem 1rem 1rem 1rem;
    z-index: 200;
    position: relative;
  }
  
  .section-header h2 {
    width: 90%;
    max-width: 500px;
    height: auto;
    min-height: 80px;
    font-size: 28px;
    line-height: 36px;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .subtitle {
    width: 90%;
    max-width: 530px;
    height: auto;
    font-size: 14px;
    line-height: 22px;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .property-cards-container {
    gap: 20px;
  }

  .cards-row {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .property-card {
    width: 100%;
    max-width: 300px;
    height: 250px;
  }
}

@media (max-width: 480px) {
  .property-cards-section {
    padding: 15px 15px 25px 15px;
    gap: 25px;
  }

  .section-header h2 {
    font-size: 24px;
    line-height: 32px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 13px;
    line-height: 20px;
  }

  .property-card {
    height: 200px;
  }
}

.pagination {
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
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #E0E0E0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #C0C0C0;
    transform: scale(1.1);
  }
  
  &.active {
    background: #365196;
    transform: scale(1.2);
  }
}

:root {
  --crema: #FCFCFC;
  --fondo-claro: #F8F9FB;
}
</style>
