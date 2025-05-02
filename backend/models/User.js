import mongoose from 'mongoose';

// Define schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Prevent model overwrite error in dev
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
