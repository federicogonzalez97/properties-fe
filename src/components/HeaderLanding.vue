<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__logo">LOGO</div>

    <button class="header__hamburger" @click="toggleMobileMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="header__nav" :class="{ 'header__nav--mobile-open': isMobileMenuOpen }">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <a href="#" class="header__nav-link" @click="scrollToSection('hero')">Inicio</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link" @click="scrollToSection('dream-property')">Nosotros</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link" @click="scrollToSection('property-cards')">Propiedades</a>
        </li>
      </ul>
    </nav>

    <div class="header__cta">
      <template v-if="!isAuthenticated">
        <button class="header__cta-button header__cta-button--primary" @click="openAuthModal('login')">
          Login
        </button>
        <button class="header__cta-button header__cta-button--secondary" @click="openAuthModal('register')">
          Registrarse
        </button>
      </template>
      
      <template v-else>
        <button class="header__cta-button header__cta-button--secondary" @click="handleLogout">
          Logout
        </button>
      </template>
    </div>
  </header>

       <AuthModal 
         :is-open="isAuthModalOpen"
         :mode="authModalMode"
         @close="closeAuthModal"
       />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import AuthModal from './AuthModal.vue';
import { useAuth } from '../composables/useAuth';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isAuthModalOpen = ref(false);
const authModalMode = ref<'login' | 'register'>('login');

const { logout, isAuthenticated } = useAuth();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

const openAuthModal = (mode: 'login' | 'register' = 'login') => {
  authModalMode.value = mode;
  isAuthModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeAuthModal = () => {
  isAuthModalOpen.value = false;
  document.body.style.overflow = 'auto';
};

const handleLogout = async () => {
  await logout();
};

const scrollToSection = (sectionId: string) => {
  isMobileMenuOpen.value = false;
  
  document.body.style.overflow = 'auto';
  
  setTimeout(() => {
    switch (sectionId) {
    case 'hero':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'dream-property':
      const dreamSection = document.querySelector('.dream-property-section');
      if (dreamSection) {
        dreamSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        const sections = document.querySelectorAll('section, div');
        for (const section of sections) {
          if (section.textContent?.includes('Tu propiedad soñada')) {
            section.scrollIntoView({ behavior: 'smooth' });
            break;
          }
        }
      }
      break;
    case 'property-cards':
      const propertySection = document.querySelector('.property-cards-section');
      if (propertySection) {
        propertySection.scrollIntoView({ behavior: 'smooth' });
      } else {
        const sections = document.querySelectorAll('section, div');
        for (const section of sections) {
          if (section.textContent?.includes('Explora nuestras propiedades exclusivas')) {
            section.scrollIntoView({ behavior: 'smooth' });
            break;
          }
        }
      }
      break;
    case 'investment':
      const investmentSection = document.querySelector('.investment-opportunities-section');
      if (investmentSection) {
        investmentSection.scrollIntoView({ behavior: 'smooth' });
      } else {    
        const sections = document.querySelectorAll('section, div');
        for (const section of sections) {
          if (section.textContent?.includes('Oportunidades de inversión')) {
            section.scrollIntoView({ behavior: 'smooth' });
            break;
          }
        }
      }
      break;
    }
  }, 300);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = 'auto';
});
</script>

<style lang="scss" scoped>    
* {
  -webkit-tap-highlight-color: transparent !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.header {
  display: flex;
  flex-direction: row;
  width: 1041px;
  height: 45px;
  opacity: 1;
  gap: 24px;
  background: transparent;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 0 20px;
  z-index: 9999;
  position: absolute;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: none;

  &--scrolled {
    backdrop-filter: blur(10px);
  }

  &__logo {
    width: 426px;
    height: 45px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 34.49px;
    line-height: 130%;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    color: white;
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    background: none !important;
    border: none;
    cursor: pointer;
    padding: 5px;
    z-index: 1000;
    outline: none !important;
    
    &:hover {
      background: none !important;
    }
    
    &:focus {
      background: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    
    &:active {
      background: none !important;
    }
    
    &:focus-visible {
      background: none !important;
      outline: none !important;
      box-shadow: none !important;
    }

    span {
      width: 25px;
      height: 3px;
      background: white;
      margin: 3px 0;
      transition: 0.3s;
      border-radius: 2px;
    }
  }

  &__nav {
    display: flex;

    &-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 24px;
    }

    &-item {
      margin: 0;
    }

    &-link {
      font-weight: 600;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0;
      font-family: "Poppins", sans-serif;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 8px 16px;
      border-radius: 8px;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-1px);
      }
    }
  }

  &__cta {
    display: flex;
    flex-direction: row;
    gap: 10px;
    
    &-button {
      border-radius: 20px;
      padding: 10px 15px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      font-family: "Poppins", sans-serif;

      &--primary {
        width: 100px;
        height: 41px;
        opacity: 1;
        gap: 10px;
        border-radius: 20px;
        padding: 10px 15px;
        border: 1.5px solid white;
        background-color: transparent;
        color: white;
        font-weight: 600;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
      }

          &--secondary {
      background-color: #365196;
      color: white;

      &:hover {
        background-color: #2a3f7a;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(54, 81, 150, 0.3);
      }
    }
  }

            &__user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

    &__user-email {
      color: white;
      font-size: 14px;
      font-weight: 500;
      font-family: "Poppins", sans-serif;
    }
    
    @media (max-width: 768px) {
      &__user-info {
        gap: 0;
      }
      
      &__user-email {
        display: none;
      }
    }
}
}

@media (max-width: 768px) {
  .header {
    width: 100%;
    max-width: 100%;
    padding: 0 20px;
    justify-content: space-between;

    &__logo {
      width: auto;
      font-size: 28px;
      order: 2;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &__hamburger {
      display: flex;
      order: 1;
      position: absolute;
      left: 20px;
      z-index: 10000;
      transition: all 0.3s ease;
      outline: none !important;
      background: none !important;
      -webkit-tap-highlight-color: transparent !important;
      -webkit-touch-callout: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      
      &:hover {
        background: none !important;
      }
      
      &:focus {
        background: none !important;
        outline: none !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
      }
      
      &:active {
        background: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      &:focus-visible {
        background: none !important;
        outline: none !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
      }
      
      &::-moz-focus-inner {
        border: 0 !important;
        outline: none !important;
      }
      
      &:visited {
        background: none !important;
        color: inherit !important;
      }
      
      &:link {
        background: none !important;
        color: inherit !important;
      }
      
      .header__nav--mobile-open & {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        span:nth-child(2) {
          opacity: 0;
        }
        
        span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }

    &__nav {
      position: fixed;
      top: -100px;
      left: 0;
      width: 100vw;
      height: calc(100vh + 100px);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translateX(-100%);
      transition: all 0.4s ease;
      z-index: 9999;

      &--mobile-open {
        transform: translateX(0);
      }

      &-list {
        flex-direction: column;
        gap: 30px;
        text-align: center;
      }

      &-link {
        font-size: 28px;
        font-weight: 700;
        padding: 20px 40px;
        border: none;
        border-radius: 15px;
        background: transparent;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(54, 81, 150, 0.2);
          transform: translateY(-3px);
        }
        
        &:active {
          background: rgba(54, 81, 150, 0.4);
        }
      }
    }

    &__cta {
      display: flex !important;
      order: 3;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9998;
      
      .header__cta-button--primary {
        display: none;
      }
      
      .header__cta-button--secondary {
        display: flex;
      }
      

      
      .header__cta-button {
        padding: 8px 12px;
        font-size: 12px;
        min-width: 60px;
        height: 32px;
        border-radius: 16px;
        
        &--primary {
          border-width: 1px;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    .header {
      padding: 0 15px;
      
      &__logo {
        font-size: 24px;
      }
      
      &__cta {
        right: 15px;
        
        .header__cta-button {
          padding: 6px 10px;
          font-size: 11px;
          min-width: 55px;
          height: 28px;
        }
      .header__cta-button--secondary {
        display: flex;
      }
      

      }
    }
  }
}
</style>
