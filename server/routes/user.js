import express from 'express';
import auth from '../middleware/auth.js'; // Changed from named import to default import
import { 
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
} from '../controllers/user.js';

const router = express.Router();

// Profile routes
router.get('/:id', auth, getUserProfile);
router.patch('/:id', auth, updateProfile);

// Follow/Unfollow routes
router.patch('/:id/follow', auth, followUser);
router.patch('/:id/unfollow', auth, unfollowUser);

// Social routes
router.get('/:id/followers', auth, getFollowers);
router.get('/:id/following', auth, getFollowing);

export default router;