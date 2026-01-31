import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all products
 */
export const getAllProducts = async () => {
  const response = await api.get(API_ENDPOINTS.PRODUCTS);
  return response.data;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  const response = await api.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return response.data;
};

/**
 * Create new product
 */
export const createProduct = async (productData) => {
  const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
  return response.data;
};

/**
 * Update product
 */
export const updateProduct = async (id, productData) => {
  const response = await api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData);
  return response.data;
};

/**
 * Delete product
 */
export const deleteProduct = async (id) => {
  const response = await api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return response.data;
};

/**
 * Search products
 */
export const searchProducts = async (query) => {
  const response = await api.get(`${API_ENDPOINTS.PRODUCTS}?search=${query}`);
  return response.data;
};

/**
 * Filter products by category
 */
export const filterProductsByCategory = async (categoryId) => {
  const response = await api.get(`${API_ENDPOINTS.PRODUCTS}?category=${categoryId}`);
  return response.data;
};
