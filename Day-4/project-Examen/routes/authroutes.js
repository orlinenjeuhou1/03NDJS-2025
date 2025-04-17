import express from 'express';
import { register, login, getProfile, getAllUsers, deleteUser } from "../controllers/authcontrollers.js";
import { authenticateToken, requireAdmin } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get('/me', authenticateToken, getProfile);

router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.delete('/users/:id', authenticateToken, requireAdmin, deleteUser);

export default router;
