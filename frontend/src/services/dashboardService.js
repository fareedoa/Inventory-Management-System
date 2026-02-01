import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get dashboard statistics
 * This calculates stats from all products
 */
export const getDashboardStats = async () => {
  try {
    // Fetch all products
    const productsResponse = await api.get(API_ENDPOINTS.PRODUCTS);
    const products = productsResponse.data.data || [];

    // Fetch low stock products
    const lowStockResponse = await api.get(API_ENDPOINTS.LOW_STOCK_PRODUCTS);
    const lowStockProducts = lowStockResponse.data.data || [];

    // Fetch out of stock products
    const outOfStockResponse = await api.get(API_ENDPOINTS.OUT_OF_STOCK_PRODUCTS);
    const outOfStockProducts = outOfStockResponse.data.data || [];

    // Calculate total value
    const totalValue = products.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);

    return {
      success: true,
      data: {
        totalItems: products.length,
        lowStock: lowStockProducts.length,
        outOfStock: outOfStockProducts.length,
        totalValue: totalValue,
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

/**
 * Get recent items (latest 5 products)
 */
export const getRecentItems = async (limit = 5) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS);
    const products = response.data.data || [];
    
    // Return only the latest 'limit' items
    // Backend already sorts by createdAt descending
    return {
      success: true,
      data: products.slice(0, limit)
    };
  } catch (error) {
    console.error('Error fetching recent items:', error);
    throw error;
  }
};