import { Router } from 'express';
const router = Router();

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { authenticateUser, authorizePermissions } from '../middleware/authMiddleware.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';

// Get current user (requires authentication)
router.get('/current-user', authenticateUser, getCurrentUser);

// Admin: Get application statistics (requires authentication and admin role)
router.get(
  '/admin/app-stats',
  authenticateUser,
  authorizePermissions('admin'),
  getApplicationStats
);

// Update user (requires authentication and input validation)
router.patch('/update-user', authenticateUser, validateUpdateUserInput, updateUser);

export default router;
