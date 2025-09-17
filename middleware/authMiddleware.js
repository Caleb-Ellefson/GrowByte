import {
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';
import Hub from '../models/hubModel.js';

// Middleware to authenticate the user or HUB
export const authenticateUser = async (req, res, next) => {
  const apiKeyHeader = req.headers.authorization;
  const token = req.cookies?.token;

  if (apiKeyHeader && apiKeyHeader.startsWith('ApiKey ')) {
    const apiKey = apiKeyHeader.split(' ')[1];

    try {
      const hub = await Hub.findOne({ apiKey });
      if (!hub) throw new UnauthenticatedError('Invalid API key');

      req.hub = { hubId: hub._id, deviceId: hub.deviceId };
      console.log("Authenticated HUB:", req.hub);
      return next();
    } catch (error) {
      console.error("API key authentication failed:", error);
      throw new UnauthenticatedError('Invalid API key');
    }
  }

  if (token) {
    try {
      const { userId, role } = verifyJWT(token);
      req.user = { userId, role };
      console.log("Authenticated user:", req.user);
      return next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      throw new UnauthenticatedError('Invalid or expired token');
    }
  }

  throw new UnauthenticatedError('Authentication required');
};
