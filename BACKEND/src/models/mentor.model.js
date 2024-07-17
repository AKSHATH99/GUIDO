import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const MentorSchema = new Schema({

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
  
  picture : {
    type : String,
    index: true ,
  },
  password : {
    type: String , 
    required: [true, 'Password is required']
  },

  // career details

  company: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  field: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  yearOfExp: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  skills: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  

  //education
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
  }],
  
//   mentoringDetails 
  Fees: {
    type: Number,
    required: true,
    trim: true,
    index: true,
  },
  studentsMentered: {
    type: Number,
    required: true,
    trim: true,
    index: true,
  },
  refreshToken : {
    type : String,
  }
},{timestamps:true});


// if password is changed , hash it before saving to db
MentorSchema.pre("save" , async function (next){
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password , 10);
  next();
})

//checking if password is correct or not 
MentorSchema.methods.isPasswordWrong = async function(password){
  return await bcrypt.compare(password , this.password);
}


//generates accesstoken2
MentorSchema.methods.generateAccessToken = function(){
  try {

      return jwt.sign(
          {
              _id: this._id,
              email: this.email,
              username: this.firstname,
              fullName: this.lastname
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

//creates refreshtoken using _id , this will be stored in db and used to recreate acces token after it is expired
MentorSchema.methods.generateRefreshToken = function(){
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
export const Mentor = mongoose.model("Mentor", MentorSchema);