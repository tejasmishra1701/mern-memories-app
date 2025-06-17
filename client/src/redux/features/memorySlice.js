import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

export const createMemory = createAsyncThunk(
    'memories/createMemory',
    async (memoryData, { rejectWithValue }) => {
        try {
            const response = await api.createMemory(memoryData);
            return response.data;
        } catch (error) {
            console.error('Create memory error:', error);
            return rejectWithValue(error.response?.data?.message || 'Failed to create memory');
        }
    }
);

export const getMemories = createAsyncThunk(
    'memories/getMemories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getMemories();
            return response.data;
        } catch (error) {
            console.error('Get memories error:', error);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch memories');
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
                state.error = null;
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
                state.error = null;
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

export const { clearError } = memorySlice.actions;
export default memorySlice.reducer;