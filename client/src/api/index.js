import axios from 'axios';
import config from '../config/config';

const API = axios.create({ 
    baseURL: config.API_URL
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request headers:', req.headers); // Debug log
    return req;
});

API.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            endpoint: error.config?.url,
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return Promise.reject(error);
    }
);

// Auth APIs
export const login = (formData) => API.post('/auth/signin', formData);
export const signup = (formData) => API.post('/auth/signup', formData);
export const updateProfile = (id, userData) => API.patch(`/user/${id}`, userData);

// Memory APIs
export const getMemories = () => API.get('/memory');
export const createMemory = (memoryData) => {
    console.log('API call data:', memoryData);
    return API.post('/memory', memoryData);
};
export const updateMemory = (id, updatedMemory) => API.patch(`/memory/${id}`, updatedMemory);
export const deleteMemory = (id) => API.delete(`/memory/${id}`);
export const likeMemory = (id) => API.patch(`/memory/${id}/like`);
export const commentMemory = (id, comment) => API.post(`/memory/${id}/comment`, comment);

// Search APIs
export const searchMemories = (searchQuery) => 
    API.get(`/memory/search?searchQuery=${searchQuery}`);

// User APIs
export const getUserProfile = (id) => API.get(`/user/${id}`);
export const followUser = (id) => API.patch(`/user/${id}/follow`);
export const unfollowUser = (id) => API.patch(`/user/${id}/unfollow`);

export default API;