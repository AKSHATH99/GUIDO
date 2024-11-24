import mongoose, { Schema } from "mongoose";
  import dotenv from "dotenv";
  dotenv.config({ path: "./.env",});
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";

  
  const MentorShipSchema = new Schema({
    mentorID : {
        type : Schema.Types.ObjectId,
        required:true,
        ref: "Mentor",   
        index:true
    },
    studentID : {
        type : Schema.Types.ObjectId,
        ref: "Student",
        index:true,
        required:true

    },

  },{timestamps:true})

  export const Mentorship = mongoose.model("Mentorship",MentorShipSchema)