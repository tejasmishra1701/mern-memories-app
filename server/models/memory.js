import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('Memory', memorySchema);