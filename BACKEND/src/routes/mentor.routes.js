import {Router} from "express";
import {  registerMentor, LoginMentor, fetchMentor , fetchAMentor , fetchMentorByID} from "../controllers/mentor.controller.js";
import multer from "multer";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js";
import cors from "cors"

const router = Router();

// https://localhost:8000/api/mentor/register
router.route("/register").post(
    upload.single([
        {name: "picture" , maxCount: 1}
    ]),
    registerMentor,
)

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the allowed origin
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

// https://localhost:8000/api/mentor/login
router.route("/login").post(cors(corsOptions), LoginMentor);

// https://localhost:8000/api/mentor/fetch
router.route("/fetch").get(verifyJWT ,fetchMentor);

// https://localhost:8000/api/mentor/find/:firstname
router.route("/find/:firstname").get(verifyJWT , fetchAMentor);

// https://localhost:8000/api/mentor/:id
router.route("/:id").get(cors(corsOptions) ,fetchMentorByID)

export default router;