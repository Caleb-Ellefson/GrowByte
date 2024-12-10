import Device from "../models/deviceModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import { v4 as uuidv4 } from 'uuid'; // Install 'uuid' package

// Get all devices for the logged-in user
export const getDevices = async (req, res) => {
  const devices = await Device.find({ user: req.user.userId });

  // Instead of throwing an error, return an empty array
  if (!devices.length) {
    return res.status(200).json({ devices: [] });
  }

  res.status(200).json({ devices });
};


// Create a new device

export const createDevice = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.deviceId = req.body.deviceId || `device-${uuidv4()}`; // Generate a unique deviceId if not provided
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
  const { deviceId } = req.params;
  const { hydration, temperature, light } = req.body;

  // Ensure required fields are provided
  if (hydration === undefined || temperature === undefined || light === undefined) {
    return res.status(400).json({ error: "All sensor values are required." });
  }

  // Determine whether the request is from a HUB or a user
  const userOrHub = req.user?.userId || req.hub?.hubId;

  if (!userOrHub) {
    return res.status(401).json({ error: "Unauthorized request." });
  }

  try {
    // Find the device using the deviceId
    const device = await Device.findOne({ deviceId });

    if (!device) {
      throw new NotFoundError(`No device found with deviceId ${deviceId}.`);
    }

    // Add new sensor data to history
    device.dataHistory.push({ hydration, temperature, light });

    // Update current readings
    device.hydration = hydration;
    device.temperature = temperature;
    device.light = light;

    await device.save();

    res.status(200).json({ device });
  } catch (error) {
    console.error('Error reporting sensor data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
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

export const getHubDetails = async (req, res) => {
  const { macAddress } = req.params;

  console.log("Received MAC Address:", macAddress); // Debug log
  try {
    const hub = await Hub.findOne({ deviceId: macAddress });
    console.log("Database Query Result:", hub); // Debug log

    if (!hub) {
      throw new NotFoundError(`No hub found with MAC address ${macAddress}.`);
    }

    res.status(200).json({
      deviceId: hub.deviceId,
      name: hub.name,
      createdAt: hub.createdAt,
    });
  } catch (error) {
    console.error('Error fetching HUB details:', error);
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};