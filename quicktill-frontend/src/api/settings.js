import { apiRequest } from './config';

export const getSettings = async () => {
  return apiRequest('/settings');
};

export const updateSettings = async (settingsData) => {
  return apiRequest('/settings', {
    method: 'PUT',
    body: JSON.stringify(settingsData)
  });
};

export const getReceiptSettings = async () => {
  return apiRequest('/settings/receipt');
};

export const updateReceiptSettings = async (receiptData) => {
  return apiRequest('/settings/receipt', {
    method: 'PUT',
    body: JSON.stringify(receiptData)
  });
};

export const resetSettings = async () => {
  return apiRequest('/settings/reset', {
    method: 'POST'
  });
};