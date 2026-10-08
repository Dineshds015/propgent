import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null }
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
