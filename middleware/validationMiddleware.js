import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import mongoose from 'mongoose';

// Models
import Device from '../models/deviceModel.js';
import User from '../models/userModel.js';

// Helper function to handle validation errors
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));

        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('You are not authorized to access this route');
        }

        // Default to BadRequestError for unexpected cases
        throw new BadRequestError(errorMessages || 'Invalid input data');
      }
      next();
    },
  ];
};

// Helper function to check authorization (admin or owner)
const isAuthorized = (req, resource) => {
  const isAdmin = req.user.role === 'admin';
  const isOwner = req.user.userId === resource.createdBy.toString();
  return isAdmin || isOwner;
};

// Validation for MongoDB ID
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('The provided ID is not a valid MongoDB ID');

    const device = await Device.findById(value);
    if (!device) throw new NotFoundError(`No device found with ID ${value}`);

    if (!isAuthorized(req, device)) {
      throw new UnauthorizedError('You are not authorized to access this resource');
    }
  }),
]);

// Validation for user registration
export const validateRegisterInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('Email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
]);

// Validation for user login
export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
]);

// Validation for updating user information
export const validateUpdateUserInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      // If current user ID doesn't match ID in the database, throw error
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('Email already exists');
      }
    }),
]);

// Validation for creating/updating devices
export const validateDeviceInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Device name is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Device name must be between 3 and 30 characters'),
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string')
    .default('Unknown'),
  body('deviceType')
    .optional()
    .isIn(['sensor', 'actuator'])
    .withMessage('Device type must be either "sensor" or "actuator"')
    .default('sensor'),
]);

// Validation for adding sensor data
export const validateSensorDataInput = withValidationErrors([
  body('moistureLevel')
    .notEmpty()
    .withMessage('Moisture level is required')
    .isNumeric()
    .withMessage('Moisture level must be a number')
    .custom((value) => {
      if (value < 0 || value > 100) {
        throw new BadRequestError('Moisture level must be a number between 0 and 100');
      }
      return true;
    }),
]);
