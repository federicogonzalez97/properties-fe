
export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',

  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
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
  PROPERTIES: {
    BASE: `${config.API_URL}/poperties-real-state`,
  },
  DASHBOARD: {
    METRICS: `${config.API_URL}/dashboard/metrics`,
    REVENUE: `${config.API_URL}/dashboard/revenue`,
    SALES_DISTRIBUTION: `${config.API_URL}/dashboard/sales-distribution`,
    RECENT_TRANSACTIONS: `${config.API_URL}/dashboard/recent-transactions`,
    TOP_PROPERTIES: `${config.API_URL}/dashboard/top-properties`,
  },
};

export const FRONTEND_URLS = {
  SUCCESS: `${config.FRONTEND_URL}/auth/success`,
  ERROR: `${config.FRONTEND_URL}/auth/error`,
};