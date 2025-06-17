import mongoose from 'mongoose';
import Memory from '../models/memory.js';

export const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find()
            .populate('creator', 'username')  // Add this line to populate creator data
            .sort({ createdAt: -1 });
        res.status(200).json(memories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMemory = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        console.log('Received memory data:', { title, description, hasImage: !!image });

        if (!title || !description || !image) {
            return res.status(400).json({ 
                message: "Please provide all required fields" 
            });
        }

        const newMemory = await Memory.create({
            title,
            description,
            image,
            creator: req.userId
        });

        const populatedMemory = await Memory.findById(newMemory._id)
            .populate('creator', 'username');

        console.log('Memory created successfully:', populatedMemory._id);
        res.status(201).json(populatedMemory);
    } catch (error) {
        console.error('Create memory error:', error);
        res.status(500).json({ 
            message: error.message || "Failed to create memory" 
        });
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
