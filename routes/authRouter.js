import { Router } from 'express';
const router = Router();

import {
  login,
  logout,
  register,
} from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';

// User registration
router.post('/register', validateRegisterInput, register);

// User login
router.post('/login', validateLoginInput, login);

// User logout (requires authentication)
router.get('/logout', authenticateUser, logout);

export default router;
