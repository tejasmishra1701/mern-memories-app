import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import memoryRoutes from './routes/memory.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://memories-app-two.vercel.app', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/memory', memoryRoutes);  // Make sure this route is properly mounted

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port: ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
