import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

let connected = false;

export async function connectDB() {
  if (connected) return;
  await mongoose.connect(MONGODB_URI);
  connected = true;
  console.log("MongoDB connected");
}
