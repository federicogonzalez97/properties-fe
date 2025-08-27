import { ref } from 'vue';
import axiosInstance from './axios.config';
import { API_ENDPOINTS } from '@/config/env';
import type { PropertyFilter, Property } from '@/interfaces/properties.interface';
import { FILTER_OPTIONS } from '@/interfaces/properties.interface';

export type { PropertyFilter, Property };

// Estado global de propiedades
const allProperties = ref<Property[]>([]);
const properties = ref<Property[]>([]);
const investmentProperties = ref<Property[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

export { FILTER_OPTIONS };

export const propertiesService = {
  // Estado
  allProperties,
  properties,
  investmentProperties,
  isLoading,
  error,

  async loadAllProperties(): Promise<void> {
    try {
      isLoading.value = true;
      error.value = null;

      const url = `${API_ENDPOINTS.PROPERTIES.BASE}?limit=60`;
      const response = await axiosInstance.get<Property[]>(url);


      
      allProperties.value = response.data;
      
      const regulares = response.data.filter(p => !p.inversion);
      const inversion = response.data.filter(p => p.inversion);
      
      const uniqueRegulares = regulares.filter((prop, index, arr) => 
        index === arr.findIndex(p => 
          p.precio === prop.precio && 
          p.tipo === prop.tipo && 
          p.direccion.calle === prop.direccion.calle &&
          p.direccion.altura === prop.direccion.altura
        )
      );
      
      const uniqueInversion = inversion.filter((prop, index, arr) => 
        index === arr.findIndex(p => 
          p.precio === prop.precio && 
          p.tipo === prop.tipo && 
          p.direccion.calle === prop.direccion.calle &&
          p.direccion.altura === prop.direccion.altura
        )
      );
      
      properties.value = uniqueRegulares;
      investmentProperties.value = uniqueInversion;
      


    } catch (err) {
      console.error('Error loading all properties:', err);
      error.value = 'Error al cargar las propiedades';
    } finally {
      isLoading.value = false;
    }
  },

  async getProperties(filters: PropertyFilter = {}): Promise<Property[]> {
    try {
      isLoading.value = true;
      error.value = null;

      const queryParams = new URLSearchParams();

      if (filters.operacion) queryParams.append('operacion', filters.operacion);
      if (filters.tipo) queryParams.append('tipo', filters.tipo);
      if (filters.dormitorios) queryParams.append('dormitorios', filters.dormitorios.toString());
      if (filters.precio) queryParams.append('precio', filters.precio.toString());
      if (filters.ubicacion) queryParams.append('ubicacion', filters.ubicacion);
      if (filters.q) queryParams.append('q', filters.q);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const url = `${API_ENDPOINTS.PROPERTIES.BASE}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

      const response = await axiosInstance.get<Property[]>(url);



      const regulares = response.data.filter(p => !p.inversion);
      const inversion = response.data.filter(p => p.inversion);
      
      const uniqueRegulares = regulares.filter((prop, index, arr) => 
        index === arr.findIndex(p => 
          p.precio === prop.precio && 
          p.tipo === prop.tipo && 
          p.direccion.calle === prop.direccion.calle &&
          p.direccion.altura === prop.direccion.altura
        )
      );
      
      const uniqueInversion = inversion.filter((prop, index, arr) => 
        index === arr.findIndex(p => 
          p.precio === prop.precio && 
          p.tipo === prop.tipo && 
          p.direccion.calle === prop.direccion.calle &&
          p.direccion.altura === prop.direccion.altura
        )
      );
      
      properties.value = uniqueRegulares;
      investmentProperties.value = uniqueInversion;
      


      return response.data;
    } catch (err) {
      console.error('Error fetching properties:', err);
      error.value = 'Error al cargar las propiedades';
      return [];
    } finally {
      isLoading.value = false;
    }
  },





  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  },


  formatAddress(direccion: Property['direccion']): string {
    return `${direccion.calle} ${direccion.altura}, ${direccion.provincia}`;
  },
};

export default propertiesService;
