import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//--------------------------This table holds student request list-----------------
const RequestsTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    // e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://guido-backend.vercel.app/api/v1/mentorships/fetchStudents`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setStudents(response.data.data); // Save fetched students
        toast.success("Students fetched successfully");
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      toast.error("Error fetching students. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      {/* <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-5"
        onClick={fetchStudents}
      >
        Fetch Students
      </button> */}

      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Student Name</th>
            <th className="border border-gray-300 p-2">Email ID</th>
            <th className="border border-gray-300 p-2">Phone Number</th>
            <th className="border border-gray-300 p-2">College</th>
            <th className="border border-gray-300 p-2">Degree</th>
            <th className="border border-gray-300 p-2">Skills</th>
            <th className="border border-gray-300 p-2">Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.studentID._id} className="text-center">
                <td className="border border-gray-300 p-2">
                  {student.studentID.firstname} {student.studentID.lastname}
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={`mailto:${student.studentID.gmail}`}
                    className="text-blue-500 hover:underline"
                  >
                    {student.studentID.gmail}
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={`tel:${student.studentID.phone}`}
                    className="text-blue-500 hover:underline"
                  >
                    {student.studentID.phone}
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  {student.studentID.education[0]?.collegeName || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {student.studentID.education[0]?.degreeName || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {student.studentID.skills}
                </td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={student.studentID.picure}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No students found. Try Refreshing.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

//-------------------DASHBORD COMPONENT--------------------------------------------------
const Dashboard = () => {
  const [status, setStatus] = useState(true);

  //Toggle status of mentor
  const ToggleStatus = async (e) => {
    // e.preventDefault();
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
        toast.success("Toggled your status ");
      }
    } catch (error) {
      toast.error(`Some error occured while toggling status   . Try again`, {
        transition: "Slide",
      });
      console.log(error);
    }
  };

  //FETCH CURRENT STATUS
  const fetchStatus = async (e) => {
    // e.preventDefault();
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
      toast.error(
        `Some error occured while fetching mentor status   . Try again`,
        { transition: "Slide" }
      );
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("FETCHING STATUS");
    fetchStatus();
  }, []);

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

      {/* Main Content */}
      <main className="p-10">
        {/* Status Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800">
            Student Request Accepting Status
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Toggle the status if you want to temporarily stop accepting mentorship requests from students.
          </p>
          <div className="flex items-center mt-6">
            {/* Button */}
            <button
              onClick={(e) => {
                ToggleStatus();
              }}
              className="py-3 px-6 bg-blue-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Change Status
            </button>

            {/* Status Display */}
            <div className="ml-8">
              <p className="text-2xl font-mono font-bold text-green-500 flex items-center">
                ✅ Accepting Requests
              </p>
              {/* <p className="text-2xl font-mono font-bold text-red-500 flex items-center">
                ❌ Not Accepting Requests
              </p> */}
            </div>
          </div>
        </section>

        {/* Students List Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800">Students List</h2>
          <p className="mt-3 text-lg text-gray-600">
            Browse through students currently taking mentorship under you.
          </p>
          <div className="mt-6">
            <RequestsTable />
          </div>
        </section>
      </main>
    </div>
  );;
};

export default Dashboard;
