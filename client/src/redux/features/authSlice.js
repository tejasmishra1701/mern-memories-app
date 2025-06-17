import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

export const login = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.login(formData);
            // Save token immediately after successful login
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.signup(formData);
            // Save token immediately after successful signup
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            console.log('Updating profile with:', formData);
            const response = await api.updateProfile(id, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Update failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token'),
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.result;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.result;
                state.token = action.payload.token;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;