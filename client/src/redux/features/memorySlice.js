import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api'; // Updated path to point to src/api folder

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
            console.log('Creating memory with data:', memoryData);
            const response = await api.createMemory(memoryData);
            console.log('Server response:', response);
            return response.data;
        } catch (error) {
            console.error('Create memory error:', error.response?.data);
            return rejectWithValue(error.response?.data?.message || 'Failed to create memory');
        }
    }
);

export const likeMemory = createAsyncThunk(
    'memories/likeMemory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.likeMemory(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to like memory');
        }
    }
);

export const commentMemory = createAsyncThunk(
    'memories/commentMemory',
    async ({ id, comment }, { rejectWithValue }) => {
        try {
            const response = await api.commentMemory(id, { text: comment });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
        }
    }
);

export const deleteMemory = createAsyncThunk(
    'memories/deleteMemory',
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteMemory(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete memory');
        }
    }
);

const memorySlice = createSlice({
    name: 'memories',
    initialState: {
        memories: [],
        currentMemory: null,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
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
                state.error = null;
            })
            .addCase(createMemory.fulfilled, (state, action) => {
                state.loading = false;
                state.memories.unshift(action.payload);
            })
            .addCase(createMemory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(likeMemory.fulfilled, (state, action) => {
                const index = state.memories.findIndex(
                    (memory) => memory._id === action.payload._id
                );
                if (index !== -1) {
                    state.memories[index] = action.payload;
                }
            })
            .addCase(commentMemory.fulfilled, (state, action) => {
                const index = state.memories.findIndex(
                    (memory) => memory._id === action.payload._id
                );
                if (index !== -1) {
                    state.memories[index] = action.payload;
                }
            })
            .addCase(deleteMemory.fulfilled, (state, action) => {
                state.memories = state.memories.filter(memory => memory._id !== action.payload);
            });
    }
});

export const { clearError } = memorySlice.actions;
export default memorySlice.reducer;