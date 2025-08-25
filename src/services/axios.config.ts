import axios from 'axios'
import { config } from '@/config/env'

// Crear instancia de Axios con configuración base
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token de autorización a todas las requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Si el token es inválido (401), limpiar localStorage
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      // Opcional: redirigir al login
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
