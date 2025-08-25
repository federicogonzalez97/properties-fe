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
    
    <button class="footer-back-to-top" @click="scrollToTop">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="footer-back-to-top__text">Ir arriba</span>
    </button>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  min-height: 378px;
  background: url('/images/footer.png') no-repeat center center;
  background-size: cover;
  box-shadow: 0px 1px 3px 0px #3651961A,
              0px 5px 5px 0px #36519617,
              0px 11px 7px 0px #3651960D,
              0px 19px 8px 0px #36519603,
              0px 30px 9px 0px #36519600;
  margin-top: 100px;
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

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #E0E0E0;
  }
}

.nav-simple {
  display: flex;
  flex-direction: column;
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
  top: 290px;
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


@media (max-width: 768px) {
  .footer {
    margin-top: 50px;
    min-height: auto;
    padding-bottom: 0;
    overflow: hidden;
  }

  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 20px 0 20px;
  }

  .footer-logo {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 20px;
  }

  .footer-main-content {
    position: relative;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    flex-direction: column;
    gap: 30px;
    margin: 0;
  }

  .nav-column, .nav-simple {
    width: 100%;
    align-items: center;
  }

  .nav-title {
    width: auto;
    justify-content: center;
    margin-bottom: 10px;
  }

  .nav-list {
    display: none; 
  }

  .nav-link {
    width: auto;
    justify-content: center;
  }

  .social-section {
    width: auto;
    align-items: center;
  }

  .social-icons {
    flex-direction: row;
    gap: 20px;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-icon img {
    width: 24px;
    height: 24px;
  }

  .footer-separator {
    display: none; 
  }

  .footer-copyright {
    width: 90%;
    top: 15px;
    margin-left: 0;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    font-size: 13px;
    margin-bottom: 0;
    padding-bottom: 10px;
    color: #FFFFFF;
    font-weight: 400;
  }
  
  .footer-back-to-top {
    width: 52px;
    height: 52px;
    padding: 14px;
    gap: 0;
    bottom: 20px;
    right: 30px;
    border-radius: 50%;
    justify-content: center;
    
    .footer-back-to-top__text {
      display: none;
    }
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
}

@media (max-width: 480px) {
  .footer {
    margin-top: 20px;
    min-height: auto;
    padding-bottom: 0;
    overflow: hidden;
  }

  .footer-container {
    padding: 15px 15px 0 15px;
  }

  .footer-main-content {
    gap: 25px;
  }

  .footer-logo h3 {
    font-size: 36px;
  }

  .nav-title {
    font-size: 16px;
  }

  .nav-link {
    font-size: 13px;
  }

  .footer-copyright {
    top: 0;
    font-size: 12px;
    width: 95%;
    margin-bottom: 0;
    padding-bottom: 8px;
    color: #FFFFFF;
    font-weight: 400;
  }

  .footer-back-to-top {
    width: 56px;
    height: 56px;
    padding: 14px;
    gap: 0;
    margin-top: 0;
    margin-bottom: 20px;
    bottom: 15px;
    right: 25px;
    border-radius: 50%;
    justify-content: center;
    
    .footer-back-to-top__text {
      display: none;
    }
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
}

.footer-back-to-top {
  position: absolute;
  bottom: 15px;
  right: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #365196;
  color: white;
  border: none;
  border-radius: 25px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background: #2a3f7a;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(54, 81, 150, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateY(-2px);
  }
  
  span {
    font-weight: 600;
  }
}
</style>
