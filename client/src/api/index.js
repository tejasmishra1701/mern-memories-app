import axios from 'axios';
import config from '../config/config';

const API = axios.create({ 
    baseURL: config.API_URL
});

// Request interceptor
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('Token present in request');
        req.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log('No token found');
    }
    return req;
}, (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
});

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
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
export const getMemories = () => {
    console.log('Making GET request to /memory');
    return API.get('/memory');
};
export const createMemory = (newMemory) => API.post('/memory', newMemory);
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