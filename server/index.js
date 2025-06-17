import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import memoryRoutes from './routes/memory.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://memories-app-two.vercel.app/'
    ],
    credentials: true
}));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Memories API is running' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/memory', memoryRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
