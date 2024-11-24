import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import { Mentorship } from "../models/mentorship_details.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//-----------THIS CONTROLLER USED TO ADD STUDENT AND MENTOR ID WHEN STUDENT BOOKS SESSION---------
const setDetails = asyncHandler(async (req, res) => {
    const {mentorID , studentID} = req.body;

    if(!mentorID || !studentID){
        throw new ApiError(400 , "Didnt recieve mentor or student id ")
    }

    const newField  = await Mentorship.create({
        mentorID , studentID
    })

    if(!newField){
        throw new ApiError(400 , "Couldnt Update mentorship table  ")

    }

    return res
    .status(201)
    .json(
      new ApiResponse(200, newField, "Mentor-Student details added to mentorship")
    );
})


//-----------THIS CONTROLLER USED TO FETCH STUDENTS OF A  MENTOR USING ID FOR DASHBOARD-------------
const fetchStudentsOfAMentor = asyncHandler(async (req, res) => {
    const {mentorID } = req.body;

    if(!mentorID){
        throw new ApiError(400 , "Didnt recieve mentor id ")
    }

    const studentList = await Mentorship.find({ mentorID })
    .populate("studentID", "firstname lastname gmail phone phone picure education skills") // Adjust fields to include relevant student details
    .exec();

    if (!studentList || studentList.length === 0) {
        throw new ApiError(404, `No students found for mentor with ID ${mentorId}.`);
      }

    return res
    .status(200)
    .json(
      new ApiResponse(200, studentList, `Fetched students of the mentor with ID ${mentorID}`)
    );
})


//---------------------------FETCH LIST OF MENTORS A STUDENTS HAS BEEN MENTOTERED WITH----------
const fetchMentorsOfAStudent = asyncHandler(async (req, res) => {
    const {studentID } = req.body;

    if(!studentID){
        throw new ApiError(400 , "Didnt recieve student id ")
    }

    const mentorList = await Mentorship.find({ studentID })
    .populate("mentorID", "firstname lastname  phone picure company role field skills ") // Adjust fields to include relevant student details
    .exec();

    if (!mentorList || mentorList.length === 0) {
        throw new ApiError(404, `No mentors found for student with ID ${studentID}.`);
      }

    return res
    .status(200)
    .json(
      new ApiResponse(200, mentorList, `Fetched mentors of the student with ID ${studentID}`)
    );
})


export {fetchMentorsOfAStudent , fetchStudentsOfAMentor , setDetails}