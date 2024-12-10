import mongoose from 'mongoose';

const HubSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed password
  apiKey: { type: String, required: true, unique: true }, // Unique API key
});

const Hub = mongoose.model('Hub', HubSchema);

export default Hub;
