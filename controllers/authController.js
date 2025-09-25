import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js';
import Hub from '../models/hubModel.js'; // Import your HUB model
import { createJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { nanoid } from 'nanoid'; // To generate a secure API key

// Function to generate API key
const generateApiKey = () => nanoid(32); // Generates a 32-character secure API key

// Register a new user
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

// Login a user
export const login = async (req, res) => {
  const { email, password, deviceId } = req.body;

  // User Login
  const user = await User.findOne({ email });

  const isValidUser =
    user && (await comparePassword(password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });

  // 1 day cookie
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // Only secure in production
  });
  

  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

// Logout a user
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
