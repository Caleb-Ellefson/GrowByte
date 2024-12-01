import express from "express";
import {
  getDevices,
  createDevice,
  getDevice,
  updateDevice,
  deleteDevice,
  reportSensorData,
  getDeviceHistory,
} from "../controllers/deviceController.js";

const router = express.Router();

// Get all devices for the logged-in user
router.get("/", getDevices);

// Create a new device
router.post("/", createDevice);

// Get a single device by ID
router.get("/:id", getDevice);

// Update a device by ID
router.patch("/:id", updateDevice);

// Delete a device by ID
router.delete("/:id", deleteDevice);

// Report sensor data for a specific device (ESP32C6 data)
router.post("/:id/report", reportSensorData);

// Get historical sensor data for a specific device
router.get("/:id/history", getDeviceHistory);

export default router;
