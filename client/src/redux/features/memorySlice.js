import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

export const getMemories = createAsyncThunk(
    'memories/getMemories',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/memories');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const createMemory = createAsyncThunk(
    'memories/createMemory',
    async (memoryData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/memories', memoryData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const memorySlice = createSlice({
    name: 'memories',
    initialState: {
        memories: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMemories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMemories.fulfilled, (state, action) => {
                state.loading = false;
                state.memories = action.payload;
            })
            .addCase(getMemories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createMemory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMemory.fulfilled, (state, action) => {
                state.loading = false;
                state.memories.unshift(action.payload);
            })
            .addCase(createMemory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default memorySlice.reducer;