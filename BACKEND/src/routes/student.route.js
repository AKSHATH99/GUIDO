import {Router} from "express";
import {registerStudent , loginStudent , fetchStudent , mentorReview} from "../controllers/student.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/authStudent.middleware.js";
import cors from "cors";

const router = Router();

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the allowed origin
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };


// https://localhost:8000/api/student/register
router.route("/register").post(
    upload.single([
        {name: "picture" , maxCount: 1}
    ]),
    registerStudent,
)

// https://localhost:8000/api/student/login
router.route("/login").post(loginStudent)

// https://localhost:8000/api/student/fetch
router.route("/fetch").get( cors(corsOptions), verifyJWT , fetchStudent)

// https://localhost:8000/api/student/review
router.route("/review").post(cors(corsOptions), verifyJWT ,mentorReview )

export default router;