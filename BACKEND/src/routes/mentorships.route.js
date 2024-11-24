import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyJWT2 } from "../middlewares/authStudent.middleware.js";
import cors from "cors";
import { fetchMentorsOfAStudent, fetchStudentsOfAMentor, setDetails } from "../controllers/mentorships.controller.js";

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



//https://localhost:8000/api/mentorships/setDetails
router.route("/setDetails").post(cors(corsOptions), setDetails);

//https://localhost:8000/api/mentorships/fetchStudents
router.route("/fetchStudents").get(cors(corsOptions), fetchStudentsOfAMentor);

//https://localhost:8000/api/mentorships/fetchMentors
router.route("/fetchMentors").get(cors(corsOptions), fetchMentorsOfAStudent);


export default router;