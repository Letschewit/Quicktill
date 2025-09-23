import { apiRequest } from './config';

export const getUsers = async () => {
  return apiRequest('/users');
};

export const createUser = async (userData) => {
  return apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

export const updateUser = async (id, userData) => {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
};

export const deleteUser = async (id) => {
  return apiRequest(`/users/${id}`, {
    method: 'DELETE'
  });
};

export const updateRole = async (id, role) => {
  return apiRequest(`/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role })
  });
};

export const updateProfile = async (data) => {
  if (data.name) {
    await apiRequest('/profile/name', {
      method: 'PUT',
      body: JSON.stringify({ name: data.name })
    });
  }
  
  if (data.password) {
    await apiRequest('/profile/password', {
      method: 'PUT',
      body: JSON.stringify({ 
        current_password: data.currentPassword,
        password: data.password,
        password_confirmation: data.passwordConfirmation
      })
    });
  }
};