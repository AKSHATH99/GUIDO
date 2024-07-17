import {Router} from "express";
import {  registerMentor, LoginMentor} from "../controllers/mentor.controller.js";
import multer from "multer";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

// https://localhost:8000/api/mentor/register
router.route("/register").post(
    upload.single([
        {name: "picture" , maxCount: 1}
    ]),
    registerMentor,
)

// https://localhost:8000/api/mentor/login
router.route("/login").post(LoginMentor);

export default router;