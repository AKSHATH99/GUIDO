import React, { useEffect, useState } from 'react'
import axios from "axios"
import {ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


//--------------------------This table holds student request list-----------------
const RequestsTable = () => {
  const requests = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '456-789-1234' },
  ];

  return (
    <table className='w-3/4 border-collapse border border-gray-300 mt-5 rounded-lg'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='border border-gray-300 p-2'>Student ID</th>
          <th className='border border-gray-300 p-2'>Student Name</th>
          <th className='border border-gray-300 p-2'>Email ID</th>
          <th className='border border-gray-300 p-2'>Phone Number</th>
          <th className='border border-gray-300 p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id} className='text-center'>
            <td className='border border-gray-300 p-2'>{request.id}</td>
            <td className='border border-gray-300 p-2'>{request.name}</td>
            <td className='border border-gray-300 p-2'>{request.email}</td>
            <td className='border border-gray-300 p-2'>{request.phone}</td>
            <td className='border border-gray-300 p-2'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                View Account
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};







//-------------------DASHBORD COMPONENT--------------------------------------------------
const Dashboard = () => {

  const [status , setStatus] = useState(true);

  //Toggle status of mentor
  const ToggleStatus = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://guido-backend.vercel.app/api/v1/mentor/toggleStatus`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log("TOGGLE SUCCESS", response);
        toast.success("Toggled your status ")
      }

    } catch (error) {
      toast.error(`Some error occured while toggling status   . Try again`,{transition:"Slide"})
      console.log(error);
    }
  };

  //FETCH CURRENT STATUS
  const fetchStatus = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://guido-backend.vercel.app/api/v1/mentor/fetchCurrentStatus`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log("Status Fetch  SUCCESS", response);
        // toast.success("Toggled your status ")
      }

    } catch (error) {
      toast.error(`Some error occured while fetching mentor status   . Try again`,{transition:"Slide"})
      console.log(error);
    }
  };

  useEffect(()=>{
    console.log("FETCHING STATUS")
    fetchStatus();
  },[]);

  return (
    <div className=''>
      <h1 className='text-4xl  font-mono border p-10 shadow-lg' >MENTOR DASHBOARD</h1>

      <div className='p-10 text-2xl text-gray-600'>MANAGE YOUR ACCOUNT AND SETTING HERE</div>

      <div className='p-10 shadow-lg m-10 mt-0' >

        <h1 className='text-2xl font-bold'>Student Request Accepting Status </h1>
        <p className='mt-2 text-gray-500 text-xl'>Set this to false if you dont want to accept request from student for temporarily</p>
        <div className='flex'>
        <button onClick={(e)=>{ToggleStatus()}} className='mt-5 w-max p-5 px-10 border rounded-lg text-white bg-gray-500 text-xl '> Change Status
        </button>

        <div className='mt-10 ml-10'>
        <p className='text-2xl text-green-500 font-bold font-mono  '>✅ Accepting Requests</p>
        <p className='text-2xl text-red-500 font-bold font-mono  '> Not Accepting ❌</p>
        </div>
        </div>

        {/* ---------------STUDENT REQUEST LIST------------------------------------------ */}
      <div className='mt-20  '>
        <h1 className=' text-3xl font-bold'>Requests List</h1>
        <p className='mt-2 text-gray-500 text-xl'>Browse through students currently taking mentorship under you </p>
        <RequestsTable/>
      </div>
      </div>


      
      STUDENT REQUEST FOR MENTORING LIST  , SET IS ACCEPTING REQUEST STATUS , 
    </div>
  )
}

export default Dashboard
