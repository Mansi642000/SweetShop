import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (username, password) =>
  api.post('/auth/register', { username, password });

export const login = (username, password) =>
  api.post('/auth/login', { username, password });

export const getSweets = () => api.get('/sweets');

export const searchSweets = (params) => api.get('/sweets/search', { params });

export const createSweet = (sweet) => api.post('/sweets', sweet);

export const updateSweet = (id, sweet) => api.put(`/sweets/${id}`, sweet);

export const deleteSweet = (id) => api.delete(`/sweets/${id}`);

export const purchaseSweet = (id) => api.post(`/sweets/${id}/purchase`);

export const restockSweet = (id, quantity) =>
  api.post(`/sweets/${id}/restock`, { quantity });

export default api;