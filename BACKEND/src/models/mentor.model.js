  import mongoose, { Schema } from "mongoose";
  import dotenv from "dotenv";
  dotenv.config({ path: "./.env",});
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";

  const EducationSchema = new Schema({
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
  });

  const reviewSchema = new Schema({
    review:{
      type: String,
      trim: true,
    },
    student: {
      type: Schema.Types.ObjectId,
    }
  })


  const MentorSchema = new Schema({

    //basic personal details
    isApproved:{
      type:Boolean,
      required:true,
      default:false,
    },
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
    bio :{
      type: String,
      trime: true,
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
    yearofExp: {
      type: Number,
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
    education : [EducationSchema],
    
  //   mentoringDetails 
    fees: {
      type: Number,
      required: true,
      trim: true,
      index: true,
    },
    studentsMentered: {
      type: Number,
      // required: true,
      trim: true,
      index: true,
      default:0
    },
    reviews :
      [reviewSchema],
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
      // console.log(process.env.ACCESS_TOKEN_SECRET, "hi");
      // console.log(this.gmail)

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

  //creates refreshtoken using _id , this will be stored in db and used to recreate acces token after it is expired
  MentorSchema.methods.generateRefreshToken = function(){
    // console.log(process.env.REFRESH_TOKEN_SECRET, "bye")
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