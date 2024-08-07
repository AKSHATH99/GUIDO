import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Student } from "../models/student.model.js";
import {Mentor} from "../models/mentor.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {sendEmail}  from "../utils/nodemailer.js";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//--------------------GENERATING TOKENS---------------------

const generateToken = async (studentID) => {
  try {
    const student = await Student.findById(studentID);
    console.log(student);
    const accessToken = student.generateAccessToken();
    console.log(accessToken, "AccessToken");
    const refreshToken = student.generateRefreshToken();
    console.log(refreshToken, "refreshtoken");

    student.refreshToken = refreshToken;

    await student.save({ validataBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "ERROR WHILE GENREATING TOKEN",err);
  }
};

//---------------------------------STUDENT REGISTER-----------------------

const registerStudent = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    password,
    age,
    phone,
    gmail,
    place,
    language_spoken,
    gender,
    education,
    skills,
    // resume ,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !gmail ||
    !password ||
    !age ||
    !phone ||
    !place ||
    !language_spoken ||
    !gender ||
    !education ||
    !skills
  ) {
    throw new ApiError(400, "ALL FIELDS ARE REQUIRED");
  }

  const userExist = await Student.findOne({ gmail });
  if (userExist) {
    throw new ApiError(400, "USER ALREADY EXIST");
  }

  const photolocalpath = req.file?.path;
  if(!photolocalpath){
      throw new ApiError(404 , "Didint recieve photolocalpath")
  }

  const photo = await uploadOnCloudinary(photolocalpath);
  console.log(photo);
  const parsedEducation = JSON.parse(education);

  const newStudent = await Student.create({
    firstname,
    lastname,
    password,
    age,
    phone,
    gmail,
    place,
    language_spoken,
    gender,
    education:parsedEducation,
    skills,
    picure:photo?.url || ""
  });

  const createdStudent = await Student.findById(newStudent._id).select(
    "-refreshToken -password"
  );

  if (!createdStudent) {
    throw new ApiError(
      500,
      "SOMETHING WENT WRONG WHILE CREATING THE STUDENT ACCOUNT"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdStudent, "student registered succuessfully")
    );
});

//---------------LOGIN STUDENT-----------------------------------------------------------

const loginStudent = asyncHandler(async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    throw new ApiError(400, "ALL FIELDS ARE REQUIRED");
  }

  const student = await Student.findOne({
    $or: [{ gmail }, { password }],
  });

  if (!student) {
    throw new ApiError(404, "STUDENT DOES NOT EXIST");
  }

  const validPassword = await student.isPasswordWrong(password);

  if (!validPassword) {
    throw new ApiError(401, "WRONG PASSWORD BRUH");
  }

  const { accessToken, refreshToken } = await generateToken(student._id);

  // console.log(accessToken)
  const loggedIn = await Student
    .findById(student._id)
    .select("firstname  lastname gmail  age gender education picure ");

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      sameSite: 'None', // adjust sameSite policy according to your needs
    };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200 , {
          user: loggedIn,
          accessToken,
          refreshToken
        },
        "LOGIN OF STUDENT SUCCSSFULL"
      )
    );
});

//--------------------------------FETCHING CURRENT STUDENT DETAILS-------------------------
const fetchStudent = asyncHandler(async(req , res)=>{
  try {
      return res.status(200).json(new ApiResponse(200, req.user, "FETCHED SUCCESSFULLY"))
    
  } catch (error) {
    throw new ApiError(100 , "SMTHG WENT WRONG WHILE FETCHING DETAILS")
  }
});

//------------------------------------FETCHING A SPECIFIC STUDENT---------------------
const fetchAstudent = asyncHandler(async(req , res)=>{
  try {
    const {firstname} = req.params;

    if(!firstname?.trim()){
      throw new ApiError(404 , "PROVIDE NAME IN THE PARAMS");
    }

    const user = await Student.find({firstname : firstname});

    if(!user || user.length == 0 ){
      throw new ApiError(404 , "STUDENT NOT FOUND")
    }
    
  } catch (error) {
    throw new ApiError(404 , "STUDENT NOT FOUND")
  }
})

// --------------------------------MENTOR REVIEW-----------------------------
const mentorReview= asyncHandler(async(req , res)=>{
  try {
    const {review} = req.body;
    const {mentorID} = req.params;
    const id = req.user._id;

    console.log( "helo ",id);
    console.log(review)
    console.log(mentorID);
    if(!review){
      throw new ApiError(400 , "Didnt provide review");
    }
    if(!mentorID){
      throw new ApiError(400 , "Didnt provide mentorID");
    }

    const mentor = await Mentor.findById(mentorID);
    if(!mentor){
      throw new ApiError(404 , "Mentor account not found");
    }
    console.log(mentor);
    
    mentor.reviews.push({
      review: review,
      student:id
        })

    const addedReview = await mentor.save();    

    if(!addedReview){
      throw new ApiError(400 , "Some error while adding review")
    }

    res.status(200).json(new ApiResponse(200 , "ADDED REVIEW"))
    
  } catch (error) {
    throw new ApiError(400 , "SOME ERROR WHILE ADDING REVIEW " , error)
  }
})

//---------------------------------SENDING EMAIL----------------------------------------------------------------
const emailController = asyncHandler(async(req , res)=>{
 try {
   const to = req.user.gmail;
   const name = req.user.firstname 
   const phone = req.user.phone
   console.log(phone)
   console.log(name)
   console.log(to)
   const text = `You have recieved a mentorship session booking from ${name} . Including the details below : 
    phone : ${phone}
    mail  : ${to}`
   
   const emailSended =  await sendEmail(to , text);
 
   res.status(200).json(new ApiResponse(200 , "Email send "))
 
 } catch (error) {
  throw new ApiError("Error while sending email " , error)
 }


})
export { registerStudent, loginStudent , fetchStudent , mentorReview , emailController};
