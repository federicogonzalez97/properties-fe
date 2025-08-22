<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__logo">LOGO</div>

    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Inicio</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Nosotros</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Propiedades</a>
        </li>
      </ul>
    </nav>

    <div class="header__cta">
      <button class="header__cta-button header__cta-button--primary">
        Login
      </button>
      <button class="header__cta-button header__cta-button--secondary">
        Registrarse
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>

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
  }
}
</style>
