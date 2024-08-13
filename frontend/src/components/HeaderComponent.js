import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";

const HeaderComponent = (picture) => {

  const [dppicture , setdp] =useState("");

  useEffect(() => {
   setdp(picture)
  }, []);

  return (
  
    <div className="flex -2  ">
      <div className="m-9 mb-0 ml-44">
        <p className="text-rose-500 text-5xl font-bold">GUIDO </p>
      </div>
      <div className="flex ml-20 m-9 mb-0 text-2xl justify-evenly text-rose-400 font-bold   w-1/2 mt-12">
        <div className="">
          <Link to="/home">
            {" "}
            <p> HOME </p>
          </Link>
        </div>
        <div className="">
          <p>ABOUT US </p>
        </div>
        <div>
          <p>GUIDO </p>
        </div>
        <div>
          <p>GUIDO </p>
        </div>
      </div>

      <div className="m-9 mb-2 mt-5   ml-20 ">
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
  );
};

export default HeaderComponent;
