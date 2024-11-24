import React, { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white border-b p-6 shadow-sm">
        <h1 className="text-4xl font-mono text-center text-gray-800">
          MENTOR DASHBOARD
        </h1>
        <p className="text-center mt-2 text-xl text-gray-600">
          Manage your account and settings here
        </p>
      </header>

      <div className=" ml-10">
        <div className="flex">
        <div onClick={()=>{setDashboardActive(true)}} className=" hover:cursor-pointer hover:bg-gray-300 mx-10 mt-10 text-2xl border px-5 py-2 " >DASHBOARD</div>
        <div  onClick={()=>{setDashboardActive(false)}}className="hover:cursor-pointer hover:bg-gray-300 mx-10 ml-3 mt-10 text-2xl border  px-5 py-2" >ACCOUNT </div>
        </div>
        <div className="border shadow-lg p-2 ">
          {DashboardActive?<DashboardComponent/>:<MyMentorAccount/> }
            {/* */}
            
        </div>
      </div>
      {/* Main Content */}
     
    </div>
  );;
};

export default Dashboard;
