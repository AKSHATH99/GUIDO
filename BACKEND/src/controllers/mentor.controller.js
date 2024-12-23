import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
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
    bio,
  } = req.body;

  console.log(education);

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
    !fees ||
    !bio
  ) {
    throw new ApiError(400, "ALL FIELDS ARE NEEDED");
  }

  const existedMentor = await Mentor.findOne({ gmail });
  if (existedMentor) {
    throw new ApiError(409, "ALREADY EXIST");
  }

   // Check if file exists in the request
   if (!req.file) {
    throw new ApiError(404, "No picture provided");
  }

  // Upload picture to Cloudinary
  const fileBuffer = req.file.buffer; // File buffer from multer.memoryStorage
  const originalName = req.file.originalname; // Original file name
  
  const photo = await uploadOnCloudinary(fileBuffer, originalName);

  if (!photo || !photo.url) {
    throw new ApiError(500, "Image upload to Cloudinary failed");
  }


  const parsedEducation = JSON.parse(education);

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
    bio,
    company,
    role,
    field,
    yearofExp,
    skills,
    education: parsedEducation,
    fees,
    picture: photo?.url || "",
  });

  const createdMentor = await Mentor.findById(mentor._id).select(
    "-refreshToken -password"
  );

  if (!createdMentor) {
    throw new ApiError(500, "SOMETHING WENT WRONG WHILE REGISTRATION");
  }

  //Sening mentor ID to admin for approval
  const newMentorID = createdMentor._id;
  console.log("ID SENDING TO ADMIN : ", newMentorID);

  const savingToAdmin = await Admin.create({
    MentorID: newMentorID,
  });



  if (!savingToAdmin) {
    throw new ApiError(500, "Couldnt send to admin");
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
    console.log("REACHED")
    console.log(req.user);
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "FETCHED SUCCESSFULLY"));
  } catch (error) {
    throw new ApiError(100, "SMTHG WENT WRONG WHILE FETCHING DETAILS");
  }
});

//---------------------------FETCHING /SEARCH A SPECFIC MENTOR--------------------------------------------------------------
const fetchAMentor = asyncHandler(async (req, res) => {
  try {
    const { firstname } = req.params;
    console.log(firstname);
    if (!firstname?.trim()) {
      throw new ApiError(404, "PROVIDE NAME IN THE PARAMS");
    }

    const regex = new RegExp(`^${firstname}`, "i");
    const user = await Mentor.find({ firstname: { $regex: regex } }).select(
      "_id firstname lastname company role field picture isAcceptingRequest"
    );

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

//---------------------------FETCHING MENTOR USING ID AS PARAMS----------------------------------------------------
const fetchMentorByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("FUCKIGN HWAT BIRTHHC", id);

  if (!id) {
    throw new ApiError(404, "MENTOR ID NOT PROVIDED");
  }

  const mentor = await Mentor.findById(id).select(
    "-phone -gmail -refreshToken -password "
  );

  if (!mentor) {
    throw new ApiError(404, "MENTOR NOT FOUND");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, mentor, "fetched mentor details"));
});

//-------------------------------TOGGLING ISACCEPTING STATUS-----------------------
const toggleIsAcceptingStatus = asyncHandler(async(req,res)=>{
  try {
    const userID = req.user._id;

    console.log("USER ID", userID)
    

    if (!userID) {
      throw new ApiError(404, "MENTOR ID NOT PROVID   ED");
    }
  
    const mentor = await Mentor.findById(userID);
    if (!mentor) {
      throw new ApiError(404, "MENTOR NOT FOUND");
    }

    // if (mentor.userID.toString() !== userID.toString()) {
    //   throw new ApiError(403, "UNAUTHORIZED TO TOGGLE THIS MENTOR'S STATUS");
    // }
    console.log("status",!mentor.isAcceptingRequest)

    mentor.isAcceptingRequest = (!mentor.isAcceptingRequest);

    const updated = await mentor.save();

    if(!updated){
    throw new ApiError(400, "FAILED", error);

    }

    console.log("UPDATED", updated)
    return res
    .status(200)
    .json(new ApiResponse(200,  "toggled  mentor status"));


  } catch (error) {
    throw new ApiError(400, "SOME ERROR WHILE UPDATING MENTOR STATUS", error);
    
  }
})


//----------------------FETCH CURENT STATUS OF ISACCEPTING------------------------------------------
const fetchAcceptingStatus = asyncHandler(async(req,res)=>{
  try {
    const userID = req.user._id;
    

    if (!userID) {
      throw new ApiError(404, "MENTOR ID NOT PROVID   ED");
    }
  
    const mentor = await Mentor.findById(userID);
    if (!mentor) {
      throw new ApiError(404, "MENTOR NOT FOUND");
    }

    // if (mentor.userID.toString() !== userID.toString()) {
    //   throw new ApiError(403, "UNAUTHORIZED TO TOGGLE THIS MENTOR'S STATUS");
    // }
    console.log("CURENT STATUS: ",mentor.isAcceptingRequest)

    return res
    .status(200)
    .json(new ApiResponse(200,mentor.isAcceptingRequest , "toggled  mentor status"));


  } catch (error) {
    throw new ApiError(400, "SOME ERROR WHILE UPDATING MENTOR STATUS", error);
    
  }
})



//----------------------------UPDATING MENTOR DETAILS----------------------------------------------------------------

const updateDetails = asyncHandler(async (req, res) => {
  try {
    const userID = req.user._id;
    const updates = req.body;

    const updatedmentor = await Mentor.findByIdAndUpdate(userID, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedmentor) {
      throw new ApiError(400, "Couldnt find user");
    }
    console.log(updatedmentor);

    res
      .status(200)
      .json(new ApiResponse(200, updatedmentor, "SUCCESSFULLY UPDATED"));
  } catch (error) {
    throw new ApiError(400, "SOME ERROR WHILE UPDATING MENTOR DETAILS", error);
  }
});

//------------------------------UPDATING MENTORED STUDENT COUNT------------------------------------------------
const updatecount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "ID NOT PROVIDED");
  }

  const mentor = await Mentor.findById(id).select("studentsMentered");
  if (!mentor) {
    throw new ApiError(404, "MENTOR NOT FOUND");
  }

  const count = mentor.studentsMentered;
  const updatedcount = count + 1;

  const updatecount = await Mentor.findByIdAndUpdate(id, {
    studentsMentered: updatedcount,
  });

  res.status(200).json(new ApiResponse(200, updatecount, "count updated "));
});

//--------------------------------UPDATING PROFILE IMAGE-----------------------------------------------------
const updatePicture = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const photolocalpath = req.file?.path;
    console.log("local path: ",photolocalpath)
    if (!photolocalpath) {
      throw new ApiError(404, "Didint recieve photolocalpath");
    }

    const photo = await uploadOnCloudinary(photolocalpath);
    console.log(photo);

    const updatedMentor = await Mentor.findByIdAndUpdate(id, {
      picture: photo?.url,
    });
    if (updatedMentor == null) {
      throw new ApiError(400, "error while uploading to cloudinary");
    }
    res
      .status(200)
      .json(new ApiResponse(200, updatedMentor, "Image updation successfull"));
  } catch (error) {
    throw new ApiError(400, "ERROR WHILE UPDATING IMAGE");
  }
});

//---------------------------------FETCHING ALL MENTORS IN DB FOR HOME PAGE------------------------------------
const fetchAllMentor = asyncHandler(async (req, res) => {
  try {
    const mentorsData = await Mentor.find().select(
      "_id firstname lastname skills fees bio field role bio company picture "
    );

    if (mentorsData.length === 0) {
      res.status(404).json(new ApiResponse(200, "no data found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, mentorsData, "fetched mentors successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//----------------------------------FETCHING REVIEWS-----------------------------------------
const fetchReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id == null) {
    throw new ApiError(404, "Didnt provide the id");
  }

  const mentor = await Mentor.findById(id).select("reviews");

  if (!mentor || !mentor.reviews) {
    throw new ApiError(404, "No reviews found for the provided mentor ID");
  }

  const reviewsWithStudentInfo = await Promise.all(
    mentor.reviews.map(async (review) => {
      const student = await Student.findById(review.student).select(
        "firstname lastname"
      );

      if (!student) {
        throw new ApiError(404, "Could not find student who wrote the review");
      }

      return {
        review: review.review,
        student: student,
      };
    })
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        reviewsWithStudentInfo,
        "Fetched reviews successfully"
      )
    );
});

//------------------------------------- FILTER BASED ON FIELD-------------------------------------
const filterMentor = asyncHandler(async (req, res, next) => {
  try {
    // Destructuring the filterfield from query parameters
    const { filterfield } = req.query;

    // Check if the filterfield parameter is provided
    if (!filterfield) {
      return next(new ApiError(400, "No query provided")); // Use next() for error handling middleware
    }

    // Query to find mentors based on the provided field value
    const filteredMentor = await Mentor.find({ field: filterfield });

    // If no mentors are found, return a custom error
    if (!filteredMentor || filteredMentor.length === 0) {
      return next(new ApiError(404, "No mentor found")); // Ensure a proper error message is sent
    }

    // Send the filtered mentors in the response
    res
      .status(200)
      .json(
        new ApiResponse(200, filteredMentor, "Filtered mentors successfully")
      );
  } catch (error) {
    // Log the error for debugging and return a generic error message
    console.error(error);
    return next(new ApiError(500, "Internal server error"));
  }
});

//----------------------------DELETING MENTOR DETAILS------------------------------------------------------------------
const deleteAccount = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;

    const mentor = await Mentor.findByIdAndDelete(id);

    if (!mentor) {
      throw new ApiError(400, "COULDNT DELETE YOUR ACCOUNT");
    }

    res.status(200).json(new ApiResponse(200, mentor, "delted account !"));
  } catch (error) {
    throw new ApiError(404, "couldnt delete account");
  }
});

//----------------LOGOUT MENTOR----------------------------------------
const logoutMentor = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const logout = await Mentor.findByIdAndUpdate(
     id, 
      { 
        $unset: { refreshToken: 1 } 
      },
      { new: true }
    );

    if(!logout){
      throw new ApiError(400 , "COULDNT LOGOUT ACCOUNT")
    }
  
    // Cookie clearing options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(
        new ApiResponse(
          200, 
          {}, 
          "MENTOR LOGGED OUT SUCCESSFULLY"
        )
      );
  } catch (error) {
    throw new ApiError(400 , "Couldnt logout sutdent")
  
  }
});


//---------------------------------CHANGE PASSWORD--------------------------------------------------------------
export {
  registerMentor,
  LoginMentor,
  fetchMentor,
  fetchAMentor,
  fetchMentorByID,
  updatecount,
  fetchAllMentor,
  fetchReview,
  updateDetails,
  deleteAccount,
  updatePicture,
  filterMentor,
  toggleIsAcceptingStatus,
  fetchAcceptingStatus,
  logoutMentor
};
