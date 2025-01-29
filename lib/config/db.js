import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;





let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("Database Connected!");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
