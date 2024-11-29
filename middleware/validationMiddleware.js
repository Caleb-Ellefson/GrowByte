import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { STATUS, TEAM } from '../utils/constants.js';
import mongoose from 'mongoose';

//Models
import Strat from '../models/deviceModel.js';
import User from '../models/userModel.js'


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
            throw new UnauthorizedError('not authorized to access this route');
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
  };

  export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
      const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
      const job = await Strat.findById(value);
      if (!job) throw new NotFoundError(`no job with id ${value}`);
      const isAdmin = req.user.role === 'admin';
      const isOwner = req.user.userId === job.createdBy.toString();
      if (!isAdmin && !isOwner)
        throw new UnauthorizedError('not authorized to access this route');
    }),
  ]);

  export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
  ]);
  
  export const validateLoginInput = withValidationErrors([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
  ]);
  
  export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        //If current user ID doesn't match id in database throw error
        if (user && user._id.toString() !== req.user.userId) {
          throw new BadRequestError('email already exists');
        }
      }),
  ]);

  export const validateDeviceInput = withValidationErrors([
    body('name')
      .notEmpty()
      .withMessage('Device name is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('Device name must be between 3 and 30 characters'),
    body('location')
      .optional()
      .isString()
      .withMessage('Location must be a string'),
    body('deviceType')
      .optional()
      .isIn(['sensor', 'actuator'])
      .withMessage('Device type must be either "sensor" or "actuator"'),
  ]);
  
  
  export const validateSensorDataInput = withValidationErrors([
    body('moistureLevel')
      .notEmpty()
      .withMessage('Moisture level is required')
      .isNumeric()
      .withMessage('Moisture level must be a number')
      .custom((value) => {
        if (value < 0 || value > 100) {
          throw new BadRequestError('Moisture level must be between 0 and 100');
        }
        return true;
      }),
  ]);

  
  
  