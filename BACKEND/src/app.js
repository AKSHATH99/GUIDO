import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS Middleware (place this at the top, before routes)
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Origin', 'https://guido-frontend.vercel.app/'); // Replace with your frontend's origin
//     res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000"); // Replace with your frontend's origin
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Optional: Allow specific headers
//     next();
//   });
// // const corsOptions = {
// //   origin: "http://localhost:3000", // your frontend domain
// //   credentials: true, // allow credentials (cookies)
// // };
// // app.use(cors({ origin: 'https://guido-frontend.vercel.app/', credentials: true }))

// // app.use(
// //   // cors({ origin: ["https://guido-frontend.vercel.app"],
// //   cors({ origin: ["localhost:8000 "],
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials:true,
// // })
// // );

const allowedOrigins = [
  "https://guido-frontend.vercel.app",
  "http://localhost:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin:", origin);
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

app.use(cors(corsOptions));

app.use(express.json({ limit: "1600000" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//ROUTES
// https://localhost:8000/api/mentor/
// http://localhost:8000/api/v1

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Server Is Working Fine");
});
app.get("/testing", (request, response) => {
  return response.status(234).send("Server Is Working Fine Testing");
});

import userRouter from "./routes/mentor.routes.js";
app.use("/api/v1/mentor", userRouter);

import studentRouter from "./routes/student.route.js";
app.use("/api/v1/student", studentRouter);

import adminRouter from "./routes/admin.route.js"
app.use("/api/v1/admin",adminRouter)

export default app;
