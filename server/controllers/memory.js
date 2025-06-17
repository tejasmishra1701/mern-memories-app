import mongoose from 'mongoose';
import Memory from '../models/memory.js';

export const getMemories = async (req, res) => {
    try {
        console.log('Fetching memories...');
        console.log('User ID from token:', req.userId);
        
        const memories = await Memory.find()
            .populate('creator', 'name username avatar')
            .sort({ createdAt: -1 });
        
        console.log('Found memories:', memories.length);
        console.log('Memory details:', memories.map(m => ({
            id: m._id,
            title: m.title,
            creator: m.creator?._id
        })));
        
        res.status(200).json(memories);
    } catch (error) {
        console.error('Error fetching memories:', error);
        res.status(500).json({ message: 'Failed to fetch memories' });
    }
};

export const createMemory = async (req, res) => {
    try {
        console.log('Creating memory, user:', req.userId);
        const memory = req.body;
        
        const newMemory = new Memory({
            ...memory,
            creator: req.userId,
            createdAt: new Date().toISOString()
        });

        await newMemory.save();
        const populatedMemory = await Memory.findById(newMemory._id)
            .populate('creator', 'name username avatar');

        console.log('Memory created:', newMemory._id);
        res.status(201).json(populatedMemory);
    } catch (error) {
        console.error('Error creating memory:', error);
        res.status(409).json({ message: 'Failed to create memory' });
    }
};

export const updateMemory = async (req, res) => {
    const { id } = req.params;
    const memory = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No memory with that id');

    const updatedMemory = await Memory.findByIdAndUpdate(
        id, 
        { ...memory, _id: id }, 
        { new: true }
    );

    res.json(updatedMemory);
};

export const deleteMemory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        const memory = await Memory.findById(id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Check if user is the creator
        if (memory.creator.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this memory' });
        }

        await Memory.findByIdAndDelete(id);
        res.json({ message: 'Memory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete memory' });
    }
};

export const likeMemory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        const memory = await Memory.findById(id);
        
        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Check if user has already liked
        const likeIndex = memory.likes.indexOf(userId);
        
        // Toggle like
        if (likeIndex === -1) {
            memory.likes.push(userId);
        } else {
            memory.likes.splice(likeIndex, 1);
        }

        const updatedMemory = await Memory.findByIdAndUpdate(
            id,
            { likes: memory.likes },
            { 
                new: true,
                runValidators: true
            }
        ).populate([
            { path: 'creator', select: 'username' },
            { path: 'comments.creator', select: 'username' }
        ]);

        res.status(200).json(updatedMemory);
    } catch (error) {
        console.error('Like error:', error);
        res.status(500).json({ message: 'Failed to update like' });
    }
};

export const commentMemory = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const memory = await Memory.findById(id);
        
        if (!memory) {
            return res.status(404).json({ message: "Memory not found" });
        }

        const comment = {
            text,
            creator: req.userId,
            createdAt: new Date()
        };

        memory.comments.push(comment);

        const updatedMemory = await Memory.findByIdAndUpdate(
            id,
            memory,
            { new: true }
        ).populate([
            { path: 'creator', select: 'username' },
            { path: 'comments.creator', select: 'username' }
        ]);

        res.json(updatedMemory);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
