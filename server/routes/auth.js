import express from 'express';
import { signin, signup } from '../controllers/auth.js';

const router = express.Router();

router.post('/signin', signin); // Make sure it's /signin, not /login
router.post('/signup', signup);

export default router;