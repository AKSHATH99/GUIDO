import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MentorAccount from "./components/Mentor/MentorAccount.js";
import MentorLogin from "./components/Mentor/MentorLogin.js";
import MentorRegistration from "./components/Mentor/MentorRegistration.js";
import MyMentorAccount from "./components/Mentor/MyAccount.js";
import StudentLogin from "./components/Student/StudentLogin.js";
import StudentAcount from "./components/Student/StudentAcount.js";
import Home from "./components/Home.js";
import StudentRegister from "./components/Student/StudentrRegister.js";
import Admin from "./components/admin/Admin.js";
import AdminLogin from "./components/admin/AdminLogin.js"
import IntroPage from "./components/IntroPage.js";
import AboutUs from "./components/AboutUs.js";
import Dashboard from "./components/Mentor/Dashboard.js";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<IntroPage/>
  },
  {
    path: "/studentAccount",
    element: <StudentAcount/>
  },
  {
    path:"/studentReg",
    element:<StudentRegister/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/studentLogin",
    element: <StudentLogin/>
  },
  {
    path:"/MentorLogin",
    element:<MentorLogin/>
    
  },
  {
    path:"/MentorReg",
    element:<MentorRegistration/>
  },
  {
    path: "/MentorAccount/:id",
    element: <MentorAccount />,
  },
  {
    path:"/myMentorAccount",
    element: <MyMentorAccount/>
  },
  {
    path:"/adminlogin",
    element: <AdminLogin/>
  },
  {
    path:"/admin",
    element: <Admin />
  },
  {
    path:"/about",
    element: <AboutUs/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
