import mongoose from 'mongoose';
import Memory from '../models/memory.js';

export const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find().sort({ createdAt: -1 });
        res.status(200).json(memories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMemory = async (req, res) => {
    const memory = req.body;
    const newMemory = new Memory({ ...memory, creator: req.userId });

    try {
        await newMemory.save();
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