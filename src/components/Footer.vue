<template>
  <footer class="footer">
    <div class="footer-main-content">
      <div class="footer-logo">
        <h3>LOGO</h3>
      </div>
      
      <nav class="footer-navigation">
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
      </nav>
    </div>
    
    <div class="footer-separator"></div>
    
    <div class="footer-copyright">
      <p>Copyright ©2023 | Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
    
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 378px;
  background: #0D245F;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 500px;
  padding-top: 44px;
  position: relative;
}

.footer-main-content {
  width: 747px;
  height: 194px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 62px;
  margin: 0 auto;
}

.footer-logo h3 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #FFFFFF;
  margin: 0;
}

.footer-navigation {
  display: flex;
  gap: 62px;
  align-items: flex-start;
}

.nav-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  margin: 0 0 10px 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-link {
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #365196;
}

.social-section {
  width: 93px;
  height: 112px;
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-icon {
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #E0E0E0;
}

.social-icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.footer-separator {
  width: 1041px;
  height: 0.8px;
  background: #FCFCFC;
  margin: 20px auto;
  opacity: 1;
}

.footer-copyright {
  width: 1041px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.footer-copyright p {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}
</style>
