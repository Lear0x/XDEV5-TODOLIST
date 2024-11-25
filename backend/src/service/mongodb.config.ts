import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://admin:pass@mongo:27017/todolist?authSource=admin';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default connectMongoDB;
