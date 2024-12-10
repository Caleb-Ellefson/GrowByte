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

  // HUB Login
  if (deviceId) {
    const hub = await Hub.findOne({ deviceId });

    const isValidHub =
      hub && (await comparePassword(password, hub.password));

    if (!isValidHub) throw new UnauthenticatedError('Invalid HUB credentials');

    // Return the API key for HUB
    res.status(StatusCodes.OK).json({
      msg: 'HUB logged in successfully',
      apiKey: hub.apiKey, // Return the API key for HUBs
    });
    return;
  }

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

// Register a new HUB
export const registerHub = async (req, res) => {
  const { deviceId, name, password } = req.body;

  if (!deviceId || !name || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'All fields are required' });
  }

  try {
    const existingHub = await Hub.findOne({ deviceId });
    if (existingHub) {
      return res.status(StatusCodes.CONFLICT).json({ msg: 'HUB already registered' });
    }

    const hashedPassword = await hashPassword(password);
    const apiKey = generateApiKey();

    const hub = await Hub.create({
      deviceId,
      name,
      password: hashedPassword,
      apiKey,
    });

    res.status(StatusCodes.CREATED).json({
      msg: 'HUB registered successfully',
      apiKey,
    });
  } catch (error) {
    console.error('Error registering HUB:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error registering HUB' });
  }
};

// Generate a new API key for a HUB
export const generateNewApiKey = async (req, res) => {
  const { deviceId } = req.body;

  if (!deviceId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Device ID is required' });
  }

  try {
    // Find the HUB in the database
    const hub = await Hub.findOne({ deviceId });
    if (!hub) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'HUB not found' });
    }

    // Generate a new API key
    const newApiKey = generateApiKey();

    // Update the HUB's API key in the database
    hub.apiKey = newApiKey;
    await hub.save();

    // Log the regeneration
    console.log(`API key regenerated for HUB: ${deviceId}`);

    // Return the new API key
    res.status(StatusCodes.OK).json({
      msg: 'API key regenerated successfully',
      apiKey: newApiKey,
    });
  } catch (error) {
    console.error('Error regenerating API key:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error regenerating API key' });
  }
};
