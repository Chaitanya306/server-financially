import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongoDB connected successfully');
  } catch (error) {
    console.error('mongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;