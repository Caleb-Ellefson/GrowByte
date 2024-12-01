import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  hydration: { type: Number, required: true },
  temperature: { type: Number, required: true },
  light: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }, // Timestamp for each record
});

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the device"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deviceId: {
    type: String,
    required: [true, "Please provide a unique device identifier"],
    unique: true,
  },
  hydration: {
    type: Number,
    default: 0,
  },
  temperature: {
    type: Number,
    default: 0,
  },
  light: {
    type: Number,
    default: 0,
  },
  dataHistory: [SensorDataSchema], // Array of sensor data records
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before saving
DeviceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Device", DeviceSchema);
