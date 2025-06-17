import mongoose from 'mongoose';

const memorySchema = mongoose.Schema({
    title: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String,
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    comments: [{
        text: String,
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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