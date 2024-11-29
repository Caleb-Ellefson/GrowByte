import { Router } from 'express';
import {
  validateDeviceInput,
  validateSensorDataInput,
} from '../middleware/validationMiddleware.js';

import {
  getDevices,
  createDevice,
  getDevice,
  updateDevice,
  deleteDevice,
  addSensorData,
  getSensorData,
} from '../controllers/deviceController.js';

const router = Router();

router.route('/').post(validateDeviceInput, createDevice).get(getDevices);
router
  .route('/:id')
  .get(getDevice)
  .patch(validateDeviceInput, updateDevice)
  .delete(deleteDevice);
router
  .route('/:id/data')
  .post(validateSensorDataInput, addSensorData)
  .get(getSensorData);

export default router;
