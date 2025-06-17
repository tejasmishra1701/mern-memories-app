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
    const { title, description, image, tags } = req.body;

    try {
        if (!title || !description || !image) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newMemory = await Memory.create({
            title,
            description,
            image,
            tags: tags || [],
            creator: req.userId
        });

        await newMemory.populate('creator', 'username');

        res.status(201).json(newMemory);
    } catch (error) {
        res.status(409).json({ message: error.message });
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No memory with that id');

    await Memory.findByIdAndRemove(id);

    res.json({ message: 'Memory deleted successfully' });
};

export const likeMemory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Memory not found" });
        }

        const memory = await Memory.findById(id);

        if (!memory) {
            return res.status(404).json({ message: "Memory not found" });
        }

        const index = memory.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            memory.likes.push(req.userId);
        } else {
            memory.likes = memory.likes.filter((id) => id !== String(req.userId));
        }

        const updatedMemory = await Memory.findByIdAndUpdate(
            id,
            memory,
            { new: true }
        ).populate('creator', 'username');

        res.status(200).json(updatedMemory);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Make sure all controller functions are exported
