import mongoose from 'mongoose';

const HubSchema = new mongoose.Schema({
  macAddress: { type: String, required: true, unique: true },
  key: { type: String, required: true }, // device-generated verification key
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // link to user
  name: { type: String, default: "My Hub" },
  createdAt: { type: Date, default: Date.now }
});

const Hub = mongoose.model('Hub', HubSchema);

export default Hub;
