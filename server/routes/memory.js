import express from 'express';
import auth from '../middleware/auth.js';
import { 
    createMemory, 
    getMemories, 
    updateMemory, 
    deleteMemory, 
    likeMemory,
    commentMemory
} from '../controllers/memory.js';

const router = express.Router();

// Memory routes
router.get('/', auth, getMemories);
router.post('/', auth, createMemory);
router.patch('/:id', auth, updateMemory);
router.delete('/:id', auth, deleteMemory);
router.patch('/:id/like', auth, likeMemory);
router.post('/:id/comment', auth, commentMemory);

export default router;