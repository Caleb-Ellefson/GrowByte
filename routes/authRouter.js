import { Router } from 'express';
const router = Router();

import {
  login,
  logout,
  register,
  registerHub,
  generateNewApiKey,
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

// HUB registration (requires admin permission)
router.post(
  '/register-hub',
  registerHub
);

// Generate a new API key for a HUB (requires admin permission)
router.post(
  '/generate-api-key',
  authenticateUser,
  generateNewApiKey
);

export default router;
