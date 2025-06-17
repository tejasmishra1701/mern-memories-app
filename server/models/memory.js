import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 2000
    },
    image: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: [{
        type: String,
        trim: true
    }],
    comments: [{
        text: {
            type: String,
            required: true,
            trim: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Memory', memorySchema);