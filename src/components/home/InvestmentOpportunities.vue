<template>
  <div class="investment-opportunities-section">
    <div class="section-header">
      <h2>Oportunidades de inversión</h2>
      <p class="subtitle">Explora Nuestra Oferta de Complejos Residenciales</p>
    </div>
    
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando oportunidades de inversión...</p>
    </div>
    
    <div v-else-if="investmentProperties.length === 0" class="no-properties-container">
      <div class="no-properties-icon">💼</div>
      <h3 class="no-properties-title">No hay oportunidades de inversión</h3>
      <p class="no-properties-message">
        <br>Revisa pronto para nuevas oportunidades.
      </p>
    </div>
    
    <div v-else class="property-cards-container">
      <div class="cards-row">
        <div 
          v-for="property in currentPageProperties" 
          :key="`investment-${property.direccion.calle}-${property.direccion.altura}-${property.precio}`"
          class="property-card"
        >
          <div class="property-card__image">
            <img 
              :src="property.imagenUrl || '/images/house.svg'" 
              :alt="`${property.tipo} en ${formatAddress(property.direccion)}`"
              @error="handleImageError"
            >
          </div>
          
          <div class="property-card__content">
            <div class="property-card__title-price">
              <h3 class="property-card__title">
                {{ property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1) }}
              </h3>
              <div class="property-card__price">
                {{ formatPrice(property.precio) }}
              </div>
            </div>
            
            <div class="property-card__details">
              <!-- Para complejos (oportunidades de inversión) -->
              <template v-if="property.tipo === 'complejo'">
                <div class="property-card__detail" v-if="property.cantidadEdificios">
                  <img src="/images/dashboard/edificio.svg" alt="Edificios" class="property-card__detail-icon">
                  <span>{{ property.cantidadEdificios }}</span>
                </div>
                <div class="property-card__detail property-card__detail--status" v-if="property.estadoComplejo">
                  <span class="status-text">{{ formatEstadoComplejo(property.estadoComplejo) }}</span>
                </div>
                <div class="property-card__detail">
                  <img src="/images/area.svg" alt="Área" class="property-card__detail-icon">
                  <span>{{ property.superficie }}m²</span>
                </div>
              </template>
              <!-- Para otros tipos de propiedades -->
              <template v-else>
                <div class="property-card__detail" v-if="property.dormitorios > 0">
                  <img src="/images/dormitorio.svg" alt="Dormitorios" class="property-card__detail-icon">
                  <span>{{ property.dormitorios }}</span>
                </div>
                <div class="property-card__detail" v-if="property.banios > 0">
                  <img src="/images/banios.svg" alt="Baños" class="property-card__detail-icon">
                  <span>{{ property.banios }}</span>
                </div>
                <div class="property-card__detail">
                  <img src="/images/area.svg" alt="Área" class="property-card__detail-icon">
                  <span>{{ property.superficie }}m²</span>
                </div>
              </template>
            </div>
            
            <p class="property-card__address">
              {{ formatAddress(property.direccion) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pagination" v-if="!isLoading && totalPages > 1">
      <button 
        class="pagination-arrow pagination-arrow--prev"
        @click="goToPrevPage"
        :disabled="currentPageGroup === 0"
      >
        &#8249;
      </button>
      
      <div 
        v-for="page in visiblePages" 
        :key="page"
        @click="goToPage(page); updatePageGroup(page)"
        class="pagination-dot" 
        :class="{ 'active': currentPage === page }"
      ></div>
      
      <button 
        class="pagination-arrow pagination-arrow--next"
        @click="goToNextPage"
        :disabled="currentPageGroup === totalPageGroups - 1"
      >
        &#8250;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { propertiesService } from '@/services/properties.service'
import type { Property } from '@/interfaces/properties.interface'

const investmentProperties = ref<Property[]>([])
const isLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 4

const totalPages = computed(() => {
  const pages = Math.ceil(investmentProperties.value.length / itemsPerPage)
  return pages
})

const currentPageGroup = ref(0) 
const pagesPerGroup = 3 


const visiblePages = computed(() => {
  const startPage = currentPageGroup.value * pagesPerGroup + 1
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages.value)
  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const totalPageGroups = computed(() => Math.ceil(totalPages.value / pagesPerGroup))

const currentPageProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return investmentProperties.value.slice(start, end)
})

const formatPrice = (price: number): string => {
  return propertiesService.formatPrice(price)
}

const formatAddress = (direccion: Property['direccion']): string => {
  return propertiesService.formatAddress(direccion)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/house.svg'
}

const formatEstadoComplejo = (estado: string): string => {
  switch (estado) {
    case 'en_construccion':
      return 'En Construcción'
    case 'terminado':
      return 'Terminado'
    default:
      return estado
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const goToPrevPage = () => {
  if (currentPageGroup.value > 0) {
    currentPageGroup.value--
    currentPage.value = currentPageGroup.value * pagesPerGroup + 1
  }
}

const goToNextPage = () => {
  if (currentPageGroup.value < totalPageGroups.value - 1) {
    currentPageGroup.value++
    currentPage.value = currentPageGroup.value * pagesPerGroup + 1
  }
}

const updatePageGroup = (page: number) => {
  currentPageGroup.value = Math.floor((page - 1) / pagesPerGroup)
}

const loadInvestmentProperties = () => {
  isLoading.value = propertiesService.isLoading.value
  investmentProperties.value = propertiesService.investmentProperties.value
  currentPage.value = 1
  currentPageGroup.value = 0 
}

watch(() => propertiesService.investmentProperties.value, () => {
  investmentProperties.value = propertiesService.investmentProperties.value
}, { immediate: true })

watch(() => propertiesService.isLoading.value, (newValue) => {
  isLoading.value = newValue
}, { immediate: true })

onMounted(() => {
  loadInvestmentProperties()
})
</script>

<style lang="scss" scoped>
.investment-opportunities-section {
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
  width: 1041px;
  height: 96px;
  margin: 0 auto; 
  opacity: 1;
  gap: 20px;
  
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 50px;
  letter-spacing: 0.3px;
  text-align: center;
  
  color: #222222;
  
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  width: 530px;
  height: 26px;
  margin: 0 auto; 
  opacity: 1;
  
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  text-align: center;
  
  color: #838383;
  
  margin-top: 0rem;
  margin-bottom: 1.5rem; 
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
  border-radius: 0;
  background: var(--crema, #FCFCFC);
  
  box-shadow: 
    0px 4.16px 8.32px 0px #6A64A61A,
    0px 15.95px 15.95px 0px #6A64A617,
    0px 35.37px 20.8px 0px #6A64A60D,
    0px 62.41px 24.97px 0px #6A64A603,
    0px 97.78px 27.74px 0px #6A64A600;
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
  
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

  &__image {
    width: 229px;
    height: 200px;
    position: relative;
    overflow: hidden;
    transform: rotate(0deg);
    opacity: 1;
    border-radius: 0 !important;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0 !important;
      border: none !important;
    }
  }



  &__content {
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 1;
    height: 99px;
  }

  &__title-price {
    width: calc(100% - 28px);
    height: 21px;
    position: absolute;
    top: 7px;
    left: 14px;
    right: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: rotate(0deg);
    opacity: 1;
  }

  &__price {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 110%;
    letter-spacing: 0%;
    text-align: right;
    vertical-align: middle;
    min-width: 80px;
    height: 21px;
    transform: rotate(0deg);
    opacity: 1;
    color: #365196;
    margin: 0;
    white-space: nowrap;
  }

  &__title {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 11.1px;
    line-height: 100%;
    letter-spacing: 0%;
    vertical-align: middle;
    color: #222222;
    margin: 0;
  }

  &__address {
    width: 201.10870361328125px;
    height: 27px;
    position: absolute;
    top: 68px;
    left: 14px;
    transform: rotate(0deg);
    opacity: 1;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 9.71px;
    line-height: 100%;
    letter-spacing: 0%;
    vertical-align: middle;
    color: #838383;
    margin: 0;
  }

  &__details {
    width: 204px;
    height: 21px;
    position: absolute;
    top: 37px;
    left: 12px;
    right: 12px;
    transform: rotate(0deg);
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__detail {
    height: 21.962383270263672px;
    transform: rotate(0deg);
    opacity: 1;
    padding: 0 7.08px;
    gap: 2.83px;
    border-radius: 7.08px;
    background: var(--fondo-claro-nuevo, #F8F9FB);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #666666;
    min-width: fit-content;

    &-icon {
      width: 12px;
      height: 12px;
    }

    &--status {
      background: transparent;
      color: #365196;
      padding: 0 10px;
      border-radius: 12px;
      min-width: 80px;

      .status-text {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 9px;
        line-height: 100%;
        letter-spacing: 0%;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
      }
    }
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 15px;

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #838383;
    margin: 0;
  }
}

.no-properties-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  gap: 15px;
}

.no-properties-icon {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.6;
}

.no-properties-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #365196;
  margin: 0;
}

.no-properties-message {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #838383;
  margin: 0;
  line-height: 1.5;
  max-width: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #365196;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .investment-opportunities-section {
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
    
    &__image {
      width: 100% !important;
      border-radius: 0 !important;
      
      img {
        border-radius: 0 !important;
        border: none !important;
      }
    }
  }
}

@media (max-width: 480px) {
  .investment-opportunities-section {
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
    
    &__image {
      width: 100% !important;
      border-radius: 0 !important;
      
      img {
        border-radius: 0 !important;
        border: none !important;
      }
    }
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

.pagination-arrow {
  background: #365196;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #2a3f7a;
    transform: scale(1.1);
  }
  
  &:disabled {
    background: #C0C0C0;
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &--prev {
    margin-right: 5px;
  }
  
  &--next {
    margin-left: 5px;
  }
}

:root {
  --crema: #FCFCFC;
  --fondo-claro: #F8F9FB;
  --fondo-claro-nuevo: #F8F9FB;
}
</style>
