import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import AccountBox from "./AccountBox";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import HomeShimmer from "./Shimmer/HomeShimmer";

const Home = () => {
  const [mentorsData, setmentorsData] = useState("");
  const [loginStudentData, setLoginStudentData] = useState("");

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

  const fetchLoggedInData = async () => {
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
      // console.log(response.data.data._id);
      setLoginStudentData(response.data.data);
      // console.log(loginStudentData._id)
    } catch (error) {
      console.log(error);
    }
  };
  console.log("hi", loginStudentData.picure);

  useEffect(() => {
    fetchLoggedInData();
    fetchAll();
  }, []);

  const searchMentor = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `  http://localhost:8000/api/v1/student/  `,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.data._id);
      setLoginStudentData(response.data.data);
    } catch (error) {}
  };

  return (
    <div>
      <HeaderComponent picture={loginStudentData.picure} />
      <div className="m-32 mt-20 ml-[500px]   text-4xl">
        <p>
          Find your{" "}
          <span className="mx-1 font-bold text-rose-500 ">Mentor </span> from
          the <span className="mx-1 font-bold text-rose-500 ">1000s</span> of
          Mentors ......{" "}
        </p>
      </div>
      <div className="flex ml-80 -mt-44 ">
        <input
          className="border m-32 mb-0 mr-0  mt-20  w-1/2 h-14 rounded-l-xl p-2 pl-5 text-xl"
          placeholder="Search  For A Mentor Here ..."
        />
        <button className=" h-14 mt-[81px] w-48 rounded-r-xl border-green-400 text-xl bg-green-300">
          Search
        </button>
      </div>

      <div className="ml-56 m-20 mb-0 text-rose-400 text-4xl flex ">
        <img className="mr-5" src="/images/star.png" />
        <p>Popular Mentors </p>

        {/* <label for="dropdown" className="text-xl ml-[430px] mt-3 font-bold">Filter :   </label> */}
        <select id="filter"  name="filter mentor" className="text-xl ml-[500px] border px-10 py-3 text-black shadow-lg " >
          {" "}
          <option value="option1">All</option>
          <option value="option2" className="p-10 hover:text-red-500">Web development (Frontend / Backend / Full Stack)</option>
          <option value="option3" className="p-10">AI / ML</option>
          <option value="option4" className="p-10"> Data Science  </option>
          <option value="option4" className="p-10"> Software Development  </option>
        </select>

        
      </div>

      <div className="m-10 mt-10 ml-48">
        {mentorsData ? (
          <div className="flex flex-wrap r">  
            {mentorsData.map((mentor, index) => (
              <AccountBox key={index} data={mentor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap ">
            <HomeShimmer />
            <HomeShimmer />
            <HomeShimmer />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
