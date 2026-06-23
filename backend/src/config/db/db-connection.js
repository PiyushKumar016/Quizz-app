import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
    });
    console.log(chalk.greenBright("✅ MongoDB connected successfully"));
  } catch (err) {
    console.log(chalk.redBright("❌ MongoDB connection error: "), err);
    process.exit(1);
  }
};