import express from 'express';
import { registerUser, loginUser, searchUserByUsername } from '../controllers/userController.js';

const router = express.Router();

// Define routes and forward to the controller
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/searchUsername', searchUserByUsername);

export default router;
