import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
console.log(MONGODB_URI);
export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected databse successfully");
  } catch (error) {
    console.error("Databse failed to connect");
    console.error(error);
  }
};
