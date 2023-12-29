import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected Succesfully`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
