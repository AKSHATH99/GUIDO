import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Mentor } from "../models/mentor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//----------refresh and access token generator----------------

const generateToken = async (mentorID) => {
  try {
    const mentor = await Mentor.findById(mentorID);
    const accessToken = mentor.generateAccessToken();
    // console.log(accessToken, "accesstoekn");
    const refreshToken = mentor.generateRefreshToken();

    // console.log(refreshToken);

    mentor.refreshToken = refreshToken;

    await mentor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "ERROR WHILE GENRATING TOKEN ");
  }
};

//----------------------- REGISTER MENTOR ------------------------------

const registerMentor = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    gmail,
    password,
    age,
    phone,
    place,
    language_spoken,
    gender,
    company,
    role,
    field,
    yearofExp,
    skills,
    education,
    fees,
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
    !company ||
    !role ||
    !field ||
    !yearofExp ||
    !skills ||
    !education ||
    !fees
  ) {
    throw new ApiError(400, "ALL FIELDS ARE NEEDED");
  }

  const existedMentor = await Mentor.findOne({ gmail });
  if (existedMentor) {
    throw new ApiError(409, "ALREADY EXIST");
  }

  const mentor = await Mentor.create({
    firstname,
    lastname,
    age,
    phone,
    gmail,
    place,
    language_spoken,
    gender,
    password,
    company,
    role,
    field,
    yearofExp,
    skills,
    education,
    fees,
  });

  const createdMentor = await Mentor.findById(mentor._id).select(
    "-refreshToken -password"
  );

  if (!createdMentor) {
    throw new ApiError(500, "SOMETHING WENT WRONG WHILE REGISTRATION");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdMentor, "Mentor registered succuessfully")
    );
});

//----------------------------LOGIN MENTOR -----------------------------------------------------------------------

const LoginMentor = asyncHandler(async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    throw new ApiError(400, "ALL FIELDS ARE REQUIRED");
  }

  const mentor = await Mentor.findOne({
    $or: [{ gmail }, { password }],
  });

  if (!mentor) {
    throw new ApiError(404, "MENTOR DOES NOT EXIST");
  }

  const validPassword = await mentor.isPasswordWrong(password);

  if (!validPassword) {
    throw new ApiError(401, "CREDENTIALS WRONG");
  }

  const { accessToken, refreshToken } = await generateToken(mentor._id);

  const MentorLoggedIn = await Mentor.findById(mentor._id).select(
    "firstname lastname gmail company age gender place skills position field "
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: MentorLoggedIn,
          accessToken,
          refreshToken,
        },
        "LOGIN SUCCESSFULL"
      )
    );
});

//---------------------------FETCHING CURRENT MENTOR DETAILS--------------------------------------------------------------

const fetchMentor = asyncHandler(async (req, res) => {
  try {
    console.log(req.user);
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "FETCHED SUCCESSFULLY"));
  } catch (error) {
    throw new ApiError(100, "SMTHG WENT WRONG WHILE FETCHING DETAILS");
  }
});

//---------------------------FETCHING A SPECFIC MENTOR--------------------------------------------------------------
const fetchAMentor = asyncHandler(async (req, res) => {
  try {
    const { firstname } = req.params;

    if (!firstname?.trim()) {
      throw new ApiError(404, "PROVIDE NAME IN THE PARAMS");
    }

    const user = await Mentor.find({ firstname: firstname });

    if (!user || user.length == 0) {
      throw new ApiError(404, "User Not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully "));
  } catch (error) {
    throw new ApiError(400, "COULDNT FIND THE USER");
  }
});

//----------------------------UPDATING MENTOR DETAILS----------------------------------------------------------------

const updateMentor = asyncHandler(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      age,
      phone,
      place,
      language_spoken,
      picture,
      company,
      role,
      field,
      yearofExp,
      skills,
      fees,
      collegeName,
      degreeName,
      passoutYear,
    } = req.body;

    if(req.body == NULL ){
      throw new ApiError(401 , "DATA NOT PROVIDED FOR UPDATING")
    }

    

    const user = await  Mentor.findByIdAndUpdate(req.user._id)
  } catch (error) {}
});

//----------------------------DELETING MENTOR DETAILS------------------------------------------------------------------

export { registerMentor, LoginMentor, fetchMentor, fetchAMentor };
