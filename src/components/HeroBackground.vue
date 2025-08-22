<template>
  <section class="hero-background" :style="{ minHeight: heroHeight + 'px' }">
    <div class="hero-background__image-container">
      <img 
        src="/images/hero-house.jpg" 
        alt="Casa moderna con diseño elegante" 
        class="hero-background__image"
      />
      <div class="hero-background__overlay"></div>
    </div>
    
    <div class="hero-background__content">
      <div class="hero-background__text-container">
        <h1 class="hero-background__title">
          Tu Hogar Ideal: Encuentra la Propiedad de tus Sueños con Nosotros
        </h1>
      </div>
      
      <FilterBar />
    </div>
  </section>
</template>

<script setup lang="ts">
import FilterBar from './FilterBar.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const getInitialHeight = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth <= 480) {
      return 420
    } else if (window.innerWidth <= 768) {
      return 520
    }
  }
  return 660
}

const heroHeight = ref(getInitialHeight())

const handleFilterHeightChange = (event: CustomEvent) => {
  const { isExpanded } = event.detail
  
  if (window.innerWidth <= 768) {
    if (isExpanded) {
      heroHeight.value = window.innerWidth <= 480 ? 630 : 720
    } else {
      heroHeight.value = window.innerWidth <= 480 ? 420 : 520
    }
  } else {
    heroHeight.value = 660
  }
}
    
const handleResize = () => {
  if (typeof window !== 'undefined') {
    heroHeight.value = getInitialHeight()
  }
}

onMounted(() => {
  window.addEventListener('filterHeightChanged', handleFilterHeightChange as EventListener)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('filterHeightChanged', handleFilterHeightChange as EventListener)
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.hero-background {
  position: relative;
  width: 100vw;
  min-height: 660px;
  height: auto;
  overflow: visible;
  margin-left: calc(-50vw + 50%);
  margin-top: 0;
  transition: min-height 0.3s ease;
  
  &__image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
    z-index: 1;
  }
  
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
    background: linear-gradient(
      135deg, 
      rgba(0, 0, 0, 0.4) 0%, 
      rgba(0, 0, 0, 0.2) 50%, 
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 2;
  }
  
  &__content {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    text-align: center;
    padding-top: 120px;
  }
  
  &__text-container {
    margin-bottom: 3rem;
    max-width: 800px;
  }
  
  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
    color: white;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    width: 721px;
    height: 68px;
    position: absolute;
    top: 254px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__search-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    max-width: 800px;
    width: 100%;
  }
  
  &__search-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  }
  
  &__tab {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: #666;
    
    &--active {
      background: #365196;
      color: white;
    }
    
    &:hover:not(&--active) {
      background: #f0f0f0;
      color: #333;
    }
  }
  
  &__search-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  &__search-input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  &__search-input {
    flex: 1;
    padding: 1rem 1.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    
    &:focus {
      outline: none;
      border-color: #365196;
      box-shadow: 0 0 0 3px rgba(54, 81, 150, 0.1);
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  &__search-button {
    padding: 1rem 1.5rem;
    background: #365196;
    border: none;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #2a3f7a;
      transform: translateY(-2px);
    }
  }
  
  &__search-icon {
    font-size: 1.2rem;
  }
  
  &__filters {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  &__filter-select {
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 0.9rem;
    font-family: 'Poppins', sans-serif;
    background: white;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: #365196;
    }
  }
}
    
@media (max-width: 768px) {
  .hero-background {
    min-height: 520px;
    
    &__content {
      padding-top: 80px;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    &__title {
      width: 90%;
      max-width: 400px;
      height: auto;
      min-height: 80px;
      top: 180px;
      font-size: 24px;
      line-height: 120%;
      padding: 0 20px;
    }
    
    &__search-container {
      padding: 1.5rem;
      margin: 0 1rem;
    }
    
    &__filters {
      flex-direction: column;
      align-items: center;
    }
    
    &__filter-select {
      width: 200px;
    }
  }
}

@media (max-width: 480px) {
  .hero-background {
    min-height: 420px;
    
    &__title {
      font-size: 20px;
      top: 150px;
      padding: 0 15px;
    }
    
    &__content {
      padding-top: 60px;
    }
  }
}
</style>
