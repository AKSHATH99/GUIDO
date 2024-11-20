import { Router } from "express";
import {
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
  filterMentor
} from "../controllers/mentor.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyJWT2 } from "../middlewares/authStudent.middleware.js";
import cors from "cors";

const router = Router();

// https://localhost:8000/api/mentor/register
router
  .route("/register")
  .post(upload.single("picture"), registerMentor);

const corsOptions = {
  origin: "https://guido-frontend.vercel.app", // Replace with the allowed origin
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

// https://localhost:8000/api/mentor/login
router.route("/login").post(cors(corsOptions), LoginMentor);

// https://localhost:8000/api/mentor/fetch
router.route("/fetch").get(verifyJWT, fetchMentor);

//https://localhost:8000/api/mentor/fetchAll
router.route("/fetchAll").get(cors(corsOptions) ,fetchAllMentor)   

//https://localhost:8000/api/mentor/updateDetails
router.route("/updateDetails").put(cors(corsOptions),verifyJWT,updateDetails)

// https://localhost:8000/api/mentor/updateimage
router.route("/updateImage").put(cors(corsOptions), verifyJWT , upload.single("picture"), updatePicture)

//https://localhost:8000/api/mentor/deleteAccount
router.route("/deleteAccount").delete(cors(corsOptions), verifyJWT ,deleteAccount)

//https://localhost:8000/api/mentor/filter
router.route("/filter").get(cors(corsOptions),verifyJWT2 , filterMentor )



// https://localhost:8000/api/mentor/:id
router.route("/:id").get(cors(corsOptions), verifyJWT2, fetchMentorByID);

// https://localhost:8000/api/mentor/find/:firstname
router.route("/find/:firstname").get(verifyJWT2, fetchAMentor);

//https://localhost:8000/api/mentor/updateCount/:id
router.route("/updateCount/:id").post(cors(corsOptions),verifyJWT2 , updatecount )

//https://localhost:8000/api/mentor/updateCount/:id
router.route("/review/:id").get(cors(corsOptions),verifyJWT2 , fetchReview )




export default router;  
