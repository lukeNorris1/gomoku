export const DB_URL = !!import.meta.env.VITE_DEVELOPMENT_NODE_APP_API_URL
  ? import.meta.env.VITE_DEVELOPMENT_NODE_APP_API_URL
  : import.meta.env.VITE_NODE_APP_API_URL;
