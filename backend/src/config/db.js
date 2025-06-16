import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'eigen-journal',
    });
    console.log(`Mongo ➜ ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
