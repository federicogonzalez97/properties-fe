<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <h3>LOGO</h3>
      </div>
      
      <div class="footer-main-content">
        <div class="nav-column">
          <h4 class="nav-title">Inicio</h4>
          <ul class="nav-list">
            <li><a href="#" class="nav-link">Servicios</a></li>
            <li><a href="#" class="nav-link">Registrarse</a></li>
            <li><a href="#" class="nav-link">Nosotros</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title">Secciones</h4>
          <ul class="nav-list">
            <li><a href="#" class="nav-link">Alquilar</a></li>
            <li><a href="#" class="nav-link">Comprar</a></li>
            <li><a href="#" class="nav-link">Inversiones</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title">Propiedades</h4>
          <ul class="nav-list">
            <li><a href="#" class="nav-link">Departamentos</a></li>
            <li><a href="#" class="nav-link">Casas</a></li>
            <li><a href="#" class="nav-link">Terrenos</a></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h4 class="nav-title">Contacto</h4>
          <ul class="nav-list">
            <li><a href="#" class="nav-link">Información</a></li>
            <li><a href="#" class="nav-link">Ayuda</a></li>
            <li><a href="#" class="nav-link">Mail</a></li>
          </ul>
        </div>
        
        <div class="nav-column social-section">
          <h4 class="nav-title">Seguinos</h4>
          <div class="social-icons">
            <div class="social-icon"><img src="/images/instagram.svg" alt="Instagram"></div>
            <div class="social-icon"><img src="/images/fb.svg" alt="Facebook"></div>
            <div class="social-icon"><img src="/images/Linkedin.svg" alt="LinkedIn"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer-separator"></div>
    
    <div class="footer-copyright">
      Copyright ©2023 | Todos los derechos reservados
    </div>
  </footer>
</template>

<script setup lang="ts">
    
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  min-height: 378px;
  background: url('/images/footer.png') no-repeat center center;
  background-size: cover;
  box-shadow: 0px 1px 3px 0px #3651961A;
  box-shadow: 0px 5px 5px 0px #36519617;
  box-shadow: 0px 11px 7px 0px #3651960D;
  box-shadow: 0px 19px 8px 0px #36519603;
  box-shadow: 0px 30px 9px 0px #36519600;
  margin-top: 500px;
  position: relative;
}

.footer-logo {
  width: 135px;
  height: 62px;
  position: absolute;
  top: 44px;
  left: 154px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: #ffffff;
  margin: 0;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  padding-top: 44px;
}

.footer-main-content {
  width: 747px;
  height: 194px;
  position: absolute;
  top: 44px;
  left: 436px;
  display: flex;
  gap: 62px;
}

.nav-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-title {
  width: 80px;
  height: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  width: 63px;
  height: 21px;
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #365196;
}

.social-section {
  width: 80px;
  height: 153px;
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-icon {
  width: 63px;
  height: 21px;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.social-icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin: 0 auto;
}

.footer-separator {
  width: 1041px;
  height: 0.8px;
  position: absolute;
  top:  290px;
  left: 50%;
  transform: translateX(-50%);
  background: #FCFCFC;
  margin-left: 60px;
}

.footer-copyright {
  width: 346px;
  height: 18px;
  position: absolute;
  top: 306px;
  margin-left: 490px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
