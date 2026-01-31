import api from './api';
import { API_ENDPOINTS, TOKEN_KEY, USER_KEY } from '../utils/constants';

/**
 * Register a new user
 */
export const register = async (userData) => {
  const response = await api.post(API_ENDPOINTS.REGISTER, userData);
  return response.data;
};

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
  const { token, user } = response.data.data;

  // Store token and user in localStorage
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return response.data;
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    await api.post(API_ENDPOINTS.LOGOUT);
  } catch (error) {
    // Continue with logout even if API call fails
    console.error('Logout error:', error);
  } finally {
    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  const response = await api.get(API_ENDPOINTS.ME);
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (userData) => {
  const response = await api.put(API_ENDPOINTS.PROFILE, userData);
  // Update user in localStorage
  localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
  return response.data;
};

/**
 * Change password
 */
export const changePassword = async (passwordData) => {
  const response = await api.put(API_ENDPOINTS.UPDATE_PASSWORD, passwordData);
  return response.data;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
};

/**
 * Get stored user
 */
export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};


/**
 * Get stored token
 */
export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
