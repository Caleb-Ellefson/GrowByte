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
    req.user = null; // Allow the request to proceed unauthenticated
    return next();
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    req.user = null; // Allow the request to proceed unauthenticated
    next();
  }
};

// Middleware to authorize specific roles
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Unauthorized to access this route' });
      }

      // Move to the next middleware or controller
      next();
    } catch (error) {
      console.error('Authorization Error:', error);
      return res.status(403).json({ msg: 'Unauthorized to access this route' });
    }
  };
};
