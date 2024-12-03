import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

// Middleware to authenticate the user
export const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    console.log("No token found in cookies");
    throw new UnauthenticatedError('Authentication required');
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new UnauthenticatedError('Invalid or expired token');
  }
};

// Middleware to authorize specific roles
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        throw new UnauthorizedError('Unauthorized to access this route');
      }

      // Move to the next middleware or controller
      next();
    } catch (error) {
      console.error('Authorization Error:', error);
      throw error;
    }
  };
};
