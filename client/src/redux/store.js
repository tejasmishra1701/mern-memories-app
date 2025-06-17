import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import memoryReducer from './features/memorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        memories: memoryReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});