import mongoose from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Device", DeviceSchema);
