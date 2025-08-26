// config.ts
export const config = {
  // API (backend)
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',

  // FRONT (este sitio; para armar redirects de OAuth)
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',

  // Opcional (solo si los usás en el front)
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID,

  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${config.API_URL}/auth/login`,
    REGISTER: `${config.API_URL}/auth/register`,
    GOOGLE: `${config.API_URL}/auth/google`,
    FACEBOOK: `${config.API_URL}/auth/facebook`,
    PROFILE: `${config.API_URL}/auth/profile`,
    VERIFY: `${config.API_URL}/auth/verify`,
    LOGOUT: `${config.API_URL}/auth/logout`,
  },
};

export const FRONTEND_URLS = {
  SUCCESS: `${config.FRONTEND_URL}/auth/success`,
  ERROR: `${config.FRONTEND_URL}/auth/error`,
};