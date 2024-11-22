import {Router} from "express";
import {registerStudent , loginStudent , fetchStudent , mentorReview ,emailController, updateDetails, deleteAccount, updatePicture, logoutStudent} from "../controllers/student.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT2 } from "../middlewares/authStudent.middleware.js";
import cors from "cors";

const router = Router();

const allowedOrigins = [
  "https://guido-frontend.vercel.app",
  "http://localhost:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};


// https://localhost:8000/api/student/register
router.route("/register").post(
    upload.single("picture"),
    registerStudent,
)

// https://localhost:8000/api/student/login
router.route("/login").post( cors(corsOptions),loginStudent)

// https://localhost:8000/api/student/fetch
router.route("/fetch").get( cors(corsOptions), verifyJWT2 , fetchStudent)

// https://localhost:8000/api/student/updateStudentDetails
router.route("/updateStudentDetails").put(cors(corsOptions),verifyJWT2 , updateDetails)

// https://localhost:8000/api/student/updateimage
router.route("/updateStudentImage").put(cors(corsOptions), verifyJWT2 , upload.single("picture"), updatePicture)

// https://localhost:8000/api/student/logoutStudent
router.route("/logoutStudent").post(cors(corsOptions), verifyJWT2 , logoutStudent)


// https://localhost:8000/api/student/deleteStudentAccount
router.route("/deleteStudentAccount").delete(cors(corsOptions), verifyJWT2 , deleteAccount)

// https://localhost:8000/api/student/review/ID
router.route("/review/:mentorID").post(cors(corsOptions), verifyJWT2 ,mentorReview )

// https://localhost:8000/api/student/email
router.route("/email").post(cors(corsOptions) , verifyJWT2 , emailController)

export default router;