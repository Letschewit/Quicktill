// Base API configuration and utility functions
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }
    return Promise.reject(new Error(error.response.data.message || 'An error occurred'));
  } else if (error.request) {
    // The request was made but no response was received
    return Promise.reject(new Error('No response from server. Please check your connection.'));
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(new Error('Error setting up request.'));
  }
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function to make API requests
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw { response: { status: response.status, data: error } };
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export default { API_BASE_URL, apiRequest, handleApiError, getAuthHeader };