import React from "react";
import HeaderComponent from "../HeaderComponent";

const Shimmer = () => {
  return (
    <div className="animate-pulse">
        
      <div className="bg-slate-200 h-96  w-3/4 ml-44 m-12 rounded-lg flex justify-center items-center anim">
      <p className="text-5xl text-gray-400"> </p>
      </div>

      <div className="bg-slate-200 h-[600px]  w-3/4 ml-44 m-12 rounded-lg flex justify-center items-center">
      <p className="text-5xl text-gray-400"> </p>
      </div>

    </div>
  );
};

export default Shimmer;
