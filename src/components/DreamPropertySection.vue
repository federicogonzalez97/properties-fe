<template>
    <div class="dream-property-section">

      <div class="dream-property-image">
        <img src="/images/proerty_dream.jpg" alt="Propiedad soñada" />
      </div>
      
      <div class="dream-property-text">
        <h2>Tu propiedad soñada, a solo un click!</h2>
      </div>

      <div class="background-spiral">
        <img src="/images/Ellipse.svg" alt="Espiral decorativo" />
      </div>
      
      
      <div class="background-spiral-small">
        <img src="/images/Ellipse.svg" alt="Espiral decorativo pequeño" />
      </div>
      

      <div class="background-spiral-third">
        <img src="/images/Ellipse.svg" alt="Espiral decorativo tercero" />
      </div>
      
      
      <div class="background-spiral-fourth">
        <img src="/images/Ellipse.svg" alt="Espiral decorativo cuarto" />
      </div>
      
      <div class="features-cards-container">
        <div class="feature-card">
          <div class="feature-icon">
            <img src="/images/shield.svg" alt="Icono de seguridad" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Seguridad y Tranquilidad</h3>
            <p class="feature-subtitle">Tu seguridad y la de tu familia</p>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <img src="/images/pork.svg" alt="Icono de edificio" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Seguridad y Tranquilidad</h3>
            <p class="feature-subtitle">Tu seguridad y la de tu familia</p>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <img src="/images/handshake.svg" alt="Icono de tendencia" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Seguridad y Tranquilidad</h3>
            <p class="feature-subtitle">Tu seguridad y la de tu familia</p>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <img src="/images/house.svg" alt="Icono de búsqueda" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">Seguridad y Tranquilidad</h3>
            <p class="feature-subtitle">Tu seguridad y la de tu familia</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  </script>
  
  <style lang="scss" scoped>
  .dream-property-section {

    width: 100%;
    max-width: 1345px;
    min-height: 663px;
    transform: rotate(0deg);
    opacity: 1;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 999;
    
    position: relative;
    overflow: hidden;
  }
  
  .dream-property-image {
  width: 742.99951171875px;
  height: 663px;
  position: absolute; 
  left: 0px; 
  top: 0px; 
  transform: scaleX(-1); 
  opacity: 1;
  border-top-left-radius: 200px; 
  background: linear-gradient(89deg, #FCFCFB 39.35%, rgba(252, 252, 251, 0) 93.57%); 
  overflow: hidden;
  
  display: flex;
  align-items: flex-start; 
  justify-content: flex-start; 
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 200px; 
  }
}

.dream-property-text {
  position: absolute;
  top: 55px;
  left: 152px;
  z-index: 10;
  width: 206px;
  height: 102px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #545F71;
    margin: 0;
    vertical-align: middle;
    opacity: 1;
    transform: rotate(0deg);
  }
}
  


.background-spiral {
  position: absolute;
  
  
  top: -91px;
  left: 947px;
  
  
  width: 468px;
  height: 464px;
  
  z-index: 1;
  
}

.background-spiral img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6; 
}


.background-spiral-small {
  position: absolute;
  
  
  top: 405px;
  left: 1150px;
  
  
  width: 120px;
  height: 120px;
  
  
  
  z-index: 1;
}

.background-spiral-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6; 
}


.background-spiral-third {
  position: absolute;
  
  
  top: 560px;
  left: 1246px;
  
  
  width: 156px;
  height: 156px;
  
  
  
  z-index: 1;
}

.background-spiral-third img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6; 
}


.background-spiral-fourth {
  position: absolute;
  
  
  top: 589px;
  left: 981px;
  
  width: 120px;
  height: 120px;
  
  
  z-index: 1;
}

.background-spiral-fourth img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6; 
}

.features-cards-container {
  position: absolute;
  top: 100px; 
  left: 860px;
  
  width: 307px;
  
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.feature-card {
  width: 307px;
  height: 90px;
  
  display: flex;
  align-items: center;
  gap: 16px;
  
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.feature-icon {
  width: 86px;
  height: 100%;
  
  background: linear-gradient(180deg, #273A6A 0%, #0D245F 100%);
  
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  
  position: relative;
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img {
  width: 42px;
  height: 40px;
  
  position: absolute;
  top: 23px;
  left: 22px;
      
  filter: brightness(0) invert(1);
}

.feature-content {

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-title {

  font-family: 'Montserrat', sans-serif;
  font-weight: 600; 
  font-size: 16px;
  line-height: 1.2;
  color: #222222;
  margin: 0;
}

.feature-subtitle {

  font-family: 'Poppins', sans-serif;
  font-weight: 400; 
  font-size: 14px;
  line-height: 1.3;
  color: #838383;
  margin: 0;
}


@media (max-width: 768px) { 
  .dream-property-section {
    min-height: 500px;
    padding: 20px;
  }

  .dream-property-image {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-top-left-radius: 0;
  }

  .dream-property-text {
    display: none;
  }

  .background-spiral,
  .background-spiral-small,
  .background-spiral-third,
  .background-spiral-fourth {
    display: none;
  }

  .features-cards-container {
    position: relative;
    top: 20px;
    left: 0;
    width: 100%;
    gap: 20px;
    transform: none;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-card {
    width: 100%;
    max-width: 350px;
    height: 80px;
    gap: 12px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .feature-icon {
    width: 70px;
    height: 100%;
    z-index: 100;
  }

  .feature-icon img {
    width: 35px;
    height: 35px;
    top: 20px;
    left: 18px;
  }

  .feature-title {
    font-size: 14px;
  }

  .feature-subtitle {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .dream-property-section {
    min-height: 400px;
    padding: 15px;
  }

  .dream-property-image {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-top-left-radius: 0;
  }

  .dream-property-text {
    display: none;
  }

  .background-spiral,
  .background-spiral-small,
  .background-spiral-third,
  .background-spiral-fourth {
    display: none;
  }

  .feature-card {
    height: 70px;
    gap: 10px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .feature-icon {
    width: 60px;
    height: 100%;
    z-index: 100;
  }

  .feature-icon img {
    width: 30px;
    height: 30px;
    top: 18px;
    left: 15px;
  }

  .feature-title {
    font-size: 13px;
  }

  .feature-subtitle {
    font-size: 11px;
  }
}

@media (max-width: 360px) {
  .dream-property-section {
    min-height: 350px;
    padding: 10px;
  }

  .dream-property-image {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-top-left-radius: 0;
  }

  .dream-property-text {
    display: none;
  }

  .background-spiral,
  .background-spiral-small,
  .background-spiral-third,
  .background-spiral-fourth {
    display: none;
  }

  .features-cards-container {
    gap: 15px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-card {
    height: 65px;
    gap: 8px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .feature-icon {
    width: 55px;
    z-index: 100;
  }

  .feature-icon img {
    width: 25px;
    height: 25px;
    top: 18px;
    left: 15px;
  }

  .feature-title {
    font-size: 12px;
  }

  .feature-subtitle {
    font-size: 10px;
  }
}
</style>