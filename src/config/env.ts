// Configuración de variables de entorno
export const config = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // OAuth Configuration (opcional, para desarrollo)
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID,
  
  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD
}

// Endpoints de la API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${config.API_URL}/auth/login`,
    REGISTER: `${config.API_URL}/auth/register`,
    GOOGLE: `${config.API_URL}/auth/google`,
    FACEBOOK: `${config.API_URL}/auth/facebook`,
    PROFILE: `${config.API_URL}/auth/profile`,
    VERIFY: `${config.API_URL}/auth/verify`,
    LOGOUT: `${config.API_URL}/auth/logout`
  }
}

// Frontend URLs para callbacks OAuth
export const FRONTEND_URLS = {
  SUCCESS: `${config.API_URL.includes('localhost') ? 'http://localhost:5173' : config.API_URL}/auth/success`,
  ERROR: `${config.API_URL.includes('localhost') ? 'http://localhost:5173' : config.API_URL}/auth/error`
}
