//This account is only accessable to the mentor who is logged in and not to students 
//Mentor can edit and manage his account details over here

import axios from "axios";
import React, { useState, useEffect } from "react";
import HeaderComponent from "../HeaderComponent.js";
import Footer from "../Footer.js";
import StudentAccountShimmer from "../Shimmer/StudentAccountShimmer.js";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer , toast} from 'react-toastify'
import LoaderAnimation from "../Shimmer/LoaderAnimation";



const MyMentorAccount  = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState("");
  const [Loader , setLoader] = useState(false);
  const [student, setStudent] = useState({});


  //Fetches data about mentor
  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");
      console.log("token" , token)
      const response = await axios.get(
        "https://guido-backend.vercel.app/api/v1/mentor/fetch",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentData(response.data.data);
      console.log(response);
      console.log(studentData.education[0].collegeName);
    } catch (error) {
      console.log(error);
    }
  };


  //Delete mentor account
  const deleteMentor = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");
      console.log("token" , token)
      const response = await axios.get(
        "https://guido-backend.vercel.app/api/v1/mentor/deleteAccount",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response){
        navigate("/mentorLogin")
      }
    } catch (error) {
      if(error?.response?.status){
        toast.error(`${error?.response?.status}, Couldnt delete your account `);
      }else{
        toast.error("So,e unknown error occured while deleting account ")
      }
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  //----------------------------------------------UI------------------------------------
  return (
    <>
      <div className="bg-gray-100 min-h-screen p-10">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800">My Account Settings</h1>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-400">
            Sign Out
          </button>
        </header>
  
        {/* Account Management Info */}
        <p className="mt-6 text-xl text-gray-500 text-center">
          Manage your account and edit your details
        </p>
  
        {studentData ? (
          <div className="mt-10">
            {/* Profile Section */}
            <div className="bg-white shadow p-8 rounded-lg flex gap-8 items-center">
              <img
                className="rounded-full w-32 h-32 object-cover"
                src={studentData.picture}
                alt="Profile"
              />
              <div className="flex-grow">
                <h2 className="text-4xl font-bold text-gray-800">
                  {studentData.firstname} {studentData.lastname}
                </h2>
                <div className="flex items-center gap-4 mt-4 text-gray-600">
                  <img className="w-6" src="/images/email.png" alt="Email" />
                  <span className="text-lg">{studentData.email}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <img className="w-6" src="/images/call.png" alt="Call" />
                  <img className="w-6" src="/images/linkedin.png" alt="LinkedIn" />
                  <img className="w-6" src="/images/Xlogo.png" alt="Twitter" />
                </div>
              </div>
              <img
                className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                src="/images/edit.png"
                alt="Edit"
              />
            </div>
  
            {/* About Section */}
            <div className="mt-8 bg-white shadow p-8 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold text-gray-800">About</h3>
                <img
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  src="/images/edit.png"
                  alt="Edit"
                />
              </div>
              <p className="mt-4 text-gray-600">{studentData.bio}</p>
            </div>
  
            {/* Education Section */}
            <div className="mt-8 bg-white shadow p-8 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold text-gray-800">Education</h3>
                <img
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  src="/images/edit.png"
                  alt="Edit"
                />
              </div>
              <div className="mt-4 space-y-4 text-gray-600">
                <div>
                  <span className="font-bold">At:</span> {studentData.education[0]?.collegeName || "N/A"}
                </div>
                <div>
                  <span className="font-bold">Doing:</span> {studentData.education[0]?.degreeName || "N/A"}
                </div>
                <div>
                  <span className="font-bold">Currently in:</span> {studentData.education[0]?.currentYear || "N/A"}
                </div>
                <div>
                  <span className="font-bold">Graduating in:</span>{" "}
                  {studentData.education[0]?.passoutYear || "N/A"}
                </div>
              </div>
            </div>
  
            {/* Skills Section (Hardcoded) */}
            <div className="mt-8 bg-white shadow p-8 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold text-gray-800">Skills</h3>
                <img
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  src="/images/edit.png"
                  alt="Edit"
                />
              </div>
              <div className="p-5 ml-16 flex flex-wrap">
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">Java</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">SpringBoot</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">MySQL</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">C++</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">GitHub</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">Python</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">RestAPI</span>
                </div>
                <div className="m-5 border p-3 shadow-lg">
                  <span className="text-xl font-bold">MongoDB</span>
                </div>
              </div>
            </div>
  
            {/* Other Account Settings */}
            <h3 className="mt-10 text-2xl text-gray-700 text-center">
              Other Account Settings
            </h3>
            <div className="flex justify-center mt-6">
              <button onClick={()=>{deleteMentor()}} className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-500 transition">
                {Loader?<LoaderAnimation/>:"DELETE YOUR ACCOUNT"}
              </button>
            </div>
          </div>
        ) : (
          <StudentAccountShimmer />
        )}
      </div>
    </>
  );
  
};

export default MyMentorAccount;
