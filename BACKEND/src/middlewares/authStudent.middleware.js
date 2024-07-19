import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken";
import {Student} from "../models/student.model.js"

export const verifyJWT = asyncHandler(async(req , _ ,next)=>{
    try{
        console.log(req.cookies?.accessToken)
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401 , "unauthorised request");
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken._id)

        const user = await Student.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401 , "invalid access token ")
        }

        req.user = user;
        next();
    }catch(error){
        throw new ApiError(401 , error?.message || "nvalid access token")
    }
})