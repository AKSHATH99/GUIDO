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
import MentorAccount from "./components/MentorAccount";
import MentorLogin from "./components/MentorLogin";
import MentorRegistration from "./components/MentorRegistration";
import StudentLogin from "./components/StudentLogin";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MentorLogin/>
  },
  {
    path: "/studentLogin",
    element: <StudentLogin/>
  },
  {
    path:"/MentorLogin",
    
  },
  {
    path:"/MentorReg",
    element:<MentorRegistration/>
  },
  {
    path: "/MentorAccount",
    element: <MentorAccount />,
  },
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
