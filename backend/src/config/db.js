import mongoose from "mongoose";
import { config } from "./env.js";

/** Connect to the configured MongoDB database. */
export async function connectDatabase() {
  await mongoose.connect(config.mongoUri);
}
