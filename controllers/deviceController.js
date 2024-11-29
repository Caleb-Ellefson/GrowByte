import Device from "../models/deviceModel.js"; // Device model
import SensorData from "../models/sensorModel.js"; // Sensor data model
import { NotFoundError } from "../errors/customErrors.js"; // Custom error handling

// Get all devices for the logged-in user
export const getDevices = async (req, res) => {
  const devices = await Device.find({ user: req.user.userId });

  if (!devices.length) {
    throw new NotFoundError('No devices found.');
  }

  res.status(200).json({ devices });
};

// Create a new device
export const createDevice = async (req, res) => {
  req.body.user = req.user.userId; // Attach the user ID to the device
  const device = await Device.create(req.body);

  if (!device) {
    throw new NotFoundError('Could not create device.');
  }

  res.status(201).json({ device });
};

// Get a single device by ID
export const getDevice = async (req, res) => {
  const device = await Device.findOne({
    _id: req.params.id,
    user: req.user.userId,
  });

  if (!device) {
    throw new NotFoundError(`No device found with ID ${req.params.id}.`);
  }

  res.status(200).json({ device });
};

// Update a device
export const updateDevice = async (req, res) => {
  const { id } = req.params;

  const updatedDevice = await Device.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedDevice) {
    throw new NotFoundError(`No device found with ID ${id}.`);
  }

  res.status(200).json({ updatedDevice });
};

// Delete a device
export const deleteDevice = async (req, res) => {
  const { id } = req.params;

  const removedDevice = await Device.findOneAndDelete({
    _id: id,
    user: req.user.userId,
  });

  if (!removedDevice) {
    throw new NotFoundError(`No device found with ID ${id}.`);
  }

  res.status(200).json({ msg: `Device with ID ${id} deleted.` });
};

// Add sensor data for a device
export const addSensorData = async (req, res) => {
  const { id } = req.params;

  // Ensure the device exists and belongs to the logged-in user
  const device = await Device.findOne({ _id: id, user: req.user.userId });
  if (!device) {
    throw new NotFoundError(`No device found with ID ${id}.`);
  }

  // Add new sensor data
  const data = await SensorData.create({
    device: id,
    moistureLevel: req.body.moistureLevel,
  });

  res.status(201).json({ data });
};

// Get historical sensor data for a device
export const getSensorData = async (req, res) => {
  const { id } = req.params;

  // Ensure the device exists and belongs to the logged-in user
  const device = await Device.findOne({ _id: id, user: req.user.userId });
  if (!device) {
    throw new NotFoundError(`No device found with ID ${id}.`);
  }

  // Retrieve historical data
  const data = await SensorData.find({ device: id });
  res.status(200).json({ data });
};
