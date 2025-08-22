<template>
  <div class="property-cards-section">
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
  width: 1345px;
  height: 414px;
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

.property-cards-container {
  width: 1029.391357421875px;
  height: 299.5826110839844px;
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
