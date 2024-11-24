import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MentorAccount from "./MentorAccount";
import MyMentorAccount from "./MyAccount";
import DashboardComponent from "./DashboardComponent";



//-------------------DASHBORD COMPONENT--------------------------------------------------
const Dashboard = () => {
  const [DashboardActive , setDashboardActive] = useState(true);

  //------------------------------------UI---------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header Section */}
      <header className="bg-white border-b p-6 shadow-sm flex">
      <p className="text-rose-500 text-5xl font-bold  ml-20 ">GUIDO </p>

        <div className="ml-20">
        <h1 className="text-4xl font-mono text-center text-gray-800">
          MENTOR DASHBOARD
        </h1>
        <p className="text-center mt-2 text-xl text-gray-600">
          Manage your account and settings here
        </p>
        </div>
      </header>

      <div className=" ml-10">
        <div className="flex">
        <div onClick={()=>{setDashboardActive(true)}} className=" hover:cursor-pointer hover:bg-gray-300 mx-10 mt-10 text-2xl border-2  px-5 py-2 " >Dashboard</div>
        <div  onClick={()=>{setDashboardActive(false)}}className="hover:cursor-pointer hover:bg-gray-300 mx-10 ml-3 mt-10 text-2xl border-2  px-5 py-2" >  My Account </div>
        </div>
        <div className="border shadow-lg p-2 bg-gray-200">
          {DashboardActive?<DashboardComponent/>:<MyMentorAccount/> }
            {/* */}
            
        </div>
      </div>
      {/* Main Content */}
     
    </div>
  );;
};

export default Dashboard;
