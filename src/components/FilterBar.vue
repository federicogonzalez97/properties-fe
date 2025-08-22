<template>
  <div class="filter-bar">
    <div class="filter-bar__content">
      
      <button 
        class="filter-bar__button filter-bar__button--comprar" 
        :class="{ 'active': selectedButton === 'comprar' }"
        @click="selectButton('comprar')"
      >
        <span class="filter-bar__button-text">Comprar</span>
        <div class="filter-bar__indicator" :class="{ 'filter-bar__indicator--active': selectedButton === 'comprar' }"></div>
      </button>
      
      
      <button 
        class="filter-bar__button filter-bar__button--alquilar" 
        :class="{ 'active': selectedButton === 'alquilar' }"
        @click="selectButton('alquilar')"
      >
        <span class="filter-bar__button-text">Alquilar</span>
        <div class="filter-bar__indicator" :class="{ 'filter-bar__indicator--active': selectedButton === 'alquilar' }"></div>
      </button>

      <div class="filter-bar__input">
        <input type="text" placeholder="Buscar por ubicación o palabra clave..." class="filter-bar__input-text">
      </div>


      <div class="filter-bar__dropdown" :class="{ 'active': selectedDropdown === 'departamento' }" @click="selectDropdown('departamento')">
        <span class="filter-bar__dropdown-text">Departamento</span>
        <img src="/images/arrow-down.svg" alt="Flecha" class="filter-bar__dropdown-arrow">
      </div>

      <div class="filter-bar__dropdown" :class="{ 'active': selectedDropdown === 'ambientes' }" @click="selectDropdown('ambientes')">
        <span class="filter-bar__dropdown-text">Ambientes</span>
        <img src="/images/arrow-down.svg" alt="Flecha" class="filter-bar__dropdown-arrow">
      </div>

      <div class="filter-bar__dropdown" :class="{ 'active': selectedDropdown === 'precio' }" @click="selectDropdown('precio')">
        <span class="filter-bar__dropdown-text">Precio</span>
        <img src="/images/arrow-down.svg" alt="Flecha" class="filter-bar__dropdown-arrow">
      </div>

      
      <button class="filter-bar__action-button filter-bar__action-button--filter">
        <img src="/images/Filter.svg" alt="Filtro" class="filter-bar__action-icon">
      </button>

      
      <button class="filter-bar__action-button filter-bar__action-button--search">
        <img src="/images/search.svg" alt="Búsqueda" class="filter-bar__action-icon">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedButton = ref('alquilar') 
const selectedDropdown = ref<string | null>(null) 

const selectButton = (button: string) => {
  selectedButton.value = button
}

const selectDropdown = (dropdown: string) => {
  selectedDropdown.value = selectedDropdown.value === dropdown ? null : dropdown
}
</script>

<style lang="scss" scoped>
.filter-bar {
  
  width: 1030px;
  height: 44px;
  position: absolute; 
  top: 399px;
  left: 50%; 
  transform: translateX(-50%); 
  opacity: 1;
  
  
  box-shadow: 
    0px 1px 3px 0px #3651961A,
    0px 5px 5px 0px #36519617,
    0px 11px 7px 0px #3651960D,
    0px 19px 8px 0px #36519603,
    0px 30px 9px 0px #36519600;

  border-radius: 10px; 

  display: flex;
  align-items: center;
  justify-content: flex-start; 
  padding: 0; 

  &__content {
    
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0; 
  }

  &__button {
    
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-weight: 500; 
    font-size: 11px;
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    position: relative;
    padding: 0;

    &--comprar {
      
      width: 100px;
      height: 44px;
      background: var(--rosa, #F5F7FA);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      .filter-bar__button-text {
        color: #8A8A8A; 
      }

      &:has(.filter-bar__indicator--active) .filter-bar__button-text,
      &.active .filter-bar__button-text {
        color: #333; 
      }
    }

    &--alquilar {
      
      width: 100px;
      height: 44px;
      background: var(--crema, #FCFCFC);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding-right: 5px;
      padding-left: 5px;
      box-shadow: 0px 51px 30px 0px #6A64A60D;
        margin-right: 8px; 

      .filter-bar__button-text {
        color: #8A8A8A; 
      }

      &:has(.filter-bar__indicator--active) .filter-bar__button-text,
      &.active .filter-bar__button-text {
        color: #333; 
      }
    }

    &:hover {
      transform: translateY(-1px);
    }
  }

  &__button-text {
    
    width: 43px;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 11px;
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
    vertical-align: middle;
    transition: color 0.3s ease;
  }

  &__indicator {
    
    width: 76px;
    height: 4px;
    border-radius: 5px;
    background: transparent; 
    margin-top: 2px; 
    transition: background-color 0.3s ease;

    &--active {
      background: var(--new-blue, #365196);   
    }
  }

  &__input {
    
    width: 398px;
    height: 44px;
    gap: 10px;
    opacity: 1;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 5px;
    background: var(--crema, #FCFCFC);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px; 
  }

  &__input-text {
    
    width: 436px;
    height: 17px;
    opacity: 1;
    font-family: 'Poppins', sans-serif;
    font-weight: 400; 
    font-size: 11px;
    line-height: 100%;
    letter-spacing: 0;
    vertical-align: middle;
    border: none;
    background: transparent;
    outline: none;
    color: #333;
    
    &::placeholder {
      color: #8A8A8A;
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-size: 11px;
      line-height: 100%;
      letter-spacing: 0;
    }
  }

  &__dropdown {
    
    display: flex;
    align-items: center;
    height: 44px; 
    gap: 10px; 
    padding: 0 10px; 
    border-radius: 5px;
    background: var(--crema, #FCFCFC);
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 8px; 
    width: fit-content; 

    &:hover {
      background-color: #F0F0F0;
    }

    &.active {
      background-color: #F0F0F0;
      
      .filter-bar__dropdown-text {
        color: #333; 
      }
    }

    

    &-text {
      font-family: 'Poppins', sans-serif;
      font-weight: 400; 
      font-size: 11px;
      line-height: 100%;
      letter-spacing: 0;
      color: #8A8A8A; 
      white-space: nowrap; 
    }

    &-arrow {
      width: 12px;
      height: 12px;
      object-fit: contain;
      flex-shrink: 0; 
    }
  }

  &__action-button {
    
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 5px;
    background: var(--crema, #FCFCFC);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background-color: #F0F0F0;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &--filter {
      
      box-shadow: 0px 51px 30px 0px #6A64A60D;
      margin-right: 8px; 
    }

    &--search {
      background: #365196; 
      box-shadow: 0px 51px 30px 0px #6A64A60D;
      
      &:hover {
        background-color: #2a3f7a; 
      }
    }
  }

  &__action-icon {
    
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
}
</style>
