import { apiRequest } from './config';

export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/products?${queryParams}`);
};

export const getProduct = async (id) => {
  return apiRequest(`/products/${id}`);
};

export const createProduct = async (productData) => {
  const formData = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return apiRequest('/products', {
    method: 'POST',
    headers: {}, // Let browser set content-type for FormData
    body: formData
  });
};

export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  formData.append('_method', 'PUT'); // Laravel method spoofing

  return apiRequest(`/products/${id}`, {
    method: 'POST', // Using POST for FormData with method spoofing
    headers: {}, // Let browser set content-type for FormData
    body: formData
  });
};

export const deleteProduct = async (id) => {
  return apiRequest(`/products/${id}`, {
    method: 'DELETE'
  });
};

export const getCategories = async () => {
  return apiRequest('/products/categories');
};

export const getLowStockProducts = async () => {
  return apiRequest('/products/stock-alert');
};

export const adjustStock = async (productId, adjustment, reason) => {
  return apiRequest(`/products/${productId}/adjust-stock`, {
    method: 'POST',
    body: JSON.stringify({ adjustment, reason })
  });
};