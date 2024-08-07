import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import AccountBox from "./AccountBox";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const [mentorsData, setmentorsData] = useState("");
  const [loginStudentData , setLoginStudentData] = useState("");

  //Function to fetch all the mentors from DB
  const fetchAll = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.get(
        ` http://localhost:8000/api/v1/mentor/fetchAll`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.data[0]);
      setmentorsData(response.data.data);
      // console.log(mentorsData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLoggedInData=async()=>{
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `  http://localhost:8000/api/v1/student/fetch`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.picure);
      setLoginStudentData(response.data.data)
      
    } catch (error) {
      console.log(error);
    }
  }
  console.log("hi",loginStudentData.picure);

  useEffect(() => {
    fetchAll();
    fetchLoggedInData();
  }, []);

  return (
    <div>
      <HeaderComponent picture = {loginStudentData.picure} />
      <div className="flex">
        <input
          className="border m-32 mb-0 mr-0 ml-72 mt-20 w-1/2 h-14 border-black rounded-l-lg p-2 pl-5 text-xl"
          placeholder="Search for your field here...."
        />
        <button className="border h-14 mt-[81px] w-48 rounded-r-lg border-green-400 text-xl bg-green-300">
          Search
        </button>
      </div>
      <div className="m-32 ml-72   text-4xl">
        <p>
          Choose your{" "}
          <span className="mx-1 font-bold text-rose-500 underline">
            Mentor{" "}
          </span>{" "}
          from the  <span className="mx-1 font-bold text-rose-500 underline">1000s</span> of mentors{" "}
        </p>
      </div>
      <div className="m-10">
        {mentorsData ? (
          <div className="flex flex-wrap">
            {mentorsData.map((mentor, index) => (
              <AccountBox key={index} data={mentor} />
            ))}
          </div>
        ) : (
          <p>loading.....</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
