import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";


const HeaderSmallScreens = (picture) => {
    const [dppicture , setdp] =useState("");

    useEffect(() => {
     setdp(picture)
    }, []);
  return (
    <div className="flex -2  ">
      <div className="m-9 mb-0 ml-44 flex">
        <img className="h-10 w-10 mt-2" src="/images/logo.png"/>
        <p className="text-rose-500 text-5xl font-bold  ml-5">GUIDO </p>
      </div>
      <div className="flex ml-20 m-9 mb-0 text-2xl justify-evenly text-rose-400 font-bold   w-1/2 mt-12">
        <div className="hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out hover:text-rose-700">
          <Link to="/home">
            {" "}
            <p> HOME </p>
          </Link>
        </div>
        <div className="hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out hover:text-rose-700">
          <p>ABOUT US </p>
        </div>
        {/* <div className="hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out hover:text-rose-700">
          <p>MENTOR CHAT </p>
        </div> */}
        <Link to="/mentorLogin">
        <div className="hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out hover:text-rose-700">
          <p>BECOME A MENTOR </p>
        </div></Link>
      </div>

      <div className="m-9 mb-2 mt-5   ml-20 hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out">
        {dppicture? (
          <Link to="/studentAccount">
            <img
              className=" border-4  border-rose rounded-full h-20 w-20"
              src={picture.picture}
            />
          </Link>
        ) : (
          <Link to="/studentAccount">
            <img
              className=" border-4  border-rose rounded-full h-20 w-20"
              src="/images/plaindp.jpg"
            />
          </Link>
        )}
      </div>
    </div>
  )
}

export default HeaderSmallScreens
