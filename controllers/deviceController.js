import Device from "../models/deviceModel.js";
import { NotFoundError } from "../errors/customErrors.js";

// Get all devices
export const getDevices = async (req, res) => {
  const devices = await Device.find({ user: req.user.userId });

  if (!devices.length) {
    throw new NotFoundError("No devices found.");
  }

  res.status(200).json({ devices });
};

// Create a new device
export const createDevice = async (req, res) => {
  req.body.user = req.user.userId;
  const device = await Device.create(req.body);

  res.status(201).json({ device });
};

// Get a single device
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
  const updatedDevice = await Device.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedDevice) {
    throw new NotFoundError(`No device found with ID ${req.params.id}.`);
  }

  res.status(200).json({ updatedDevice });
};

// Delete a device
export const deleteDevice = async (req, res) => {
  const deletedDevice = await Device.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId,
  });

  if (!deletedDevice) {
    throw new NotFoundError(`No device found with ID ${req.params.id}.`);
  }

  res.status(200).json({ msg: `Device with ID ${req.params.id} deleted.` });
};

// Report sensor data
export const reportSensorData = async (req, res) => {
  const { id } = req.params;
  const { hydration, temperature, light } = req.body;

  // Ensure required fields are provided
  if (hydration === undefined || temperature === undefined || light === undefined) {
    return res.status(400).json({ error: "All sensor values are required." });
  }

  const device = await Device.findOne({ _id: id, user: req.user.userId });

  if (!device) {
    throw new NotFoundError(`No device found with ID ${id}.`);
  }

  // Add new sensor data to history
  device.dataHistory.push({ hydration, temperature, light });

  // Update current readings
  device.hydration = hydration;
  device.temperature = temperature;
  device.light = light;

  await device.save();

  res.status(200).json({ device });
};

// Get historical data
export const getDeviceHistory = async (req, res) => {
  const { id } = req.params;

  const device = await Device.findOne({ _id: id, user: req.user.userId });

  if (!device) {
    throw new NotFoundError(`No device found with ID ${id}.`);
  }

  res.status(200).json({ dataHistory: device.dataHistory });
};
