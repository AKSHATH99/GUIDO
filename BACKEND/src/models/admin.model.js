import mongoose, { Schema } from "mongoose";
  import dotenv from "dotenv";
  dotenv.config({ path: "./.env",});
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";

  const AdminSchema = new Schema({
    MentorID : {
        type : Schema.Types.ObjectId,
        ref: "Mentor"
    },
    isApproved:{
        type:Boolean,
        default:false,
    }


  },{timestamps:true})

  export const Admin = mongoose.model("Admin",AdminSchema)