import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY, MESSAGES } from '../utils/constants';
import { toast } from 'react-toastify';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          // but ONLY if we are not already trying to login (which would cause a loop or bad UX on wrong password)
          if (!error.config.url.includes('/auth/login')) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem('user');
            toast.error(MESSAGES.UNAUTHORIZED);
            window.location.href = '/login';
          }
          break;
        case 403:
          toast.error('Access forbidden');
          break;
        case 404:
          toast.error(data.message || 'Resource not found');
          break;
        case 500:
          toast.error(MESSAGES.SERVER_ERROR);
          break;
        default:
          toast.error(data.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      toast.error(MESSAGES.NETWORK_ERROR);
    } else {
      // Something else happened
      toast.error('An error occurred');
    }

    return Promise.reject(error);
  }
);

export default api;
