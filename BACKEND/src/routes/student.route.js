import {Router} from "express";
import {registerStudent , loginStudent} from "../controllers/student.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

// https://localhost:8000/api/student/register
router.route("/register").post(
    upload.single([
        {name: "picture" , maxCount: 1}
    ]),
    registerStudent,
)

// https://localhost:8000/api/student/login
router.route("/login").post(loginStudent)

export default router;