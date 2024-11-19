import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const fetchFromDB = asyncHandler(async (req, res) => {
  try {
    const mentorsData = await Admin.find().select("MentorID isApproved ");

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

const toggleApprovedStatus = asyncHandler(async (req, res) => {
  const {id} = req.params;
  console.log("id",id);

  if (!id) {
    throw new ApiError("ID NOT FOUND IN THE PARAMS");
  }

  const mentor = await Mentor.findById(id);
  console.log(mentor)

  if (!mentor) {
    throw new ApiError("COULDNT FIND MENTOR ", error);
  }


 
  const newmentor = await Mentor.findByIdAndUpdate(
    id, // The ID of the mentor
    { $set: { isApproved: true } }, // Update operation
    { new: true } // Return the updated document
  );
  
  
 


  res
    .status(200)
    .json(new ApiResponse(200, newmentor, "updated mentor status successfully"));
});


export {toggleApprovedStatus , fetchFromDB};