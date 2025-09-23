import { apiRequest } from './config';

export const getSales = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/sales?${queryParams}`);
};

export const getSaleStats = async () => {
  return apiRequest('/sales/stats');
};

export const createSale = async (saleData) => {
  return apiRequest('/sales', {
    method: 'POST',
    body: JSON.stringify(saleData)
  });
};

export const getSale = async (id) => {
  return apiRequest(`/sales/${id}`);
};

export const getSalesChartData = async (period = 'month') => {
  return apiRequest(`/sales/stats?period=${period}`);
};