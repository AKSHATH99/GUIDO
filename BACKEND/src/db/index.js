import dotenv from "dotenv";
dotenv.config({ path: "public\temp.env" });
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const MONGO_PASSWORD = "akshath04";

const connectDB = async () => {
  try {
    console.log(
      // `Connection String: mongodb+srv://akshath:@cluster0.kek2ckn.mongodb.net/`
      `mongodb+srv://akshath:${MONGO_PASSWORD}@cluster0.kek2ckn.mongodb.net/${DB_NAME}`

    );

    const connectionInstance = await mongoose.connect(
      `mongodb+srv://akshath:${MONGO_PASSWORD}@cluster0.kek2ckn.mongodb.net/${DB_NAME}`
    );
    console.log(
      `\n  MONGO DB CONNECTED .. DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("connection error : ", error);
    process.exit(1);
  }
};

export default connectDB;