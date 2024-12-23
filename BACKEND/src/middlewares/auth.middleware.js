import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken";
import {Mentor} from "../models/mentor.model.js";

export const verifyJWT = asyncHandler(async(req , _ ,next)=>{
    try{
        console.log("verifying",req.cookies?.accessToken)
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401 , "unauthorised request");
        }

        console.log("SECRET",process.env.ACCESS_TOKEN_SECRET)
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        console.log("decorded token",decodedToken._id)

        const user = await Mentor.findById(decodedToken?._id).select("-password -refreshToken");
        console.log("user" ,user)

        if(!user){
            throw new ApiError(401 , "invalid access token ")
        }

        req.user = user;
        next();
    }catch(error){
        throw new ApiError(401 , error?.message || "nvalid access token")
    }
})
