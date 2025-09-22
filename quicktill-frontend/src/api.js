import axios from "axios";

const inferredHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const defaultBase = `http://${inferredHost}:8000/api`;
const configuredBase = (typeof window !== 'undefined' && localStorage.getItem('apiBaseUrl')) || process.env.REACT_APP_API_URL || defaultBase;

const api = axios.create({
  baseURL: configuredBase,
  withCredentials: false,
});

// Add token interceptor for authentication
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Settings (admin)
export const getSettings = () => api.get('/settings');
export const updateSettings = (payload) => api.put('/settings', payload);
export const uploadLogo = (file) => {
  const formData = new FormData();
  formData.append('logo', file);
  return api.post('/settings/logo', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// Profile (all users)
export const updateProfileName = (name) => api.put('/profile/name', { name });
export const updateProfilePassword = (current_password, new_password) => api.put('/profile/password', { current_password, new_password });

export default api;
