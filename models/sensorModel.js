import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  device: {
    type: mongoose.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  moistureLevel: {
    type: Number,
    required: [true, "Please provide a moisture level"],
    min: 0,
    max: 100,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SensorData", SensorDataSchema);
