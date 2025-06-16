import express from 'express';
import { getMemories, createMemory, updateMemory, deleteMemory } from '../controllers/memory.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemories);
router.post('/', auth, createMemory);
router.patch('/:id', auth, updateMemory);
router.delete('/:id', auth, deleteMemory);

export default router;