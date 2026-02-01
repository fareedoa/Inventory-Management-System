import api from './api';

/**
 * Get all categories
 * @param {boolean} includeInactive - Whether to include inactive categories
 * @returns {Promise} Categories data
 */
export const getAllCategories = async (includeInactive = false) => {
    const params = includeInactive ? { includeInactive: 'true' } : {};
    const response = await api.get('/categories', { params });
    return response.data;
};

/**
 * Get single category by ID
 * @param {string} id - Category ID
 * @returns {Promise} Category data
 */
export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

/**
 * Create new category
 * @param {Object} categoryData - Category data (name, description)
 * @returns {Promise} Created category data
 */
export const createCategory = async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
};

/**
 * Update existing category
 * @param {string} id - Category ID
 * @param {Object} categoryData - Updated category data
 * @returns {Promise} Updated category data
 */
export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
};

/**
 * Delete category
 * @param {string} id - Category ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

/**
 * Toggle category active status
 * @param {string} id - Category ID
 * @returns {Promise} Updated category data
 */
export const toggleCategoryStatus = async (id) => {
    const response = await api.patch(`/categories/${id}/toggle`);
    return response.data;
};
