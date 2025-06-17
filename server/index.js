import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import memoryRoutes from './routes/memory.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://memories-app-two.vercel.app/'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

// Add this before other routes
app.get('/', (req, res) => {
    res.json({ message: 'Memories API is running' });
});

// Routes
app.use('/memory', memoryRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
