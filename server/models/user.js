import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  bio: String,
  spiritCharacter: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('User', userSchema);