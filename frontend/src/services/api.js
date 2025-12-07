import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => api.post('/auth/logout'),
};

// Expert API
export const expertService = {
  getProfile: () => api.get('/experts/profile'),
  updateProfile: (data) => api.put('/experts/profile', data),
  addEducation: (data) => api.post('/experts/education', data),
  addExperience: (data) => api.post('/experts/experience', data),
  addSkill: (data) => api.post('/experts/skills', data),
  addAchievement: (data) => api.post('/experts/achievements', data),
  getConsultations: (status) => 
    api.get('/experts/consultations', { params: { status } }),
  respondToConsultation: (consultationId, action) =>
    api.put(`/experts/consultations/${consultationId}/respond`, { action }),
};

// Seeker API
export const seekerService = {
  getProfile: () => api.get('/seekers/profile'),
  updateProfile: (data) => api.put('/seekers/profile', data),
  createConsultation: (data) => api.post('/seekers/consultations', data),
  getConsultations: (status) => 
    api.get('/seekers/consultations', { params: { status } }),
  getMatches: (consultationId) =>
    api.get(`/seekers/consultations/${consultationId}/matches`),
  sendConnectionRequest: (data) => api.post('/seekers/connect', data),
  updateConsultation: (consultationId, data) =>
    api.put(`/seekers/consultations/${consultationId}`, data),
  deleteConsultation: (consultationId) =>
    api.delete(`/seekers/consultations/${consultationId}`),
};

export default api;
