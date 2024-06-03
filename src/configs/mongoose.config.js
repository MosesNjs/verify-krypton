import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
      console.log(`Connecting to MongoDB (${retries} retries left)`);
      await mongoose.connect(process.env.MONGODB_URI, {});
      console.log('MongoDB connected');
      break;
    } catch (error) {
      if (error.name === 'MongoParseError') {
        console.error('Error parsing MongoDB connection string:', error);
      } else {
        console.error('MongoDB connection error:', error);
      }
      retries--;
      if (retries === 0) {
        console.error('Failed to connect to MongoDB after multiple retries. Exiting...');
        process.exit(1);
      }
      console.log(`Retrying MongoDB connection in 3 seconds`);
      await new Promise(resolve => setTimeout(resolve, 3000)); 
    }
  }
};

export default connectDB;
