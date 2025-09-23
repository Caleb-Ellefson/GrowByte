import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';
import Hub from '../models/hubModel.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.token;
  const deviceKey = req.headers['x-device-key'];
  try {
    if (token) {
      // ---- User authentication via JWT ----
      const { userId, role } = verifyJWT(token);
      req.user = { userId, role };
      console.log("Authenticated user:", req.user);
      return next();
    } 
    
    if (deviceKey) {
      // ---- Hub authentication via key ----
      const hub = await Hub.findOne({ key: deviceKey });
      if (!hub) {
        throw new UnauthenticatedError('Invalid device key');
      }
      req.hub = { id: hub._id };
      req.user = { userId: hub.user.toString(), role: 'hub' };
      console.log("Authenticated hub:", req.hub);
      return next();
    }

    throw new UnauthenticatedError('Authentication required');
  } catch (error) {
    console.error("Authentication failed:", error);
    throw new UnauthenticatedError('Invalid or expired credentials');
  }
};
