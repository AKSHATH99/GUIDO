import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env",});
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new Schema({

  //basic personal details

  firstname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  gmail: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  place: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  language_spoken: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  //education details
  education : [{
    collegeName: {
        type: String,
        required: true,
        trim: true,
      },
      degreeName: {
        type: String,
        required: true,
        trim: true,
      },
      passoutYear: {
        type: Number,
        required: true,
        trim: true,
      },
      currentYear : {
        type: Number,
        required: true,
        trim : true
      }
  }],

  //skills details

  skills: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  resume: {
    type: String,
    // required: true,
    trim: true,
    index: true,
  },

  //social links
  github: {
    type: String,
    trim: true,
    index: true,
  },
  linkedin: {
    type: String,
    trim: true,
    index: true,
  },
  twitter: {
    type: String,
    trim: true,
    index: true,
  },

  //interested field 
  interests : {
    type: String,
    trim: true,
    index: true,
  },
  refreshToken : {
    type: String,
  }
},{timestamps:true})

// if password is changed , hash it before saving to db
studentSchema.pre("save" , async function (next){
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password , 10);
  next();
})

studentSchema.methods.isPasswordWrong = async function(password){
  return await bcrypt.compare(password , this.password);
}

//generates accesstoken2
studentSchema.methods.generateAccessToken = function(){
  try {
    console.log(process.env.ACCESS_TOKEN_SECRET, "hi");
    console.log(this.gmail)

      return jwt.sign(
          {
              _id: this._id,
              gmail: this.gmail,
              firstname: this.firstname,
              lastname: this.lastname
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn: "1d"
          }
      )
  } catch (error) {
      // Handle the error here, you can log it or throw it further
      console.error('Error generating access token:', error);
      throw error; // throwing the error further for handling in the calling code
  }
}

studentSchema.methods.generateRefreshToken = function(){
  console.log(process.env.REFRESH_TOKEN_SECRET, "bye")
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}


export const Student = mongoose.model("Student", studentSchema);