import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Add token to every request if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth APIs
export const login = (formData) => API.post('/auth/signin', formData);
export const signup = (formData) => API.post('/auth/signup', formData);
export const updateProfile = (id, formData) => API.patch(`/auth/${id}`, formData);

// Memory APIs
export const getMemories = () => API.get('/memory');
export const createMemory = (newMemory) => API.post('/memory', newMemory);
export const updateMemory = (id, updatedMemory) => API.patch(`/memory/${id}`, updatedMemory);
export const deleteMemory = (id) => API.delete(`/memory/${id}`);
export const likeMemory = (id) => API.patch(`/memory/${id}/like`);

// Search APIs
export const searchMemories = (searchQuery) => 
    API.get(`/memory/search?searchQuery=${searchQuery}`);

// User APIs
export const getUserProfile = (id) => API.get(`/user/${id}`);
export const followUser = (id) => API.patch(`/user/${id}/follow`);
export const unfollowUser = (id) => API.patch(`/user/${id}/unfollow`);

export default API;