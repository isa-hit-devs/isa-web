import axios from 'axios';

// Configurable base URL: In dev, requests to /api are proxied by Vite to the backend.
// In production, VITE_API_BASE_URL can be configured if hosted on a separate domain.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 30000,
});

// Request Interceptor: Attach Bearer JWT token silently without logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('isa_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user session on unauthorized / expired token
      localStorage.removeItem('isa_auth_token');
      localStorage.removeItem('isa_user');
      
      // Dispatch custom event so AuthContext can sync state if active
      window.dispatchEvent(new CustomEvent('isa_auth_unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
