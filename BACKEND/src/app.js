import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS Middleware (place this at the top, before routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend's origin
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Optional: Allow specific headers
    next();
  });
// const corsOptions = {
//   origin: "http://localhost:3000", // your frontend domain
//   credentials: true, // allow credentials (cookies)
// };
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(express.json({ limit: "1600000" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//ROUTES
// https://localhost:8000/api/mentor/
// http://localhost:8000/api/v1
import userRouter from "./routes/mentor.routes.js";
app.use("/api/v1/mentor", userRouter);

import studentRouter from "./routes/student.route.js";
app.use("/api/v1/student", studentRouter);

export default app;
