import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent = (picture) => {
  return (
    <div className="flex -2 shadow-lg  ">
      <div className="m-9 mb-0 ">
        <p className="text-rose-500 text-5xl font-bold">GUIDO </p>
      </div>
      <div className="flex ml-56 m-9 mb-0 text-xl justify-evenly    w-1/2 mt-12">
        <div className="">
          <p> HOME </p>
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

      <div className="m-9 mb-2 mt-5   ml-56">
        {/* <img className="rounded-full h-20 w-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3mr0rOaAemqvSNKmzBD-I6mcpod9HFQuCw&usqp=CAU"/> */}
      <Link to="/studentAccount"><img className="rounded-full h-20 w-20" src={picture.picture}/></Link>  
      </div>
    </div>
  );
};

export default HeaderComponent;
