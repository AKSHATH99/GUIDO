import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import AccountBox from "./AccountBox";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [mentorsData , setmentorsData] =useState('')

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
      console.log(response.data.data[0])
      setmentorsData(response.data.data)
      console.log(mentorsData)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchAll();
  },[])

  return (
    <div>
      <HeaderComponent />
      {mentorsData?
      <div className="flex flex-wrap">
      <AccountBox data={mentorsData[0]} />
        <AccountBox data={mentorsData[0]} />
        <AccountBox data={mentorsData[0]} />
        
      </div>
      :<p>loadsing.....</p>}
    </div>
  );
};

export default Home;
