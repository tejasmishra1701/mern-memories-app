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
            const response = await api.createMemory(memoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
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
            });
    }
});

export const { clearError } = memorySlice.actions;
export default memorySlice.reducer;